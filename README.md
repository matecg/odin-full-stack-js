# Odin Project: Full Stack JavaScript Developer Curriculum

> 📅 **Start date**: 28/02/2026

This repository contains my coding exercises and examples from the Full Stack Developer curriculum from Odin Project focused on JavaScript. Bigger projects are separated on their own repositories.

The following sections contain some overall important notes about the content that was presented during the curriculum.

## Projects

Soon...

## Intermediate HTML and CSS

### CSS Reset/Normalization

> 🔗 [Lecture link](https://www.theodinproject.com/lessons/node-path-intermediate-html-and-css-default-styles)

Normalization, which promotes similar behaviors to different browsers, nowadays, seems to have lost some of the importance from before. Browsers have come a long away adapting their internal processing for HTML and CSS to a point that now only the most recent feature might face some differences.

Reset on the other hand still very relevant, but some-what personal choice, since most reset style sheets are considered opinionated. In essence, reset CSS will remove some or all default styling that browsers natively apply to HTML tags. On this subject, Josh Comeau had created and shared an awesome boilerplate reset that strike fundamental changes only, in an elegant minimalistic style!

#### Josh's Custom CSS Reset

```CSS
/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/

*, *::before, *::after {
  box-sizing: border-box;
}

*:not(dialog) {
  margin: 0;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
}
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

#root, #__next {
  isolation: isolate;
}
```

### Typography

> 🔗 [Lecture Link](https://www.theodinproject.com/lessons/node-path-intermediate-html-and-css-more-text-styles)

Typography can become very complex, specially when considering different languages which require all sorts of adaptations and special font characters. Fonts can be very heavy and require some time in other to be loaded, causing flash effects to the users or, when not properly configured, broken style.

Wrapping a text with an ellipse is something that was very interesting, even though in terms of accessibility not much advisable, but still, here's how to achieve it:

```CSS
/* Considered the old way of achieving it */
.overflowing {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Modern approach using line-clamp */
p {
  width: 300px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

Regarding `font-size` there's a nice usage from this [web.dev article](https://web.dev/learn/design/typography) that uses relative units, in this case `rem` as well as `vw` to create an adaptive size for HTML text.

In order to avoid text growing to much a second version was designed using the CSS function `clamp`, the first and last values passed to the function represent the maximum and minimum this function will accept and the middle value contains the "rule" that will be used to change the font size. Both can be seen in the code snippet that follows.

```CSS
html {
    /* Simple sizing */
    font-size: calc(0.75rem + 1.5vw);

    /* Size using clamp function */
    font-size: clamp(1rem, 0.75rem + 1.5vw, 2rem);
}
```

Another interesting property brought by the same web.dev article was `max-inline-size` that will, if properly configured with the character unit `ch`, guarantee the maximum size of a line of text, like so:

```CSS
article {
  max-inline-size: 66ch;
}
```