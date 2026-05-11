# BUGS_PENDIENTES.md — QuinielaRD

Registro de bugs conocidos y su estado. Actualizar cuando se detecten o resuelvan.

---

## BUG-001: Badge "multiplicador" Powerball — posición

Fecha detección: anterior a 2026-05-08
Severidad: Baja (cosmética)
Síntoma: El badge del multiplicador en la card de Powerball aparece ligeramente desalineado.
Causa: Ajuste de posición pendiente en `LotteryCard.jsx`.
Plan: Ajustar en próxima iteración visual.
Workaround: Ninguno.

---

## BUG-002: Scraper no captura Agarra 4 ni Super Palé LoteDom

Fecha detección: 8 mayo 2026
Severidad: Baja (no bloqueante)
Síntoma: En producción, cards de "Agarra 4 LoteDom" y "Super Palé LoteDom" muestran fecha vieja ("Último: mar, 5 may") porque el scraper actual no recoge sus datos.
Causa: El scraper actual no incluye estos sorteos en su mapeo.
Plan: Incorporar en V2 del pipeline (segunda etapa del proyecto).
Workaround: Ninguno por ahora; usuarios ven fecha histórica en pendiente.
