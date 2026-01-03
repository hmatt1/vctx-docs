---
title: Compiler Internals
description: Covers 'ast', 'regen', 'tokens', and other developer-focused commands.
---

# Developer Tools

These commands are for debugging the vctx compiler or understanding how it parses code.

vctx ast file.vctx: Print the Abstract Syntax Tree.
vctx tokens file.vctx: Show the stream of tokens from the lexer.
vctx symbols file.vctx: Dump the symbol table for a file.
vctx regen: Regenerate the standalone Lark parser (required if modifying vctx.lark).

# Resolution Debugging

You can inspect how the compiler resolves types and assignments:

```bash
python vctx-cli.py resolve-type counter Blinky examples.blinky
python vctx-cli.py assignment --ident counter --scope Blinky --package examples.blinky
```