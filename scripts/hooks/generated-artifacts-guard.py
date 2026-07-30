#!/usr/bin/env python3

import json
import re
import sys
from pathlib import Path


def deny(reason: str) -> None:
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }))


try:
    payload = json.load(sys.stdin)
except Exception:
    sys.exit(0)

tool_input = payload.get("tool_input")
if not isinstance(tool_input, dict):
    sys.exit(0)

edit_text = "\n".join(
    str(tool_input.get(key, ""))
    for key in ("command", "patch", "input", "content", "old_string", "new_string")
)
targets = [
    str(tool_input.get(key, ""))
    for key in ("file_path", "path")
    if tool_input.get(key)
]
targets.extend(re.findall(
    r"^\*\*\* (?:Add|Delete|Update) File: (.+)$",
    edit_text,
    flags=re.MULTILINE,
))


def targets_file(suffix: str) -> bool:
    normalized_suffix = suffix.replace("\\", "/")
    return any(
        str(Path(target)).replace("\\", "/").endswith(normalized_suffix)
        for target in targets
    )


if targets_file("openapi-en.json"):
    deny(
        "The English OpenAPI specification is generated. "
        "Edit openapi.json and run the synchronization script instead."
    )
    sys.exit(0)

generated_tokens = (
    "BEGIN AUTO-GENERATED OPENAPI OPERATIONS",
    "operationDefinitions",
    "summaryZh",
    "summaryEn",
    "sampleBody",
)
if (
    targets_file("snippets/signed-api-playground.jsx")
    and any(token in edit_text for token in generated_tokens)
):
    deny(
        "The OpenAPI operation block is generated. "
        "Edit openapi.json; the hooks will synchronize it."
    )
