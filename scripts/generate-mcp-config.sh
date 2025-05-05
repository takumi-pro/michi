#!/bin/sh

# Check if GITHUB_PAT is set
if [ -z "$GITHUB_PAT" ]; then
  echo "Error: GITHUB_PAT environment variable is not set."
  echo "Please set it before running this script."
  echo "Example: export GITHUB_PAT='your_github_token'"
  exit 1
fi

# Check if FILESYSTEM_SRC_PATH is set
if [ -z "$FILESYSTEM_SRC_PATH" ]; then
  echo "Error: FILESYSTEM_SRC_PATH environment variable is not set."
  echo "Please set it before running this script."
  echo "Example: export FILESYSTEM_SRC_PATH='/path/to/your/blog/content'"
  exit 1
fi


# Generate mcp.json from mcp.jsonnet
echo "Generating .roo/mcp.json from .roo/mcp.jsonnet..."
jsonnet --ext-str GITHUB_PAT="$GITHUB_PAT" --ext-str FILESYSTEM_SRC_PATH="$FILESYSTEM_SRC_PATH" -o .roo/mcp.json .roo/mcp.jsonnet

if [ $? -eq 0 ]; then
  echo "Successfully generated .roo/mcp.json"
else
  echo "Error generating .roo/mcp.json"
  exit 1
fi
