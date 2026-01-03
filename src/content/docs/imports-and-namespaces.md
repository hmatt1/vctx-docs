title: Imports & Namespaces description: Explicitly covers import syntax and aliasing.Importing PackagesCode reusability is managed via import statements at the top of a file.import path.to.package
import path.to.other as alias
ScopingWhen you import a package, you can access its contents using dot notation.package.Componentpackage.subpackage.FunctionResolving SymbolsYou can use the CLI to debug namespace issues:# Look up a specific identifier in a given scope
python vctx-cli.py resolve-symbol --ident counter --scope Blinky --package examples.blinky
