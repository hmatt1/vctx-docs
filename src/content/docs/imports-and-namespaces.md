---
title: Imports & Namespaces
description: Explicitly covers import syntax and aliasing.
---

# Importing Packages

Code reusability is managed via import statements at the top of a file.

```vctx
import path.to.package
import path.to.other as alias
```

# Scoping

When you import a package, you can access its contents using dot notation.

```vctx
package.Component
package.subpackage.Function
```

# Resolving Symbols

You can use the CLI to debug namespace issues:

```bash
# Look up a specific identifier in a given scope
python vctx-cli.py resolve-symbol --ident counter --scope Blinky --package examples.blinky
```