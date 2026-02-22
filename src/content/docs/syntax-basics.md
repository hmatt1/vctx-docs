---
title: Syntax Basics
description: Basic syntax rules, comments, and templates.
---

## Whitespace & Comments

vctx ignores standard whitespace.
That means you are free to format the code any way you want.
It is not like python where identation matters.

Comments are defined as follows:  

**Single-line comments:** Start with `//` and continue to the end of the line  
**Block comments:** Enclosed between `/*` and `*/`  

```vctx
// This is a single line comment
/* This is 
   a block comment */
```

## Identifiers

Identifiers must start with a letter or underscore, followed by letters, numbers, or underscores.  

**Examples:** `counter`, `_data`, `tx_pin_1`  
Identifiers would match this regex: `[a-zA-Z_][a-zA-Z0-9_]*`
