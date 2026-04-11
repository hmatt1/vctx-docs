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
`python vctx-cli.py hover examples/or.vctx --line 1 --column 5`: Run hover logic
`python vctx-cli.py definition .\examples\or.vctx 15 5`: Run go to definition logic
`python .\vctx-cli.py outline .\examples\or.vctx`: Get symbols using LSP mapping

## Resolution Debugging

You can inspect how the compiler resolves types and assignments:

```bash
python vctx-cli.py resolve-type counter Blinky examples.blinky
python vctx-cli.py resolve-symbol --ident examples.or.OrGate.y --package examples.or               
python vctx-cli.py assignment --ident counter --scope Blinky --package examples.blinky
```

## Full list

```bash
python vctx-cli.py --help
python vctx-cli.py -h
python vctx-cli.py --version
python vctx-cli.py init
python vctx-cli.py check
python vctx-cli.py check TARGET [TARGET ...]
python vctx-cli.py check --targets TARGET [TARGET ...]
python vctx-cli.py test
python vctx-cli.py test TARGET [TARGET ...]
python vctx-cli.py test --targets TARGET [TARGET ...]
python vctx-cli.py formal
python vctx-cli.py formal TARGET [TARGET ...]
python vctx-cli.py formal --targets TARGET [TARGET ...]
python vctx-cli.py discover TARGET
python vctx-cli.py discover --target TARGET
python vctx-cli.py sim
python vctx-cli.py sim --vcd
python vctx-cli.py sim --no-vcd
python vctx-cli.py sim TARGET
python vctx-cli.py sim --target TARGET
python vctx-cli.py sim TARGET --vcd
python vctx-cli.py sim TARGET --no-vcd
python vctx-cli.py sim --target TARGET --vcd
python vctx-cli.py sim --target TARGET --no-vcd
python vctx-cli.py clean
python vctx-cli.py sv
python vctx-cli.py sv --top TOP
python vctx-cli.py mlir
python vctx-cli.py mlir --top TOP
python vctx-cli.py mlir --sim SIM
python vctx-cli.py mlir --top TOP --sim SIM
python vctx-cli.py lsp
python vctx-cli.py lsp --port PORT
python vctx-cli.py lsp --host HOST
python vctx-cli.py lsp --port PORT --host HOST
python vctx-cli.py ast TARGET
python vctx-cli.py ast --target TARGET
python vctx-cli.py tokens TARGET
python vctx-cli.py tokens --target TARGET
python vctx-cli.py symbols TARGET
python vctx-cli.py symbols --target TARGET
python vctx-cli.py imports TARGET
python vctx-cli.py imports --target TARGET
python vctx-cli.py project TARGET
python vctx-cli.py project --target TARGET
python vctx-cli.py resolve-symbol IDENT SCOPE PACKAGE
python vctx-cli.py resolve-symbol --ident IDENT --scope SCOPE --package PACKAGE
python vctx-cli.py resolve-type IDENT SCOPE PACKAGE
python vctx-cli.py resolve-type --ident IDENT --scope SCOPE --package PACKAGE
python vctx-cli.py assignment IDENT SCOPE PACKAGE
python vctx-cli.py assignment --ident IDENT --scope SCOPE --package PACKAGE
python vctx-cli.py regen
python vctx-cli.py hover TARGET LINE COLUMN
python vctx-cli.py hover --target TARGET --line LINE --column COLUMN
python vctx-cli.py definition TARGET LINE COLUMN
python vctx-cli.py definition --target TARGET --line LINE --column COLUMN
python vctx-cli.py outline TARGET
python vctx-cli.py outline --target TARGET
python vctx-cli.py highlight TARGET LINE COLUMN
python vctx-cli.py highlight --target TARGET --line LINE --column COLUMN
python vctx-cli.py structure TARGET
python vctx-cli.py structure --target TARGET
```