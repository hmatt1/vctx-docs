---
title: Language Philosophy
description: Why vctx is structural, explicitly timed, and beginner-friendly.
---

# Structural vs. Procedural

In traditional programming, if is a procedural control-flow instruction. It tells the compiler to execute code lines sequentially based on a condition. In HDLs, however, the structure is always meant to describe hardware, not a sequence of CPU instructions.

vctx is structural.

The keyword when emphasizes that you are defining a condition under which a path exists in the final hardware structure (a multiplexer or priority encoder). It emphasizes the structural selection rather than the procedural execution order. It's a statement about the circuit's configuration, not its execution sequence.

# Explicit Timing

By defining the roles of assignment operators so clearly, vctx eliminates the major sources of confusion found in older HDLs (like Verilog's blocking vs. non-blocking assignments).

The <= operator inherently means sequential/clocked.
The := operator inherently means combinational/immediate.

This makes the timing intent of your design explicit and readable.
