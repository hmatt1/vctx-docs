---
title: CLI Reference
description: Standard commands for check, test, sim, formal, and build.
---

## Usage

Usage: vctx-cli.py COMMAND

```text
╭─ Build ─────────────────────────────────────────────────────────────╮
│ clean  Purge build artifacts.                                       │
│ mlir   Parse component and emit CIRCT MLIR representation.          │
│ sv     Generate System Verilog                                      │
╰─────────────────────────────────────────────────────────────────────╯
╭─ Project Management ────────────────────────────────────────────────╮
│ init   Initialize a new vctx project.                               │
╰─────────────────────────────────────────────────────────────────────╯
╭─ Verification ──────────────────────────────────────────────────────╮
│ check   Validate syntax and types.                                  │
│ formal  Run formal verification/model checking.                     │
│ sim     Run simulations.                                            │
│ test    Execute both simulations and formal tests.                  │
╰─────────────────────────────────────────────────────────────────────╯
```

## Common Commands

vctx check src/: Fast syntax/type check.
vctx test: Run all tests in the project.
vctx test src/uart.vctx: Run tests in a specific file.
vctx sim src/design.vctx:test --vcd: Simulate and generate waveforms.