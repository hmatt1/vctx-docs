---
title: Attributes
description: Using decorators for synthesis or simulation hints.
---

## Attribute Syntax

Attributes are decorators attached to components to provide hints to the compiler, synthesizer, or simulation tools. They start with an @ symbol.

### Grammar

attribute: "@" IDENT ("(" expression ")")?

## Usage

Attributes can be placed before a component definition.

```vctx
@keep_hierarchy
@frequency(50_000_000)
component TopLevel(...) { ... }
```
