# Redflag-kontroll – 22. september 2026

Omfang: designsprint-oversikten, Husøy, Horten og felles funksjoner. Gjennomgangen kombinerer kildekontroll, lenkekontroll og nettlesertester. Den er ikke en full WCAG-revisjon, penetrasjonstest eller måling av konverteringsrate/Core Web Vitals.

## Konklusjon

Utkastet er egnet til designvurdering. Det er fortsatt ikke en ferdig løsning for å motta og måle kundehenvendelser. Den viktigste risikoen er at en besøkende fyller ut skjemaet uten å fullføre e-posten i sitt eget program. Ingen reell innsending eller kvittering fra Eiken Bygg finnes ennå.

## Funn og rettelser

| Prioritet | Funn | Tiltak og status |
|---|---|---|
| Høy | Skjemaet manglet method/action og var avhengig av JavaScript for å stoppe standardinnsending. Ved skriptfeil kunne nettleseren bruke GET og legge feltverdier i adressen. | Rettet: feltene er deaktivert i HTML til håndteringen er installert. POST er satt som ekstra beskyttelse mot feltverdier i URL. Uten JavaScript vises alternativ telefon/e-post. Dette kobler ikke til en server. |
| Høy | E-postprogram er en avhengighet for kontakt. Informasjonen om dette kom først etter feltene. | Begrensningen er flyttet foran utfyllingen. Ny «Kopier forespørselen i stedet» gir en alternativ vei til nettbasert e-post. Hvis utklippstavletilgang svikter, vises markerbar tekst. Ingen falsk «sendt»-kvittering. Direkte innsending gjenstår. |
| Middels | Fast kontaktknapp kunne ligge over felt/knapper under utfylling, særlig med mobiltastatur. | Rettet: skjules mens fokus er i skjemaet, kommer tilbake når fokus forlater det. Informasjonen slettes ikke. |
| Middels | Samme listverksbilde var med flere ganger i Husøy-galleriet. | Rettet: galleriet viser fire unike bilder, selv om en illustrasjon brukes flere steder på siden. Begge bildeåpnerne fungerer. |
| Middels | Prosjektmenyen kunne bli stående åpen etter at brukeren gikk videre med mus eller tastatur. | Rettet: lukkes ved klikk/fokus utenfor, ved valg av prosjekt og med Escape. |
| Lav | Kopiering av delbar lenke tok med tilfeldige sporingsparametere og gamle visningsparametere. | Rettet: lenken beholder siden og eventuell valgt designretning. Andre parametere fjernes fra den kopierte lenken. |
| Lav | Utskrift kunne gi animert/skjult innhold eller unyttige skjemakontroller. | Egne utskriftsregler lagt til. Dette er kildekontrollert, ikke en full utskriftsrevisjon. |

## Må avklares før ordinær lansering

1. **Reell skjemainnsending – høy prioritet.** Koble til eksisterende WordPress/Elementor-løsning eller annen godkjent mottaker. Test vellykket innsending, feilsvar, spamvern, vedlegg og faktisk levering til mottaker. E-postkladden er en prototypefunksjon, ikke en erstatning for dette.
2. **Ekte prosjektbilder – høy prioritet.** De merkede KI-bildene illustrerer temaene. De dokumenterer ikke Eiken Byggs utførelse og bør erstattes med godkjente prosjektbilder før ordinær markedsføring som referanseprosjekter.
3. **Måling – middels prioritet.** Ingen analyseintegrasjon er aktivert. Mål telefon-/e-post-/skjemahandlinger og faktiske kvalifiserte henvendelser separat. Ikke utrop design A, B eller C til vinner uten data.
4. **Søk og deling – ved lansering.** Noindex er riktig for utkastet. Ved flytting til eiken-bygg.no må indeksinnstillinger, endelige URL-er og delingsmetadata oppdateres samlet.
5. **Ytelse og vedlikehold – før produksjon.** Mange designrunder har gitt et langt stilark med overstyringer (omtrent 48 kB før overføring/komprimering). Rydd og konsolider når designretningen er valgt. Test deretter på reelle telefoner og tregere forbindelser. Det er ikke målt en lastetids- eller konverteringsgevinst i denne gjennomgangen.

## Verifisering

- Ingen doble ID-er, manglende lokale filer eller brutte interne ankerreferanser på de fire HTML-sidene.
- Kontaktdata kopiert fra fiktiv testutfylling; siden blir stående og meldingen presiserer at ingenting er sendt. Ingen henvendelse ble sendt.
- Skjemafelt aktiveres når håndteringen er klar; POST og deaktivert utgangspunkt kontrollert i kilden.
- Kontaktknappen skjules ved fokus i et skjemafelt.
- Husøy-galleriet har fem bildeåpnere, men fire unike bilder.
- Tidligere kontroll av 320/390 px og desktop videreføres; mobil og fokusfunksjoner kontrolleres på nytt for endringene. Alle enheter/nettlesere er ikke dekket.
- Deaktivert JavaScript, redusert bevegelse, avvist utklippstavletilgang og utskrift er håndtert i koden; ikke alle disse miljøvariantene er simulert i nettleseren.
