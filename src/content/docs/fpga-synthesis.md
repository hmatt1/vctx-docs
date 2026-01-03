---
title: FPGA Synthesis
description: The workflow for Yosys synthesis, Nextpnr P&R, and bitstream generation.
---

# Complete FPGA Flow

Because vctx compiles to standard SystemVerilog, it works seamlessly with open-source FPGA toolchains.

# Step-by-Step Example (Tang Nano 9K)

## Verify your design

```bash
vctx check examples/blinky.vctx
vctx test examples/blinky.vctx
```

## Generate SystemVerilog

```bash
vctx sv --top examples/blinky.vctx
# Creates: build/Blinky.sv
```

## Synthesize (Yosys)

```bash
yosys -p "read_verilog -sv build/Blinky.sv; \
          synth_gowin -top Blinky -json build/blinky.json" \
      -l build/synthesis.log
```

## Place & Route (nextpnr)

```bash
nextpnr-himbaechel \
    --device GW2A-LV18PG256C8/I7 \
    --json build/blinky.json \
    --write build/blinky_routed.json
```

## Pack Bitstream

```bash
gowin_pack -d GW2A-18C -o build/blinky.fs build/blinky_routed.json
```

## Program

```bash
openFPGALoader -b tangnano9k build/blinky.fs
```