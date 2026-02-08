# vctx Language Documentation
*Generated on: 2/8/2026*
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

One of the primary goals of vctx is to eliminate confusion between immediate logic and clocked logic.

:= Combinational (Wires): Represents an immediate connection. Used for logic that reacts instantly to input changes.
<= Sequential (Registers): Represents a clocked update. Used for logic that changes state only on the next clock edge.
= Declaration: Used only for defining initial values or reset states during variable declaration.

## Global Clock and Reset

vctx simplifies hardware design by assuming a standard synchronous model:
Single, global clock: clk
Single, global reset: rst

You do not need to manually route these signals; the compiler handles them for reg updates automatically.

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

When you run vctx init, a standard project structure is created. vctx encourages a structured approach to hardware design.

## File Extensions

Source files use the .vctx extension.

## Packages and Imports

vctx uses a namespacing system similar to modern programming languages. You can import other packages to use their components or functions.

### Import Syntax

```vctx
// Import a package
import examples.counter3

// Import a package with an alias
import examples.counter4 as c4
```

## Identifier Resolution

Base Identifier: counter
Field Access: bus.mosi
Qualified Name: examples.counter3.Count

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

In traditional programming, if is a procedural control-flow instruction. It tells the compiler to execute code lines sequentially based on a condition. In HDLs, however, the structure is always meant to describe hardware, not a sequence of CPU instructions.

vctx is structural.

The keyword when emphasizes that you are defining a condition under which a path exists in the final hardware structure (a multiplexer or priority encoder). It emphasizes the structural selection rather than the procedural execution order. It's a statement about the circuit's configuration, not its execution sequence.

## Explicit Timing

By defining the roles of assignment operators so clearly, vctx eliminates the major sources of confusion found in older HDLs (like Verilog's blocking vs. non-blocking assignments).

The <= operator inherently means sequential/clocked.
The := operator inherently means combinational/immediate.

This makes the timing intent of your design explicit and readable.

---




## Whitespace & Comments

vctx ignores standard whitespace. Comments are defined as follows:

Single-line comments: Start with // and continue to the end of the line.
Block comments: Enclosed between /* and */.

```vctx
// This is a single line comment
wire x: u8 = 0 /* This is a block comment */
```

## Identifiers

Identifiers must start with a letter or underscore, followed by letters, numbers, or underscores.

Valid: counter, _data, tx_pin_1
Regex: /[a-zA-Z_][a-zA-Z0-9_]*/

## Templates

In the grammar specifications, you may see _list{x}. This is a template that defines a list of elements 'x' separated by a comma.

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




## Assignment Operators

:= Combinational: Immediate assignment. Used for wire.
<= Sequential: Delayed assignment (next clock cycle). Used for reg.
= Declaration: Initialization or reset value.

## Single Driver Rule

To ensure a clean and predictable circuit:
A wire can only have one continuous combinational assignment (:=) OR be driven by a single, unified when/elsewhen/otherwise block.
A reg should also follow this priority structure.

This constraint ensures that the code synthesizes into clear hardware structures (Multiplexers or Priority Encoders) rather than creating conflicting drivers.
If a wire is not driven by an assignment inside a condition block, it will hold its initial/default literal value declared with =.

---




## Primitive Types

uN: Unsigned integer of width N (e.g., u8, u16, u1).
sN: Signed integer of width N.
bool: Boolean value (true or false).

## Literals

### Type Inference

Literals are always untyped, and inferred from context.

```vctx
42
0xFF
```

Examples:

```vctx
wire x: u8 = 42       // OK: inferred as u8
wire z: u16 = 42      // OK: inferred as u16
wire z: u16 = 42 as u8      // NOT OK: casting using `as` will change 42 to a u8
```

### Number Formats

Decimal: 123, 1_000
Hex: 0xFF, 0x10_FF
Binary: 0b1011, 0b1100_0011
Boolean: true, false
String: "Text" (mostly for print debugging)

---




## Indexing Convention

Bit 0 is always the LSB (least significant bit).
For u8, bits are [7, 6, 5, 4, 3, 2, 1, 0] where 7 is MSB.
For arrays, index 0 is the first element.

## Accessing Data

Index: counter[0] (Access specific bit or element)
Slice: data[7..0] (Extract a range of bits)

## Range Slice Rules

When slicing, you must use [MSB..LSB] order.
data[high..low] (Requires high >= low)
data[3..0] (Gets bits 3, 2, 1, 0)
data[15..8] (Gets the upper byte)
data[0..7] ERROR: Ranges must be descending.

## Concatenation

You can combine signals using curly braces:
{high_byte, low_byte}


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
return {0 as u4, val[10..0]}
```


---




## Map Literals

vctx supports map literals, which are useful for creating lookup tables or configuration maps.

### Syntax

```vctx
{ key: value, key2: value2 }
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

+ (Add)
- (Subtract)
* (Multiply)
/ (Divide)
% (Modulus)

### Bitwise

| (OR)
^ (XOR)
& (AND)
~ (NOT / Invert)

### Logical

|| (Logical OR)
&& (Logical AND)
! (Logical NOT)

### Comparison

== (Equal)
!== (Not Equal)
< (Less Than)
> (Greater Than)
<== (Less or Equal)
>== (Greater or Equal)

### Shift

<< (Shift Left)
>> (Shift Right)

### Ternary

cond ? true_val : false_val

---




## Structural Conditioning

The when statement is used to define hardware paths (multiplexers or priority encoders). It is not procedural if logic; it describes which value drives a wire based on conditions.

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
    return {0 as u4, val[(W.width - 5)..0]}
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

cycle(): Advance one clock cycle.
cycle(n): Advance n clock cycles.
reset(n): Hold the global reset high for n cycles, then release.
print(msg, val): Print debug info during simulation.

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




## vctx.lark

```lark
// === vctx grammar ===

// === Templates ===
_list{x}: x (, x)*

// === Start ===
start: item+

?item: import_decl
     | component
     | struct_decl
     | bundle_decl
     | function_decl
     | sim_decl
     | formal_decl

import_decl: "import" import_path ("as" IDENT)?
?import_path: IDENT ("." IDENT)*

// === SIM & FORMAL BLOCKS ===
sim_decl: "sim" IDENT block
formal_decl: "formal" IDENT block

// === ATTRIBUTES ===
attribute: "@" IDENT ("(" expression ")")?

// === FUNCTIONS ===
function_decl: "function" IDENT "(" function_param_list? ")" ("->" type)? block
function_param_list: _list{typed_identifier}

// === COMPONENTS & GENERICS ===
component: attribute* generic_params? "component" IDENT "(" port_list? ")" block
generic_params: "<" _list{generic_param} ">"
generic_param: IDENT
port_list: _list{port}
port: IDENT IDENT ":" type

// === STRUCTS & BUNDLES ===
struct_decl: "struct" IDENT "{" struct_field_list? "}"
bundle_decl: "bundle" IDENT "{" bundle_field_list? "}"

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

return_statement: "return" expression

// --- DECLARATION / INITIALIZATION ---
DECL_KEYWORD: "wire" | "reg" | "sym"
?declaration: DECL_KEYWORD typed_identifier ("=" expression)?

// --- ASSIGNMENT ---
ASSIGN_OP: WIRE_ASSIGN_OP | SEQ_ASSIGN_OP
assignment: identifier_access ASSIGN_OP expression

// --- CONTROL FLOW ---
when_statement: when_clause+
?when_clause: "when" expression body
            | "elsewhen" expression body
            | "otherwise" body

// === EXPRESSIONS ===
?expression: ternary
?ternary: logical_or ("?" expression ":" ternary)?
?logical_or: logical_and (LOGICAL_OR_OP logical_and)*
?logical_and: bitwise_or (LOGICAL_AND_OP bitwise_or)*
?bitwise_or: bitwise_xor (BITWISE_OR_OP bitwise_xor)*
?bitwise_xor: bitwise_and (BITWISE_XOR_OP bitwise_xor)*
?bitwise_and: equality (BITWISE_AND_OP equality)*
?equality: comparison (EQUALITY_OP comparison)?
?comparison: shift (COMPARISON_OP shift)?
?shift: sum (SHIFT_OP sum)*
?sum: product (ADD_OP product)*
?product: unary (MUL_OP unary)*
?unary: UNARY_OP unary                -> unary_expression
      | primary_expression

?primary_expression: postfix cast_suffix?
?cast_suffix: "as" type               -> cast_expression
?postfix: (identifier_access | literal | "(" expression ")") postfix_op*

identifier_access: IDENT postfix_op*
postfix_op: "." IDENT                                 -> field_access
          | "[" expression "]"                        -> index_access
          | "[" expression ".." expression "]"        -> slice_access

?atom: literal
     | "(" expression ")"
     | concatenation_expr
     | function_call

?base_type: IDENT

// === FUNCTION CALL or INSTANTIATION ===
function_call: IDENT "(" argument_list? ")"
argument_list: _list{expression}
call_or_instantiation: (IDENT ":")? generic_args? identifier_access "(" connection_list? ")"
generic_args: "<" _list{expression} ">"
connection: (IDENT "--") ? expression
connection_list: _list{connection}

// === CONCATENATION ===
concatenation_expr: "{" _list{expression} "}"

// === OPERATOR TOKENS ===
LOGICAL_OR_OP: "||"
LOGICAL_AND_OP: "&&"
BITWISE_OR_OP: "|"
BITWISE_XOR_OP: "^"
BITWISE_AND_OP: "&"

WIRE_ASSIGN_OP: ":="
SEQ_ASSIGN_OP: "<="

EQEQ: "=="
NOT_EQEQ: "!="
LESS_EQEQ: "<=="
GREATER_EQEQ: ">="
LT: "<"
GT: ">"

EQUALITY_OP: EQEQ | NOT_EQEQ
COMPARISON_OP: LESS_EQEQ | GREATER_EQEQ | LT | GT

SHIFT_LEFT: "<<"
SHIFT_RIGHT: ">>"
SHIFT_OP: SHIFT_LEFT | SHIFT_RIGHT

PLUS: "+"
MINUS: "-"
ADD_OP: PLUS | MINUS

STAR: "*"
SLASH: "/"
PERCENT: "%"
MUL_OP: STAR | SLASH | PERCENT

NOT: "!"
TILDE: "~"
UNARY_OP: NOT | TILDE | MINUS

// === TYPES ===
type: base_type array_suffix*
array_suffix: "[" expression "]"

// === LITERALS ===
?literal: TYPED_NUMBER 
        | DECIMAL 
        | HEX 
        | BINARY 
        | BOOL_LIT 
        | STRING 
        | map_literal

map_literal: "{" _list{map_entry}? "}"
map_entry: literal ":" literal

TYPED_NUMBER: /[0-9]+[a-zA-Z][a-zA-Z0-9]*/
DECIMAL: /[0-9]+(_[0-9]+)*/
HEX: /0x[0-9a-fA-F]+(_[0-9a-fA-F]+)*/
BINARY: /0b[01]+(_[01]+)*/
BOOL_LIT: "true" | "false"
STRING: /"[^"]*"/

// === Identifiers ===
IDENT. -1: /[a-zA-Z_][a-zA-Z0-9_]*/

// === Whitespace & Comments ===
%import common.WS
%ignore WS

COMMENT: "//" /[^
]*/
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
