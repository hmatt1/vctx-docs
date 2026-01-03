// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: "https://hmatt1.github.io/",
    base: "/vctx-docs/",
    integrations: [
        starlight({
            title: 'vctx',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/hmatt1/vctx-lang' }],
            sidebar: [
                {
                    label: 'Welcome',
                    items: [
                        // Covers installation, the "vctx init" command, and setting up a workspace.
                        { label: 'Getting Started', slug: 'getting-started' },
                        // Explains the difference between Combinational (:=) and Sequential (<=) logic, and the global clock/reset model.
                        { label: 'Core Concepts', slug: 'core-concepts' },
                        // Details file extensions, import syntax, package management, and directory layout.
                        { label: 'Project Structure', slug: 'project-structure' },
                        // Explains the compiler backend, MLIR generation, and integration with the CIRCT ecosystem.
                        { label: 'Built on CIRCT', slug: 'built-on-circt' },
                        // Discusses why vctx is "structural" not "procedural", and the philosophy behind explicit timing.
                        { label: 'Language Philosophy', slug: 'language-philosophy' },
                    ],
                },
                {
                    label: 'Language Reference',
                    items: [
						// Covers comments and basic syntax rules
            			{ label: 'Syntax Basics', slug: 'syntax-basics' },
                        // Defining modules, input/output directionality, and instantiation syntax.
                        { label: 'Components & Ports', slug: 'components-and-ports' },
                        // The distinction between immediate connections (wire) and state elements (reg).
                        { label: 'Wires & Registers', slug: 'wires-and-registers' },
                        // Rules for combinational (:=), sequential (<=), and declarative (=) operators.
                        { label: 'Assignments', slug: 'assignments' },
                        // primitive types (u8, bool), type inference, and literal formats.
                        { label: 'Types & Literals', slug: 'types-and-literals' },
                        // Slicing, concatenation, and indexing of vectors.
                        { label: 'Arrays & Slicing', slug: 'types-and-literals' },
                        // Converting between types using explicit casts.
                        { label: 'Casting', slug: 'casting' },
                        // Syntax for defining and using static maps/dictionaries.
                        { label: 'Maps & Lookup Tables', slug: 'maps-and-lookups' },
						// Covers comments and basic syntax rules
            			{ label: 'Syntax Basics', slug: 'syntax-basics' },
                        // Math, bitwise logic, concatenation, and range slicing rules (MSB..LSB).
                        { label: 'Operators & Expressions', slug: 'operators-and-expressions' },
                        // Using 'when/elsewhen/otherwise' to define multiplexers and priority encoders.
                        { label: 'Control Flow (When)', slug: 'control-flow' },
                        // Data structs vs. Protocol Bundles (interfaces with to/from directionality).
                        { label: 'Structs & Bundles', slug: 'structs-and-bundles' },
                        // Writing pure, inlined combinational logic for reuse.
                        { label: 'Functions', slug: 'functions' },
                        // Creating parameterized components using compile-time widths (e.g., Adder<WIDTH>).
                        { label: 'Generics', slug: 'generics' },
                        // Using decorators like @attribute for synthesis or simulation hints.
                        { label: 'Attributes', slug: 'attributes' },
						// Explicitly covers import syntax and aliasing
						{ label: 'Imports & Namespaces', slug: 'imports-and-namespaces' },
                        // Writing explicit testbenches with 'cycle()', 'reset()', and concrete assertions.
                        { label: 'Simulation Blocks', slug: 'simulation-blocks' },
                        // Writing formal proofs using 'sym' values to verify properties for all inputs.
                        { label: 'Formal Verification', slug: 'formal-verification' },
                        // Built-in helpers like assert(), assume(), cover(), and print().
                        { label: 'Intrinsic Functions', slug: 'intrinsic-functions' },
                        // The raw EBNF/Lark grammar specification for parser developers.
                        { label: 'Grammar Specification', slug: 'grammar-specification' },
                    ],
                },
                {
                    label: 'Tooling',
                    items: [
                        // Standard commands: check, test, sim, formal, and build.
                        { label: 'CLI Reference', slug: 'cli-reference' },
                        // Features and setup for the VS Code extension.
                        { label: 'VS Code Plugin', slug: 'vscode-plugin' },
                        // Details on the built-in Language Server Protocol features (symbol resolution, checking).
                        { label: 'LSP Server', slug: 'lsp-server' },
                        // The workflow for Yosys synthesis, Nextpnr P&R, and bitstream generation.
                        { label: 'FPGA Synthesis', slug: 'fpga-synthesis' },
						// Covers 'ast', 'regen', 'tokens', and other developer-focused commands.
						{ label: 'Compiler Internals', slug: 'compiler-internals' },
                    ],
                },
                {
                    label: 'Showcase',
                    items: [
                        // A "Hello World" LED blinker example.
                        { label: 'Blinky', slug: 'blinky' },
                        // A complete UART transmitter/receiver implementation.
                        { label: 'UART', slug: 'uart' },
                        // Demonstrating Bundle usage with a Serial Peripheral Interface controller.
                        { label: 'SPI Controller', slug: 'spi-controller' },
                        // A FIFO buffer example emphasizing formal verification properties.
                        { label: 'FIFO Buffer', slug: 'fifo-buffer' },
                    ],
                },
            ],
        }),
    ],
});