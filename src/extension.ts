import * as vscode from 'vscode';
import { HelloPanel } from './HelloPanel';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "testextension" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('testextension.helloWorld', () => {
			HelloPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('testextension.refresh', () => {
			HelloPanel.kill();
			HelloPanel.createOrShow(context.extensionUri);
			setTimeout(() => {
				vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
			}, 500);
			
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("testextension.askquestion", async () => {
			const answer = await vscode.window.showInformationMessage(
				"How are you?", 
				"Good", 
				"Bad", 
				"Everything Else"
			);

			if (answer === "Good") {
				vscode.window.showInformationMessage('Nice');
			}
			if (answer === "Bad") {
				vscode.window.showInformationMessage('Sad');
			}
			if (answer === "Everything Else") {
				vscode.window.showInformationMessage('I feel that');
			}
			else{
				console.log({answer});
			}
		})
	);
}
export function deactivate() {}

