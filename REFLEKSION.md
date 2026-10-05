# Refleksion – Figma til kode

**Gruppemedlemmer: Caroline Hemmingsen & Camille Oddershede**

## Sådan bruger I filen

Skriv jeres fælles refleksion direkte i denne fil. Erstat hjælpeteksterne med jeres egne erfaringer, og slet Markdown-guiden og demoen inden aflevering. Skriv kort og konkret, og brug eksempler fra jeres egen kode.

Åbn forhåndsvisningen i VS Code med **Cmd + Shift + V** (Mac) eller **Ctrl + Shift + V** (Windows). Så ser I, hvordan Markdown bliver vist. På GitHub vises formateringen automatisk, når I åbner filen.

### Mini-guide til Markdown

- `# Titel` er dokumentets hovedoverskrift. Brug kun én.
- `## Afsnit` og `### Underafsnit` giver overskrifter i flere niveauer.
- `**vigtig tekst**` bliver til **vigtig tekst**.
- En bindestreg efterfulgt af et mellemrum laver en punktopstilling som denne.
- Skriv kode inde i en sætning mellem enkelte backticks, fx `getTeamMembers()`.
- Links skrives sådan: `[Astros dokumentation](https://docs.astro.build/)`.
- Lav et nyt afsnit med en tom linje. Brug også en tom linje før og efter lister og kodeblokke.

En kodeblok starter og slutter med tre backticks. Skriv sproget efter de første, fx `js`, `css`, `html` eller `astro`. Se et eksempel i filens kildekode nedenfor.

### Kort demo – sådan kan tekst, kode og link kombineres

> Dette er et opdigtet eksempel på formen, ikke en færdig refleksion eller et ekstra krav.

Vi flyttede datahentningen til en fælles funktion, så endpointet kun skal vedligeholdes ét sted.

```js
export function getServices() {
  return apiFetch("https://ftk-api.pages.dev/services");
}
```

I komponenten kalder vi `getServices()`. Vi kontrollerede, at de samme servicetitler blev vist før og efter ændringen. Næste skridt er at undersøge, hvad der sker, hvis API'et returnerer en fejl.

Reference: [Datahentning i Astro](https://docs.astro.build/en/guides/data-fetching/).

---

## Eksempel 1: Dekorative gule streger

### Hvor og hvorfor?

Den gule streg endte med at blive en udfordring selvom vi tidligere havde gennemgået teknikken i undervisningen. Eksemplet fra undervisningen virkede ikke som ventet i projektet. I komponenten `src/components/SectionHeading.astro` kunne vi ikke få enheden `1cap` til at virke.

### Relevant kode

Efter flere forsøg, fandt vi en løsning.

Eksempel fra undervisning

```css
top: calc(anchor(--title top) + 1cap);
margin-top: 3px;
height: var(--underline);
```

Vores løsning

```css
top: calc(anchor(bottom));
margin-top: var(--offset);
height: var(--underline);
```

### Afprøvning og ændringer

- **Vi testede:** Vi startede med at implementere eksemplet fra undervisningen i vores egen løsning. Værdierne blev ændret til at passe vores eksempel.
- **Vi observerede:** Ved brug af eksemplet fra undervisningen, kom stregen i `::before` aldrig til at passe helt med linjen under teksten. Den varierede altid en del, og det så ud til at `1cap` ikke havde nogen effekt.
- **Vi ændrede eller mangler:** I stedet for `1cap` fandt vi en løsning kun med `var`.

## Eksempel 2: Skriv navnet på et valgt benspænd

Brug samme struktur som i eksempel 1: Hvor og hvorfor? Relevant kode. Afprøvning og ændringer.

## Eksempel 3: Skriv navnet på et valgt benspænd

Brug samme struktur som i eksempel 1: Hvor og hvorfor? Relevant kode. Afprøvning og ændringer.

## Fallback og robusthed

Dette må gerne indgå i de tre eksempler ovenfor. Hvis det allerede er dækket dér, kan I slette dette afsnit.

- **Fallback/progressive enhancement:** Beskriv mindst ét konkret eksempel. Hvad oplever brugeren med og uden understøttelse? Link til dokumentation for den valgte feature, og angiv de browsere og versioner, I har testet.
- **Defensive CSS:** Vis et konkret eksempel på, hvordan løsningen håndterer fx lang tekst eller lidt plads.
- **Global CSS og komponent-CSS:** Forklar kort, hvad I har placeret hvor, og hvorfor.

## Brug af AI

Hvis I har brugt AI til en væsentlig del af løsningen, så beskriv kort:

- Hvad brugte I den til?
- Hvad ændrede eller fravalgte I i svaret?
- Hvad lærte I, og hvordan kontrollerede I løsningen?

Hvis I ikke har brugt AI, kan I blot skrive det. I skal ikke indsætte en komplet chatlog.
