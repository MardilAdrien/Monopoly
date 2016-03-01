var nbCase = 0;

function initMonopoly(){
	this.pionRouge = new Pion("Rouge");
	this.pionBleu = new Pion("Bleu");
	}
	
function avancerPion(pion){
	var html = document.getElementById("case"+pion.position).innerHTML;
	var x = "<p class=\"pion"+pion.couleur+"\"></p>";
	html = html.replace(x,"");
	document.getElementById("case"+pion.position).innerHTML = html;
	if(pion.position == 40)
		pion.position = 1;
	else
		pion.position++;
	document.getElementById("case"+pion.position).innerHTML += "<p class=\"pion"+pion.couleur+"\"></p>";
	
	if(this.nbCase == 1){
		clearInterval(timerDeplacement);
	}
	this.nbCase--;
}

function actionCase(pion,position) {
	var Contenu = Fichier('carte_monopoly.json');
	Contenu = JSON.parse(Contenu);
	alert(Contenu.fiches[position].type);
	switch(Contenu.fiches[position].type) {
		case "propriete" :

			break;
		case "chance" :
			var nb = Math.floor(Math.random() * ( - 1)) + 1;
			alert(Contenu.chance[nb].nom)
			break;
		case "communaute" :

			break;
		case "taxe" :

			break;
		case "special" :

			break;
		case "gare" :

			break;
		case "prison" :
			
			break;

	}
}

function Fichier(fichier) {
	if(window.XMLHttpRequest) obj = new XMLHttpRequest(); //Pour Firefox, Opera,...

	else if(window.ActiveXObject) obj = new ActiveXObject("Microsoft.XMLHTTP"); //Pour Internet Explorer 

	else return(false);
	    
	if (obj.overrideMimeType) obj.overrideMimeType("text/xml"); //Évite un bug de Safari

	obj.open("GET", fichier, false);
	obj.send(null);
	   
	if(obj.readyState == 4) return(obj.responseText);
	else return(false);
}