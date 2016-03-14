function GestionnaireDes(){
	var nbDouble = 0;
	var tmp = 0;
	var nombre = 0;
	var d1 = 0;
	var d2 = 0;

	this.lancerDes = function (){
		var y = document.getElementsByClassName("circle");
		for (i = 0; i < y.length; i++) {
			y[i].style.visibility = "hidden";
		}
		this.nombre = 20;
		
		this.tmp = setInterval(melangeDes,70);
	}

	this.setNumberFace = function (loc) {	
		if(loc == "des_1")
			nb = this.d1;
		else
			nb = this.d2;
		
		var doc = document.getElementById(loc);
		for (var i = 0; i < nb; i++) {
			doc.getElementsByClassName(""+nb+"")[i].style.visibility="visible";
		}
	}

	this.getRandomInt = function (min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
}
