var nbCase = 0;
var timer;
function deplacerPion(pion,nbCase){
		this.nbCase = nbCase;
		timer = setInterval(avancerPion,400,pion);
	}


function avancerPion(pion){
	var html = document.getElementById("case"+pion.position).innerHTML;
	var x = "<p class=\"pion"+pion.couleur+"\"></p>";
	html = html.replace(x,"");
	document.getElementById("case"+pion.position).innerHTML = html;
	pion.position++;
	document.getElementById("case"+pion.position).innerHTML += "<p class=\"pion"+pion.couleur+"\"></p>";
	
	if(this.nbCase == 1){
		clearInterval(timer);
	}
	this.nbCase--;
}

function initMonopoly(){
	this.pionRouge = new Pion("Rouge");
	this.pionBleu = new Pion("Bleu");
	}