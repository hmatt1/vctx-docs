title: Control Flow (When) description: Using 'when', 'elsewhen', and 'otherwise' to define multiplexers.Structural ConditioningThe when statement is used to define hardware paths (multiplexers or priority encoders). It is not procedural if logic; it describes which value drives a wire based on conditions.Syntaxwhen condition {
    // statement
} elsewhen condition2 {
    // statement
} otherwise {
    // statement
}
Examplewire out: u8 = 0 // Default value prevents latches

when select == 0 {
    out := data_a
} elsewhen select == 1 {
    out := data_b
} otherwise {
    out := 0xFF
}
If you do not provide an otherwise block, and the conditions are not met, the wire will retain its default declaration value.