# Jot.js

A small  lib like jQuery (vaguely resembles)

Put in your `<head>` this:

```html
<script src="jot.min.js"></script>
```

Usage:

Property | description
--- | ---
 `Jot.qs(selector [, context])` | return a single element
 `Jot.qsa(selector [, context])` | return a NodeList
 `Jot.ready(callback)` | equivalent to jQuery.ready(callback), $(callback), trigger callback when DOM is loaded
