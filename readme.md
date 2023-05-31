# visualizer

> This cli is powered by [create-pastel-app](https://github.com/vadimdemedes/create-pastel-app)

## Install

add to your project

```bash
$ npm install @philitician/visualizer
$ yarn add @philitician/visualizer
$ pnpm add @philitician/visualizer
```

or use directly with npx

```bash
$ npx @philitician/visualizer generate
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
    --input <input>  Path to the input file (default: ./readme.md)
    --output <output>  Path to the output folder (default: ./output)
    --type <type>  Type of mermaid diagram to generate (default: graph)

  Supported diagram types:
    - graph
    - flowchart
    - sequenceDiagram
    - classDiagram
    - stateDiagram
    - gantt
    - pie
    - er
    - journey

  Examples
    $ npx @philitician/visualizer generate
    $ npx @philitician/visualizer generate --input my-markdown-file.md --output my-output-folder --type flowchart

```
