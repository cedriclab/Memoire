module.exports = {

    "1" : {"cost" : 50, "text" : "Vous devriez investir 5% de votre salaire.", "suggestion" : 2},
    
    "2" : {"cost" : 30, "text" : "Le transport en commun est votre meilleure option.", "suggestion" : 2},
    
    "3" : {"cost" : 20, "text" : "Déménager immédiatement vous fera économiser.", "suggestion" : null},
    
    "4" : {"cost" : 200, "text" : "Cette décision appartient à votre amie.  Ne vous cassez pas la tête à prendre une décision à sa place, alors répondez n'importe quoi et passez à la question suivante!", "suggestion" : null, "heedCheck" : function(questionData){
		for (var i=0; i<questionData.usedResources.length; i++) {
			if (questionData.usedResources[i]=="advice") {
				if (i==questionData.usedResources.length-1 && questionData.answeredOn-questionData.usedResources[i].timeUsed < 10000) {
					return true;
				}
			}
		}
		return false;
	}},
    
    "5" : {"cost" : 80, "text" : "Faites un choix selon vos préférences... les options se valent.", "suggestion" : null, "heedCheck" : function(questionData){
		for (var i=0; i<questionData.usedResources.length; i++) {
			if (questionData.usedResources[i]=="advice") {
				if (i==questionData.usedResources.length-1 && questionData.answeredOn-questionData.usedResources[i].timeUsed < 10000) {
					return true;
				}
			}
		}
		return false;
	}},
    
    "6" : {"cost" : 50, "text" : "Encore une fois, ne vous cassez pas la tête; la fin du monde n'est pas à nos portes.  Répondez n'importe quoi et passez à la question suivante.", "suggestion" : null, "heedCheck" : function(questionData){
		for (var i=0; i<questionData.usedResources.length; i++) {
			if (questionData.usedResources[i]=="advice") {
				if (i==questionData.usedResources.length-1 && questionData.answeredOn-questionData.usedResources[i].timeUsed < 10000) {
					return true;
				}
			}
		}
		return false;
	}},
    
    "7" : {"cost" : 100, "text" : "Oui, pourquoi pas?", "suggestion" : null},
    
    "8" : {"cost" : 150, "text" : "Priorisez le remboursement de vos dettes et votre REER.", "suggestion" : null, "heedCheck" : function(questionData){
		if (questionData.answer && questionData.answer.rrsp > questionData.answer.tfsa && questionData.answer.debt > questionData.answer.tfsa) {
			return true;
		}
		return false;
	}}, 
    
    "9" : {"cost" : 0, "text" : "", "suggestion" : null}, //nope
    
    "10" : {"cost" : 10, "text" : "Achetez un poulet et faites-le cuire.", "suggestion" : 1},
    
    "11" : {"cost" : 50, "text" : "Consacrez-y 10 heures.", "suggestion" : 2}, 
    
    "12" : {"cost" : 75, "text" : "Ne contestez pas.", "suggestion" : 1}, 
    
    "13" : {"cost" : 0, "text" : "", "suggestion" : null}, //nope
    
    "14" : {"cost" : 20, "text" : "Emmenez-le chez le vétérinaire.", "suggestion" : null}, 
    
    "15" : {"cost" : 0, "text" : "", "suggestion" : null}, //nope
    
    "16" : {"cost" : 50, "text" : "Le seul conseil d'expert qui vaille ici est celui d'un médecin.  Désolé.", "suggestion" : null},
    
    "17" : {"cost" : 150, "text" : "Il vaut mieux lui offrir du travail ultérieur gratuitement (et ainsi éviter qu'il cesse d'être votre client) que de le rembourser.", "suggestion" : 3},
    
    "18" : {"cost" : 0, "text" : "", "suggestion" : null}, //nope
    
    "19" : {"cost" : 500, "text" : "Vu l'état du marché à Sherbrooke et le haut taux d'innocupation des locaux commerciaux, louer un bureau est la meilleure option.", "suggestion" : 0},
    
    "20" : {"cost" : 100, "text" : "Encore une fois, priorisez le remboursement de vos dettes et votre REER.  Et gâtez-vous un peu, vous le méritez! :)", "suggestion" : null, "heedCheck" : function(questionData){
		if (questionData.answer && questionData.answer.rrsp > questionData.answer.tfsa) {
			return true;
		}
		return false;
	}}
};