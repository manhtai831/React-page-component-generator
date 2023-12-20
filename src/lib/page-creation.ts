import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";


let pageFileTemplate = `
import { PROVIDER_NAMEProvider } from "./provider";

function PAGE_NAMEPage() {
    return (
        <PROVIDER_NAMEProvider>
            <View />
        </PROVIDER_NAMEProvider>
    );
 }
 
function View() {
    return (
        <div>
            PAGE_NAMEPage
        </div>
    );
}
 
export default PAGE_NAMEPage
`;


let providerFileTemplate = `
import { ReactElement, createContext, useContext } from "react";


const PROVIDER_NAMEContext = createContext<PROVIDER_NAMEType>(null!)

interface PROVIDER_NAMEType {

}

export function useProvider(){
	return useContext(PROVIDER_NAMEContext)
} 


export function PROVIDER_NAMEProvider({ children }: { children: ReactElement }) {

	const value = {

    }
	return (
		<Context.Provider value={value}>
			{children}
		</Context.Provider>
	)
}
`;


export async function createPage(clickedFolder: vscode.Uri) {
    const inputComponentName = await vscode.window.showInputBox({
        prompt: "Enter the page name",
    });

    if (!inputComponentName) {
        vscode.window.showErrorMessage("Page name is required");
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

        const componentFile = 'index.tsx';
        const providerFile = 'provider.tsx';

        const providerContent = providerFileTemplate.replace(
            /PROVIDER_NAME/g,
            componentUpper
        );

        const pageContent = pageFileTemplate.replace(
            /PAGE_NAME/g,
            componentUpper
        ).replace(/PROVIDER_NAME/g,componentUpper)

        const files = [
            { name: componentFile, content: pageContent },
            { name: providerFile, content: providerContent },
        ];

        files.forEach((file) => {
            fs.writeFileSync(path.join(componentFolder, file.name), file.content);
        });

        vscode.window.showInformationMessage(
            `${componentName} created successfully`
        );
    } catch (error: any) {
        vscode.window.showErrorMessage(
            `Error creating component: ${error.message}`
        );
    }
}