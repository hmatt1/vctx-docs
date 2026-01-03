title: Functions description: Writing pure, inlined combinational logic for reuse.Pure Logic ReuseFunctions in vctx provide a way to reuse combinational logic. They are always inlined (zero hardware overhead) and cannot contain state (no reg allowed).Syntaxfunction name(args) -> return_type {
    // logic
    return expression
}
Example: Parity Calculatorfunction get_parity(data: u8) -> bool {
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
