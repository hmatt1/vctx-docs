---
title: Assignments
description: Rules for combinational, sequential, and declarative operators.
---

An important concept in vctx is when assignments happen.
You can think of combinatorial logic as connecting wires.
Wires will immediately update to the new value when wires it depends on change value.
For example, suppose we have `c := a + b`.
`c` will always be the sum of `a` and `b`. If either `a` or `b` change value,
then `c` will update right away too.

## Assignment Operators

`:=` Combinational: Immediate assignment. Used when assigning to a `wire`.  
`<=` Sequential: Delayed assignment (next clock cycle). Used for `reg`.  
`=` Declaration: Initialization or reset value.  

## Single Driver Rule

To ensure a clean and predictable circuit:
A wire can only have one continuous combinational assignment (:=) OR be driven by a single, unified when/elsewhen/otherwise block.
A reg should also follow this priority structure.

This constraint ensures that the code synthesizes into clear hardware structures (Multiplexers or Priority Encoders) rather than creating conflicting drivers.
If a wire is not driven by an assignment inside a condition block, it will hold its initial/default literal value declared with `=`