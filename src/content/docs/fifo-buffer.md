---
title: FIFO Buffer
description: A FIFO buffer example emphasizing formal verification properties.
---

# Verification

FIFOs are excellent candidates for formal verification to prove they never overflow or underflow.
(See src/fifo.vctx in the repository for full source code).

# Formal Check

```bash
# Verify no overflow property
vctx formal src/fifo.vctx:property_no_overflow
```

# Key Properties

Typical properties to prove for a FIFO:
No Overflow: Writing to a full FIFO should not corrupt data or increment the count beyond MAX.
No Underflow: Reading from an empty FIFO should be handled safely.
Ordering: Data read out must match the order of data written in.
