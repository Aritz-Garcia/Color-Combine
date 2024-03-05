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