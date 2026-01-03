---
title: Arrays & Slicing
description: Slicing, concatenation, and indexing of vectors.
---

# Indexing Convention

Bit 0 is always the LSB (least significant bit).
For u8, bits are [7, 6, 5, 4, 3, 2, 1, 0] where 7 is MSB.
For arrays, index 0 is the first element.

# Accessing Data

Index: counter[0] (Access specific bit or element)
Slice: data[7..0] (Extract a range of bits)

# Range Slice Rules

When slicing, you must use [MSB..LSB] order.
data[high..low] (Requires high >= low)
data[3..0] (Gets bits 3, 2, 1, 0)
data[15..8] (Gets the upper byte)
data[0..7] ERROR: Ranges must be descending.

# Concatenation

You can combine signals using curly braces:
{high_byte, low_byte}