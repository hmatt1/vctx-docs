title: Attributes description: Using decorators for synthesis or simulation hints.Attribute SyntaxAttributes are decorators attached to components to provide hints to the compiler, synthesizer, or simulation tools. They start with an @ symbol.Grammarattribute: "@" IDENT ("(" expression ")")?
UsageAttributes can be placed before a component definition.@keep_hierarchy
@frequency(50_000_000)
component TopLevel(...) { ... }
