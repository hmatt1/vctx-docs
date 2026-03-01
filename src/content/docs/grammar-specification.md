---
title: Grammar Specification
description: The EBNF/Lark grammar specification
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