# initSnow.js

Simple JavaScript snowfall effect. No libraries required.

---

## How to use

### Basic Initialization

```javascript
initSnow({
  enabled: true
});
```

Start snow effect with default settings.

---

### Make it responsive

```javascript
initSnow({
  enabled: true,
  responsive: {
    1279: { maxFlakes: 100 },
    767: { enabled: false }
  }
});
```

Snowflakes settings change based on screen width.  
Under `767px`, snow will be disabled.

---

### Allow snow only on specific pages

```javascript
initSnow({
  enabled: true,
  classBody: {
    allow: ['home-page']
  }
});
```

Snow will run **only if** `<body>` has the `home-page` class.

---

### Disable snow on specific pages

```javascript
initSnow({
  enabled: true,
  classBody: {
    reject: ['no-snow', 'profile-page']
  }
});
```

If `<body>` has `no-snow` or `profile-page`, snow will **not** start.

---

### Customize snowflakes

```javascript
initSnow({
  enabled: true,
  maxFlakes: 300,
  maxSize: 14,
  minSpeed: 3,
  maxSpeed: 10
});
```

Change how many flakes, how big, and how fast they fall.

---

### Enable debug (show settings in console)

```javascript
initSnow({
  enabled: true,
  debug: true
});
```

Use `debug: true` to print current settings in console for testing.

---

## Default settings

```javascript
{
  id: "snow",
  enabled: false,
  maxFlakes: 200,
  maxSize: 10,
  minSpeed: 5,
  maxSpeed: 15,
  debug: false,
  classBody: {
    allow: [],
    reject: []
  },
  responsive: {}
}
```

# 🎄 Quick Example

```html
<script src="snow.js"></script>
<script>
  initSnow({
    enabled: true,
    classBody: { 
      allow: ['landing-page'] 
    },
    responsive: {
      1024: { 
        maxFlakes: 80 
      },
      600: { 
        enabled: false 
      }
    }
  });
</script>
```
