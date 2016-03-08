var nbPion = 0;

function Pion(couleur) {
	this.numPion = ++nbPion;
	this.position = 1;
    this.couleur = couleur;
<<<<<<< HEAD
    this.argent = 150000;
=======
>>>>>>> origin/master

	this.deplacerPion = function (pNbCase){
		nbCase = pNbCase;
		timerDeplacement = setInterval(avancerPion,300,this);
		
	}

	

}






