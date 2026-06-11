---
title: Built on CIRCT
description: Explaining the compiler backend and MLIR generation.
---

## Compiler Architecture

vctx is a modern HDL built on top of the CIRCT (Circuit IR Compilers and Tools) ecosystem. This allows vctx to leverage advanced compiler infrastructure for hardware design.

## MLIR Generation

The compiler can parse your component and emit CIRCT MLIR (Multi-Level Intermediate Representation). This is useful for integrating with other tools in the LLVM/CIRCT ecosystem.

```bash
# Emit standard CIRCT MLIR
vctx mlir --top MyProcessor
```

Since vctx allows you to write simulations, you can also emit the MLIR code for a specific simulation. This will give a good example of how vctx is lowered to MLIR.

```
# Include Arc dialect for cycle-accurate simulation optimization
vctx mlir --sim foo.MyProcessor:MySim

## Todo add other example commands and verify whether --top is needed with --sim
```

## SystemVerilog Generation

For synthesis on FPGAs or ASICs, vctx compiles down to SystemVerilog.

```bash
# Generate Verilog for the default top-level module
vctx sv

# Generate Verilog for a specific component
vctx sv --top MyTopLevel
```

Then you can compile the SystemVerilog with standard toolchains.
