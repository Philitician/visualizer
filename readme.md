# visualizer

> This cli is powered by [create-pastel-app](https://github.com/vadimdemedes/create-pastel-app)

## Install

```bash
$ npm install --global @philitician/visualizer
```

or use directly with npx

```bash
$ npx @philitician/visualizer
```

make sure to include your OPENAPI_API_KEY in your .env or .env.local file

```bash
# .env.local
OPENAPI_API_KEY=yourkeyhere
```

## CLI

```
$ @philitician/visualizer --help

  Usage
    $ @philitician/visualizer generate [options]

  Options
    --input <input>  Path to the input file (default: readme.md)
    --output <output>  Path to the output file (default: output/mermaid.md)
    --type <type>  Type of mermaid diagram to generate (default: graph)

  Examples
    $ npx @philitician/visualizer generate
    $ npx @philitician/visualizer generate --input your-markdown-input.md --output output/your-mermaid-output.md --type flowchart

```
