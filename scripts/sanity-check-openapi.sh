#!/usr/bin/env bash

set -euo pipefail

root="$(git rev-parse --show-toplevel)"
node_bin="$(command -v node || true)"

if [[ -z "$node_bin" ]]; then
  echo "Node.js is required to run the OpenAPI sanity check." >&2
  exit 1
fi

source_spec="$root/openapi.json"
english_spec="$root/openapi-en.json"
playground="$root/snippets/signed-api-playground.jsx"
build_script="$root/scripts/build-openapi-en.mjs"
sync_script="$root/scripts/sync-signed-api-playground.mjs"

for required_file in "$source_spec" "$english_spec" "$playground" "$build_script" "$sync_script"; do
  if [[ ! -f "$required_file" ]]; then
    echo "Required file is missing: $required_file" >&2
    exit 1
  fi
done

temp_dir="$(mktemp -d "${TMPDIR:-/tmp}/yeahpay-openapi-sanity.XXXXXX")"
trap 'rm -rf "$temp_dir"' EXIT
mkdir -p "$temp_dir/scripts"
cp "$source_spec" "$temp_dir/openapi.json"
cp "$build_script" "$temp_dir/scripts/build-openapi-en.mjs"

"$node_bin" "$temp_dir/scripts/build-openapi-en.mjs"

drift=()
if ! cmp -s "$temp_dir/openapi-en.json" "$english_spec"; then
  drift+=("openapi-en.json")
fi

if ! check_output="$("$node_bin" "$sync_script" --check 2>&1)"; then
  drift+=("snippets/signed-api-playground.jsx")
fi

if [[ ${#drift[@]} -eq 0 ]]; then
  echo "OpenAPI artifacts are synchronized."
  echo "$check_output"
  exit 0
fi

echo "OpenAPI artifacts are out of sync:"
printf -- "- %s\n" "${drift[@]}"
echo "Synchronizing generated artifacts..."

"$node_bin" "$build_script"
"$node_bin" "$sync_script" --write

"$node_bin" "$temp_dir/scripts/build-openapi-en.mjs"
if ! cmp -s "$temp_dir/openapi-en.json" "$english_spec"; then
  echo "English OpenAPI specification is still out of sync after regeneration." >&2
  exit 1
fi
"$node_bin" "$sync_script" --check

echo "OpenAPI artifacts were synchronized successfully."
