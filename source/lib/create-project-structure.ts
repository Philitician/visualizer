import fs from 'fs';

const excludedFiles = [
	'.git',
	'.next',
	'dist',
	'.cache',
	'.vscode',
	'.idea',
	'.github',
	'.gitignore',
	'.gitattributes',
	'.gitpod',
	'.gitpod.yml',
	'.gitpod.Dockerfile',
	'.gitpod.do',
	'node_modules',
];

export const createProjectStructure = () => {
	const files = fs.readdirSync(process.cwd(), {withFileTypes: true});
	const fileStructure = files
		.filter(file => !excludedFiles.includes(file.name))
		.map(file => {
			if (file.isDirectory()) {
				const directoryName = file.name;
				const nestedFiles = fs.readdirSync(directoryName, {
					withFileTypes: true,
				});
				const nestedFileStructure = nestedFiles
					.map(nestedFile => {
						if (nestedFile.isDirectory()) {
							return `${directoryName}/${nestedFile.name}`;
						}
						return `${directoryName}/${nestedFile.name}`;
					})
					.join('\n');
				return `${directoryName}\n${nestedFileStructure}`;
			}
			return file.name;
		})
		.join('\n');
	return fileStructure;
};
