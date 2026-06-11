---
title: Assignments
description: Rules for combinational, sequential, and declarative operators.
---

## What does combinatorial mean?

An important concept in vctx is when assignments happen.
You can think of combinatorial logic as connecting wires.
Wires will immediately update to the new value when wires it depends on change value.
For example, suppose we have `c := a + b`.
`c` will always be the sum of `a` and `b`. If either `a` or `b` change value,
then `c` will update right away too.

## What does sequential mean?

You can think of sequential logic as logic that will execute on the next clock edge.
For the example `c <= a + b`, that means if `a` or `b` change value, there is a period of time
where `c` still have the old sum, until the clock edge comes and it updates to the new sum.  

A good way to think of it is if you have a `1Hz` clock, then it "ticks" once per second,
and the value will update on the next "tick".  

## Assignment Operators

`:=` Combinatorial: Immediate assignment. Used when assigning to a `wire`.  
`<=` Sequential: Delayed assignment (next clock cycle). Used for `reg`.  
`=` Declaration: Initialization or reset value.  

Both sequential and combinatorial constructs, like `wire` and `reg`, use `=` when declaring the initial value for that variable.

As a result, you don't have to connect the clock to everything in vctx.
The language follows these rules on when values will change.
In theory, this should make it easier to write hardware logic, and reduce mistakes around clock and resets.

## Single Driver Rule

Here are some rules that the vctx compiler enforces to ensure a clean and predictable circuit.

A wire can not be driven by multiple sources at the same time. This means it could be driven by one continuous combinational assignment (:=), or for example, it could be driven by a statement in each block using when/elsewhen/otherwise.

A reg follows this rule too. This is because in real life, if a wire is driven at both 0 and 1 at the same time, we would get undefined behavior.
