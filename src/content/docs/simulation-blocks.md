---
title: Simulation Blocks
description: Writing explicit testbenches with cycle(), reset(), and assertions.
---

## Sim Blocks

Simulation blocks provide explicit test benches with clock control. They instantiate components and can access internal state for verification.

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

cycle(): Advance one clock cycle.
cycle(n): Advance n clock cycles.
reset(n): Hold the global reset high for n cycles, then release.
print(msg, val): Print debug info during simulation.