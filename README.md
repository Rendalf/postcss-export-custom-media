# PostCSS Export Custom Media <img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">

PostCSS Export Custom Media lets you export [custom media queries](https://github.com/postcss/postcss-custom-media) from CSS to
JavaScript by `:export` selectors.

## Installation

```console
$ yarn add postcss-custom-media
```

or

```console
$ npm install postcss-custom-media
```


## Usage

```css
:root {
  @custom-media --medium (min-width: 1024px);
}

:export {
  _mediumQuery: export-custom-media(--medium);
}

.foo {
  width: 100%;
  @media (--medium) {
    width: 80%;
  }
}
```

you will get:

```css
:root {
  @custom-media --medium (min-width: 1024px);
}

:export {
  _mediumQuery: (min-width: 1024px);
}

.foo {
  width: 100%;
  @media (--medium) {
    width: 80%;
  }
}
```
