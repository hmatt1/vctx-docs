---
title: Types & Literals
description: Primitive types, inference, and literal formats.
---

# Primitive Types

uN: Unsigned integer of width N (e.g., u8, u16, u1).
iN: Signed integer of width N.
bool: Boolean value (true or false).

# Literals

## Type Inference

Typed literals: Explicitly state their width/type.
42u8
-5i16

Untyped literals: Inferred from context.
42
0xFF

Examples:

```vctx
wire x: u8 = 42       // OK: inferred as u8
wire y: u16 = 42u8    // ERROR: explicit u8 doesn't match u16
wire z: u16 = 42      // OK: inferred as u16
```

## Number Formats

Decimal: 123, 1_000
Hex: 0xFF, 0x10_FF
Binary: 0b1011, 0b1100_0011
Boolean: true, false
String: "Text" (mostly for print debugging)
