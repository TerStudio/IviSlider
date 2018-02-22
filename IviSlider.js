export default class IviSlider {

    constructor(idName, settings) {

        this.header = document.getElementById('header');
        this.area = document.getElementById(idName);
        this.sliderClass = 'ivislider';
        this.array = [];

        if (settings instanceof Object) {
            if (settings === undefined) {
                this.settings = {};
            }
            else {
                this.settings = settings;
            }
        }
        else {
            this.settings = {};
        }
    }

    init() {

        this.area.classList.add(this.sliderClass);
        this.getJSON();
        let el = this;
        window.onresize = function () {
            el._sliderHeight();
        };

    }


    getJSON() {

        let _self = this;
        let defaultLanguage = this._defaultSettings().language;
        let langPrefix = document.documentElement.lang == defaultLanguage ? '' : '/' + document.documentElement.lang;

        fetch(langPrefix + '/rest/api/slider', {credentials: 'include'})
            .then(function (response) {
                return response.json();
            }).then(function (json) {
console.log(json);
            _self._buildSlides(json)

        }).catch(function (ex) {
            console.log('parsing failed', ex);
        })


    }


    _defaultSettings() {

        let defaultSettings = {
            titleClass: 'h2',
            height: 0.5,
            bottomOffset: 0,
            headerHeight: this.header.clientHeight,
            imageLayer: false,
            slideSpeed: 6000,
            language: 'en'
        };

        if (this.settings !== undefined) {
            for (var key in defaultSettings) {
                if (defaultSettings.hasOwnProperty(key)) {
                    if (this.settings.hasOwnProperty(key)) {
                        if (this.settings[key] != defaultSettings[key]) {
                            defaultSettings[key] = this.settings[key];
                        }
                    }
                }
            }
        }
        return defaultSettings;
    }

    _buildSlides(elements) {

        for (let i = 0; i < elements.length; i++) {
            let slideItem = document.createElement('div');
            slideItem.classList.add(this.sliderClass + '__item');
            slideItem.classList.add(this.sliderClass + '__item-' + (i + 1));
            let slideTitle = document.createElement('div');
            slideTitle.classList.add(this.sliderClass + '__title');
            slideTitle.classList.add(this.sliderClass + '__title-' + (i + 1));
            this.area.appendChild(slideItem);
            this.area.appendChild(slideTitle);
            slideTitle.appendChild(document.createTextNode(elements[i]['text']));
            slideTitle.classList.add(this._defaultSettings().titleClass);
            if (this._defaultSettings().imageLayer == true) {
                let layer = document.createElement('div');
                layer.classList.add('ivislider__layer');
                slideItem.appendChild(layer);
            }
        }

        this._sliderHeight();
        this._firstSlide();
        this._runSlider(elements);
        this._addBackgrounds(elements);
    }

    _sliderHeight() {

        document.getElementsByClassName(this.sliderClass)[0].style.height = (window.innerHeight * this._defaultSettings().height) - this._defaultSettings().headerHeight - this._defaultSettings().bottomOffset + 'px';
    }

    _addBackgrounds(elements) {

        for (let i = 0; i < elements.length; i++) {
            let slide = document.getElementsByClassName(this.sliderClass + '__item-' + (i + 1));
            slide[0].style.backgroundImage = 'url(' + elements[i]['src'] + ')';
            slide[0].style.backgroundSize = 'cover';
        }
    }

    _firstSlide() {
        let firstSlide = document.getElementsByClassName(this.sliderClass + '__item-1');
        let firstTitle = document.getElementsByClassName(this.sliderClass + '__title-1');
        firstSlide[0].style.opacity = 1;
        firstSlide[0].style.zIndex = 1;
        firstTitle[0].style.zIndex = 1;
        firstTitle[0].style.opacity = 1;
        firstSlide[0].style.animationName = 'zoomIn';
        firstSlide[0].style.animationDuration = 15 + 's';
        firstSlide[0].style.webkitAnimationDuration = 15 + 's';
        firstSlide[0].style.animationFillMode = 'both';
        firstSlide[0].style.webkitAnimationFillMode = 'both';
    }

    _runSlider(elements) {

        var i = -1;
        let speed = this._defaultSettings().slideSpeed;

        let count = elements.length;
        let elClass = this.sliderClass;
        var x = setInterval(function () {
            i++;

            var activeSlide;
            var prevSlide;
            var activeTitle;
            var prevTitle;

            if (i === 0) {
                activeSlide = document.getElementsByClassName(elClass + '__item-2');
                prevSlide = document.getElementsByClassName(elClass + '__item-1');
                activeTitle = document.getElementsByClassName(elClass + '__title-2');
                prevTitle = document.getElementsByClassName(elClass + '__title-1');
            }

            if ((i !== 0) && (i !== (count - 1))) {
                activeSlide = document.getElementsByClassName(elClass + '__item-' + (i + 2));
                prevSlide = document.getElementsByClassName(elClass + '__item-' + (i + 1));
                activeTitle = document.getElementsByClassName(elClass + '__title-' + (i + 2));
                prevTitle = document.getElementsByClassName(elClass + '__title-' + (i + 1));
            }

            if (i === (count - 1)) {
                activeSlide = document.getElementsByClassName(elClass + '__item-1');
                prevSlide = document.getElementsByClassName(elClass + '__item-' + (i + 1));
                activeTitle = document.getElementsByClassName(elClass + '__title-1');
                prevTitle = document.getElementsByClassName(elClass + '__title-' + (i + 1));
                i = -1;
            }

            setTimeout(function () {
                prevSlide[0].style.opacity = 0;
                prevSlide[0].style.zIndex = 0;
                prevTitle[0].style.opacity = 0;
                prevTitle[0].style.transition = 'opacity 1.5s ease-in-out';
                prevTitle[0].style.webkitTransition = 'opacity 1.5s ease-in-out';
                prevTitle[0].style.mozTransition = 'opacity 1.5s ease-in-out';
                prevTitle[0].style.zIndex = 0;
                prevSlide[0].style.animation = 'none';
            }, 750);

            setTimeout(function () {
                activeSlide[0].style.opacity = 1;
                activeSlide[0].style.zIndex = 1;
                activeTitle[0].style.zIndex = 1;
                activeTitle[0].style.opacity = 1;
                activeTitle[0].style.transition = 'opacity 2.5s ease-in-out';
                activeTitle[0].style.webkitTransition = 'opacity 2.5s ease-in-out';
                activeTitle[0].style.mozTransition = 'opacity 2.5s ease-in-out';
                activeSlide[0].style.animationName = 'zoomIn';
                activeSlide[0].style.animationDuration = 15 + 's';
                activeSlide[0].style.webkitAnimationDuration = 15 + 's';
                activeSlide[0].style.animationFillMode = 'both';
                activeSlide[0].style.webkitAnimationFillMode = 'both';
            }, 450);

        }, speed);
    }

}