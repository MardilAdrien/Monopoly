function Pion(couleur) {
	this.position = 1;
    this.couleur = couleur;
	
	this.deplacerPion = function (pNbCase){
		nbCase = pNbCase;
		timerDeplacement = setInterval(avancerPion,300,this);
	}
}






