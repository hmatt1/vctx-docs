---
title: Operators & Expressions
description: Math, bitwise logic, and concatenation.
---

## Operator Precedence

vctx supports standard hardware operators.

### Arithmetic

`+` (Add)  
`-` (Subtract)  
`*` (Multiply)  
`/` (Divide)  
`%` (Modulus)  

### Bitwise

`|` (OR)  
`^` (XOR)  
`&` (AND)  
`~` (NOT / Invert)  

### Logical

`or` (Logical OR)  
`and` (Logical AND)  
`not` (Logical NOT)  

### Comparison

All the comparison operators consistenly use two equal signs.
This is to avoid confusion with the sequential assignment operator (`<=`).  

`==` (Equal)  
`!==` (Not Equal)  
`<` (Less Than)  
`>` (Greater Than)  
`<==` (Less or Equal)  
`>==` (Greater or Equal)  

### Shift

`<<` (Shift Left)  
`>>` (Shift Right)  

### Ternary

```vctx
cond ? true_val : false_val
```