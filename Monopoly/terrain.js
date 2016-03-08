function gestionnaireTerrain() {
	this.lesCases = [];
	this.initTerrain = function (){
		for (i = 0; i < 40; i++) {
			var groupe;
			if(i == 2 || i == 4){groupe = "Rose";}
			if(i == 7 || i == 9 || i == 10){groupe = "Bleu Clair";}
			if(i == 12 || i == 14 || i == 15){groupe = "Violet";}
			if(i == 17 || i == 19 || i == 20){groupe = "Orange";}
			if(i == 22 || i == 24 || i == 25){groupe = "Rouge";}
			if(i == 27 || i == 28 || i == 30){groupe = "Jaune";}
			if(i == 32 || i == 33 || i == 35){groupe = "Vert";}
			if(i == 38 || i == 40){groupe = "Bleu Foncé";}
			if(i == 6 || i == 16 || i == 26 || i == 36){groupe = "Gare";}
			if(i == 13 || i == 29){groupe = "Compagnie";}
			
			// lesCases[Position] [Nom du groupe | couleur du joueur | nbMaison] -> gestionnaireTerrain.lesCases
			this.lesCases.push([groupe,"",0]);
		}	
	}
	
	this.toutTerrainCouleur = function (pion, groupe) {
		toutTerrain = true;
		for(i = 0; i < this.lesCases.length; i++)
		{
			if(this.lesCases[i][0] == groupe && this.lesCases[i][1] != pion)
				toutTerrain = false;
		}
		return toutTerrain;
	}
	
	this.terrainDejaAcheter = function (position){
		if(this.lesCases[position-1][1] == "")
			return false;
		else
			return true;
	}
	
	this.nbGareDuJoueur = function (pion){
		nb = 0;
		for(i = 0; i < this.lesCases.length; i++)
		{
			if(this.lesCases[i][0] == "Gare" && this.lesCases[i][1] == pion)
				nb++;
		}
		return nb;
	}
}
