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
		.describe('Path to input md of mdx file'),
	output: z
		.string()
		.default('output/mermaid.md')
		.describe('Path to output mdx file'),
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

export default function Index({options: {input, output}}: Props) {
	const filePath = path.resolve(process.cwd(), input);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const [mermaidCode, setMermaidCode] = useState<string | undefined>();
	const generateMermaidCodeAsync = async () => {
		const code = await generateMermaidCode(fileContent);
		fs.writeFileSync(output, code);
		setMermaidCode(code);
	};

	useEffect(() => {
		if (!fileContent) return;
		generateMermaidCodeAsync();
	}, [fileContent]);

	return (
		<Text>
			{mermaidCode && (
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
