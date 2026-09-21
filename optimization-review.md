# Konverteringsgjennomgang – 21. september 2026

Omfang: Husøy og Horten, alle tre designretninger, samt felles styling på oversikten. Dette er en faglig gjennomgang og funksjonstest, ikke en måling av konverteringsrate.

| Prioritet | Funn | Utbedring |
|---|---|---|
| Høy | Kontakt var ett av fire små valg i en kapittelmeny. Menyen kom sent og forsvant før telefon/e-post nødvendigvis var synlig. | Egen fast «Kontakt Henrik»-knapp fra første skjerm til bunnen, med portrett og tydelig kontrast. Samme handling på mobil og desktop. |
| Høy | Kontaktankeret landet først på en introduksjon, med kontaktvalgene lenger ned på mobil. | Kontaktlenker går direkte til Henrik-kortet. Tastaturfokus følger med. Portrettets høyde gir plass til både telefon og e-post. |
| Høy | Lange tekstpartier uten et naturlig neste steg. | Ny kontaktinvitasjon midt i prosjekthistorien. Den faste knappen er tilgjengelig også mellom kontaktpunktene. |
| Høy | Brødtekst og hele kontaktkortet startet usynlig under animasjon. | Brødtekst og kontakt er umiddelbart lesbare. Kortere innfading på overskrifter og bilder. |
| Middels | Tidligere firmaprofil i kontaktfoto. | Nytt Henrik-portrett hentet fra virksomhetens egen Om oss-side etter brukerens bestilling. |
| Middels | E-postlenken ga lite hjelp til å komme i gang. | Prosjektrelevant emne og en kort utfyllbar starttekst. Valgfri forklaring på hva kunden kan ta med. Ingen krav om ferdige tegninger. |
| Middels | Små kontakt- og navigasjonsflater på mobil. | Telefon/e-post har store trykkflater. Fast mobilkontakt har sikker avstand til skjermkanten. Smal bredde testet. |
| Middels | To skrifttyper ble lastet via CSS-import, selv om bare Inter ble brukt. | Fjernet ubrukt skrifttype og CSS-import. Skriftlenke med swap og preconnect i dokumenthodet. |
| Middels | Bildene kunne bare åpnes ett av gangen. | Galleri med forrige/neste, teller og piltaster. Fokus returnerer til åpneren. Bakgrunnsskrolling låses mens galleriet er åpent. |
| Middels | Flere designklasser kunne være aktive samtidig. | Kun valgt designretning er aktiv, så variantene ikke arver tilfeldige regler fra hverandre. |
| Middels | Hurtiglagrede filer hadde tidligere gitt blanding av gammel og ny visning. | Nye versjonsnavn på CSS og JavaScript ved publisering. |

## Kontroller

- 320 px: ingen vannrett overløp, fast kontakt innenfor skjermbredden, all brødtekst synlig uten å vente på animasjon.
- 390 px: kontaktknappen lander med portrett, navn, telefon og e-post synlig; knappen dekker ikke disse handlingene.
- Desktop: fast kontakt og kontaktanker testet.
- Designvariant B og C: korrekt klasse og fungerende kontakt/galleri kontrollert.
- Galleri: neste bilde, bildeteller, lukking og tilbakeføring av fokus kontrollert.
- Lokale bilde-, stil- og skriptreferanser kontrollert uten manglende filer.
- Redusert bevegelse: implementert i CSS og JavaScript; all vesentlig informasjon er tilgjengelig uten animasjon.

## Viktig for neste fase

Det finnes ikke trafikk- eller henvendelsesdata for å fastslå en konverteringsforbedring. Prototypen har fortsatt ingen aktiv analyseintegrasjon. Ved ordinær lansering bør kontaktklikk, telefonklikk, e-postklikk og faktisk mottatte/kvalifiserte henvendelser vurderes samlet. Et klikk er ikke det samme som en ny kunde.

Fiktive prosjektbilder og noindex er beholdt fordi dette fortsatt er et designutkast. Ekte prosjektbilder og godkjent innhold må vurderes før utkastet blir ordinære referansesider på eiken-bygg.no.

Portrettkilde: https://eiken-bygg.no/byggmesterfirma-eiken-bygg/
Bildefil: https://eiken-bygg.no/wp-content/uploads/2025/04/DSC02765.webp
