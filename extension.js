const vscode = require('vscode');

function activate(context) {
	const textProvider = new WebViewProvider();
	vscode.window.registerWebviewViewProvider('color-combine', textProvider);
}

class WebViewProvider {
	resolveWebviewView(webviewView, context, token) {
		webviewView.webview.options = {
			enableScripts: true,
		};

		webviewView.webview.html = getWebviewContent(webviewView.webview);
	}
}

function getWebviewContent() {
	return `<!DOCTYPE html>
			<html lang="es">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
				<style>
					body {
						display: flex;
						justify-content: center;
					}

					h2, h3 {
						color: #fff;
					}

					.detector {
						width: 100px;
						height: 100px;
						margin-left: 10px;
						border-radius: 5px;
						border: 2px solid #fff;
					}
					
					.balance {
						width: min-content;
					}
					
					.balanceDiv {
						display: flex;
						align-items: center;
						margin-bottom: 50px;
					}
					
					.balanceDiv input, .balanceDiv h3 {
						margin-left: 10px;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<h2>Primer color:</h2>
							<div class="balanceDiv">
								<input type="color" value="#ffffff" id="colorUno" class="detector" oninput="cambiar()" />
								<h3 id="colorUnoP"></h3>
							</div>
				
							<h2>Segundo color:</h2>
							<div class="balanceDiv">
								<input type="color" value="#000000" id="colorDos" class="detector" oninput="cambiar()" />
								<h3 id="colorDosP"></h3>
							</div>
				
							<h2>Balance:</h2>
							<div class="balanceDiv">
								<input type="range" min="0" max="100" value="50" class="detector" id="balance" oninput="cambiarBalance(this.value)" />
								<input type="number" min="0" max="100" value="50" name="balance" id="balanceInput" oninput="cambiarBalance(this.value)" class="balance" >
							</div>
				
							<h2>Resultado:</h2>
							<div class="balanceDiv">
								<div class="detector" id="resultado"></div>
								<h3 id="colorResultadoP"></h3>
							</div>
						</div>
					</div>
				</div>
				<script>
					window.onload = cambiar();

					function cambiar() {
						let resultado = document.getElementById('resultado');
						let colorUno = document.getElementById('colorUno').value;
						let colorDos = document.getElementById('colorDos').value;
						let balance = document.getElementById('balance').value;
					
						document.getElementById('colorUnoP').innerHTML = colorUno.toUpperCase();
						document.getElementById('colorDosP').innerHTML = colorDos.toUpperCase();
					
						let rgb1 = hexARgb(colorUno);
						let rgb2 = hexARgb(colorDos);
					
						let nuevoColor = calcularNuevoColor(rgb1, rgb2, balance);
					
						resultado.style.backgroundColor = rgbAHex(nuevoColor);
						document.getElementById('colorResultadoP').innerHTML = rgbAHex(nuevoColor).toUpperCase();
					}
					
					function hexARgb(hex) {
						var r = parseInt(hex.substring(1, 3), 16);
						var g = parseInt(hex.substring(3, 5), 16);
						var b = parseInt(hex.substring(5, 7), 16);
						return [r, g, b];
					}
					
					function calcularNuevoColor(rgb1, rgb2, balance) {
						var porcentaje1 = balance / 100;
						var porcentaje2 = 1 - porcentaje1;
						var r = Math.round(rgb2[0] * porcentaje1 + rgb1[0] * porcentaje2);
						var g = Math.round(rgb2[1] * porcentaje1 + rgb1[1] * porcentaje2);
						var b = Math.round(rgb2[2] * porcentaje1 + rgb1[2] * porcentaje2);
						return [r, g, b];
					}
					
					function rgbAHex(rgb) {
						var r = rgb[0].toString(16).padStart(2, '0');
						var g = rgb[1].toString(16).padStart(2, '0');
						var b = rgb[2].toString(16).padStart(2, '0');
						return "#" + r + g + b;
					}
					
					function cambiarBalance(valor) {
						if (valor.startsWith("0")) {
							valor = valor.substring(1);
						}

						if (valor > 100) {
							valor = 100;
						} else if (valor < 0 || isNaN(valor) || valor == "") {
							valor = 0;
						}
					
						document.getElementById('balance').value = valor;
						document.getElementById('balanceInput').value = valor;
					
						cambiar();
					}
				</script>
			</body>
			</html>
`;
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
