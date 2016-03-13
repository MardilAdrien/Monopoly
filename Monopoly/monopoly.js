var nbCase = 0;
var nbCarteChance = 0;
var nbCarteCommunaute = 0;
var nbJoueur;
var numJoueurEnJeu = 1;

var Contenu = Fichier('carte_monopoly.json');
Contenu = JSON.parse(Contenu);

function initMonopoly(){
	$('#modalPartie').modal('hide');
	nbJoueur = document.getElementById("playernumber").value;
	this.pionRouge = new Pion("Rouge");
	this.pionBleu = new Pion("Bleu");
	
	var html = document.getElementById("case1").innerHTML;
	var x = "<p class=\"pionRouge\"></p><p class=\"pionBleu\"></p>";
	if(nbJoueur > 2)
	{
		this.pionJaune = new Pion("Jaune");
		x += "<p class=\"pionJaune\"></p>";
	}
	if(nbJoueur > 3)
	{
		this.pionVert = new Pion("Vert");
		x += "<p class=\"pionVert\"></p>";
	}
	document.getElementById("case1").innerHTML = x;
	this.gestionnaireDes = new GestionnaireDes();
	this.gestionnaireTerrain = new gestionnaireTerrain();
	gestionnaireTerrain.initTerrain();
}

function prochainJoueur(){
	numJoueurEnJeu = (numJoueurEnJeu % nbPion)+1;
}

function getPion(num){
	if(num == 1)
		return pionRouge;
	if(num == 2)
		return pionBleu;
	if(num == 3)
		return pionJaune;
	if(num == 4)
		return pionVert;
}
	
function avancerPion(pion){
	var html = document.getElementById("case"+pion.position).innerHTML;
	var x = "<p class=\"pion"+pion.couleur+"\"></p>";
	html = html.replace(x,"");
	document.getElementById("case"+pion.position).innerHTML = html;
	if(pion.position == 40) {
		pion.position = 1;
		log(pion, "Vous passez par la case Départ et touchez 20000 F");
		pion.argent += 20000;
	}
	else {
		pion.position++;
	}
	document.getElementById("case"+pion.position).innerHTML += "<p class=\"pion"+pion.couleur+"\"></p>";
	
	if(this.nbCase == 1){
		clearInterval(timerDeplacement);
		actionCase(pion,pion.position-1);
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
		log(getPion(numJoueurEnJeu), 'A fait '+nb);
		getPion(numJoueurEnJeu).deplacerPion(nb);
	}
	else
		gestionnaireDes.nombre--;				
}

function actionCase(pion,position) {
	switch(Contenu.fiches[position].type) {
		case "propriete" :
			document.getElementById("informations-bottom").innerHTML = Contenu.fiches[position].nom;
			document.getElementById("propriete-color").style.backgroundColor = Contenu.fiches[position].colors[0];
			document.getElementById("achat").innerHTML = Contenu.fiches[position].prix;
			document.getElementById("loyer0").innerHTML = Contenu.fiches[position].loyers[0];
			document.getElementById("loyer1").innerHTML = Contenu.fiches[position].loyers[1];
			document.getElementById("loyer2").innerHTML = Contenu.fiches[position].loyers[2];
			document.getElementById("loyer3").innerHTML = Contenu.fiches[position].loyers[3];
			document.getElementById("loyer4").innerHTML = Contenu.fiches[position].loyers[4];
			document.getElementById("loyer5").innerHTML = Contenu.fiches[position].loyers[5];
			document.getElementById("prixMaison").innerHTML = Contenu.fiches[position].prixMaison;
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
			var doc = document.getElementById("modalCarte");
			doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
			doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.fiches[position].nom+". Vous payez "+Contenu.fiches[position].prix;
			getPion(numJoueurEnJeu).argent = getPion(numJoueurEnJeu).agent-Contenu.fiches[position].prix;
			$('#modalCarte').modal("show");
			break;
		case "special" :

			break;
		case "gare" :
			document.getElementById("informations-gare").innerHTML = Contenu.fiches[position].nom;
			document.getElementById("gare-color").style.backgroundColor = Contenu.fiches[position].colors[0];
			document.getElementById("achat").innerHTML = Contenu.fiches[position].prix;
			document.getElementById("loyer0").innerHTML = Contenu.fiches[position].loyers[0];
			document.getElementById("loyer1").innerHTML = Contenu.fiches[position].loyers[1];
			document.getElementById("loyer2").innerHTML = Contenu.fiches[position].loyers[2];
			document.getElementById("loyer3").innerHTML = Contenu.fiches[position].loyers[3];
			$('#modalGare').modal("show");
			break;
		case "prison" :
			
			break;
	}
	//prochainJoueur();
	document.getElementById('boutonDes').innerHTML = "Fin de tour"
	document.getElementById('boutonDes').style.visibility = 'visible';
}

function achat(pion) {
	alert(pion.position-1);
	log(pion, "Achete "+Contenu.fiches[pion.position-1].nom+" "+Contenu.fiches[pion.position-1].prix+" F");
	pion.argent -= Contenu.fiches[pion.position-1].prix;
	log(pion, "Il vous reste "+pion.argent+" F");
}

function log(pion,texte) {
	var nom = "pion"+pion.couleur;
	document.getElementById("zoneTexte").innerHTML += nom+" : "+texte+"\n";
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