---
title: LSP Server
description: Details on the built-in Language Server Protocol features.
---

# Built-in Server

vctx includes a full Language Server Protocol implementation in the CLI. This allows any editor that supports LSP (VS Code, Neovim, Emacs) to provide rich language features.

# Commands

```bash
# Start the built-in language server for IDE integration
vctx lsp

# Test a specific LSP command
vctx lsp --test-command vctx.sayHello
```

# Debugging

If you are developing editor integration:

```bash
# Run an external language server (for debugging)
vctx lsp -- path/to/custom/server --stdio
```