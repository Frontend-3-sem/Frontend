# Refleksion – Figma til kode

**Gruppemedlemmer: Caroline Hemmingsen & Camille Oddershede**

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

## Eksempel 2: Greenbox component

### Hvor og hvorfor?

Vi skulle tilføje content box bag vores image. For at gøre det nemmere at implementere det på komponenterne, valgte vi at bruge moderne `attr()` med `width`, `height` og `location` i komponenten `src/components/GreenBox.astro`. Pga. denne funktion er så ny i browserne, virkede den endnu ikke i Safari.

### Relevant kode

Efter en del research, fandt vi en mulighed

Dette var syntaksen, som Safari ikke kunne håndtere.

```css
figure::before {
  width: attr(data-width type(<length>), var(--size));
  height: attr(data-height type(<length>), var(--size));
}
```

Fallback til browsere, der ikke understøtter syntaksen.
Komponenten sætter `--width` og `--height` der er tilføjet som inlinestyle i Figure.

```css
@supports not (width: attr(data-width type(<length>), 1px)) {
  figure::before {
    width: var(--width, var(--size));
    height: var(--height, var(--size));
  }
}
```

### Afprøvning og ændringer

- **Vi testede:** Vi åbnede siden i Chrome, Safari og Firefox med `<GreenBox width="11rem" height="10rem" location="top-left">`.
- **Vi observerede:** I Chrome fik boksen den rigtige style, da `type` virker i den browser. I Safari blev `width` og `height` ugyldige i inspect. Så boksen var ikke synlig på siden.
- **Vi ændrede eller mangler:** Vi fik aldrig fikset problemet i den afleverede kode, men ved at bruge `@supports not` og `CSS-variabler` kan vi løse problemet, så boksen også får en størrelse i Safari.

Reference: [Supports attr()](https://css-tricks.com/almanac/rules/s/supports/).

## Eksempel 3: API fetch

### Hvor og hvorfor?

Vi skulle fetche en masse data fra forskellige API'er til vores side. Vi havde i starten problemer med at få hentet dataene korrekt, og derfor undersøgte vi, hvordan vi kunne hente data fra API'et og bruge det dynamisk i vores Astro-komponenter.

### Relevant kode

Det var især `getValue` der fik løst vores problem. Ved at lave funktionen i lib, kunne vi hente den ind til vores komponent ved at tilføje `export`.

```js
export function getValue() {
  return apiFetch("https://ftk-api.pages.dev/core-values");
}
```

I dette eksempel brugte vi vores getValue()-funktion til at hente data om vores core values:

```js
---
import { getValue } from "@lib/api";
import Section from "@components/basics/Section.astro";
import SectionText from "@components/basics/SectionText.astro";
import CoreValueCard from "@components/cards/CoreValueCard.astro";
import Button from "@components/basics/Button.astro";
const { theme = "muted" } = Astro.props;
const ValueData = await getValue();
const { title, subtitle, eyebrow, values } = ValueData;
---

<Section class="section" theme={theme}>
  <div>
    <SectionText title={title} subtitle={subtitle} eyebrow={eyebrow} />
    <Button variant="primary" href="#0" titleleft="Get in touch" />
  </div>
  <div class="CoreValue">
    {values.map((card) => <CoreValueCard {...card} />)}
  </div>
</Section>
```

Vi har lavet en separat komponent til CoreValueCard.
Den modtager dataen gennem `Astro.props`, som vi kan tilføje i vores HTML-struktur.
Det gør at dataen er adskilt fra det specifikke card.

```js
---
import DynamicIcon from "@components/helpers/DynamicIcon.astro";
import Arrowright from "@icons/arrow--right.svg";

const { title, icon, description, link } = Astro.props;
---

<article class="card card-layout">
  <div>
    <DynamicIcon name={icon} />
    <h4>{title}</h4>
    <p>{description}</p>
    <a href={link.url}><span><p>{link.text}</p></span><Arrowright /></a>
  </div>
</article>
```

### Afprøvning og ændringer

- **Vi testede:** Vi testede, om `getValue()` kunne hente data fra API'et, og om dataene blev vist korrekt på siden. Vi kontrollerede også, om de forskellige core values blev oprettet som cards med den rigtige titel, beskrivelse, ikon og link.
- **Vi observerede:** Vi observerede, at API-dataene blev hentet og vist dynamisk gennem `values.map()`. Det betød, at vi ikke selv skulle oprette hvert card, men at cards automatisk blev lavet ud fra det data, API'et returnerede. Vi kunne også se, at Astro.props gjorde det muligt at sende dataene videre til vores `CoreValueCard`.
- **Vi ændrede eller mangler:** Vi ændrede vores løsning, så API-fetchingen blev samlet i `getValue()` i vores `lib-mappe`. På den måde kunne vi importere funktionen i komponenten og genbruge den. Vi opdelte også cardet i en separat komponent, så datahentningen og selve visningen af cardet er adskilt. Vi manglede dog stadig fejlhåndtering, hvis API'et ikke svarer eller ikke returnerer det forventede data. En mulig løsning kunne være at bruge et af de andre API'er i projektet som fallback, da det indeholder de nødvendige data. Derudover lidt mere research på hvordan man ellers kunne håndtere den del.

Reference: [Datahentning i Astro](https://docs.astro.build/en/guides/data-fetching/).

- **Defensive CSS:** Vi har brugt `max-width` for at sikre, at teksten ikke bliver for bred på større skærme. Fx: `max-width: 65ch;`
  På den måde forbliver teksten læsbar, selv hvis der kommer mere indhold på siden.

- **Global CSS og komponent-CSS:** I den globale CSS har vi samlet variabler til `font-size`, som bruges på de tilhørende elementer:

```css
h1 {
  font-size: var(--h1-size);
}
```

Vi nulstillede også linkfarven med `a { color: inherit; }`, så links ikke bliver lilla efter brugeren har besøgt siden.

I komponent-CSS har vi fx. valgt at `style` vores greenbox i vores komponent `GreenBox.astro`. Det gør det nemmere at indsætte komponentet til den valgte side og undgå `style` på pages.

## Brug af AI

Hvis I har brugt AI til en væsentlig del af løsningen, så beskriv kort:

- Hvad brugte I den til? Den blev mest brugt til at få forklaret systemer og teknikker, som vi havde svært ved at forstå.
- Hvad ændrede eller fravalgte I i svaret? Den var ikke særlig nyttig til vores konkrete Astro-projekt, så det meste af den foreslåede kode blev fravalgt.
- Hvad lærte I, og hvordan kontrollerede I løsningen? Vi droppede at bruge AI direkte til koden og prøvede i stedet forskellige metoder af, indtil vi fandt løsninger, der virkede i vores projekt.
