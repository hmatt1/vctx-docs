---
title: Types & Literals
description: Primitive types, inference, and literal formats.
---

## Primitive Types

Primitive types are built into vctx. N can be any counting number (positive integers). `N` is always read with base 10.

`uN`: Unsigned integer of width N (`u1`, `u16`, etc)  
`sN`: Signed integer of width N  (`s1`, `s16`, etc)
`bool`: Boolean value (`true` or `false`)  

Booleans are essentially like using a `u1`, but it can be more readable to write code using `true` or `false` instead of `0` or `1`.
Either way, you only need 1 bit to represent a boolean.

## Literals

### Type Inference

Literals are always untyped, and inferred from context.

```vctx
42
0xFF
```

Examples:

```vctx
wire x: u8 = 42       // OK: inferred as u8
wire z: u16 = 42      // OK: inferred as u16
wire z: u16 = 42 as u8      // NOT OK: casting using `as` will change 42 to a u8
```

### Number Formats

Decimal: 123, 1_000
Hex: 0xFF, 0x10_FF
Binary: 0b1011, 0b1100_0011
Boolean: true, false
String: "Text" (mostly for print debugging)