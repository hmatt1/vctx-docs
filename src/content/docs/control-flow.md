---
title: Control Flow (When)
description: Using 'when', 'elsewhen', and 'otherwise' to define multiplexers.
---

If you're familiar with imperative programming languages, like python, you're used to code being executed line by line.
In vctx, there are many declarative concepts, similar to html.
An easy way to think of it is that you're declaring what hardware will exist.
Hardware is physical, just like the road when you're driving down the highway.
If you pass an exit, you would have the option to take it, but the exit ramp will still exist even if you stay on the highway.
This is why vctx uses `when` instead of `if`.
In imperative languages, like python, an `if` statement would test if a code path should be executed or not.
In vctx, `when` will synthesize to hardware gates in the design. So the different code paths will exist on hardware, and whether they are used depends on values at runtime.

## Structural Conditioning

The `when` statement is used to define hardware paths (multiplexers or priority encoders). It is not procedural if logic; it describes which value drives a wire based on conditions.

### Syntax

```vctx
when condition {
    // statement
} elsewhen condition2 {
    // statement
} otherwise {
    // statement
}
```

## Example

```vctx
wire out: u8 = 0 // Default value prevents latches

when select == 0 {
    out := data_a
} elsewhen select == 1 {
    out := data_b
} otherwise {
    out := 0xFF
}
```

If you do not provide an otherwise block, and the conditions are not met, the wire will retain its default declaration value.