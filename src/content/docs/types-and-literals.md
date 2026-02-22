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

This means you can work with numbers the way you expect, and the compiler will tell you if something is wrong.

Examples:

```vctx
wire a: u8 = 42       // OK: inferred as u8
wire b: u16 = 42      // OK: inferred as u16
wire c: u16 = 42 as u8      // NOT OK: casting using `as` will change 42 to a u8
wire d: u1 = 42 // NOT OK: you need at least 6 bits to store the value 42
```

Numbers will retain their sign, and be extended with zeros automatically to retain the same value.

### Literal Formats

When using literals, vctx supports common formats for defining numeric values.
Literals will have the same behavior, regardless of what syntax or formatting you use.
Underscores get ignored, but can be useful for formatting code.

**Decimal:** `123`, `1000`, `1_000`  
**Hex:** starts with `0x`, like `0xFF`, `0x10_FF`  
**Binary:** starts with `0b`, like `0b1011`, `0b1100_0011`  
**Boolean:** `true`, `false`  
**String:** inside double quotes, `"text goes here"`  

### String Literals

For now, only ascii strings are supported. Strings will get converted so each character is the numeric value for the letter.

```vctx
wire message : u16 = "hi"
```

