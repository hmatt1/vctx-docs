title: Casting description: Converting between types using explicit casts.The as Keywordvctx is a strongly typed language. To convert between types (for example, from a register value to a boolean, or between integer widths), you use the as keyword.Syntaxexpression as type
Examples// Converting a u1 register to a boolean output
reg state: u1 = 0
led := state as bool

// Resizing logic (example generic usage)
return {0 as u4, val[10..0]}
