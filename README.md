ivislider
-------

_"IviSlider" creates responsive and light-weight slider than can be easily customized. One slide smartly changes another with a little ZoomIn effect. No jQuery!_

#### Description

* IviSlider is a responsive and lightweight customizable slider. You can easily change size, class of title, speed and overlaz for images.
* No jQuery is required.
* Accepts images src and slide titles in json format.
* You can set the height of slider that depends on screen size
* The slider changes size by wondow reize

#### Package Managers

##### NPM

```sh
npm install ivislider
```

#####Usage

Just import Class (for example in the js code that you bundle later with webpack):

```html
import IviSlider from './ivislider/IviSlider';
```

Add a link to css file in your `<head>`:

```html
<link rel="stylesheet" type="text/css" href="<PATH TO FILE>/ivislider/ivislider.css" media="all">

```

Add empty div with custom class in any place of your html code, for example in footer of the page.

```html
<div class="frontslider"></div>
```

Finally "tell" IviSlider in what element it should be used and add options if necessary
```html
import IviSlider from './ivislider/IviSlider';
var sliderAct = new IviSlider('frontslider');
sliderAct.init();
```

Customize the panel if you want to:
```html
import IviSlider from './ivislider/IviSlider';
var sliderAct = new IviSlider('frontslider', {
    titleclass: 'h1',
    height: 1,
    bottomOffset: 30,
    imageLayer: true,
    slideSpeed: 7000
});
sliderAct.init();
```

### JSON
By address '/rest/api/slider' should be accessible JSON:
    [
        0 => [
            'src' => 'Image src 1',
            'text' => 'Slide title 1'
        ],
        1 => [
            'src' => 'Image src 2',
            'text' => 'Slide title 2'
        ],
        2 => [
            'src' => 'Image src 3',
            'text' => 'Slide title 3'
        ],
    ];

### Site Header
The header must have ID = "header"

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
bottomOffset | integer | 0 | Defines the distance between slider bottom and window bottom
height | integer | 0.5 | Part of screen that should be the height of slider with a deduction of header Height (for example: use 1 if you want to have fullscreen slide)
titleclass | string | 'h2' | Class of title of each slide
language | string | 'en' | Prefix of default language (important for multilanguage sites)
imageLayer | boolean | false | defint if you want to have a transparent black overlay between image and title
slideSpeed | integer | 0 (ms) | Defines the speed of slides change

#### Browser support

IviSlider works on IE8+ in addition to other modern browsers such as Chrome, Firefox, and Safari.

#### License

Copyright (c) 2018 tstudio

Licensed under the MIT license.
