---
title: Casting
description: Converting between types using explicit casts.
---

## The as Keyword

vctx is a strongly typed language. To convert between types (for example, between integer widths), you use the `as` keyword.

### Syntax

The syntax is basically this: expression `as` type

## Examples

```vctx
// Converting a u8 register to a boolean output
reg state: u8 = 0
led := state as bool

// Resizing logic (example generic usage)
wire val: u32 = ~0
wire foo: u16 = concat(0 as u4, val[11..0])
```

## Unsigned casting

### How does casting truncate values?

Let's start with adding two `u8` values together.

```
wire a: u8 = 70
wire b: u8 = 71
wire result: u9 = a + b
// result is 141
```

Notmally, two u8 values added together becomes a u9. The vctx compiler will error if the widths don't match.

But, if we do want the value of `result` to overflow, we can use a cast.

```
wire a: u8 = 70
wire b: u8 = 71
wire result: u8 := (a + b) as u8
// result is 14
```

When casting to a smaller value, vctx will truncate the most significant bits.

The purpose of this language design is to keep you safe from implicitly changing widths, and make the widths clearly readable when looking at vctx code.

### 0-bit extending

When casting from a smaller width to a larger width, the value will be extended with zeros in the most significant bits.

```
wire a: u2 = 0b11
wire result: u4 = a as u4
// result is 0b0011
```

When changing to a larger width, the value will always remain the same.

## Signed casting

### Converting unsigned to signed

TODO!!! have AI add more examples in this style:

Unsigned numbers are always positive, so casting with keep the same value.

```
wire a: u2 = 2
wire result: s3 = a as s3
// result is still 2
```

### Converting signed to unsigned

Casting will first truncate the sign bit.

```
wire a: s3 = -2
wire result: u2 = a as u2
// the value of result is 2
```

And then truncate the most significant bits.


```
wire a: s4 = -7
wire result: u3 = a as u2
// the value of result is 2
```


