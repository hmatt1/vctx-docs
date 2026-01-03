title: LSP Server description: Details on the built-in Language Server Protocol features.Built-in Servervctx includes a full Language Server Protocol implementation in the CLI. This allows any editor that supports LSP (VS Code, Neovim, Emacs) to provide rich language features.Commands# Start the built-in language server for IDE integration
vctx lsp

# Test a specific LSP command
vctx lsp --test-command vctx.sayHello
DebuggingIf you are developing editor integration:# Run an external language server (for debugging)
vctx lsp -- path/to/custom/server --stdio
