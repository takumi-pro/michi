{
  mcpServers: {
    github: {
      command: "docker",
      args: [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: std.extVar('GITHUB_PAT'),
      }
    },
    "filesystem": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--mount", 'type=bind,src=' + std.extVar('FILESYSTEM_SRC_PATH') + ',dst=/projects/blog',
        "mcp/filesystem",
        "/projects"
      ],
      "env": {
        FILESYSTEM_SRC_PATH: std.extVar('FILESYSTEM_SRC_PATH'),
      }
    }
  }
}
