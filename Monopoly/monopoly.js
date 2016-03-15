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
	else
	{		
		document.getElementById('argentJaune').style.display = "none";		
	}
	if(nbJoueur > 3)
	{
		this.pionVert = new Pion("Vert");
		x += "<p class=\"pionVert\"></p>";
	}
	else
	{
		document.getElementById('argentVert').style.display = "none";
	}
	document.getElementById("case1").innerHTML = x;

	document.getElementById("zoneTexte").innerHTML = "";

	this.gestionnaireDes = new GestionnaireDes();
	this.gestionnaireTerrain = new gestionnaireTerrain();
	gestionnaireTerrain.initTerrain();
	this.majArgent();
}

function prochainJoueur(){
	numJoueurEnJeu = (numJoueurEnJeu % nbPion)+1;
}

function majArgent(){
	document.getElementById('argentRouge').innerHTML = "Argent Rouge : " + pionRouge.argent.toLocaleString();
	document.getElementById('argentBleu').innerHTML = "Argent Bleu : " + pionBleu.argent.toLocaleString();
	if(nbPion > 2)
			document.getElementById('argentJaune').innerHTML = "Argent Jaune : " + pionJaune.argent.toLocaleString();
	if(nbPion > 3)
			document.getElementById('argentVert').innerHTML = "Argent Vert : " + pionVert.argent.toLocaleString();
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
		pion.argent += parseInt(20000);
		this.majArgent();
	}
	else {
		if(this.nbCase <= 0)
			pion.position--;
		else
			pion.position++;
	}
	document.getElementById("case"+pion.position).innerHTML += "<p class=\"pion"+pion.couleur+"\"></p>";
	
	if(this.nbCase < 0)
		this.nbCase++;
	else
		this.nbCase--;
	
	if(this.nbCase == 0){
		clearInterval(timerDeplacement);
		actionCase(pion,pion.position-1);
	}

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
		
		if(getPion(numJoueurEnJeu).prison == 1) {
			if(gestionnaireDes.d1 == gestionnaireDes.d2) {	
				log(getPion(numJoueurEnJeu), 'A fait '+nb+'.');
				log(getPion(numJoueurEnJeu), 'Vous êtes libéré de prison.');

				var html = document.getElementById("case41").innerHTML;
				var x = '<p class="pion"'+getPion(numJoueurEnJeu).couleur+'></p>';
				html = html.replace(x,"");

				getPion(numJoueurEnJeu).prison = 0;
				getPion(numJoueurEnJeu).deplacerPion(nb);
				
			} else {
				document.getElementById('boutonDes').innerHTML = "Fin de tour";
				document.getElementById('boutonDes').style.visibility = 'visible';
			}
		} else {
			log(getPion(numJoueurEnJeu), 'A fait '+nb+'.');
			getPion(numJoueurEnJeu).deplacerPion(nb);
		}	
	}
	else
		gestionnaireDes.nombre--;				
}

function ajouterMaison(position){
	var classe;
	if((position > 0 && position < 11) || (position > 20 && position < 31)) {
		classe = "horizontale";
	}else{
		classe = "verticale";
	}
	if(gestionnaireTerrain.lesCases[position-1][2] <= 4){
		document.getElementById("maisonCase"+position).innerHTML += "<div class='maison-"+ classe +"'>&nbsp;</div>";
	}else{
		document.getElementById("maisonCase"+position).innerHTML = "<div class='hotel-"+ classe +"'>&nbsp;</div>";
	}
}

function actionCase(pion,position) {
	switch(Contenu.fiches[position].type) {
		case "propriete" :
			//si on tombe sur une case propriété
			//si le terrain n'est pas deja acheté
			if(!gestionnaireTerrain.terrainDejaAcheter(pion.position-1)) {
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
				document.getElementById("acheterMaison").style.display = "none";
				//on n'affiche pas le bouton acheter si pas assez d'argent
				if(!argentSuffisantAchat()) {
					document.getElementById("acheterTerrain").style.display = "none";
				}

				$('#modalLoyer').modal("show");
			}else {
				//si le terrain est deja acheté
				if(pion.couleur == gestionnaireTerrain.lesCases[pion.position-1][1] && gestionnaireTerrain.toutTerrainCouleur(pion.couleur, Contenu.fiches[position].groupe)) {
					//si le terrain appartient au pion qui est sur la case
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
					document.getElementById("acheterTerrain").style.display = "none";

					if(!argentSuffisantMaison()) {
						document.getElementById("acheterMaison").style.display = "none";
						document.getElementById("maisonEnsemble").style.display = "none";
					} else {				
						document.getElementById("acheterMaison").style.display = "block";
						if(!argentSuffisantEnsembleMaison()) {
							document.getElementById("maisonEnsemble").style.display = "none";
						}else {
							document.getElementById("maisonEnsemble").style.display = "block";
						}
					}
					
					$('#modalLoyer').modal("show");
				} else if(pion.couleur != gestionnaireTerrain.lesCases[pion.position-1][1]){
					var doc = document.getElementById("modalPaiement");
					doc.getElementsByClassName("modal-title")[0].innerHTML = "Paiement";
					alert(Contenu.fiches[position].loyers[gestionnaireTerrain.lesCases[position][2]]);
					doc.getElementsByClassName("info-paiement")[0].innerHTML = "Vous devez "+Contenu.fiches[position].loyers[gestionnaireTerrain.lesCases[position-1][2]]+" au joueur "+gestionnaireTerrain.lesCases[position-1][1];
					if(argentSuffisantPaiement(pion, Contenu.fiches[position].loyers[gestionnaireTerrain.lesCases[position-1][2]])) {
						$('#modalPaiement').modal("show");

					} else {
						alert("Le joueur "+pion.couleur+" n'a plus d'argent. La partie est donc fini.");
						$('#modalPartie').modal("show");
					}
				}		
			}
			break;

		case "chance" :
			if (Contenu.chance[nbCarteChance].type == "taxe") {
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = "Paiement";
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.chance[nbCarteChance%Contenu.chance.length].nom;
				if(argentSuffisantPaiement(pion, Contenu.chance[nbCarteChance%Contenu.chance.length].montant)) {
					pion.argent -= parseInt(Contenu.chance[nbCarteChance%Contenu.chance.length].montant);
					$('#modalCarte').modal("show");
				} else {
					alert("Le joueur "+pion.couleur+" n'a plus d'argent. La partie est donc fini.");
					$('#modalPartie').modal("show");
				}

			} else if (Contenu.chance[nbCarteChance%Contenu.chance.length].type == "goto") {
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.chance[nbCarteChance%Contenu.chance.length].nom;
				$('#modalCarte').modal("show");
				document.getElementById("case"+pion.position).innerHTML = "";
				document.getElementById("case"+Contenu.chance[nbCarteChance%Contenu.chance.length].pos).innerHTML += "<p class=\"pion"+pion.couleur+"\"></p>";

			} else if (Contenu.chance[nbCarteChance%Contenu.chance.length].type == "birthday") {
				var prix = parseInt(Contenu.chance[nbCarteChance%Contenu.chance.length].montant);
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.chance[nbCarteChance%Contenu.chance.length].nom;
				$('#modalCarte').modal("show");
				pionRouge.argent -= prix;
				pionBleu.argent -= prix;
				if(nbJoueur > 2)
					pionJaune.argent -= prix;
				if(nbJoueur > 3)
					pionVert.argent -= prix;
				pion.argent += (nbJoueur)*prix;
				this.majArgent();
			} 
			else if (Contenu.chance[nbCarteChance%Contenu.chance.length].type == "prime") {
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.chance[nbCarteChance%Contenu.chance.length].nom;
				$('#modalCarte').modal("show");
				pion.argent += parseInt(Contenu.chance[nbCarteChance%Contenu.chance.length].montant);
				this.majArgent();

			} else if (Contenu.chance[nbCarteChance%Contenu.chance.length].type == "repair") {
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.chance[nbCarteChance%Contenu.chance.length].nom;
				$('#modalCarte').modal("show");
				pion.argent -= parseInt(Contenu.chance[nbCarteChance%Contenu.chance.length].maison)*gestionnaireTerrain.nbMaison(pion.couleur);
				this.majArgent();

			} else if (Contenu.chance[nbCarteChance%Contenu.chance.length].type == "move") {
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.chance[nbCarteChance%Contenu.chance.length].nom;
				$('#modalCarte').modal("show");
				pion.deplacerPion(Contenu.chance[nbCarteChance%Contenu.chance.length].nb);
			}

			this.nbCarteChance++;
			break;

		case "communaute" :
			if (Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].type == "taxe") {
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = "Paiement";
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].nom;
				if(argentSuffisantPaiement(pion, Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].montant)) {
					pion.argent -= parseInt(Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].montant);
					this.majArgent();
					$('#modalCarte').modal("show");
				} else {
					alert("Le joueur "+pion.couleur+" n'a plus d'argent. La partie est donc fini.");
					$('#modalPartie').modal("show");
				}
			} else if (Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].type == "prime") {
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].nom;;
				$('#modalCarte').modal("show");
				pion.argent += parseInt(Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].montant);
				this.majArgent();

			} else if (Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].type == "goto") {
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].nom;
				$('#modalCarte').modal("show");
				document.getElementById("case"+pion.position).innerHTML = "";
				pion.position = Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].pos;
				document.getElementById("case"+Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].pos).innerHTML += "<p class=\"pion"+pion.couleur+"\"></p>";

			} else if (Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].type == "prison") {
				var doc = document.getElementById("modalCarte");
				doc.getElementsByClassName("modal-title")[0].innerHTML = Contenu.fiches[position].type;
				doc.getElementsByClassName("infoCarte")[0].innerHTML = Contenu.communaute[nbCarteCommunaute%Contenu.communaute.length].nom;
				$('#modalCarte').modal("show");
				log(pion, "La carte sortie de prison vous a été attribué, vous pourrez l'utiliser une fois que vous serez en prison.")
				pion.sortiePrison = 1;
			}

			this.nbCarteCommunaute++;
			break;

		case "taxe" :
			var doc = document.getElementById("modalCarte");
			doc.getElementsByClassName("modal-title")[0].innerHTML = "Paiement";
			doc.getElementsByClassName("infoCarte")[0].innerHTML = "Vous devez "+Contenu.fiches[position].prix+" F à la banque.";
			if(argentSuffisantPaiement(pion, Contenu.fiches[position].prix)) {
				pion.argent -= parseInt(Contenu.fiches[position].prix);
				majArgent();
				$('#modalCarte').modal("show");
			} else {
				alert("Le joueur "+pion.couleur+" n'a plus d'argent pour payer. La partie est donc fini.");
				$('#modalPartie').modal("show");
			}
			break;

		case "special" :

			break;

		case "gare" :
			if(!gestionnaireTerrain.terrainDejaAcheter(pion.position-1)) {
				document.getElementById("informations-gare").innerHTML = Contenu.fiches[position].nom;
				document.getElementById("gare-color").style.backgroundColor = Contenu.fiches[position].colors[0];
				document.getElementById("achat-gare").innerHTML = Contenu.fiches[position].prix;
				document.getElementById("loyer1-gare").innerHTML = Contenu.fiches[position].loyers[0];
				document.getElementById("loyer2-gare").innerHTML = Contenu.fiches[position].loyers[1];
				document.getElementById("loyer3-gare").innerHTML = Contenu.fiches[position].loyers[2];
				document.getElementById("loyer4-gare").innerHTML = Contenu.fiches[position].loyers[3];

				if(!argentSuffisantAchat()) {
					document.getElementById("acheterGare").style.visibility = "hidden";
				}
				$('#modalGare').modal("show");
			} else {
				if(pion.couleur != gestionnaireTerrain.lesCases[pion.position-1][1]) {
					var doc = document.getElementById("modalPaiement");
					var couleurPionPossedantGare = gestionnaireTerrain.lesCases[pion.position-1][1];
					doc.getElementsByClassName("modal-title")[0].innerHTML = "Paiement";
					doc.getElementsByClassName("info-paiement")[0].innerHTML = "Vous devez "+Contenu.fiches[position].loyers[gestionnaireTerrain.nbGareDuJoueur(couleurPionPossedantGare)-1]+" au joueur "+gestionnaireTerrain.lesCases[position-1][1];
					if(argentSuffisantPaiement(pion, Contenu.fiches[position].loyers[gestionnaireTerrain.nbGareDuJoueur(couleurPionPossedantGare)-1])) {
						$('#modalPaiement').modal("show");

					} else {
						alert("Le joueur "+pion.couleur+" n'a plus d'argent pour payer. La partie est donc fini.");
						initMonopoly();
					}
				}
			}

			break;

		case "compagnie" :
			if(!gestionnaireTerrain.terrainDejaAcheter(pion.position-1)) {
				document.getElementById("informations-compagnie").innerHTML = Contenu.fiches[position].nom;
				document.getElementById("compagnie-color").style.backgroundColor = Contenu.fiches[position].colors[0];
				document.getElementById("achat-compagnie").innerHTML = Contenu.fiches[position].prix;
				document.getElementById("loyer1-compagnie").innerHTML = "X " + Contenu.fiches[position].loyers[0];
				document.getElementById("loyer2-compagnie").innerHTML = "X " + Contenu.fiches[position].loyers[1];

				if(!argentSuffisantAchat()) {
					document.getElementById("acheterCompagnie").style.visibility = "hidden";
				}
				$('#modalCompagnie').modal("show");
			} else {
				if(pion.couleur != gestionnaireTerrain.lesCases[pion.position-1][1]) {
					var doc = document.getElementById("modalPaiement");
					var couleurPionPossedantCompagnie = gestionnaireTerrain.lesCases[pion.position-1][1];
					doc.getElementsByClassName("modal-title")[0].innerHTML = "Paiement";				
					doc.getElementsByClassName("info-paiement")[0].innerHTML = "Vous devez "+Contenu.fiches[position].loyers[gestionnaireTerrain.nbCompagnieDuJoueur(couleurPionPossedantCompagnie)-1]+" au joueur "+gestionnaireTerrain.lesCases[position-1][1];
					if(argentSuffisantPaiement(pion, Contenu.fiches[position].loyers[gestionnaireTerrain.nbCompagnieDuJoueur(couleurPionPossedantCompagnie)-1])) {
						$('#modalPaiement').modal("show");
					} else {
						alert("Le joueur "+pion.couleur+" n'a plus d'argent pour payer. La partie est donc fini.");
						initMonopoly();
					}
				}
			}
			break;

		case "prison" :
			this.envoyerEnPrison(pion);
			break;	
	}

	if (gestionnaireDes.d1 == gestionnaireDes.d2) {
		if(++gestionnaireDes.nbDouble == 3)
		{
			this.envoyerEnPrison(getPion(numJoueurEnJeu));
		}
		else
		{
			document.getElementById('boutonDes').innerHTML = "Relancer les des";
			document.getElementById('boutonDes').style.visibility = 'visible';
		}
	} else {
		gestionnaireDes.nbDouble = 0;
		document.getElementById('boutonDes').innerHTML = "Fin de tour";
		document.getElementById('boutonDes').style.visibility = 'visible';
	}	
}

function envoyerEnPrison(pion){
	document.getElementById("case" + pion.position).innerHTML = "";
	pion.prison = 1;
	pion.position = 11;
	document.getElementById("case41").innerHTML += "<p class=\"pion"+pion.couleur+"\"></p>";
}

function achatTerrain() {
	var pion = getPion(numJoueurEnJeu);
	document.getElementById("case"+pion.position).style.backgroundColor = getCouleurEN(pion);
	log(pion, "Achete "+Contenu.fiches[pion.position-1].nom+" "+Contenu.fiches[pion.position-1].prix+" F");
	pion.argent -= parseInt(Contenu.fiches[pion.position-1].prix);
	gestionnaireTerrain.lesCases[pion.position-1][1] = pion.couleur;
	this.majArgent();
}

function achatGare() {
	var pion = getPion(numJoueurEnJeu);
	document.getElementById("case"+pion.position).style.backgroundColor = getCouleurEN(pion);
	log(pion, "Achete "+Contenu.fiches[pion.position-1].nom+" "+Contenu.fiches[pion.position-1].prix+" F");
	pion.argent -= parseInt(Contenu.fiches[pion.position-1].prix);
	gestionnaireTerrain.lesCases[pion.position-1][1] = pion.couleur;
	this.majArgent();
}

function achatCompagnie() {
	var pion = getPion(numJoueurEnJeu);
	document.getElementById("case"+pion.position).style.backgroundColor = getCouleurEN(pion);
	log(pion, "Achete "+Contenu.fiches[pion.position-1].nom+" "+Contenu.fiches[pion.position-1].prix+" F");
	pion.argent -= parseInt(Contenu.fiches[pion.position-1].prix);
	gestionnaireTerrain.lesCases[pion.position-1][1] = pion.couleur;
	this.majArgent();
}

function achatMaison() {
	var pion = getPion(numJoueurEnJeu);
	log(pion, "Achete une maison sur "+Contenu.fiches[pion.position-1].nom+" pour "+Contenu.fiches[pion.position-1].prixMaison+" F");
	pion.argent -= parseInt(Contenu.fiches[pion.position-1].prixMaison);
	this.ajouterMaison(pion.position);
	gestionnaireTerrain.lesCases[pion.position-1][2] += 1;
	this.majArgent();
}

function achatMaisonEnsemble() {
	var pion = getPion(numJoueurEnJeu);
	liste = gestionnaireTerrain.listeTerrainCouleur(Contenu.fiches[pion.position-1].groupe);
	for(i=0;i<liste.length;i++) {
		log(pion, "Achete une maison sur "+Contenu.fiches[liste[i][0]].nom+" pour "+Contenu.fiches[liste[i][0]].prixMaison+" F");
		var pos = liste[i][0];
		gestionnaireTerrain.lesCases[pos][2] += 1;
		this.ajouterMaison(pos+1);
	}

	pion.argent -= liste.length*parseInt(Contenu.fiches[liste[0][0]].prixMaison);
	this.majArgent();
}

function argentSuffisantAchat() {
	var pion = getPion(numJoueurEnJeu);
	if((pion.argent - parseInt(Contenu.fiches[pion.position-1].prix))>0){
		return true;
	} else {
		return false;
	}
}

function argentSuffisantMaison() {
	var pion = getPion(numJoueurEnJeu);
	if((pion.argent - parseInt(Contenu.fiches[pion.position-1].prixMaison))>0){
		return true;
	} else {
		return false;
	}
}

function argentSuffisantEnsembleMaison() {
	var pion = getPion(numJoueurEnJeu);
	liste = gestionnaireTerrain.listeTerrainCouleur(Contenu.fiches[pion.position-1].groupe);
	for(i=0;i<liste.length;i++) {
		var pos = liste[i][0];
	}
	if(pion.argent > liste.length*parseInt(Contenu.fiches[liste[0][0]].prixMaison)){
		return true;
	}else {
		return false;
	}
}

function argentSuffisantPaiement(pion, montant) {
	if (pion.argent - parseInt(montant) > 0) {
		return true;
	} else {
		return false;
	}
}

function paiementLoyer(pion) {
	//Récuperation du propriétaire
	var proprietaire = gestionnaireTerrain.lesCases[pion.position-1][1];
	//Récuperer le loyer du terrain.
	if(gestionnaireTerrain.lesCases[pion.position-1][0] == "Gare") {
		var nbLoyer = gestionnaireTerrain.nbGareDuJoueur(proprietaire) - 1;
	}else if (gestionnaireTerrain.lesCases[pion.position-1][0] == "Compagnie") {
		var nbLoyer = gestionnaireTerrain.nbCompagnieDuJoueur(proprietaire) - 1;
	} else {
		var nbLoyer = gestionnaireTerrain.lesCases[pion.position-1][2];
	}
	var mtnLoyer = parseInt(Contenu.fiches[pion.position-1].loyers[nbLoyer]);
	//Ajouter l'argent du loyer au proprietaire.
	switch(proprietaire) {
		case "Rouge" :
			pionRouge.argent += mtnLoyer;
			break;
		case "Bleu" :
			pionBleu.argent += mtnLoyer;
			break;
		case "Jaune" :
			pionJaune.argent += mtnLoyer;
			break;
		case "Vert" :
			pionVert.argent += mtnLoyer;
			break;
	}
	//Soustraire le loyer au joueur qui est tombé sur la case.
	pion.argent -= mtnLoyer;
	this.majArgent();
}

function log(pion,texte) {
	document.getElementById("zoneTexte").innerHTML += "Joueur " + pion.couleur + " : "+texte+"\n";
	document.getElementById("zoneTexte").scrollTop = 99999;
}

function getCouleurEN(pion) {
	switch(pion.couleur) {
		case "Rouge":
			return "red";
			break;

		case "Bleu":
			return "blue";
			break;

		case "Vert":
			return "green";
			break;

		case "Jaune":
			return "yellow";
			break;
	}
}

function jouer() {
	if(document.getElementById('boutonDes').innerHTML == 'Lancer des'){
		gestionnaireDes.lancerDes();
		document.getElementById('boutonDes').style.visibility = 'hidden';
	} else {
		if(document.getElementById('boutonDes').innerHTML == 'Fin de tour'){
			prochainJoueur();
			document.getElementById('boutonDes').innerHTML = 'Lancer des';
			log(getPion(numJoueurEnJeu),'A vous de jouer.');
			if(getPion(numJoueurEnJeu).prison == 1) {
				log(getPion(numJoueurEnJeu), 'Vous êtes en prison, il faut faire un double pour sortir de prison.');
			}
		}else{
			gestionnaireDes.lancerDes();
			document.getElementById('boutonDes').style.visibility = 'hidden';
		}
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