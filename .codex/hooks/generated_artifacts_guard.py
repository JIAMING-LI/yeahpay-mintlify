#!/usr/bin/env python3

import os
import subprocess
import sys
from pathlib import Path


root = Path(subprocess.check_output(
    ["git", "rev-parse", "--show-toplevel"],
    text=True,
).strip())
os.execv(
    sys.executable,
    [sys.executable, str(root / "scripts/hooks/generated-artifacts-guard.py")],
)
