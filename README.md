# AI-Assisted Reverse Engineering Lab (OpenCode + REA + Ghidra)

A hands-on reverse engineering learning environment powered by
[OpenCode](https://opencode.ai/), [REA (Reverse Engineer Anything)](https://github.com/morluto/rea),
and [Ghidra](https://github.com/NationalSecurityAgency/ghidra).

This repository explores AI-assisted reverse engineering workflows,
using REA to connect AI agents with reverse engineering tools through
the Model Context Protocol (MCP), and Ghidra for binary analysis,
disassembly, decompilation, and program inspection.

---

## 1. Architecture & Prerequisites

- **OS:** Windows 11
- **AI Agent:** [OpenCode](https://opencode.ai/)
- **MCP Server:** [REA: Reverse Engineer Anything](https://github.com/morluto/rea)
- **Reverse Engineering Framework:** [Ghidra](https://github.com/NationalSecurityAgency/ghidra) (`12.2`)
- **Java Runtime:** JDK 25
- **Node.js:** `v24.11+`

---

## 2. Environment Configuration (Windows 11)

Configure the following environment variable in PowerShell so REA can locate your Ghidra installation:

```powershell
setx GHIDRA_INSTALL_DIR "C:\Tools\ghidra"
```

**Note:** Replace the path with your actual Ghidra installation directory.

After running `setx`, open a new PowerShell window to ensure the environment variable is available.

Make sure Java 25 is installed and accessible through your system PATH.

---

## 3. Project Setup

Install `rea-agents` locally inside your project directory to keep dependencies isolated and organized.

```powershell
npm init -y
npm install rea-agents@latest
```

### OpenCode Configuration

Ensure the REA MCP server is registered directly under the `mcp` configuration section in `opencode.json`.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "@dietrichgebert/ponytail"
  ],
  "mcp": {
    "rea": {
      "type": "local",
      "command": ["npx", "--no-install", "rea-agents", "mcp"]
    }
  }
}
```

## 4. Running the Lab

Always launch OpenCode from the project directory containing `node_modules` so the locally installed REA MCP server can be resolved correctly.

```powershell
opencode
```

Once OpenCode starts, verify that the REA MCP tools are available before beginning an analysis session.

### Recommended Workflow

1. Open the target binary in Ghidra.
2. Allow Ghidra to perform its initial analysis.
3. Start OpenCode from the project directory.
4. Use the REA tools to interact with Ghidra and inspect the target binary.
5. Ask the AI agent to investigate functions, cross-references, strings, and control flow.
6. Verify the agent's findings against Ghidra's disassembly and decompiled output.

---

## 5. Practice Targets

This repository includes several practice targets designed to develop reverse engineering skills progressively.

### `task-1.js` — Beginner

**Focus:**
- Initial program triage.
- Basic string decoding (Base64).
- Understanding simple conditional logic.
- Identifying input validation routines.

**Expected Key:** `Secret-2026`

### `task-2.js` — Intermediate

**Focus:**
- Identifying and avoiding decoy strings.
- Reversing XOR encoding (`0x13`) and hexadecimal transformations.
- Understanding nested validation logic.
- Tracing execution paths to identify successful validation conditions.

**Expected Key:** `REA-2026-WIN`

### `target-1.exe` — Native PE x86_64

**Target:** A copy of the Windows `hostname.exe` executable.

**Focus:**
- Understanding the PE executable format.
- Identifying the program entry point.
- Following the CRT startup sequence to `wmain`.
- Investigating Windows API calls, including:
  - `WSAStartup`
  - `GetHostNameW`
  - `FormatMessageW`
- Understanding function calls, imports, and control flow in native Windows binaries.

---

## 6. CrackMe Analysis Prompt Template

Use the following prompt in OpenCode when analyzing a new CrackMe executable.

```text
Analyze the binary `<FILENAME.exe>` using REA tools and Ghidra.

Perform the following steps sequentially. Support your findings with
evidence, including memory addresses, relevant strings, cross-references,
and decompiled pseudocode.

1. Initial Triage:
   - Identify the binary format and target architecture.
   - Inspect relevant imports, exports, and program metadata.
   - Search for strings related to user input, passwords, licenses,
     success messages, and failure messages.

2. Function Discovery:
   - Trace cross-references (XREFs) from relevant success and failure
     strings.
   - Identify the functions responsible for input validation.
   - Follow the execution flow to locate the main validation routine.

3. Code Analysis:
   - Decompile the identified validation functions.
   - Explain the validation logic step by step in simple language.
   - Identify relevant conditional branches, comparisons,
     transformations, and dependencies.

4. Validation Reconstruction:
   - Reconstruct the correct password or key if possible.
   - Otherwise, explain the exact conditions required to reach
     the successful execution path.
   - Show the reasoning and evidence behind the conclusion.

5. Verification:
   - Cross-check the findings against Ghidra's disassembly
     and decompiled pseudocode.
   - Identify any assumptions, unresolved questions, or skipped
     analysis steps.
   - Clearly distinguish verified findings from hypotheses.

Do not guess missing information. If a conclusion cannot be verified,
explain what additional analysis is required.
```

---

## 7. Security Guidelines

- Only analyze binaries that you own, open-source software, or legally authorized CTF and CrackMe challenges.
- Never execute unfamiliar binaries directly on your primary Windows installation.
- Use **Windows Sandbox** or an isolated **Virtual Machine (VM)** when inspecting potentially malicious or untrusted executables.
- Keep snapshots of your analysis environment so you can safely restore it when necessary.
- Treat decompiled code and AI-generated analysis as evidence to investigate, not automatically verified facts.

---

## 8. Learning Objectives

By working through this lab, the primary learning objectives are:

- Develop a practical understanding of reverse engineering workflows.
- Learn to navigate Ghidra's disassembler and decompiler.
- Understand PE binaries, functions, imports, strings, and cross-references.
- Analyze program control flow and reconstruct validation logic.
- Use REA MCP tools to give AI agents access to reverse engineering capabilities.
- Develop effective AI-assisted analysis workflows while independently verifying technical findings.

**The ultimate goal is not just to make an AI agent analyze a binary, but to understand how and why the binary behaves the way it does.**

---

## Credits & References

This lab is built upon the following open-source projects:

- **[REA – Reverse Engineer Anything](https://github.com/morluto/rea)**
  by [morluto](https://github.com/morluto) — Provides AI agents
  with reverse engineering capabilities through MCP.

- **[Ghidra](https://github.com/NationalSecurityAgency/ghidra)**
  by the National Security Agency (NSA) — Software reverse
  engineering framework for binary analysis and decompilation.

- **[OpenCode](https://github.com/anomalyco/opencode)**
  — AI coding agent used to orchestrate the analysis workflow.

All trademarks and project names belong to their respective owners.
Please refer to the original repositories for their respective licenses.