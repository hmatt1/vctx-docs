---
title: Grammar Specification
description: The raw EBNF/Lark grammar specification for parser developers.
---

# vctx.lark

```lark
// === vctx grammar ===

// === Templates ===
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

import_decl: "import" import_path ("as" IDENT)?
?import_path: IDENT ("٠" IDENT)*

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