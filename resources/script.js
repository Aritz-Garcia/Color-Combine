window.onload = inicio;

function inicio() {
    let btnHex = document.getElementById("btnHex");
    let btnRgb = document.getElementById("btnRgb");
    let btnHsl = document.getElementById("btnHsl");

    btnHex.classList.add("active");

    btnHex.addEventListener("mouseenter", function() {
        if (!btnHex.classList.contains("active")) {
            btnHex.classList.add("hover");
        }
    });

    btnHex.addEventListener("mouseleave", function() {
        btnHex.classList.remove("hover");
    });

    btnHex.addEventListener("click", function() {
        btnHex.classList.add("active");
        btnRgb.classList.remove("active");
        btnHsl.classList.remove("active");
        cambiar();
    });

    btnRgb.addEventListener("mouseenter", function() {
        if (!btnRgb.classList.contains("active")) {
            btnRgb.classList.add("hover");
        }
    });

    btnRgb.addEventListener("mouseleave", function() {
        btnRgb.classList.remove("hover");
    });

    btnRgb.addEventListener("click", function() {
        btnRgb.classList.add("active");
        btnHex.classList.remove("active");
        btnHsl.classList.remove("active");
        cambiar();
    });

    btnHsl.addEventListener("mouseenter", function() {
        if (!btnHsl.classList.contains("active")) {
            btnHsl.classList.add("hover");
        }
    });

    btnHsl.addEventListener("mouseleave", function() {
        btnHsl.classList.remove("hover");
    });

    btnHsl.addEventListener("click", function() {
        btnHsl.classList.add("active");
        btnHex.classList.remove("active");
        btnRgb.classList.remove("active");
        cambiar();
    });
    
    cambiar();
}

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
    cambiarCodigos();
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

function hexAHsl(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);

    return [h, s, l];
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

function cambiarCodigos() {
    let colorUno = document.getElementById('colorUno').value;
    let colorDos = document.getElementById('colorDos').value;
    let resultadoRgb = document.getElementById('resultado').style.backgroundColor;
    let resultadoRgbAHex = resultadoRgb.substring(4, resultadoRgb.length - 1);
    resultadoRgbAHex = resultadoRgbAHex.split(", ");
    resultadoRgbAHex = resultadoRgbAHex.map(function (x) {
        return parseInt(x);
    });
    let resultado = rgbAHex(resultadoRgbAHex);

    if (document.getElementById('btnHex').classList.contains("active")) {
        // Hex
        document.getElementById('colorUnoP').innerHTML = colorUno.toUpperCase();
        document.getElementById('colorDosP').innerHTML = colorDos.toUpperCase();
        document.getElementById('colorResultadoP').innerHTML = resultado.toUpperCase();

    } else if (document.getElementById('btnRgb').classList.contains("active")) {
        // Rgb
        let rgb1 = hexARgb(colorUno);
        let rgb2 = hexARgb(colorDos);
        let rgbResultado = hexARgb(resultado);

        document.getElementById('colorUnoP').innerHTML = "RGB(" + rgb1[0] + ", " + rgb1[1] + ", " + rgb1[2]+ ")";
        document.getElementById('colorDosP').innerHTML = "RGB(" + rgb2[0] + ", " + rgb2[1] + ", " + rgb2[2]+ ")";
        document.getElementById('colorResultadoP').innerHTML = "RGB(" + rgbResultado[0] + ", " + rgbResultado[1] + ", " + rgbResultado[2]+ ")";

    } else if (document.getElementById('btnHsl').classList.contains("active")) {
        // Hsl
        let hsl1 = hexAHsl(colorUno);
        let hsl2 = hexAHsl(colorDos);
        let hslResultado = hexAHsl(resultado);

        document.getElementById('colorUnoP').innerHTML = "HSL(" + hsl1[0] + ", " + hsl1[1] + "%, " + hsl1[2]+ "%)";
        document.getElementById('colorDosP').innerHTML = "HSL(" + hsl2[0] + ", " + hsl2[1] + "%, " + hsl2[2]+ "%)";
        document.getElementById('colorResultadoP').innerHTML = "HSL(" + hslResultado[0] + ", " + hslResultado[1] + "%, " + hslResultado[2]+ "%)";
    }
}
