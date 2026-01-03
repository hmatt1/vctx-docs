title: Generics description: Creating parameterized components using compile-time widths.Parameterized ComponentsGeneric parameters enable compile-time parameterization. Each unique instantiation creates a separate hardware module with the specified width or configuration.SyntaxDefine generics using < > after the component or function name.component Adder<WIDTH>(in a: uWIDTH, in b: uWIDTH, out sum: uWIDTH) {
    sum := a + b
}
InstantiationUse the -- syntax in the connection list to map generics if needed (or simply instantiate with type inference if supported).// Creates Adder_8 module
Adder<8> add8(a -- x8, b -- y8, sum -- z8)      

// Creates Adder_16 module
Adder<16> add16(a -- x16, b -- y16, sum -- z16) 
Generic FunctionsYou can also use generics in functions for width-agnostic logic.function <W> mask_upper(val: W) -> W {
    return {0 as u4, val[(W.width - 5)..0]}
}
