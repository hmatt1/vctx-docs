title: Maps & Lookup Tables description: Syntax for defining and using static maps/dictionaries.Map Literalsvctx supports map literals, which are useful for creating lookup tables or configuration maps.Syntax{ key: value, key2: value2 }
Grammar Definitionmap_literal: "{" _list{map_entry}? "}"
map_entry: literal ":" literal
These are typically used within function definitions or attributes to pass structured static data.