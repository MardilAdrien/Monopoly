var nbPion = 0;

function Pion(couleur) {
	this.numPion = ++nbPion;
	this.position = 1;
    this.couleur = couleur;

	this.deplacerPion = function (pNbCase){
		nbCase = pNbCase;
		timerDeplacement = setInterval(avancerPion,300,this);
		
	}
}






