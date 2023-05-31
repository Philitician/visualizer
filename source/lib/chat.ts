import {ChatOpenAI} from 'langchain/chat_models/openai';
import {HumanChatMessage, SystemChatMessage} from 'langchain/schema';

const chat = new ChatOpenAI({
	modelName: 'gpt-3.5-turbo',
});

// const primerWithFileStructure = `
// You are an assistant to help users build diagram with Mermaid.
// You will combine both a project file structure and a description to generate a Mermaid code block.
// You only need to return the output Mermaid code block.
// Do not include any description, do not include the \`\`\`.
// Code (no \`\`\`):
// `;

const createDiagramPrimer = (diagramType: string) => `
You are an assistant to help users build a ${diagramType} diagram with Mermaid.
You only need to return the output Mermaid code block.
Do not include any description, do not include the \`\`\`.
Code (no \`\`\`):
`;

export async function generateMermaidCode(
	fileInput: string,
	diagramType: string = 'graph',
) {
	const primer = createDiagramPrimer(diagramType);
	const res = await chat.call([
		new SystemChatMessage(primer),
		new HumanChatMessage(fileInput),
	]);
	const mermaidCode = res.text.trim();
	return mermaidCode;
}
