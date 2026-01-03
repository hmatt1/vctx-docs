title: Project Structure description: Learn about vctx file extensions, packages, and directory layout.Directory LayoutWhen you run vctx init, a standard project structure is created. vctx encourages a structured approach to hardware design.File ExtensionsSource files use the .vctx extension.Packages and Importsvctx uses a namespacing system similar to modern programming languages. You can import other packages to use their components or functions.Import Syntax// Import a package
import examples.counter3

// Import a package with an alias
import examples.counter4 as c4
Identifier ResolutionBase Identifier: counterField Access: bus.mosiQualified Name: examples.counter3.CountYou can use the CLI tools to inspect imports and symbols:# Show what a file imports
python vctx-cli.py imports examples/blinky.vctx

# Show all symbols
python vctx-cli.py project examples/blinky.vctx
