---
title: Wires & Registers
description: The distinction between immediate connections and state elements.
---

## Wire (Continuous Connection)

The keyword wire declares a combinational signal (a simple electrical connection) that has no memory. Its output is calculated instantaneously based on its input.

```vctx
wire result: u2 = 3
```

Suppose wires `a` and `b` were previously defined.

```vctx
wire result: u8
result := a + b
```

**Assignment:** Can only be driven using `:=`
**Initialization:** `wire x: u8 = 0` sets the default value. The default value is used if no other assignment drives the wire (e.g., to prevent latches in when blocks). If no literal is present, the default is 0.


## Register (State Element)

The keyword reg declares a sequential register (a flip-flop).

```vctx
reg counter: u8 = 0
counter <= (counter + 1) as u8
```

**Clock:** Implicitly wired to the global clk.  
**Assignment:** Can only be changed using `<=`.  
**Reset:** The declaration `=` literal guarantees the register is set to that value when the global rst signal is asserted.

Wondering what `as u8` does? Read about [casting!](./casting)


