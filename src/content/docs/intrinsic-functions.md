---
title: Intrinsic Functions
description: Built-in helpers like assert, assume, cover, and print.
---

## Quick Reference

These functions are built into the compiler.

| Function | Returns | Context | Purpose |
| :--- | :--- | :--- | :--- |
| assert(cond, msg) | void | sim/formal/comp | Prove condition always holds |
| assume(cond, msg) | void | sim/formal/comp | Assume condition holds (Precondition) |
| cover(cond, msg) | void | sim/formal | Check if condition is reachable |
| cycle() | void | sim/formal | Advance 1 clock cycle |
| cycle(n) | void | sim/formal | Advance N clock cycles |
| reset(n) | void | sim | Hold reset for N cycles |
| print(msg, ...) | void | sim | Debug output |

## Usage Notes

In Simulation: assert checks at runtime and fails the test if false. assume acts like an assert.
In Formal: assert is a proof obligation. assume constrains the solver's inputs.
In Components: assert documents invariants that should always be true.