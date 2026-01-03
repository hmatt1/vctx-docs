---
title: Built on CIRCT
description: Explaining the compiler backend and MLIR generation.
---

# Compiler Architecture

vctx is a modern HDL built on top of the CIRCT (Circuit IR Compilers and Tools) ecosystem. This allows vctx to leverage advanced compiler infrastructure for hardware design.

# MLIR Generation

The compiler can parse your component and emit CIRCT MLIR (Multi-Level Intermediate Representation). This is useful for integrating with other tools in the LLVM/CIRCT ecosystem.

```bash
# Emit standard CIRCT MLIR
vctx mlir --top MyProcessor

# Include Arc dialect for cycle-accurate simulation optimization
vctx mlir --top MyProcessor --arc
```

# SystemVerilog Generation

For synthesis on FPGAs or ASICs, vctx compiles down to SystemVerilog.

```bash
# Generate Verilog for the default top-level module
vctx sv

# Generate Verilog for a specific component
vctx sv --top MyTopLevel
```