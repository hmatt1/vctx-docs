---
title: Compiler Errors
description: Reference for vctx compiler errors.
---

## Declaration

If you declare a wire without a type:

```vctx
wire foo = 0
```

You'll get an error:

```
Missing type definition. Declarations look like 'wire foo: u1 = 0'.
```

See more on [Types and Literals](types-and-literals.md)