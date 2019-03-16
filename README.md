# janosfoldes/hide-on-scroll

You can use this JavaScript + CSS compontent to hide/appear HTML elements (e.g. site header or navigation bar) on vertical scrolling.

- When you are at the top of the page, the element is visible.
- When you scroll down the page, the element disappears.
- When you start to scroll upwards, the element appears.
- When you stop scrolling up, the element disappears again after a while (except at the top of the page).

## Getting Started

### 1. Get Hide on Scroll

- Via direct download from [https://github.com/janosfoldes/hide-on-scroll](https://github.com/janosfoldes/hide-on-scroll)
- Via git: `git clone https://github.com/janosfoldes/hide-on-scroll.git`
- Via NPM: `npm i https://github.com/janosfoldes/hide-on-scroll.git`

### 2. Include JavaScript and CSS files in your HTML `<head>` element

```html
<link href="<your-libs-directory>/hide-on-scroll.min.css" rel="stylesheet" type="text/css">
<script src="<your-libs-directory>/hide-on-scroll.min.js"></script>
```

### 3. Add markup

Add the `hide-on-scroll` class to the desired HTML element.

```html
<div class="hide-on-scroll">
```

### 4. Initialize Hide on Scroll

```javascript
var hideOnScroll = new HideOnScroll();
```

## Example

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
    <link href="/path/to/hide-on-scroll.min.css" rel="stylesheet" type="text/css">
    <script src="/path/to/hide-on-scroll.min.js"></script>
</head>
<body>
    <div class="hide-on-scroll">
        <h2>Element to hide</h2>
    </div>

    ...

    <script>
        var hideOnScroll = new HideOnScroll();
    </script>
</body>
</html>
```

You can find an example in the "examples" folder: [https://github.com/janosfoldes/hide-on-scroll/tree/master/examples](https://github.com/janosfoldes/hide-on-scroll/tree/master/examples)  
To run the example see the "Node Package" section of this readme.

## Customizing Hide on Scroll

### Options object

You can give an options object when you initialize Hide on Scroll from JavaScript.

```javascript
var hideOnScroll = new HideOnScroll({
    delay: 1000,
    position: 60
});
```

#### delay

- Type: `number`
- Default: `2000` (2 seconds)

The amount of the delay in milliseconds before hiding an element.

#### position

- Type: `number`
- Default: `0` (top of the page)

The vertical position in pixels where elements become hidden, when you scroll down the page.

### HTML attributes

You can set options via HTML `data-hide-…` attributes. These settings are only applied on the given HTML element, and override inherited options.

```html
<div class="hide-on-scroll" data-hide-delay="100" data-hide-position="60">
```

#### data-hide-delay

Corresponds to the `delay` option.

#### data-hide-position

Corresponds to the `position` option.

## CSS Classes

### `.is-locked`

You can lock the element with the `is-locked` CSS class. This feature is for programmatically purposes especially, when multiple elements work together.

```html
<div class="hide-on-scroll is-locked">
```

## Node Package

### Requirements

1. Install [Node.js](https://nodejs.org/en/)
2. Install Gulp and Gulp CLI: `npm i -g gulp gulp-cli`

### Installing Node package

`npm i https://github.com/janosfoldes/hide-on-scroll.git`

### Running the example

1. `gulp example`

### Building Hide on Scroll

1. `npm i`
2. `gulp build`

Builded component folder: **dist/**
