# Calion

Deutschsprachige, responsive Webapp rund ums gesunde Abnehmen. **Ohne Kalorientracker.**

- Übersicht mit Einstieg in drei Schritten
- BMI und Gewichtsbereich zur Orientierung für Erwachsene
- Energiebedarf und moderates Kaloriendefizit nach Mifflin-St Jeor
- Sechs filterbare Guides mit vollständigen Artikeln
- Hinweise, Rechenmethoden und verlinkte Quellen
- Gesundheitswerte bleiben im Arbeitsspeicher des Browsers, keine Konten oder Datenbank

## Starten

Node.js 20+ und Python 3. Keine Installation oder API-Schlüssel erforderlich.

```sh
npm run dev
# http://localhost:5173
npm test
npm run check
```

`dist/` enthält die fertige statische Website und kann direkt gehostet werden. Nach einem Checkout auf GitHub kann GitHub Pages in **Settings → Pages → GitHub Actions** aktiviert werden; der beiliegende Workflow veröffentlicht `dist/`.

Die Rechner sind ausschließlich für Erwachsene gedacht. Werte sind Schätzungen, keine medizinischen Empfehlungen. Untergewicht und niedrige Energieziele werden abgefangen; besondere Lebenssituationen erfordern persönliche Beratung. Schriftarten: Google Fonts (externer Abruf). Food-Foto: Unsplash.
