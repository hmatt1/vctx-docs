---
title: Comparing with IR from other languages
description: Comparing with Intermediate Representation from other languages
---

## What is an IR?

An Intermediate Representation (IR) is a language that a compiler uses for a middle step while compiling code.
It sits at a lower level of abstraction than your source language but higher than raw machine code.

## `vctx` and `mlir`

`vctx` uses [MLIR](https://mlir.llvm.org/) as an IR, relying mainly on dialects from the [CIRCT](https://circt.llvm.org/) project.

The awesome thing about it is that you can translate from CIRCT MLIR to Verilog or System C, which makes `vctx` compatible with existing toolchains.

Here is a table to explain how `mlir` sits when comparing to other languages. You can basically think of `mlir` as something similar to bytecode!

| Language            | Source        | Intermediate Format        |
|--:------------------|--:------------|--:-------------------------|
| **vctx (Hardware)** | `.vctx`       | **`.mlir`**                |
| **C / C++**         | `.c` / `.cpp` | **`.gimple`** or **`.ll`** |
| **Rust**            | `.rs`         | **`.mir`** → **`.ll`**     |
| **Swift**           | `.swift`      | **`.sil`** → **`.ll`**     |
| **Java**            | `.java`       | **`.class`**               |
| **C# / .NET**       | `.cs`         | **`.il`**                  |
| **Python**          | `.py`         | **`.pyc`**                 |
| **JavaScript (V8)** | `.js`         | **V8 Bytecode**            |


