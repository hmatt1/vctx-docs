---
title: Simulation Blocks
description: Writing explicit testbenches with cycle(), reset(), and assertions.
---

## Sim Blocks

Simulation blocks provide explicit test benches with clock control. They instantiate components and can access internal state for verification.  

Simulation blocks contain a mix of declarative and imperative programming concepts.  

For example, instantiating components will be declarative; you are defining what hardware will exist.
But, calls to `assert` and `cycle` are imperative, those lines of code will execute in order.  

## Example

```vctx
sim TestBench {
    wire out: bool
    Blinky dut(led: out)
    
    // Advance 10 clock cycles
    cycle(10) 
    
    // Check internal state
    assert(dut.counter == 10, "Counter should be 10")
    
    // Check output
    assert(out == true, "LED should be on")
}
```

## Control Functions

`assert(condition, message)`: Cause the test to fail if the condition is not met.
`cycle()`: Advance one clock cycle.
`cycle(n)`: Advance n clock cycles.
`reset(n)`: Hold the global reset high for n cycles, then release.
`print(msg, val)`: Print debug info during simulation.