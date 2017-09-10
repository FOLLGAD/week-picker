# week-picker
## Requirements
* [jQuery](https://jquery.com/)
* [moment.js](https://momentjs.com/)

## Initialize a picker
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

## Demos
[Here](https://follgad.github.io/week-picker)
