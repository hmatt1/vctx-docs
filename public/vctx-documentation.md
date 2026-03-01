# vctx Language Documentation
*Generated on: 3/1/2026*
---




## Installation

(todo)

## Initialize a New Project

```bash
# Create a new vctx project in the current directory
vctx init
```

This creates a `vctx.toml` file, indicating that this directory is a `vctx` project.

## Create a file

Copy paste this into a file named `blinky.vctx`

```vctx
(todo)
```

## Run the tests

```
vctx check

vctx test

vctx sim --vcd
```

## View the generated waveform

(todo)

## VS Code Language Extension

Install the VS Code Language Extension for vctx.

---




## Combinational vs. Sequential

One of the primary goals of vctx is to have intuitive syntax when working with immediate logic and clocked logic.

`:=` Combinational (Wires): Represents an immediate connection. Used for logic that reacts instantly to input changes.  
`<=` Sequential (Registers): Represents a clocked update. Used for logic that changes state only on the next clock edge.  
`=` Declaration: Used only for defining initial values or reset states during variable declaration.  

## Global Clock and Reset

vctx simplifies hardware design by assuming a standard synchronous model:  

Single, global clock: `clk`  
Single, global reset: `rst`  

You do not need to manually route these signals; the compiler handles them automatically.

## Example

```vctx
component LogicDemo(in switch: bool, out led: bool) {
    // Continuous connection: reacts instantly
    wire combined: bool
    combined := switch & true 

    // Sequential state: updates on clock edge
    // Reset value (0) is automatically applied via global rst
    reg state: u1 = 0
    state <= ~state
    
    led := state as bool
}
```


---




## Directory Layout

When you run `vctx init`, a standard project structure is created.  

## File Extensions

Source files use the `.vctx` extension.

## Packages and Imports

*vctx* uses a namespacing system similar to other modern programming languages. You can import other packages to use their components or functions.

### Import Syntax

```vctx
// Import a package
import examples.counter3

// Import a package with an alias
import examples.counter4 as c4
```

## Identifier Resolution

Base Identifier: `counter`  
Field Access: `bus.mosi`  
Qualified Name: `examples.counter3.Count`  

You can use the CLI tools to inspect imports and symbols:

```bash
# Show what a file imports
python vctx-cli.py imports examples/blinky.vctx

# Show all symbols
python vctx-cli.py project examples/blinky.vctx
```


---




## Compiler Architecture

vctx is a modern HDL built on top of the CIRCT (Circuit IR Compilers and Tools) ecosystem. This allows vctx to leverage advanced compiler infrastructure for hardware design.

## MLIR Generation

The compiler can parse your component and emit CIRCT MLIR (Multi-Level Intermediate Representation). This is useful for integrating with other tools in the LLVM/CIRCT ecosystem.

```bash
# Emit standard CIRCT MLIR
vctx mlir --top MyProcessor

# Include Arc dialect for cycle-accurate simulation optimization
vctx mlir --top MyProcessor --arc
```

## SystemVerilog Generation

For synthesis on FPGAs or ASICs, vctx compiles down to SystemVerilog.

```bash
# Generate Verilog for the default top-level module
vctx sv

# Generate Verilog for a specific component
vctx sv --top MyTopLevel
```


---




## Structural vs. Procedural

In traditional programming, `if` is a procedural control-flow instruction. It tells the compiler to execute code lines sequentially based on a condition. In HDLs, however, the structure is always meant to describe hardware, not a sequence of CPU instructions.

*vctx is structural*

The keyword when emphasizes that you are defining a condition under which a path exists in the final hardware structure (a multiplexer or priority encoder). It emphasizes the structural selection rather than the procedural execution order. It's a statement about the circuit's configuration, not its execution sequence.

## Explicit Timing

By defining the roles of assignment operators so clearly, vctx eliminates the major sources of confusion found in older HDLs (like Verilog's blocking vs. non-blocking assignments).

The <= operator inherently means sequential/clocked.
The := operator inherently means combinational/immediate.

This makes the timing intent of your design explicit and readable.

---




## Whitespace & Comments

vctx ignores standard whitespace.
That means you are free to format the code any way you want.
It is not like python where identation matters.

Comments are defined as follows:  

**Single-line comments:** Start with `//` and continue to the end of the line  
**Block comments:** Enclosed between `/*` and `*/`  

```vctx
// This is a single line comment
/* This is 
   a block comment */
```

## Identifiers

Identifiers are any code construct that you define, like variable names or component names.

Identifiers must start with a letter or underscore, followed by letters, numbers, or underscores.  

**Examples:** `counter`, `_data`, `tx_pin_1`  
Identifiers would match this regex: `[a-zA-Z_][a-zA-Z0-9_]*`


---




## Defining Components

Components are the building blocks of vctx designs. They are defined with inputs and outputs in a port list.

```vctx
component Blinky(output led: u1) {
    // Body...
}
```

## Port Direction

in: Input signal.
out: Output signal.
output: Alias for out.

## Instantiation

You can instantiate other components within a component.

```vctx
// Syntax: ComponentName(connection_list)
Blinky(led: my_wire)

// Named instantiation
// Syntax: InstanceName : ComponentName(connection_list)
led_driver : Blinky(led: my_wire)
```

The first identifier is the optional instance name (e.g., led_driver). The second identifier is the component name (e.g., Blinky).

---




## Wire (Continuous Connection)

The keyword wire declares a combinational signal (a simple electrical connection) that has no memory. Its output is calculated instantaneously based on its input.

```vctx
wire result: u8
result := a + b
```

**Assignment:** Can only be driven using `:=`.  
**Initialization:** `wire x: u8 = 0` sets the default value. This is used if no other assignment drives the wire (e.g., to prevent latches in when blocks). If no literal is present, it defaults to 0.

## Register (State Element)

The keyword reg declares a sequential register (a flip-flop).

```vctx
reg counter: u8 = 0
counter <= counter + 1
```

**Clock:** Implicitly wired to the global clk.  
**Assignment:** Can only be changed using `<=`.  
**Reset:** The declaration `=` literal guarantees the register is set to that value when the global rst signal is asserted.

---




## What does combinatorial mean?

An important concept in vctx is when assignments happen.
You can think of combinatorial logic as connecting wires.
Wires will immediately update to the new value when wires it depends on change value.
For example, suppose we have `c := a + b`.
`c` will always be the sum of `a` and `b`. If either `a` or `b` change value,
then `c` will update right away too.

## What does sequential mean?

You can think of sequential logic as logic that will execute on the next clock edge.
For the example `c <= a + b`, that means if `a` or `b` change value, there is a period of time
where `c` still have the old sum, until the clock edge comes and it updates to the new sum.  

A good way to think of it is if you have a `1Hz` clock, then it "ticks" once per second,
and the value will update on the next "tick".  

## Assignment Operators

`:=` Combinatorial: Immediate assignment. Used when assigning to a `wire`.  
`<=` Sequential: Delayed assignment (next clock cycle). Used for `reg`.  
`=` Declaration: Initialization or reset value.  

Both sequential and combinatorial constructs, like `wire` and `reg`, use `=` when declaring the initial value for that variable.

As a result, you don't have to connect the clock to everything in vctx.
The language follows these rules on when values will change.
In theory, this should make it easier to write hardware logic, and reduce mistakes around clock and resets.

## Single Driver Rule

Here are some rules that the vctx compiler enforces to ensure a clean and predictable circuit.

A wire can not be driven by multiple sources at the same time. This means it could be driven by one continuous combinational assignment (:=), or for example, it could be driven by a statement in each block using when/elsewhen/otherwise.

A reg would follow this rule too. This is because in real life, if a wire is driven at both 0 and 1 at the same time, we would get undefined behavior.


---




## Primitive Types

Primitive types are built into vctx. N can be any counting number (positive integers). `N` is always read with base 10.

`uN`: Unsigned integer of width N (`u1`, `u16`, etc)  
`sN`: Signed integer of width N  (`s1`, `s16`, etc)
`bool`: Boolean value (`true` or `false`)  

Booleans are essentially like using a `u1`, but it can be more readable to write code using `true` or `false` instead of `0` or `1`.
Either way, you only need 1 bit to represent a boolean.

## Literals

### Type Inference

Literals are always untyped, and inferred from context.

```vctx
42
0xFF
```

This means you can work with numbers the way you expect, and the compiler will tell you if something is wrong.

Examples:

```vctx
wire a: u8 = 42       // OK: inferred as u8
wire b: u16 = 42      // OK: inferred as u16
wire c: u16 = 42 as u8      // NOT OK: casting using `as` will change 42 to a u8
wire d: u1 = 42 // NOT OK: you need at least 6 bits to store the value 42
```

Numbers will retain their sign, and be extended with zeros automatically to retain the same value.

### Literal Formats

When using literals, vctx supports common formats for defining numeric values.
Literals will have the same behavior, regardless of what syntax or formatting you use.
Underscores get ignored, but can be useful for formatting code.

**Decimal:** `123`, `1000`, `1_000`  
**Hex:** starts with `0x`, like `0xFF`, `0x10_FF`  
**Binary:** starts with `0b`, like `0b1011`, `0b1100_0011`  
**Boolean:** `true`, `false`  
**String:** inside double quotes, `"text goes here"`  

### String Literals

For now, only ascii strings are supported. Strings will get converted so each character is the numeric value for the letter.

```vctx
wire message : u16 = "hi"
```



---




## Indexing Convention

Bit 0 is always the LSB (least significant bit).  
For `u8`, bits are [7, 6, 5, 4, 3, 2, 1, 0] where 7 is MSB.  
For arrays, index 0 is the first element.  

## Accessing Data

Index: `counter[0]` (Access specific bit or element)  
Slice: `data[7..0]` (Extract a range of bits)  

## Range Slice Rules

When slicing, you must use [MSB..LSB] order.  

`data[high..low]` (Requires high >= low)
`data[3..0]` (Gets bits 3, 2, 1, 0)
`data[15..8]` (Gets the upper byte)
`data[0..7]` ERROR: Ranges must be descending.

## Concatenation

You can combine signals using the built-in `concat` function:

```vctx
concat(high_byte, low_byte)
```




---




## The as Keyword

vctx is a strongly typed language. To convert between types (for example, from a register value to a boolean, or between integer widths), you use the as keyword.

### Syntax

expression as type

## Examples

```vctx
// Converting a u1 register to a boolean output
reg state: u1 = 0
led := state as bool

// Resizing logic (example generic usage)
wire foo: u16 = concat(0 as u4, val[11..0])
```

---




## Map Literals

vctx supports map literals, which are useful for creating lookup tables or configuration maps.

### Syntax

```vctx
{ 
  key: value, 
  key2: value2
}
```

## Grammar Definition

```lark
map_literal: "{" _list{map_entry}? "}"
map_entry: literal ":" literal
```

These are typically used within function definitions or attributes to pass structured static data.

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

---




If you're familiar with imperative programming languages, like python, you're used to code being executed line by line.
In vctx, there are many declarative concepts, similar to html.
An easy way to think of it is that you're declaring what hardware will exist.
Hardware is physical, just like the road when you're driving down the highway.
If you pass an exit, you would have the option to take it, but the exit ramp will still exist even if you stay on the highway.
This is why vctx uses `when` instead of `if`.
In imperative languages, like python, an `if` statement would test if a code path should be executed or not.
In vctx, `when` will synthesize to hardware gates in the design. So the different code paths will exist on hardware, and whether they are used depends on values at runtime.

## Structural Conditioning

The `when` statement is used to define hardware paths (multiplexers or priority encoders). It is not procedural if logic; it describes which value drives a wire based on conditions.

### Syntax

```vctx
when condition {
    // statement
} elsewhen condition2 {
    // statement
} otherwise {
    // statement
}
```

## Example

```vctx
wire out: u8 = 0 // Default value prevents latches

when select == 0 {
    out := data_a
} elsewhen select == 1 {
    out := data_b
} otherwise {
    out := 0xFF
}
```

If you do not provide an otherwise block, and the conditions are not met, the wire will retain its default declaration value.

---




## Structs (Data)

A struct is a named, non-directional group of signals. It is used purely as a data container. Direction is only assigned when the struct is used as a component port.

```vctx
struct Point {
    x: u16
    y: u16
}
```

## Bundles (Protocols)

A bundle is a named, directional group of signals, used for interfaces.

to: Signal flows from the Master/Source to the Slave/Sink.
from: Signal flows from the Slave/Sink to the Master/Source.

## Implicit Flipping

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


---




## Pure Logic Reuse

Functions in vctx provide a way to reuse combinational logic. They are always inlined (zero hardware overhead) and cannot contain state (no reg allowed).

## Syntax

```vctx
function name(args) -> return_type {
    // logic
    return expression
}
```

## Example: Parity Calculator

```vctx
function get_parity(data: u8) -> bool {
    wire p0: bool := data[0] ^ data[1]
    wire p1: bool := data[2] ^ data[3]
    wire p2: bool := data[4] ^ data[5]
    wire p3: bool := data[6] ^ data[7]
    
    return p0 ^ p1 ^ p2 ^ p3
}

component ParityChecker(in data: u8, out error: bool) {
    // Functions are called to drive wires or ports
    error := get_parity(data)
}
```


---




## Parameterized Components

Generic parameters enable compile-time parameterization. Each unique instantiation creates a separate hardware module with the specified width or configuration.

## Syntax

Define generics using < > after the component or function name.

```vctx
component Adder<WIDTH>(in a: uWIDTH, in b: uWIDTH, out sum: uWIDTH) {
    sum := a + b
}
```

## Instantiation

Use the -- syntax in the connection list to map generics if needed (or simply instantiate with type inference if supported).

```vctx
// Creates Adder_8 module
Adder<8> add8(a -- x8, b -- y8, sum -- z8)      

// Creates Adder_16 module
Adder<16> add16(a -- x16, b -- y16, sum -- z16) 
```

## Generic Functions

You can also use generics in functions for width-agnostic logic.

```vctx
function <W> mask_upper(val: W) -> W {
    return concat(0 as u4, val[(W.width - 5)..0])
}
```


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


---




## Importing Packages

Code reusability is managed via import statements at the top of a file.

```vctx
import path.to.package
import path.to.other as alias
```

## Scoping

When you import a package, you can access its contents using dot notation.

```vctx
package.Component
package.subpackage.Function
```

## Resolving Symbols

You can use the CLI to debug namespace issues:

```bash
# Look up a specific identifier in a given scope
python vctx-cli.py resolve-symbol --ident counter --scope Blinky --package examples.blinky
```


---




## Sim Blocks

Simulation blocks provide explicit test benches with clock control. They instantiate components and can access internal state for verification.  

Simulation blocks contain a mix of declarative and imperative programming concepts.  

For example, instantiating components will be declarative; you are defining what hardware will exist.
But, calls to `assert` and `cycle` are imperative, those lines of code will execute in order.  

## Example

```vctx
sim TestBench {
    wire out: bool
    Blinky dut(led: out)
    
    // Advance 10 clock cycles
    cycle(10) 
    
    // Check internal state
    assert(dut.counter == 10, "Counter should be 10")
    
    // Check output
    assert(out == true, "LED should be on")
}
```

## Control Functions

`assert(condition, message)`: Cause the test to fail if the condition is not met.
`cycle()`: Advance one clock cycle.
`cycle(n)`: Advance n clock cycles.
`reset(n)`: Hold the global reset high for n cycles, then release.
`print(msg, val)`: Print debug info during simulation.

---




## Formal Blocks

Formal verification allows you to prove properties of your design for all possible inputs, rather than just specific test cases.

## Symbolic Values (sym)

Use the sym keyword to declare a symbolic input. The formal solver will explore all possible values for this input.

## Example

```vctx
formal Safety {
    sym input_val: u8
    sym res: u8
    
    MathUnit(input_val, res)
    
    // Preconditions (Restrict the search space)
    assume(input_val < 100)
    
    // Property to prove
    assert(res >= input_val, "Result never shrinks")
}
```

## Formal Commands

assume(cond): Tells the solver to only consider traces where cond is true.
assert(cond): The solver tries to find a trace where cond is false (a counter-example).
cover(cond): The solver tries to find a trace where cond is true (reachability check).

---




## Quick Reference

These functions are built into the compiler.

| Function | Returns | Context | Purpose |
| :--- | :--- | :--- | :--- |
| assert(cond, msg) | void | sim/formal/comp | Prove condition always holds |
| assume(cond, msg) | void | sim/formal/comp | Assume condition holds (Precondition) |
| concat(expr, ...) | inferred | sim/formal/comp | Concatenate multiple signals |
| cover(cond, msg) | void | sim/formal | Check if condition is reachable |
| cycle() | void | sim/formal | Advance 1 clock cycle |
| cycle(n) | void | sim/formal | Advance N clock cycles |
| reset(n) | void | sim | Hold reset for N cycles |
| print(msg, ...) | void | sim | Debug output |

## Usage Notes

In Simulation: assert checks at runtime and fails the test if false. assume acts like an assert.
In Formal: assert is a proof obligation. assume constrains the solver's inputs.
In Components: assert documents invariants that should always be true.

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

---




Reading the grammar will give you a rough overview of how the syntax works in `vctx`. 
Some areas may be more permissive for parsing, so the compiler can analyze for better error messages.

## Templates

In the grammar specifications, see `_list{x}`. This is a template that defines a list of elements 'x' separated by a comma.  

## vctx.lark

```lark
// === vctx grammar ===

// === Templates ===

// Defines a list of elements 'x' separated by a comma.
_list{x}: x ("," x)*

// === Start ===

start: item+

?item: import_decl
     | component
     | struct_decl
     | bundle_decl
     | function_decl
     | sim_decl
     | formal_decl

import_decl: IMPORT import_path (AS IDENT)?
?import_path: IDENT ("." IDENT)*

// === SIM & FORMAL BLOCKS ===

sim_decl: SIM IDENT block

formal_decl: FORMAL IDENT block

// === ATTRIBUTES ===

attribute: "@" IDENT ("(" expression ")")?

// === FUNCTIONS ===

function_decl: FUNCTION IDENT "(" function_param_list? ")" ("->" type)? block

function_param_list: _list{typed_identifier}

// === COMPONENTS & GENERICS ===

component: attribute* generic_params? COMPONENT IDENT "(" port_list? ")" block

generic_params: LT _list{generic_param} GT

generic_param: IDENT

port_list: _list{port}

port: IDENT IDENT ":" type

// === STRUCTS & BUNDLES ===

struct_decl: STRUCT IDENT "{" struct_field_list? "}"

bundle_decl: BUNDLE IDENT "{" bundle_field_list? "}"

?typed_identifier: IDENT ":" type

struct_field_list: _list{struct_field}

struct_field: typed_identifier

bundle_field_list: _list{bundle_field}

bundle_field: IDENT typed_identifier

// --- STATEMENTS ---

?body: block | statement

block: "{" statement* "}"

?statement: declaration
          | assignment
          | when_statement
          | return_statement
          | call_or_instantiation

return_statement: RETURN expression

// --- DECLARATION / INITIALIZATION ---

DECL_KEYWORD: WIRE | REG | SYM

?declaration: DECL_KEYWORD typed_identifier ("=" expression)?

// --- ASSIGNMENT ---

ASSIGN_OP: WIRE_ASSIGN_OP | SEQ_ASSIGN_OP

assignment: identifier_access ASSIGN_OP expression

// --- CONTROL FLOW ---

when_statement: when_clause+

?when_clause: WHEN expression body
            | ELSEWHEN expression body
            | OTHERWISE body

// === EXPRESSIONS ===

?expression: ternary

?ternary: logical_or ("?" expression ":" ternary)?

?logical_or: logical_and (LOGICAL_OR_OP logical_and)*

?logical_and: bitwise_or (LOGICAL_AND_OP bitwise_or)*

?bitwise_or: bitwise_xor (BITWISE_OR_OP bitwise_xor)*

?bitwise_xor: bitwise_and (BITWISE_XOR_OP bitwise_xor)*

?bitwise_and: equality (BITWISE_AND_OP equality)*

?equality: comparison (equality_op comparison)?

?comparison: shift (comparison_op shift)?

?shift: sum (shift_op sum)*

?sum: product (add_op product)*

?product: unary (mul_op unary)*

?unary: unary_op unary                -> unary_expression
      | primary_expression

?primary_expression: postfix cast_suffix?

?cast_suffix: AS type                -> cast_expression

?postfix: (identifier_access | atom) postfix_op*

identifier_access: IDENT postfix_op*

postfix_op: "." IDENT                                     -> field_access
          | "[" expression "]"                            -> index_access
          | "[" expression ".." expression "]"            -> slice_access

?atom: literal
     | "(" expression ")"
     | function_call


?base_type: IDENT

// === FUNCTION CALL or INSTANTIATION ===

function_call: IDENT "(" argument_list? ")"
argument_list: _list{expression}

call_or_instantiation: (IDENT ":")? generic_args? identifier_access "(" connection_list? ")"

generic_args: LT _list{expression} GT

connection: (IDENT "--") ? expression

connection_list: _list{connection}

// === OPERATOR TOKENS ===

LOGICAL_OR_OP: "||"
LOGICAL_AND_OP: "&&"
BITWISE_OR_OP: "|"
BITWISE_XOR_OP: "^"
BITWISE_AND_OP: "&"

WIRE_ASSIGN_OP: ":="
SEQ_ASSIGN_OP: "<="

EQEQ: "=="
NOT_EQEQ: "!=="
LESS_EQEQ: "<=="
GREATER_EQEQ: ">=="
SHIFT_LEFT.10: "<<"
SHIFT_RIGHT.10: ">>"
LT. -1: /<(?!<)/
GT. -1: />(?!>)/

equality_op: EQEQ | NOT_EQEQ
comparison_op: LESS_EQEQ | GREATER_EQEQ | LT | GT
shift_op: SHIFT_LEFT | SHIFT_RIGHT

PLUS: "+"
MINUS: "-"
add_op: PLUS | MINUS

STAR: "*"
SLASH: "/"
PERCENT: "%"
mul_op: STAR | SLASH | PERCENT

NOT: "!"
TILDE: "~"
unary_op: NOT | TILDE | MINUS

// === TYPES ===

type: base_type array_suffix*

array_suffix: "[" expression "]"

// === LITERALS ===

?literal: DECIMAL 
        | HEX 
        | BINARY 
        | BOOL_LIT 
        | STRING 
        | map_literal

map_literal: "{" _list{map_entry}? "}"

map_entry: literal ":" literal

DECIMAL: /[0-9]+(_[0-9]+)*/
HEX: /0x[0-9a-fA-F]+(_[0-9a-fA-F]+)*/
BINARY: /0b[01]+(_[01]+)*/
BOOL_LIT: TRUE | FALSE
STRING: /"[^"]*"/

// === KEYWORDS ===

AS:        /\bas\b/
IMPORT:    /\bimport\b/
SIM:       /\bsim\b/
FORMAL:    /\bformal\b/
FUNCTION:  /\bfunction\b/
COMPONENT: /\bcomponent\b/
STRUCT:    /\bstruct\b/
BUNDLE:    /\bbundle\b/
RETURN:    /\breturn\b/
WIRE:      /\bwire\b/
REG:       /\breg\b/
SYM:       /\bsym\b/
WHEN:      /\bwhen\b/
ELSEWHEN:  /\belsewhen\b/
OTHERWISE: /\botherwise\b/
TRUE:      /\btrue\b/
FALSE:     /\bfalse\b/

// === Identifiers ===

IDENT. -1: /[a-zA-Z_][a-zA-Z0-9_]*/

// === Whitespace & Comments ===

%import common.WS
%ignore WS

COMMENT: "//" /[^\n]*/
BLOCK_COMMENT: "/*" /(.|\n)*?/ "*/"

%ignore COMMENT
%ignore BLOCK_COMMENT
```

---




## Usage

Usage: vctx-cli.py COMMAND

```text
╭─ Build ─────────────────────────────────────────────────────────────╮
│ clean  Purge build artifacts.                                       │
│ mlir   Parse component and emit CIRCT MLIR representation.          │
│ sv     Generate System Verilog                                      │
╰─────────────────────────────────────────────────────────────────────╯
╭─ Project Management ────────────────────────────────────────────────╮
│ init   Initialize a new vctx project.                               │
╰─────────────────────────────────────────────────────────────────────╯
╭─ Verification ──────────────────────────────────────────────────────╮
│ check   Validate syntax and types.                                  │
│ formal  Run formal verification/model checking.                     │
│ sim     Run simulations.                                            │
│ test    Execute both simulations and formal tests.                  │
╰─────────────────────────────────────────────────────────────────────╯
```

## Common Commands

vctx check src/: Fast syntax/type check.
vctx test: Run all tests in the project.
vctx test src/uart.vctx: Run tests in a specific file.
vctx sim src/design.vctx:test --vcd: Simulate and generate waveforms.

---




## Features

The vctx VS Code plugin uses the built-in Language Server Protocol (LSP) to provide:

Syntax highlighting
Real-time error checking
Go to Definition
Hover information

(Documentation on specific plugin installation steps to be added).

---




## Built-in Server

vctx includes a full Language Server Protocol implementation in the CLI. This allows any editor that supports LSP (VS Code, Neovim, Emacs) to provide rich language features.

## Commands

```bash
# Start the built-in language server for IDE integration
vctx lsp

# Test a specific LSP command
vctx lsp --test-command vctx.sayHello
```

## Debugging

If you are developing editor integration:

```bash
# Run an external language server (for debugging)
vctx lsp -- path/to/custom/server --stdio
```


---




## Complete FPGA Flow

Because vctx compiles to standard SystemVerilog, it works seamlessly with open-source FPGA toolchains.

## Step-by-Step Example (Tang Nano 9K)

### Verify your design

```bash
vctx check examples/blinky.vctx
vctx test examples/blinky.vctx
```

### Generate SystemVerilog

```bash
vctx sv --top examples/blinky.vctx
# Creates: build/Blinky.sv
```

### Synthesize (Yosys)

```bash
yosys -p "read_verilog -sv build/Blinky.sv; \
          synth_gowin -top Blinky -json build/blinky.json" \
      -l build/synthesis.log
```

### Place & Route (nextpnr)

```bash
nextpnr-himbaechel \
    --device GW2A-LV18PG256C8/I7 \
    --json build/blinky.json \
    --write build/blinky_routed.json
```

### Pack Bitstream

```bash
gowin_pack -d GW2A-18C -o build/blinky.fs build/blinky_routed.json
```

### Program

```bash
openFPGALoader -b tangnano9k build/blinky.fs
```


---




## Developer Tools

These commands are for debugging the vctx compiler or understanding how it parses code.

`python vctx-cli.py ast examples/or.vctx`: Print the Abstract Syntax Tree.
`python vctx-cli.py tokens examples/or.vctx`: Show the stream of tokens from the lexer.
`python vctx-cli.py symbols examples/or.vctx`: Dump the symbol table for a file.
`python vctx-cli.py regen`: Regenerate the standalone Lark parser (required if modifying vctx.lark).
`python vctx-cli.py imports examples/blinky.vctx`: Analyze a target and dump the imports for a file.
`python vctx-cli.py project --target examples/blinky.vctx`: Analyze the entire project and dump the symbol table.
`python vctx-cli.py check --targets examples/or.vctx`: Check one file
`python vctx-cli.py check`: Check entire project
`python vctx-cli.py hover examples/or.vctx --line 1 --column 5`: Run hover logic
`python vctx-cli.py definition .\examples\or.vctx 15 5`: Run go to definition logic
`python .\vctx-cli.py outline .\examples\or.vctx`: Get symbols using LSP mapping

## Resolution Debugging

You can inspect how the compiler resolves types and assignments:

```bash
python vctx-cli.py resolve-type counter Blinky examples.blinky
python vctx-cli.py resolve-symbol --ident examples.or.OrGate.y --package examples.or               
python vctx-cli.py assignment --ident counter --scope Blinky --package examples.blinky
```


---




### Python Linting

```
ruff check .\core.py --fix
```

### Doc Site Dev Server

```
./node_modules/.bin/astro dev  
```

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

---




## Overview

The UART (Universal Asynchronous Receiver/Transmitter) is a standard communication protocol.
(See examples/uart.vctx in the repository for full source code).

## CLI Commands

You can verify the UART implementation using the following commands:

```bash
# Run tests for the UART module
vctx test src/uart.vctx

# Simulate a specific transmission case
vctx sim src/uart.vctx:test_basic_transmission
```


---




## Bundle Definition

SPI requires four wires with specific directions. We can group them into a bundle.

```vctx
bundle SPI {
    to   mosi: bool
    to   sclk: bool
    from miso: bool
}
```

## Component Implementation

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


---




## Verification

FIFOs are excellent candidates for formal verification to prove they never overflow or underflow.
(See src/fifo.vctx in the repository for full source code).

## Formal Check

```bash
# Verify no overflow property
vctx formal src/fifo.vctx:property_no_overflow
```

## Key Properties

Typical properties to prove for a FIFO:
No Overflow: Writing to a full FIFO should not corrupt data or increment the count beyond MAX.
No Underflow: Reading from an empty FIFO should be handled safely.
Ordering: Data read out must match the order of data written in.

---
