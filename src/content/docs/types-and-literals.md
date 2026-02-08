---
title: Types & Literals
description: Primitive types, inference, and literal formats.
---

## Primitive Types

uN: Unsigned integer of width N (e.g., u8, u16, u1).
sN: Signed integer of width N.
bool: Boolean value (true or false).

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