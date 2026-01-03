---
title: Structs & Bundles
description: Data structs vs. Protocol Bundles.
---

# Structs (Data)

A struct is a named, non-directional group of signals. It is used purely as a data container. Direction is only assigned when the struct is used as a component port.

```vctx
struct Point {
    x: u16
    y: u16
}
```

# Bundles (Protocols)

A bundle is a named, directional group of signals, used for interfaces.

to: Signal flows from the Master/Source to the Slave/Sink.
from: Signal flows from the Slave/Sink to the Master/Source.

# Implicit Flipping

The compiler handles directionality automatically. If a bundle is used as an in port (Sink side), the internal flow directions are implicitly flipped.

```vctx
bundle SPI {
    to   mosi: bool
    to   sclk: bool
    from miso: bool
}

// Master Side (out)
component Controller(out bus: SPI) {
    bus.mosi := 1  // Controller drives mosi
}

// Peripheral Side (in)
component Peripheral(in bus: SPI) {
    // bus.mosi is automatically an input here
    wire data: bool := bus.mosi
}
```