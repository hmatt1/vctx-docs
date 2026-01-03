---
title: Assignments
description: Rules for combinational, sequential, and declarative operators.
---

## Assignment Operators

:= Combinational: Immediate assignment. Used for wire.
<= Sequential: Delayed assignment (next clock cycle). Used for reg.
= Declaration: Initialization or reset value.

## Single Driver Rule

To ensure a clean and predictable circuit:
A wire can only have one continuous combinational assignment (:=) OR be driven by a single, unified when/elsewhen/otherwise block.
A reg should also follow this priority structure.

This constraint ensures that the code synthesizes into clear hardware structures (Multiplexers or Priority Encoders) rather than creating conflicting drivers.
If a wire is not driven by an assignment inside a condition block, it will hold its initial/default literal value declared with =.