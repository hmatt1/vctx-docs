---
title: Formal Verification
description: Writing formal proofs using 'sym' values.
---

# Formal Blocks

Formal verification allows you to prove properties of your design for all possible inputs, rather than just specific test cases.

# Symbolic Values (sym)

Use the sym keyword to declare a symbolic input. The formal solver will explore all possible values for this input.

# Example

```vctx
formal Safety {
    sym input_val: u8
    sym res: u8
    
    MathUnit(input_val, res)
    
    // Preconditions (Restrict the search space)
    assume(input_val < 100)
    
    // Property to prove
    assert(res >= input_val, "Result never shrinks")
}
```

# Formal Commands

assume(cond): Tells the solver to only consider traces where cond is true.
assert(cond): The solver tries to find a trace where cond is false (a counter-example).
cover(cond): The solver tries to find a trace where cond is true (reachability check).
