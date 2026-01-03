title: Components & Ports description: Defining modules, input/output directionality, and instantiation.Defining ComponentsComponents are the building blocks of vctx designs. They are defined with inputs and outputs in a port list.component Blinky(output led: u1) {
    // Body...
}
Port Directionin: Input signal.out: Output signal.output: Alias for out.InstantiationYou can instantiate other components within a component.// Syntax: ComponentName(connection_list)
Blinky(led: my_wire)

// Named instantiation
// Syntax: InstanceName : ComponentName(connection_list)
led_driver : Blinky(led: my_wire)
The first identifier is the optional instance name (e.g., led_driver). The second identifier is the component name (e.g., Blinky).