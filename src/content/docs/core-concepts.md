title: Core Concepts 
description: Understand the fundamental difference between combinational and sequential logic in vctx.Combinational vs. SequentialOne of the primary goals of vctx is to eliminate confusion between immediate logic and clocked logic.:= Combinational (Wires): Represents an immediate connection. Used for logic that reacts instantly to input changes.<= Sequential (Registers): Represents a clocked update. Used for logic that changes state only on the next clock edge.= Declaration: Used only for defining initial values or reset states during variable declaration.Global Clock and Resetvctx simplifies hardware design by assuming a standard synchronous model:Single, global clock: clkSingle, global reset: rstYou do not need to manually route these signals; the compiler handles them for reg updates automatically.Examplecomponent LogicDemo(in switch: bool, out led: bool) {
    // Continuous connection: reacts instantly
    wire combined: bool
    combined := switch & true 

    // Sequential state: updates on clock edge
    // Reset value (0) is automatically applied via global rst
    reg state: u1 = 0
    state <= ~state
    
    led := state as bool
}
