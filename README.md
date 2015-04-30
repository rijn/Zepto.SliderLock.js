# Zepto.SliderLock.js

Slider Lock is a light weight plugin to simulate slider lock mechanism for you hybrid app or for a website.

## Quick start

Include Zepto and Zepto.SliderLock.js to your page.

```
<script src="zepto.js"></script>
<script src="Zepto.SliderLock.js"></script>
```

Than with simple initialization you have your slider lock.

```
var sliderlock = new SliderLock("#sliderContainer");
```

## Settings and Defaults

```
defaults = {
    color: '#dfdfdf',
    secondaryColor: '#64bd63',
    radius: 10,
    containerHeight: 40,
    containerWidth: 200,
    barWidth: 50,
    barMargin: 3,
    triggerDistance: 30,
    magnet: true
};
```

* `color`: color of the container.
* `secondaryColor`: color of the slider bar.
* `radius`: radius of the container and the bar.
* `containerHeight`: the height of the container.
* `containerWidth`: the width of the container.
* `barWidth`: the width of the slider bar.
* `barMargin`: margin of the slider bar. (barHeight + barMargin * 2 == containerHeight)
* `triggerDistance`: if the distance is close to the arrival, it will return true.
* `magnet`: the bar will attach to the arrival if the option is true.

## Methods

### Enable && Disable

Use the method to make your slider lock active or inactive.

```
sliderlock.enable();
sliderlock.disable();
```

## Subscribe

After subscribing, the function will be called when the event happens.

### init

The function will be called when the DOM be ready.

```
var sliderlock = new SliderLock("#sliderContainer", {
    init: function() {
            console.log("DOM is ready, do something...");
        },
    });
```

### trigger

The function will be called when the bar firstly be dragged to the arrival.

```
sliderlock.trigger = function() {
    console.log("The bar was dragged to the arrival firstly.");
};
```

### arrival

The function will be called when the bar be released at the arrival.

```
var sliderlock = new SliderLock("#sliderContainer", {
    arrival: function() {
            console.log("do something...");
        },
    });
```

### failed

The function will be called when the bar be released at the rest of the container.

```
var sliderlock = new SliderLock("#sliderContainer", {
    failed: function() {
            console.log("failed...");
        },
    });
```

## Copyright && License

Code and documentation copyright 2015 Rijn, pixelnfinite.com. Code released under the MIT license.

