var nbCase = 0;
var nbCarteChance = 0;
var nbCarteCommunaute = 0;

function initMonopoly(){
	this.pionRouge = new Pion("Rouge");
	this.pionBleu = new Pion("Bleu");
	this.gestionnaireDes = new GestionnaireDes();
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

function melangeDes() {
	var y = document.getElementsByClassName("circle");

	for (i = 0; i < y.length; i++) {
		y[i].style.visibility = "hidden";
	}
	gestionnaireDes.d1 = gestionnaireDes.getRandomInt(1,7);
	gestionnaireDes.d2 = gestionnaireDes.getRandomInt(1,7);
	gestionnaireDes.setNumberFace("des_1");
	gestionnaireDes.setNumberFace("des_2");

	if (gestionnaireDes.nombre == 0) {
		clearInterval(gestionnaireDes.tmp);
		nb = gestionnaireDes.d1+gestionnaireDes.d2;
		document.getElementById("resultat").innerHTML = nb;
		pionRouge.deplacerPion(nb);
		actionCase(pionRouge,pionRouge.position);
	}
	else
		gestionnaireDes.nombre--;				
}

function actionCase(pion,position) {
	var Contenu = Fichier('carte_monopoly.json');
	Contenu = JSON.parse(Contenu);
	switch(Contenu.fiches[position].type) {
		case "propriete" :
			//var doc = document.getElementById("modalLoyer");
			//doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].nom;
			document.getElementById("informations-bottom").innerHTML = Contenu.fiches[position].nom;
			document.getElementById("achat").innerHTML = Contenu.fiches[position].prix;
			document.getElementById("loyer0").innerHTML = Contenu.fiches[position].loyers[0];
			document.getElementById("loyer1").innerHTML = Contenu.fiches[position].loyers[1];
			document.getElementById("loyer2").innerHTML = Contenu.fiches[position].loyers[2];
			document.getElementById("loyer3").innerHTML = Contenu.fiches[position].loyers[3];
			document.getElementById("loyer4").innerHTML = Contenu.fiches[position].loyers[4];
			document.getElementById("loyer5").innerHTML = Contenu.fiches[position].loyers[5];
			$('#modalLoyer').modal("show");
			break;
		case "chance" :
			var doc = document.getElementById("modalCarte");
			doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
			doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.chance[this.nbCarteChance%Contenu.chance.length].nom;
			this.nbCarteChance++;
			$('#modalCarte').modal("show");
			break;
		case "communaute" :
			var doc = document.getElementById("modalCarte");
			doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
			doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.communaute[this.nbCarteCommunaute%Contenu.communaute.length].nom;
			this.nbCarteCommunaute++;
			$('#modalCarte').modal("show");
			break;
		case "taxe" :
			
			break;
		case "special" :

			break;
		case "gare" :
			document.getElementById("informations-bottom").innerHTML = Contenu.fiches[position].nom;
			document.getElementById("achat").innerHTML = Contenu.fiches[position].prix;
			document.getElementById("loyer0").innerHTML = Contenu.fiches[position].loyers[0];
			document.getElementById("loyer1").innerHTML = Contenu.fiches[position].loyers[1];
			document.getElementById("loyer2").innerHTML = Contenu.fiches[position].loyers[2];
			document.getElementById("loyer3").innerHTML = Contenu.fiches[position].loyers[3];
			document.getElementById("loyer4").innerHTML = Contenu.fiches[position].loyers[4];
			document.getElementById("loyer5").innerHTML = Contenu.fiches[position].loyers[5];
			$('#modalLoyer').modal("show");
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