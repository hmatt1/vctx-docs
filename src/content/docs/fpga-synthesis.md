title: FPGA Synthesis description: The workflow for Yosys synthesis, Nextpnr P&R, and bitstream generation.Complete FPGA FlowBecause vctx compiles to standard SystemVerilog, it works seamlessly with open-source FPGA toolchains.Step-by-Step Example (Tang Nano 9K)Verify your designvctx check examples/blinky.vctx
vctx test examples/blinky.vctx
Generate SystemVerilogvctx sv --top examples/blinky.vctx
# Creates: build/Blinky.sv
Synthesize (Yosys)yosys -p "read_verilog -sv build/Blinky.sv; \
          synth_gowin -top Blinky -json build/blinky.json" \
      -l build/synthesis.log
Place & Route (nextpnr)nextpnr-himbaechel \
    --device GW2A-LV18PG256C8/I7 \
    --json build/blinky.json \
    --write build/blinky_routed.json
Pack Bitstreamgowin_pack -d GW2A-18C -o build/blinky.fs build/blinky_routed.json
ProgramopenFPGALoader -b tangnano9k build/blinky.fs
