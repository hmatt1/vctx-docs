---
title: Functions
description: Writing pure, inlined logic for reuse.
---

## Pure Logic Reuse

Functions in vctx provide another way to reuse logic. They are always inlined.
That means there is zero overhead for calling a function, except it will create 
additional hardware for each call.

If you don't want to create additional hardware, the vctx approach is to use a `Component` instead of a `function`.

## Syntax

Without generic parameters:

```vctx
function name(args) -> return_type {
    // logic
    return expression
}
```

With generic parameters (after the function name, same idea as `component Name<Params>(...)`):

```vctx
function name<Params>(args) -> return_type {
    // logic
    return expression
}
```

## Example: Parity Calculator

```vctx
function get_parity(data: u8) -> bool {
    wire p0: bool := data[0] ^ data[1]
    wire p1: bool := data[2] ^ data[3]
    wire p2: bool := data[4] ^ data[5]
    wire p3: bool := data[6] ^ data[7]
    
    return p0 ^ p1 ^ p2 ^ p3
}

component ParityChecker(in data: u8, out error: bool) {
    // Functions are called to drive wires or ports
    error := get_parity(data)
}
```
