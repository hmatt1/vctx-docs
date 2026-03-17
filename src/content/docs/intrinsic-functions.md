---
title: Intrinsic Functions
description: Built-in helpers like assert, assume, cover, and print.
---

## Quick Reference

These functions are built into the compiler.

### Elaboration Intrinsics

| Function | Returns | Context | Purpose |
| :--- | :--- | :--- | :--- |
| width(expr) | int | comp/sim/formal | Returns the exact bit-width of any expression, wire, or register |
| is_signed(expr) | bool | comp/sim/formal | Returns true if the signal is a signed type |
| is_comptime(expr) | bool | comp/sim/formal | Returns true if the compiler knows the literal integer value of the expression |

### Simulation & Formal Intrinsics

These functions are used to control the hardware from `sim` blocks.

| Function | Returns | Context | Purpose |
| :--- | :--- | :--- | :--- |
| assert(cond, msg) | void | sim/formal/comp | Prove condition always holds |
| assume(cond, msg) | void | sim/formal/comp | Assume condition holds (Precondition) |
| concat(expr, ...) | inferred | sim/formal/comp | Concatenate multiple signals |
| cover(cond, msg) | void | sim/formal | Check if condition is reachable |
| cycle() | void | sim/formal | Advance 1 clock cycle |
| cycle(n) | void | sim/formal | Advance N clock cycles |
| reset() | void | sim | Hold reset for 1 cycle |
| reset(n) | void | sim | Hold reset for N cycles |
| poke(signal, value) | void | sim | Mutates the state of a simulator input from the testbench |
| print(msg, ...) | void | sim | Debug output |

## Usage Notes

In Simulation: assert checks at runtime and fails the test if false. assume acts like an assert.
In Formal: assert is a proof obligation. assume constrains the solver's inputs.
In Components: assert documents invariants that should always be true.