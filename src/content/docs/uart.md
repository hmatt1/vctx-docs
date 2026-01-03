---
title: UART
description: A complete UART transmitter/receiver implementation.
---

# Overview

The UART (Universal Asynchronous Receiver/Transmitter) is a standard communication protocol.
(See examples/uart.vctx in the repository for full source code).

# CLI Commands

You can verify the UART implementation using the following commands:

```bash
# Run tests for the UART module
vctx test src/uart.vctx

# Simulate a specific transmission case
vctx sim src/uart.vctx:test_basic_transmission
```