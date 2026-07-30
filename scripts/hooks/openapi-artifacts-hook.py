#!/usr/bin/env python3

import json
import shutil
import subprocess
import sys
from pathlib import Path


mode = sys.argv[1] if len(sys.argv) > 1 else "stop"
if mode not in {"post", "stop"}:
    raise SystemExit("Usage: openapi-artifacts-hook.py [post|stop]")

try:
    payload = json.load(sys.stdin)
except Exception:
    payload = {}

root = Path(subprocess.check_output(
    ["git", "rev-parse", "--show-toplevel"],
    text=True,
).strip())


def run(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        args,
        cwd=root,
        text=True,
        capture_output=True,
    )


def details(result: subprocess.CompletedProcess[str]) -> str:
    return "\n".join(filter(None, [
        result.stdout.strip(),
        result.stderr.strip(),
    ]))


def block(event: str, reason: str) -> None:
    output = {
        "decision": "block",
        "reason": reason,
    }
    if event == "PostToolUse":
        output["hookSpecificOutput"] = {
            "hookEventName": event,
            "additionalContext": reason,
        }
    print(json.dumps(output))


sync = run("bash", "scripts/sanity-check-openapi.sh")
if sync.returncode != 0:
    reason = f"Automatic OpenAPI synchronization failed.\n{details(sync)}".strip()
    if mode == "post":
        block("PostToolUse", reason)
    elif not payload.get("stop_hook_active"):
        block("Stop", reason)
    else:
        print("{}")
    sys.exit(0)

if mode == "post":
    if "were synchronized successfully" in sync.stdout:
        print(json.dumps({
            "hookSpecificOutput": {
                "hookEventName": "PostToolUse",
                "additionalContext": (
                    "OpenAPI-derived files were synchronized automatically. "
                    "Do not edit generated artifacts directly."
                ),
            }
        }))
    else:
        print("{}")
    sys.exit(0)

mint = shutil.which("mint")
if not mint:
    reason = "Mintlify CLI is required. Install it before completing this task."
    if not payload.get("stop_hook_active"):
        block("Stop", reason)
    else:
        print("{}")
    sys.exit(0)

validation = run(mint, "validate")
if validation.returncode != 0:
    reason = f"Mintlify validation failed.\n{details(validation)}".strip()
    if not payload.get("stop_hook_active"):
        block("Stop", reason)
    else:
        print("{}")
    sys.exit(0)

print("{}")
