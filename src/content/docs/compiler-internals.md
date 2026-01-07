---
title: Compiler Internals
description: Covers 'ast', 'regen', 'tokens', and other developer-focused commands.
---

## Developer Tools

These commands are for debugging the vctx compiler or understanding how it parses code.

`python vctx-cli.py ast examples/or.vctx`: Print the Abstract Syntax Tree.
`python vctx-cli.py tokens examples/or.vctx`: Show the stream of tokens from the lexer.
`python vctx-cli.py symbols examples/or.vctx`: Dump the symbol table for a file.
`python vctx-cli.py regen`: Regenerate the standalone Lark parser (required if modifying vctx.lark).
`python vctx-cli.py imports examples/blinky.vctx`: Analyze a target and dump the imports for a file.
`python vctx-cli.py project --target examples/blinky.vctx`: Analyze the entire project and dump the symbol table.
`python vctx-cli.py check --targets examples/or.vctx`: Check one file
`python vctx-cli.py check`: Check entire project

## Resolution Debugging

You can inspect how the compiler resolves types and assignments:

```bash
python vctx-cli.py resolve-type counter Blinky examples.blinky
python vctx-cli.py resolve-symbol --ident examples.or.y --scope OrGate --package examples.or
python vctx-cli.py assignment --ident counter --scope Blinky --package examples.blinky
```
