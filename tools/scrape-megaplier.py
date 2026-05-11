#!/usr/bin/env python3
"""
scrape-megaplier.py
Captura el Megaplier de Mega Millions en la tabla staging de Supabase.

Fuentes:
  - lotteryusa.com   → draw más reciente (scrape HTML)
  - Texas CSV        → historial completo hasta abril 2025 (CSV oficial)

Modos:
  python3 tools/scrape-megaplier.py              # scrape latest de lotteryusa.com
  python3 tools/scrape-megaplier.py --backfill   # importa todo el CSV de Texas (con Megaplier)
  python3 tools/scrape-megaplier.py --dry-run    # solo muestra, no inserta
"""

import re
import sys
import json
import csv
import io
import urllib.request
from datetime import datetime, date

SUPABASE_URL = "https://wpxwtxfgwavoijyyivwl.supabase.co"
SUPABASE_KEY = "sb_publishable_m6I2HcpvME4Jd361iClk-g_1qSCGwTy"
TABLE        = "megamillions_megaplier_staging"

LOTTERYUSA_URL = "https://www.lotteryusa.com/mega-millions/"
TEXAS_CSV_URL  = "http://www.texaslottery.com/export/sites/lottery/Games/Mega_Millions/Winning_Numbers/megamillions.csv"

DRY_RUN  = "--dry-run"  in sys.argv
BACKFILL = "--backfill" in sys.argv

MONTH_MAP = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4,
    "May": 5, "Jun": 6, "Jul": 7, "Aug": 8,
    "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12,
}


def http_get(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "text/html,text/plain,*/*",
    })
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


# ── Fuente 1: lotteryusa.com ──────────────────────────────────────────────────
def parse_lotteryusa(html):
    """Extrae el draw card más reciente (siempre el primero en la página)."""
    cards = re.split(r'class="c-draw-card">', html)
    if len(cards) < 2:
        return []

    card = cards[1]

    # Fecha
    date_m = re.search(
        r'draw-date-sub">\s*\n?\s*((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+,\s+\d{4})',
        card,
    )
    if not date_m:
        return []
    date_str = date_m.group(1).strip()
    m = re.match(r'(\w+)\s+(\d+),\s+(\d+)', date_str)
    draw_date = date(int(m.group(3)), MONTH_MAP[m.group(1)], int(m.group(2))).isoformat()

    # Bolas blancas (excluye yellow)
    all_balls = re.findall(r'class="c-ball(?! c-ball--yellow)[^"]*">(\d+)<', card)
    white_balls = all_balls[:5]

    # Mega Ball
    mb_m = re.search(r'c-ball--yellow[^>]*>(\d+)<', card)
    mega_ball = mb_m.group(1) if mb_m else None

    # Megaplier
    mp_m = re.search(r'Megaplier:\s*(\d+)', card)
    megaplier = f"{mp_m.group(1)}X" if mp_m else None

    return [{
        "fecha":    draw_date,
        "numeros":  white_balls,
        "mega_ball": mega_ball,
        "megaplier": megaplier,
        "jackpot":  None,
        "fuente":   "lotteryusa",
    }]


# ── Fuente 2: Texas Lottery CSV ───────────────────────────────────────────────
# Formato: Game, Month, Day, Year, n1, n2, n3, n4, n5, MegaBall, Megaplier
# El Megaplier dejó de publicarse a partir de abril 8, 2025.
def parse_texas_csv(text):
    draws = []
    reader = csv.reader(io.StringIO(text))
    for row in reader:
        if len(row) < 10:
            continue
        if row[0].strip() != "Mega Millions":
            continue
        try:
            month = int(row[1])
            day   = int(row[2])
            year  = int(row[3])
            draw_date = date(year, month, day).isoformat()
        except ValueError:
            continue

        white_balls = [row[4].strip(), row[5].strip(), row[6].strip(),
                       row[7].strip(), row[8].strip()]
        mega_ball   = row[9].strip() if len(row) > 9 else None
        megaplier   = f"{row[10].strip()}X" if len(row) > 10 and row[10].strip() else None

        draws.append({
            "fecha":    draw_date,
            "numeros":  white_balls,
            "mega_ball": mega_ball,
            "megaplier": megaplier,
            "jackpot":  None,
            "fuente":   "texas_csv",
        })
    return draws


# ── Upsert a Supabase (batch) ─────────────────────────────────────────────────
def upsert_batch(draws):
    from datetime import timezone
    ts = datetime.now(timezone.utc).isoformat()

    rows = []
    for d in draws:
        rows.append({
            "fecha":        d["fecha"],
            "numeros":      d["numeros"],
            "mega_ball":    d["mega_ball"],
            "megaplier":    d["megaplier"],
            "jackpot":      d["jackpot"],
            "fuente":       d["fuente"],
            "raw_response": {k: v for k, v in d.items() if k != "fuente"},
            "scraped_at":   ts,
        })

    payload = json.dumps(rows).encode("utf-8")
    req = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/{TABLE}",
        data=payload,
        method="POST",
        headers={
            "apikey":        SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type":  "application/json",
            "Prefer":        "resolution=merge-duplicates",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.status
    except urllib.error.HTTPError as e:
        print(f"  ERROR {e.code}: {e.read().decode()[:300]}")
        return e.code


def upsert(draw):
    return upsert_batch([draw])


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    if BACKFILL:
        print(f"Modo BACKFILL — descargando CSV de Texas Lottery...")
        text  = http_get(TEXAS_CSV_URL)
        draws = parse_texas_csv(text)
        # Solo los que tienen Megaplier (pre-abril 2025)
        with_mp  = [d for d in draws if d["megaplier"]]
        without  = [d for d in draws if not d["megaplier"]]
        print(f"Total draws en CSV: {len(draws)}")
        print(f"  Con Megaplier: {len(with_mp)}")
        print(f"  Sin Megaplier (post-abril 2025): {len(without)} — se insertan sin valor")
        draws_to_insert = draws  # insertar todos para tener el histórico completo
    else:
        print(f"Modo LATEST — scrapeando {LOTTERYUSA_URL}...")
        html  = http_get(LOTTERYUSA_URL)
        draws = parse_lotteryusa(html)

    print(f"Resultados a procesar: {len(draws)}")
    if not draws:
        print("No se encontraron resultados.")
        return

    # Preview
    for d in draws[:5]:
        print(f"  {d['fecha']}  nums={d['numeros']}  MB={d['mega_ball']}  Megaplier={d['megaplier']}  fuente={d['fuente']}")
    if len(draws) > 5:
        print(f"  ... ({len(draws)-5} más)")

    if DRY_RUN:
        print("\n[DRY RUN] No se insertó nada.")
        return

    ok = err = 0
    batch_size = 200
    for i in range(0, len(draws), batch_size):
        batch = draws[i:i + batch_size]
        status = upsert_batch(batch)
        if status in (200, 201):
            ok += len(batch)
        else:
            err += len(batch)
        print(f"  Lote {i//batch_size + 1}: {len(batch)} rows → {'✅' if status in (200,201) else '❌'} ({status})")

    print(f"\nListo — ✅ {ok} insertados/actualizados, ❌ {err} errores.")


if __name__ == "__main__":
    main()
