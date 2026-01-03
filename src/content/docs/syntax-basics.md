---
title: Syntax Basics
description: Basic syntax rules, comments, and templates.
---

# Whitespace & Comments

vctx ignores standard whitespace. Comments are defined as follows:

Single-line comments: Start with // and continue to the end of the line.
Block comments: Enclosed between /* and */.

```vctx
// This is a single line comment
wire x: u8 = 0 /* This is a block comment */
```

# Identifiers

Identifiers must start with a letter or underscore, followed by letters, numbers, or underscores.

Valid: counter, _data, tx_pin_1
Regex: /[a-zA-Z_][a-zA-Z0-9_]*/

# Templates

In the grammar specifications, you may see _list{x}. This is a template that defines a list of elements 'x' separated by a comma.
