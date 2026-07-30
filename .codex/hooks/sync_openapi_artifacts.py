#!/usr/bin/env python3

import os
import subprocess
import sys
from pathlib import Path


mode = sys.argv[1] if len(sys.argv) > 1 else "check"
shared_mode = "post" if mode == "post" else "stop"
root = Path(subprocess.check_output(
    ["git", "rev-parse", "--show-toplevel"],
    text=True,
).strip())
os.execv(
    sys.executable,
    [
        sys.executable,
        str(root / "scripts/hooks/openapi-artifacts-hook.py"),
        shared_mode,
    ],
)
