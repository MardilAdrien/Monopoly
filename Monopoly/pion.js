var nbPion = 0;

function Pion(couleur) {
	this.numPion = ++nbPion;
	this.position = 1;
    this.couleur = couleur;
    this.argent = 150000;
    this.prison = 0;
    this.sortiePrison = 0;
	this.nbTourEnPrison = 0;

	this.deplacerPion = function (pNbCase){
		nbCase = pNbCase;
		timerDeplacement = setInterval(avancerPion,300,this);
	}
}






