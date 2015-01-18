// Código para Generar fractales de Maldenbrot
// written by Rafael Sacaan.


canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d');

// Variables

var matrix = [];
var matrixAncho = 1000;	// convertirlos en inputs
var matrixAlto = 1000;		// convertirlos en inputs

var max_iter = 256;		// maximo numero de iteraciones por recursión
var radio_conv = 2;		// radio de convergencia para ver pertenencia

var colores = [];		// matriz de colores


// generar matrix cuadrada y vacía 

function setMatrix(){
	
	for (var i = 0; i < matrixAncho; i++) {
		matrix[i] = new Array(matrixAlto);
	}
}

// llenar la matrix de ceros

function fillMatrix (){
	for (var i = 0; i < matrixAncho; i++){
		for(var j = 0; j < matrixAlto; j++){
			matrix[i][j] = 0;
		}
	}
}


// Aplica MANDELBROT a cada elemento de la matriz

function iterarMatrix (){
	for (var i = 0; i < matrixAncho; i++) {
		for (var j = 0; j < matrixAlto; j++) {
			


			var a = -2 + 2.5*i/matrixAncho;					// IMPORTANTE!!
			var b = -1.5 + 3*j/matrixAlto;					//normalizar el largo!!!

			matrix[i][j] = recursion(a , b );				// la lleno por filas
		}											
	}
}

//llenar matriz de colores

function llenarColores (){
		
		for (var i = 0; i < 300; i++){

			colores[i] = ('#'+Math.floor(Math.random()*16777215).toString(16));
			
		}

	}

// pintar matrix

function paintMatrix(){

	for (var i = 0; i < matrixAncho; i++){
		for(var j = 0; j < matrixAlto; j++){

		
			var aux = 0;
			aux = matrix[i][j];
			context.fillStyle = colores[aux];
	
			context.fillRect(i * 1, j * 1, 1, 1);	// la pinto por filas
		}

	}

}

// generando el fractal....

function generarFractal(){
	
	llenarColores();
	setMatrix();
	fillMatrix();
	iterarMatrix();
	paintMatrix();

}

// Opera calculo de Mandelbrot para un par, devuelve el nro de veces
// que se iteró en total.

function recursion(a, b){
	var par = new Par(a, b);
	var par_init = new Par(a, b);
	var nro_it = 0;
	var estado = true;

	while (nro_it < max_iter && estado){
		
		if (test(par, radio_conv)){
			nro_it += 1;
		}
		else {
			estado = false;
		}

		par = mandelbrot(par, par_init);

	}

	return nro_it;
}



// Clase par ordenado

function Par(x, y){
	this.x = x;
	this.y = y;
}

// Funciones para fractales //

// Funcion test: si el abs(x,y) < radio

function test (par, limite) {
	if (par.abs() <= limite){
		return true;
	}
	else {
		return false;
	}
}

// calcula el par según serie de mandelbrot
// Zn+1 = Zn^2 + C

function mandelbrot(z, c) {
	var b = new Par(0,0);
	b = z.pot2();
	b = b.add(c);
	
	return b;
}

// Calculo de abs --> sqrt(x^2 + y^2)

Par.prototype.abs = function () {
	var a = Math.sqrt( this.x * this.x + this.y * this.y);

	return a;
}

// Suma de coordenadas

Par.prototype.add = function (c2) {
	var a = this.x + c2.x;
	var b = this.y + c2.y;

	return new Par(a, b);
}

// Calculo elevar a 2.

Par.prototype.pot2 = function () {
	var a = Math.pow(this.x, 2) - Math.pow(this.y, 2);
	var b = 2 * this.x * this.y;
	
	return new Par(a, b);
}

generarFractal();

function play(){
	llenarColores();
	generarFractal();
}





