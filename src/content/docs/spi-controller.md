---
title: SPI Controller
description: Demonstrating Bundle usage with a Serial Peripheral Interface controller.
---

# Bundle Definition

SPI requires four wires with specific directions. We can group them into a bundle.

```vctx
bundle SPI {
    to   mosi: bool
    to   sclk: bool
    from miso: bool
}
```

# Component Implementation

```vctx
component Controller(out bus: SPI) {
    // The controller initiates the transaction, so it uses 'out'.
    // 'bus.mosi' and 'bus.sclk' are outputs here.
    // 'bus.miso' is an input here.
    
    bus.mosi := 1
    bus.sclk := 1
}

component Peripheral(in bus: SPI) {
    // The peripheral receives the transaction, so it uses 'in'.
    // Directions are flipped automatically.
    // 'bus.mosi' is an input.
    
    wire data: bool := bus.mosi
}
```