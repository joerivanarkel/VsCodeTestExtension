import * as vscode from 'vscode';
import { HelloPanel } from './HelloPanel';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);

	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	item.text = "$(beaker) Add Todo";
	item.command = "testextension.addtodo";
	item.show();

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"testextension-sidebar",
			sidebarProvider
		)
	);
	
	context.subscriptions.push(
		vscode.commands.registerCommand('testextension.helloWorld', () => {
			HelloPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('testextension.addtodo', () => {
			const {activeTextEditor} = vscode.window;

			if(!activeTextEditor)
			{
				vscode.window.showInformationMessage("Please select something for this to work.");
				return;
			}

			const text = activeTextEditor.document.getText(activeTextEditor.selection);
			vscode.window.showInformationMessage("Text:" + text);

			sidebarProvider._view?.webview.postMessage({
				type: 'new-todo',
				value: text,
			});
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

