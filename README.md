# week-picker
# Requirements
* [jQuery](https://jquery.com/)
* [moment.js](https://momentjs.com/)

# Initialize a picker
``` html
<div class="week-picker"></div>
```
All elements with `class="week-picker"` are automatically initialized.
`$(elem).weekPicker("init")` for manual init.
``` html
<div class="week-picker" data-locale="se"></div>
```
Localization is supported for `se` and `en`. Defaults to `en`.
``` html
<div class="week-picker" data-mode="single"></div>
```
The possible modes are `multi` and `single`. Defaults to `multi`.

# Usage

## Value

``` js
$(elem).weekPicker("value")
// [ "2017-01-09", "2017-01-16", "2017-02-13", "2017-02-27", "2017-03-20", "2017-05-22", "2017-05-29", ... ]
```

Returns the date of every weeks monday in format YYYY-MM-DD

## Clear

``` js
$(elem).weekPicker("clear")
```

Clears the picker programmatically (same as pressing "clear")

## Demo
[Here](https://follgad.github.io/week-picker)