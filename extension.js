const vscode = require('vscode');

function activate(context) {
	console.log('Congratulations, your extension "color-combine" is now active!');

	let disposable = vscode.commands.registerCommand('color-combine.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from color-combine!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
