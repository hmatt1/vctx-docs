---
title: Generics
description: Creating parameterized components using compile-time widths.
---

## Parameterized Components

Generic parameters enable compile-time parameterization. Each unique instantiation creates a separate hardware module with the specified width or configuration.

## Syntax

Define generics using < > after the component or function name.

```vctx
component Adder<WIDTH>(in a: u[WIDTH], in b: u[WIDTH], out sum: u[WIDTH]) {
    sum := a + b
}
```

## Instantiation

Optional instance name: write `label:` before the component target. Port bindings use `--` in the connection list.

```vctx
// Adder specialized to width 8
add8: Adder<8>(a -- x8, b -- y8, sum -- z8)

// Anonymous instance (no `label:`)
Adder<16>(a -- x16, b -- y16, sum -- z16)
```

Generic arguments are literals, identifiers, or parenthesized expressions (for example, you can do `Adder<W + 1>(...)`).

## Generic Functions

You can also use generics on functions for width-agnostic logic. Parameters follow the function name, same pattern as components.

```vctx
function mask_upper<W>(val: W) -> W {
    return concat(0 as u4, val[(W.width - 5)..0])
}
```
