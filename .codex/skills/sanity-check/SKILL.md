---
name: sanity-check
description: Check and repair synchronization between the YeahPay source OpenAPI specification, its generated English specification, and the generated operation block in the signed API playground. Use after OpenAPI changes, before finishing OpenAPI-related work, or when the user asks to sanity-check, verify, repair, or synchronize API documentation artifacts.
---

# Sanity Check

## Workflow

1. Run from anywhere inside the YeahPay Mintlify repository:

   ```bash
   bash "$(git rev-parse --show-toplevel)/scripts/sanity-check-openapi.sh"
   ```

2. Let the script compare the source specification with a freshly generated English specification and check the signed API playground.
3. If drift exists, let the script rebuild and synchronize the generated artifacts automatically.
4. Confirm the script's final verification succeeds.
5. Run `mint validate` with a supported Node.js runtime before completing the OpenAPI-related task.
6. Report whether the artifacts were already synchronized or which artifacts were repaired.

Do not edit generated artifacts manually. If synchronization fails, preserve the error output and fix the source specification or synchronization scripts instead.
