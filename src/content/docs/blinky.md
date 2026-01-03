---
title: Blinky
description: A "Hello World" LED blinker example.
---

## Code

```vctx
component Blinky(output led: u1) {
    reg counter: u27 = 0

    counter <= counter + 1

    led := counter[24]
}
```

## Explanation

Counter: A 27-bit register counter is declared and initialized to 0.
Increment: On every clock cycle, counter increments.
Output: The LED is driven by bit 24 of the counter. As the counter counts up, this bit toggles at a human-visible frequency (assuming a standard MHz clock).