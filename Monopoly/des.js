var tmp;
var nombre;
var d1 = 0;
var d2 = 0;

function lancerDes(){
	var y = document.getElementsByClassName("circle");
	for (i = 0; i < y.length; i++) {
		y[i].style.visibility = "hidden";
	}
	this.nombre = 20;
	
	tmp = setInterval(affichageRandom,70);

	
}

function setNumberFace(nb, loc) {
	var doc = document.getElementById(loc);
	for (var i = 0; i <nb; i++) {
		doc.getElementsByClassName(""+nb+"")[i].style.visibility="visible";
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function affichageRandom() {
	var y = document.getElementsByClassName("circle");

	for (i = 0; i < y.length; i++) {
		y[i].style.visibility = "hidden";
	}
	this.d1 = getRandomInt(1,7);
	this.d2 = getRandomInt(1,7);
	setNumberFace(this.d1, "des_1");
	setNumberFace(this.d2, "des_2");

	if (this.nombre == 0) {
		clearInterval(tmp);
		document.getElementById("resultat").innerHTML = this.d1+this.d2;
	}

	this.nombre--;				
}