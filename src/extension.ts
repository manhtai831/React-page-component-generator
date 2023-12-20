import * as vscode from "vscode";
import { createComponent } from "./lib/component-creation";
import { createPage } from "./lib/page-creation";


export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "react-component-generator.createComponent",
    createComponent
  );

  let createPageDisposable = vscode.commands.registerCommand(
    "react-component-generator.createPage",
    createPage
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

  context.subscriptions.push(disposable,createPageDisposable);
}

export function deactivate() { }
