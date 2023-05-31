// A command that reads a markdown or mdx file with and returns the last line of it
import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
import z from 'zod';
import fs from 'fs';
import path from 'path';
import {generateMermaidCode} from '../lib/chat.js';

export const options = z.object({
	// input is a path relative to the user's current working directory
	input: z
		.string()
		.default('readme.md')
		.describe('Path to input md or mdx file'),
	output: z.string().default('output').describe('Path to output folder'),
	type: z
		.enum([
			'graph',
			'flowchart',
			'sequenceDiagram',
			'classDiagram',
			'stateDiagram',
			'gantt',
			'pie',
			'er',
			'journey',
		])
		.default('graph')
		.describe('Type of mermaid diagram'),
});

type Props = {
	options: z.infer<typeof options>;
};

const writeOutput = (output: string, content: string, type: string) => {
	const outputDir = path.resolve(process.cwd(), output);
	if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, {recursive: true});
	const filePath = `${outputDir}/${type}.md`;
	fs.writeFileSync(filePath, content);
};

export default function Index({options: {input, output, type}}: Props) {
	const filePath = path.resolve(process.cwd(), input);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const [mermaidContent, setMermaidContent] = useState<string | undefined>();
	const generateMermaidCodeAsync = async () => {
		const content = await generateMermaidCode(fileContent, type);
		writeOutput(output, content, type);
		setMermaidContent(content);
	};

	useEffect(() => {
		if (!fileContent) return;
		generateMermaidCodeAsync();
	}, [fileContent]);

	return (
		<Text>
			{mermaidContent && (
				<Text>
					<Text color="green">Success!</Text>
					<Text>
						{' '}
						Generated mermaid code from {input} and saved it to {output}
					</Text>
				</Text>
			)}
		</Text>
	);
}
