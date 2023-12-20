import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";


let componentFileTemplate = `import React from 'react';

const COMPONENT_NAME = () => {
	return (
		<div>
		COMPONENT_NAME
		</div>
	);
};

export default COMPONENT_NAME;
`;


export async function createComponent(clickedFolder: vscode.Uri) {
    const inputComponentName = await vscode.window.showInputBox({
        prompt: "Enter the component name",
    });

    if (!inputComponentName) {
        vscode.window.showErrorMessage("Component name is required");
        return;
    }

    if (!clickedFolder) {
        vscode.window.showErrorMessage("No folder selected");
        return;
    }

    const targetFolder = clickedFolder.fsPath;
    let componentName = inputComponentName
    if (componentName.includes('/')) {
        const splits = componentName.split('/')
        const name = splits.at(splits.length - 1)
        if (name) {
            componentName = name
        }
    }
    const componentUpper = componentName.charAt(0).toUpperCase() + componentName.slice(1).replace(/(_\w)/g, k => k[1].toUpperCase())

    const componentFolder = path.join(targetFolder, inputComponentName);


    try {
        fs.mkdirSync(componentFolder, { recursive: true });

        const config = vscode.workspace.getConfiguration(
            "react-component-generator"
        );

        const componentFile = config.get("componentFile") as string;
        const testFile = config.get("testFile") as string;

        const componentContent = componentFileTemplate.replace(
            /COMPONENT_NAME/g,
            componentUpper
        );

        const files = [
            { name: componentFile, content: componentContent },
        ];

        files.forEach((file) => {
            const fileName = file.name.replace(
                /\$COMPONENT_NAME/g,
                componentName
            );
            const fileContent = file.content.replace(
                /\$COMPONENT_NAME/g,
                componentName
            );
            fs.writeFileSync(path.join(componentFolder, fileName), fileContent);
        });

        vscode.window.showInformationMessage(
            `Component ${componentName} created successfully`
        );
    } catch (error: any) {
        vscode.window.showErrorMessage(
            `Error creating component: ${error.message}`
        );
    }
}