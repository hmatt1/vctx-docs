---
title: Project Structure
description: Learn about vctx file extensions, packages, and directory layout.
---

## Directory Layout

When you run vctx init, a standard project structure is created. vctx encourages a structured approach to hardware design.

## File Extensions

Source files use the .vctx extension.

## Packages and Imports

vctx uses a namespacing system similar to modern programming languages. You can import other packages to use their components or functions.

### Import Syntax

```vctx
// Import a package
import examples.counter3

// Import a package with an alias
import examples.counter4 as c4
```

## Identifier Resolution

Base Identifier: counter
Field Access: bus.mosi
Qualified Name: examples.counter3.Count

You can use the CLI tools to inspect imports and symbols:

```bash
# Show what a file imports
python vctx-cli.py imports examples/blinky.vctx

# Show all symbols
python vctx-cli.py project examples/blinky.vctx
```
