module.exports = [
	{
		"id" : "1",
		"index" : "1",
		"section" : "warmup",
		"title" : "",
		"text" : "Votre dernier examen est derrière vous et vos amis vous traînent de force au Casino.\nVous vous approchez d’une première table de jeu, où l’on vous propose le jeu suivant:",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Vous avez 50% de chances de gagner 100$, et 50% de ne rien gagner"},
			{"id" : "2", "text" : "Vous gagnez 45$ assurément"}
		]
	},
	{
		"id" : "2",
		"index" : "2",
		"section" : "warmup",
		"title" : "",
		"text" : "Vous vous dirigez ensuite vers un autre jeu.\nOn vous offre un choix similaire:",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Vous avez 33% de chances de gagner 100$, 66% de chances d’en gagner 96$, et 1% de chances de ne rien gagner"},
			{"id" : "2", "text" : "Vous gagnez 96$ assurément"}
		]
	},
	{
		"id" : "3",
		"index" : "3",
		"section" : "warmup",
		"title" : "",
		"text" : "Avant que vous ne partiez, le croupier vous relance et modifie encore les termes du jeu:",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Vous avez 33% de chances de gagner 100$, et 67% de chances de ne rien gagner"},
			{"id" : "2", "text" : "Vous avez 34% de chances de gagner 96$, et 66% de chances de ne rien gagner"}
		]
	},
	{
		"id" : "4",
		"index" : "1",
		"section" : "game",
		"title" : "",
		"text" : "Vous venez de terminer vos études et, suite à une entrevue que vous avez passée dans une petite entreprise en démarrage, vous recevez un coup de fil vous informant que vous avez obtenu l’emploi.  Félicitations!\nOn vous offre un salaire de 20$ de l’heure, soit 41600$ par an.  Puisque l’entreprise en est encore à ses débuts et a de forts besoins de matière de financement, on vous propose de recevoir une portion de votre salaire en actions de l’entreprise.  Ainsi, si, dans quelques années, l’entreprise fonctionne bien et est rentable, vous percevrez des dividendes et pourrez même revendre ces actions à un prix plus élevé; par contre, si l’entreprise doit déclarer faillite, cela implique que la part de salaire que vous aurez investie ne vaudra plus rien.\nQuel pourcentage de votre salaire acceptez-vous de recevoir en actions?",
		"subText" : "",
		"hint" : "(Si vous voulez recevoir l’entièreté de votre salaire en argent, inscrivez 0)",
		"answerForm" : "text",
		"resources" : [
			{"id" : "", "sample" : "Let's say I invest in a startup, either with money, work, etc. In return I am given a 5% stake in the company, but no salary, benefits, etc.", "title" : "How does start-up equity end up paying off?", "thumbnail" : "", "sourceName" : "StackExchange - Money", "link" : "http://money.stackexchange.com/questions/45101/how-does-start-up-equity-end-up-paying-off"},
			{"id" : "", "sample" : "Why do people love dividends? Because they don’t understand either corporate finance or taxes.", "title" : "Dumb Idea: Dividends Are Good For You", "thumbnail" : "", "sourceName" : "Forbes", "link" : "http://www.forbes.com/sites/baldwin/2013/03/18/dumb-idea-dividends-are-good-for-you/"},
			{"id" : "", "sample" : "Une action est un titre de propriété délivré par une société de capitaux (par exemple une société anonyme ou une société en commandite par actions).", "title" : "Action", "thumbnail" : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Nonvaleur03.jpg/220px-Nonvaleur03.jpg", "sourceName" : "Wikipedia", "link" : "https://fr.wikipedia.org/wiki/Action_(finance)"},
			{"id" : "", "sample" : "Being aware of these possible pitfalls will help you hang on to the money you'll need as your business expands.", "title" : "Allocating Stocks: Five Common Mistakes", "thumbnail" : "", "sourceName" : "Bloomberg Business", "link" : "http://www.bloomberg.com/bw/stories/2008-01-14/allocating-stocks-five-common-mistakesbusinessweek-business-news-stock-market-and-financial-advice"},
			{"id" : "", "sample" : "Startup employee equity should reward the risk you take in joining the company. Here's some ways to understand equity value so you can decide if your equity meets this standard.", "title" : "RISK/REWARD OF STARTUP EMPLOYEE STOCK", "thumbnail" : "", "sourceName" : "Stock Option Counsel", "link" : "http://stockoptioncounsel.com/blog/i-right-to-value-how-to-stock-option-counsel/2014/3/12"},
			{"id" : "", "sample" : "Taux de rendement composés annuels moyens", "title" : "Taux de rendement des fonds d'actions canadiennes", "thumbnail" : "http://www.scotiabank.com/ca/common/banners/logo-scotiafunds-lrg_fr.gif", "sourceName" : "Banque Scotia", "link" : "http://www.scotiabank.com/ca/fr/0,,1758,00.html"}
		]
	},
	{
		"id" : "5",
		"index" : "2",
		"section" : "game",
		"title" : "",
		"text" : "Maintenant que vous êtes sur le marché du travail, vous devez vous déplacer.  Vous disposez déjà d’un 5000$ en argent comptant.\nQue choissez-vous?",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Vous achetez une voiture usagée à 4000$.  Elle vous coûtera 50$ par semaine en essence et 60$ par mois en assurances.  Puisqu’il s’agit d’une voiture usagée, il y a toutefois une probabilité [X] qu’elle tombe en panne et le prix des réparations peut varier entre 1000$ et 3000$.  À chaque panne, vous devrez également manquer du travail, ce qui résultera en d’autres pertes, allant jusqu’à 8h, en heures non-travaillées."},
			{"id" : "2", "text" : "Vous achetez une voiture neuve à 15000$.  Vous devez la financer à un taux annuel de 5%.  Les assurances vous coûteront 65$ par mois et l’essence vous en coûtera 40$ par semaine.  Puisqu’il s’agit d’un véhicule neuf, la probabilité qu’elle tombe en panne (et vous fasse donc perdre encore jusqu’à 8h de travail) est de [X].  Les réparations peuvent aller de 1000$ à 5000$."},
			{"id" : "3", "text" : "Vous continuez à utiliser le service de transport en commun et votre vélo.  Une carte mensuelle vous coûte 100$.  Toutefois, à cause des intempéries ou de retards, la probabilité que vous arriviez en retard à votre travail, et perdiez donc une heure de salaire, est de 10%.  Aussi, il vous arrive d’utiliser l’autocar pour voyager; vous faites environ deux voyages par mois, avec un billet aller-retour qui vous coûte normalement autour de 45$.  Environ une fois par an, il vous arrive aussi de louer une voiture, ce qui vous coûte 200$ à chaque fois."}
		],
		"resources" : [
			{"id" : "", "sample" : "", "title" : "Calculatrice de prêt", "thumbnail" : "http://www4.bmo.com/images/bmobankpopup_fr.gif", "sourceName" : "BMO - Banque de Montréal", "link" : "http://www4.bmo.com/popup/prets/Calculator.html"},
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "6",
		"index" : "3",
		"section" : "game",
		"title" : "",
		"text" : "La propriétaire du logement que vous occupez en colocation avec votre meilleur ami vous rend une petite visite pour vous informer qu’elle souhaite faire des travaux de rénovation dans votre logement, qui le rendront innoccupable pendant quelques temps.\nVous payez actuellement un loyer de 650$/mois que vous partagez à deux.  Vous considérez vos options.",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Demander la rupture du bail et déménager; vous devrez payer X et le nouveau loyer sera de X."},
			{"id" : "2", "text" : "Déposer une plainte à la Régie du logement."},
			{"id" : "3", "text" : "Aller habiter chez vos parents la durée des travaux; ils habitent toutefois à X distance, ce qui représente des dépenses supplémentaires de X en transport."},
			{"id" : "4", "text" : "Dormir sur le sofa d’une amie; toutefois, la piètre qualité du sommeil vous fera perdre en productivité au travail, ce qui constituera une perte équivalente à 3 heures par semaine."},
		],
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "Gouvernement du Québec", "link" : "http://www4.gouv.qc.ca/FR/Portail/Citoyens/Evenements/vivre-en-logement/Pages/resiliation-bail.aspx"},
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "Les Populaires", "link" : "http://noussommeslespopulaires.com/?p=7229"},
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "Les Affaires", "link" : "http://productivite.lesaffaires.com/ressources-humaines/capital-humain/l-impact-benefique-du-sommeil-sur-la-productivite/les-affaires#.VarM8BNVhBc"},
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "Régie du logement", "link" : "http://www.rdl.gouv.qc.ca/fr/pdf/travauxmajeurs.pdf"}
		]
	},
	{
		"id" : "7",
		"index" : "4",
		"section" : "game",
		"title" : "",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "",
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "8",
		"index" : "5",
		"section" : "game",
		"title" : "",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "",
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "9",
		"index" : "6",
		"section" : "game",
		"title" : "",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "",
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "10",
		"index" : "7",
		"section" : "game",
		"title" : "",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "",
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "11",
		"index" : "8",
		"section" : "game",
		"title" : "",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "",
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "12",
		"index" : "9",
		"section" : "game",
		"title" : "",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "",
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "13",
		"index" : "10",
		"section" : "game",
		"title" : "",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "",
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "14",
		"index" : "11",
		"section" : "game",
		"title" : "",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "",
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "15",
		"index" : "12",
		"section" : "game",
		"title" : "",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "",
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "16",
		"index" : "1",
		"section" : "personal",
		"title" : "Âge",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "text"
	},
	{
		"id" : "17",
		"index" : "2",
		"section" : "personal",
		"title" : "Sexe",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Féminin"},
			{"id" : "2", "text" : "Masculin"}
		]
	},
	{
		"id" : "18",
		"index" : "3",
		"section" : "personal",
		"title" : "Programme d'études",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Économie"},
			{"id" : "2", "text" : "Marketing"},
			{"id" : "3", "text" : "Mathématiques"},
			{"id" : "4", "text" : "Psychologie"},
		],
	},
	{
		"id" : "19",
		"index" : "4",
		"section" : "personal",
		"title" : "Adresse courriel",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "text"
	},
	{
		"id" : "20",
		"index" : "5",
		"section" : "personal",
		"title" : "Si vous occupez un emploi, quel est votre salaire horaire?",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "text"
	},
	{
		"id" : "21",
		"index" : "6",
		"section" : "personal",
		"title" : "Parmi les suivantes, quelles sources d’information consultez-vous?",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "multi",
		"options" : [
			{"id" : "1", "text" : "La Presse"},
			{"id" : "2", "text" : "La Tribune"},
			{"id" : "3", "text" : "La Presse Affaires"},
			{"id" : "4", "text" : "Mashable"},
			{"id" : "5", "text" : "Le Devoir"},
			{"id" : "6", "text" : "Radio X"},
			{"id" : "7", "text" : "Les Petites Manies"},
			{"id" : "8", "text" : "The Globe and Mail"},
			{"id" : "9", "text" : "Gawker"},
			{"id" : "10", "text" : "7Jours"},
			{"id" : "11", "text" : "The National Post"},
			{"id" : "12x", "text" : "InfoWars"},
		],
	}
	
]