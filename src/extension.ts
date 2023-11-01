import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

let componentFileTemplate = `import React from 'react';
import styles from './COMPONENT_NAME.module.scss';

const COMPONENT_NAME = () => {
	return (
	<>
		<div className={styles.COMPONENT_NAME}>
		COMPONENT_NAME
		</div>
	</>
	);
};

export default COMPONENT_NAME;
`;

const testFileTemplate = `import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import COMPONENT_NAME from './COMPONENT_NAME';

describe('COMPONENT_NAME', () => {
  test('renders COMPONENT_NAME component', () => {
    render(<COMPONENT_NAME />);
    expect(screen.getByText(/COMPONENT_NAME/i)).toBeInTheDocument();
  });
});
`;

const indexFileTemplate = `export { default } from './COMPONENT_NAME';\n`;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "react-component-generator.createComponent",
    async (clickedFolder: vscode.Uri) => {
      const componentName = await vscode.window.showInputBox({
        prompt: "Enter the component name",
      });

      if (!componentName) {
        vscode.window.showErrorMessage("Component name is required");
        return;
      }

      if (!clickedFolder) {
        vscode.window.showErrorMessage("No folder selected");
        return;
      }

      const targetFolder = clickedFolder.fsPath;
      const componentFolder = path.join(targetFolder, componentName);

      try {
        fs.mkdirSync(componentFolder);

        const config = vscode.workspace.getConfiguration(
          "react-component-generator"
        );

        const componentFile = config.get("componentFile") as string;
        const styleFile = config.get("styleFile") as string;
        const indexFile = config.get("indexFile") as string;
        const testFile = config.get("testFile") as string;

        const componentContent = componentFileTemplate.replace(
          /COMPONENT_NAME/g,
          componentName
        );

        const indexContent = indexFileTemplate.replace(
          /COMPONENT_NAME/g,
          componentName
        );
        const styleContent = `.${componentName} {}\n`;

        const files = [
          { name: componentFile, content: componentContent },
          { name: styleFile, content: styleContent },
          { name: indexFile, content: indexContent },
        ];

        if (testFile) {
          const testContent = testFileTemplate.replace(
            /COMPONENT_NAME/g,
            componentName
          );
          files.push({
            name: testFile.replace(/\$COMPONENT_NAME/g, componentName),
            content: testContent,
          });
        }

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
  );

  function openSettings() {
    vscode.commands.executeCommand(
      "workbench.action.openSettings",
      "@ext:IgorMatosDev.react-component-generator-full"
    );
  }

  // Register the openSettings command
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "react-component-generator.openSettings",
      openSettings
    )
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
