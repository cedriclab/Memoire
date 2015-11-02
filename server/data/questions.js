module.exports = [
	{
		"id" : "1",
		"index" : "1",
		"section" : "warmup",
		"title" : "",
		"text" : "Votre dernier examen est derrière vous et vos amis vous traînent de force au Casino.\nVous vous approchez d’une première table de jeu, où l’on vous propose le jeu suivant.\nQue choisissez-vous?",
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
		"text" : "Vous vous dirigez ensuite vers un autre jeu.\nOn vous offre un choix similaire.\nQue choisissez-vous?",
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
		"text" : "Avant que vous ne partiez, le croupier vous relance et modifie encore les termes du jeu.\nQue choisissez-vous?",
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
		"answerForm" : "select",
		"scale" : [0,1],
        "options" : [
			{"id" : "1", "text" : "0%"},
			{"id" : "2", "text" : "1%"},
            {"id" : "3", "text" : "5%"},
			{"id" : "4", "text" : "10%"},
		],
		"resources" : [
			{"id" : "", "sample" : "Let's say I invest in a startup, either with money, work, etc. In return I am given a 5% stake in the company, but no salary, benefits, etc.", "title" : "How does start-up equity end up paying off?", "thumbnail" : "", "sourceName" : "StackExchange - Money", "link" : "http://money.stackexchange.com/questions/45101/how-does-start-up-equity-end-up-paying-off"},
			{"id" : "", "sample" : "Why do people love dividends? Because they don’t understand either corporate finance or taxes.", "title" : "Dumb Idea: Dividends Are Good For You", "thumbnail" : "", "sourceName" : "Forbes", "link" : "http://www.forbes.com/sites/baldwin/2013/03/18/dumb-idea-dividends-are-good-for-you/"},
			{"id" : "", "sample" : "Une action est un titre de propriété délivré par une société de capitaux (par exemple une société anonyme ou une société en commandite par actions).", "title" : "Action", "thumbnail" : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Nonvaleur03.jpg/220px-Nonvaleur03.jpg", "sourceName" : "Wikipedia", "link" : "https://fr.wikipedia.org/wiki/Action_(finance)"},
			{"id" : "", "sample" : "Being aware of these possible pitfalls will help you hang on to the money you'll need as your business expands.", "title" : "Allocating Stocks: Five Common Mistakes", "thumbnail" : "", "sourceName" : "Bloomberg Business", "link" : "http://www.bloomberg.com/bw/stories/2008-01-14/allocating-stocks-five-common-mistakesbusinessweek-business-news-stock-market-and-financial-advice"},
			{"id" : "", "sample" : "Startup employee equity should reward the risk you take in joining the company. Here's some ways to understand equity value so you can decide if your equity meets this standard.", "title" : "RISK/REWARD OF STARTUP EMPLOYEE STOCK", "thumbnail" : "", "sourceName" : "Stock Option Counsel", "link" : "http://stockoptioncounsel.com/blog/i-right-to-value-how-to-stock-option-counsel/2014/3/12"},
			{"id" : "", "sample" : "Taux de rendement composés annuels moyens", "title" : "Taux de rendement des fonds d'actions canadiennes", "thumbnail" : "http://www.scotiabank.com/ca/common/banners/logo-scotiafunds-lrg_fr.gif", "sourceName" : "Banque Scotia", "link" : "http://www.scotiabank.com/ca/fr/0,,1758,00.html"}
		],
        "rawData" : {"title" : "Grille de calcul", "link" : "/Contents/xlsx/Salaire.xlsx"}
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
			{"id" : "1", "text" : "Vous achetez une voiture usagée à 4000$.  Elle vous coûtera 50$ par semaine en essence et 60$ par mois en assurances.  Puisqu’il s’agit d’une voiture usagée, il y a toutefois une probabilité de 5% qu’elle tombe en panne et le prix des réparations peut varier entre 1000$ et 3000$.  À chaque panne, vous devrez également manquer du travail, ce qui résultera en d’autres pertes, allant jusqu’à 8h, en heures non-travaillées."},
			{"id" : "2", "text" : "Vous achetez une voiture neuve à 15000$.  Vous devez la financer, sur 5 ans, à un taux annuel de 5%.  Vos paiements sont mensuels.  Les assurances vous coûteront 65$ par mois et l’essence vous en coûtera 40$ par semaine.  Puisqu’il s’agit d’un véhicule neuf, la probabilité qu’elle tombe en panne (et vous fasse donc perdre encore jusqu’à 8h de travail) par mois est de 1%.  Les réparations peuvent aller de 1000$ à 5000$."},
			{"id" : "3", "text" : "Vous continuez à utiliser le service de transport en commun et votre vélo.  Une carte mensuelle vous coûte 100$.  Toutefois, à cause des intempéries ou de retards, la probabilité que vous arriviez en retard à votre travail une fois par mois, et perdiez donc une heure de salaire, est de 10%.  Aussi, il vous arrive d’utiliser l’autocar pour voyager; vous faites environ deux voyages par mois, avec un billet aller-retour qui vous coûte normalement autour de 45$.  Environ une fois par an, il vous arrive aussi de louer une voiture, ce qui vous coûte 200$ à chaque fois."}
		],
		"resources" : [
			{"id" : "", "sample" : "", "title" : "Calculatrice de prêt", "thumbnail" : "http://www4.bmo.com/images/bmobankpopup_fr.gif", "sourceName" : "BMO - Banque de Montréal", "link" : "http://www4.bmo.com/popup/prets/Calculator.html"},
			{"id" : "", "sample" : "", "title" : "Prévisions des taux de détail", "thumbnail" : "", "sourceName" : "Desjardins", "link" : "http://www.desjardins.com/a-propos/etudes-economiques/previsions/previsions-taux-detail/"},
			{"id" : "", "sample" : "Les fabricants automobiles ont enregistré des ventes record, pour une troisième année consécutive, l'an dernier, en livrant plus de 61 millions de véhicules à travers le monde.", "title" : "Chronique - Le temps d'acheter une auto neuve?", "thumbnail" : "", "sourceName" : "24h", "link" : "http://24hmontreal.canoe.ca/24hmontreal/chroniques/carlrenaud/archives/2013/01/20130115-082438.html"},
			{"id" : "", "sample" : "Plus de 800 000 véhicules d’occasion trouvent preneur chaque année au Québec. La prudence s’impose si vous ne voulez pas vous retrouver au volant d’un bazou.", "title" : "Voitures d'occasion: astuces pour un achat futé", "thumbnail" : "", "sourceName" : "Protégez-Vous", "link" : "http://www.protegez-vous.ca/automobile/voitures-doccasion-astuces-pour-un-achat-fute.html"},
			{"id" : "", "sample" : "", "title" : "Budget: Bus vs Voiture", "thumbnail" : "", "sourceName" : "metrodemontreal.com", "link" : "http://www.metrodemontreal.com/forum/viewtopic.php?t=11887&sid=1d93cd5b6dccc1ec936202947e718f86"},
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		],
        "rawData" : {"title" : "Grille comparative", "link" : "/Contents/xlsx/Voiture.xlsx"}
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
			{"id" : "1", "text" : "Demander la rupture du bail et déménager; vous devrez payer 975$ et le nouveau loyer sera de 550$."},
			{"id" : "2", "text" : "Déposer une plainte à la Régie du logement."},
			{"id" : "3", "text" : "Aller habiter chez vos parents la durée des travaux; ils habitent toutefois à 100km de distance, ce qui représente des dépenses supplémentaires de transport (essence ou billet de bus)."},
			{"id" : "4", "text" : "Dormir sur le sofa d’une amie; toutefois, la piètre qualité du sommeil vous fera perdre en productivité au travail, ce qui constituera une perte équivalente à 3 heures par semaine."},
		],
		"resources" : [
			{"id" : "", "sample" : "Certaines situations peuvent entraîner des changements en cours de bail, mais cela ne signifie pas nécessairement que vous pouvez résilier votre bail. Seuls les motifs prévus par le Code civil du Québec permettent aux locataires de résilier un bail de logement. ", "title" : "Résiliation de bail", "thumbnail" : "", "sourceName" : "Services Québec", "link" : "http://www4.gouv.qc.ca/FR/Portail/Citoyens/Evenements/vivre-en-logement/Pages/resiliation-bail.aspx"},
			{"id" : "", "sample" : "J’habite à Montréal depuis maintenant cinq ans. En cinq ans, j’ai déménagé cinq fois.", "title" : "Ma vie de coloc", "thumbnail" : "", "sourceName" : "Les Populaires", "link" : "http://noussommeslespopulaires.com/?p=7229"},
			{"id" : "", "sample" : "Maîtriser l'art du sommeil nocturne pourrait aider à remporter les batailles du jour suivant en éliminant fatigue et irritabilité, causes de déficits de concentration et facteurs de distraction.", "title" : "L'impact bénéfique du sommeil sur la productivité", "thumbnail" : "", "sourceName" : "Les Affaires", "link" : "http://productivite.lesaffaires.com/ressources-humaines/capital-humain/l-impact-benefique-du-sommeil-sur-la-productivite/les-affaires#.VarM8BNVhBc"},
			{"id" : "", "sample" : "Vous êtes locataire et vous venez d'apprendre que votre propriétaire a l'intention de faire des travaux majeurs dans votre logement.", "title" : "Les travaux majeurs", "thumbnail" : "", "sourceName" : "Régie du logement", "link" : "http://www.rdl.gouv.qc.ca/fr/pdf/travauxmajeurs.pdf"}
		]
	},
	{
		"id" : "7",
		"index" : "4",
		"section" : "game",
		"title" : "",
		"text" : "Une bonne amie vient, tout comme vous, de commencer sa vie professionnelle à Sherbrooke et vous demande conseil à propos de sa meilleure option de logement.\nCette amie a 25 ans, est célibataire sans enfants, et dispose d’un budget d’environ 1000$ par mois à consacrer au logement, en plus d’une épargne de 20 000$.  Votre amie cherche le meilleur placement sur un horizon de 5 ans, après quoi elle aimerait acheter une grande maison victorienne.\nQue lui conseillez-vous?",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Une maison unifamiliale de type “bungalow” à Rock-Forrest, pour 200 000$"},
			{"id" : "2", "text" : "Un condo neuf au centre-ville, pour 180 000$"},
			{"id" : "3", "text" : "Un duplex à Fleurimont, avec des revenus mensuels nets de 400$ par mois, pour 240 000$"},
			{"id" : "4", "text" : "Demeurer dans son appartement (550$/mois) et continuer à épargner en attendant d’être en couple, pour se permettre sa grande maison victorienne dans le Vieux-Nord"},
		],
		"resources" : [
			{"id" : "", "sample" : "A recent column comparing an investment in stocks to one on a GTA condo upset some readers. We revisit the story.", "title" : "Rent the condo, or buy it? Readers respond: Mayers", "thumbnail" : "", "sourceName" : "The Toronto Star", "link" : "http://www.thestar.com/business/personal_finance/2015/07/07/rent-the-condo-or-buy-it-readers-respond-mayers.html"},
			{"id" : "", "sample" : "Two years ago Pat and Kelly decided to punt their suburban Vancouver OSB McMansion, invest the bundle for income, and rent.", "title" : "Renting", "thumbnail" : "", "sourceName" : "The Greater Fool", "link" : "http://www.greaterfool.ca/2013/08/13/renting/"},
			{"id" : "", "sample" : "En 2008, Carl Dubuc a cédé à la «pression» de son entourage. Il s'est décidé à investir dans l'immobilier...", "title" : "Acheter ou louer, là est la question", "thumbnail" : "", "sourceName" : "La Presse Affaires", "link" : "http://affaires.lapresse.ca/economie/immobilier/201106/29/01-4413504-acheter-ou-louer-la-est-la-question.php"},
			{"id" : "", "sample" : "Small is in, buying is (maybe) out, and smart growth is here to stay.", "title" : "The Hottest Trends in Urban Housing", "thumbnail" : "", "sourceName" : "CityLab", "link" : "http://www.citylab.com/housing/2012/04/future-urban-housing/1672/"},
			{"id" : "", "sample" : "Les maisons sont «sérieusement inabordables» au Canada, selon une étude annuelle comparant divers marchés immobiliers de la planète.", "title" : "Ratio salaires et prix des maisons:  Sherbrooke est 3e au Québec", "thumbnail" : "", "sourceName" : "La Tribune", "link" : "http://www.lapresse.ca/la-tribune/economie-et-innovation/201501/21/01-4837197-ratio-salaires-et-prix-des-maisons-sherbrooke-est-3e-au-quebec.php"},
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		],
        "rawData" : {"title" : "Classeur Excel - Maisons", "link" : "/Contents/xlsx/Maisons.xlsx"}
	},
	{
		"id" : "8",
		"index" : "5",
		"section" : "game",
		"title" : "",
		"text" : "Vous êtes au magasin et devez acheter un nouvel ordinateur, dont vous avez l’intention de vous servir tant dans votre vie privée qu’au travail.\nFaites un choix parmi les quatre options suivantes",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Un MacBook"},
			{"id" : "2", "text" : "Un Acer Aspire E"},
            {"id" : "3", "text" : "Un Dell XPS 15"},
			{"id" : "4", "text" : "Une Microsoft Surface Pro"},
			{"id" : "5", "text" : "Un Chromebook Pixel 2"},
		],
		"resources" : [
			{"id" : "", "sample" : "Nous avons sélectionné 44 ordinateurs portables selon des critères tels que la puissance du processeur, la capacité du disque dur et l’autonomie de la pile.", "title" : "Ordinateurs portables: 44 modèles recommandés", "thumbnail" : "", "sourceName" : "Protégez-Vous", "link" : "http://www.protegez-vous.ca/technologie/test-ordinateurs-portables.html"},
			{"id" : "", "sample" : "Picking out a laptop isn't easy. It's hard to really understand whether or not a computer is right for your needs until you've actually used it for a while.", "title" : "The Best Laptops You Can Buy", "thumbnail" : "", "sourceName" : "Business Insider", "link" : "http://www.businessinsider.com/best-laptops-2015-1?op=1"},
			{"id" : "", "sample" : "There's a new Chrome OS flagship in town, the Chromebook Pixel 2. Like the first model, the new king of the Chromebooks prioritizes design and performance above value — the one spec where these curious, browser-driven laptops usually stand out.", "title" : "Google's Chromebook Pixel 2 is ready to be your work laptop", "thumbnail" : "", "sourceName" : "Mashable", "link" : "http://mashable.com/2015/03/11/chromebook-pixel-2-review/"},
			{"id" : "", "sample" : "Everything about the new MacBook screams “future,” but can it handle today?", "title" : "2015 MacBook Review", "thumbnail" : "", "sourceName" : "TechCrunch", "link" : "http://techcrunch.com/2015/04/09/2015-macbook-review/"},
			{"id" : "", "sample" : "Est-ce que la troisième fois sera la bonne? Microsoft a dévoilé cette semaine la troisième génération de sa tablette Surface Pro, qui promet – encore une fois – le mélange idéal entre une tablette électronique et un ordinateur portatif.", "title" : "Mise à l’essai de la Surface Pro 3", "thumbnail" : "", "sourceName" : "Radio-Canada.ca", "link" : "http://blogues.radio-canada.ca/triplex/2014/05/29/mise-a-lessai-de-la-surface-pro-3/"},
            {"id" : "", "sample" : "Ordinateurs et Tablettes", "title" : "BestBuy.ca", "thumbnail" : "", "sourceName" : "BestBuy.ca", "link" : "http://www.bestbuy.ca/"},
            {"id" : "", "sample" : "Ordinateurs portatifs et accessoires", "title" : "Bureau en Gros", "thumbnail" : "Bureau en Gros", "sourceName" : "", "link" : "http//www.staples.ca/fr/Ordinateurs-portatifs-et-accessoires"},
		],
        "rawData" : {"title" : "Grille comparative", "link" : "/Contents/xlsx/Ordinateurs.xlsx"}
	},
	{
		"id" : "9",
		"index" : "6",
		"section" : "game",
		"title" : "",
		"text" : "Un autre ami, adepte des théories du complot et du survivalisme, a décidé de se faire une cache dans les bois afin d’être prêt à survivre à l’effondrement de la civilisation occidentale.  Il vous demande votre aide pour choisir efficacement de quoi garnir son garde-manger de secours.\nVeuillez choisir l’un des quatre paniers de denrées suivants:",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "[5x18L d’eau, 5Kg de riz] pour [5x5$, 15$]"},
			{"id" : "2", "text" : "[2x18L d’eau, 1Kg de riz, 5 cannes de macédoine de légumes, 5 cannes de fêves, 5kg de farine, 2kg de sucre, 4 boîtes de macaronis] pour [2x5$, 4$, 5x0.59$, 5x1.50$, 10$, 3$, 4x3$]"},
			{"id" : "3", "text" : "[3x18L d’eau, 2Kg de riz, 20 cannes de macédoine de légumes] pour [3x5$, 7$, 20x0.59$]"},
			{"id" : "4", "text" : "La trousse 72h de Costco pour 160.24$"}
		],
		"resources" : [
			{"id" : "", "sample" : "Les survivalistes se préparent à faire face au chaos : catastrophe naturelle, guerre nucléaire ou effondrement de la société.", "title" : "Dans la tête des survivalistes", "thumbnail" : "", "sourceName" : "Radio-Canada", "link" : "http://ici.radio-canada.ca/regions/dossiers/2015/dans-la-tete-des-survivalistes/"},
            {"id" : "", "sample" : "When disaster strikes, there’s a pretty good chance your local grocery stores are going to be stripped bare in a matter of hours.", "title" : "Survival Food", "thumbnail" : "", "sourceName" : "Offgrid Survival", "link" : "http://offgridsurvival.com/survivalfood/"},
			{"id" : "", "sample" : "Dans une situation d'urgence, vous aurez besoin de certains articles essentiels. Vous devrez peut-être vous débrouiller sans source d'énergie ni eau courante. Préparez-vous à être autosuffisant pendant au moins 72 heures.", "title" : "Trousses d'urgence", "thumbnail" : "", "sourceName" : "Gouvernement du Canada", "link" : "http://www.preparez-vous.gc.ca/cnt/kts/index-fr.aspx"},
			{"id" : "", "sample" : "Economist Martin Armstrong says that the US Treasury Department’s purchase of survival kits for thousands of employees who oversee the banking system could be linked to some kind of “Mad Max” style event.", "title" : "Economist: US Treasury Buying Survival Kits Is “Mad Max” Style Planning", "thumbnail" : "", "sourceName" : "InfoWars", "link" : "http://www.infowars.com/economist-us-treasury-buying-survival-kits-is-mad-max-style-planning/"},
			{"id" : "", "sample" : "When preparing meals while camping, you don't have all of the amenities you would in a normal kitchen.", "title" : "Food Ideas for Camping for 10 Days", "thumbnail" : "", "sourceName" : "LiveStrong.com", "link" : "http://www.livestrong.com/article/132148-food-ideas-camping-10-days/"},
			{"id" : "", "sample" : "One of my favorite phrases that I tell new preppers is that “your preps are your lifeline.”", "title" : "25 Must Have Survival Foods: Put Them In Your Pantry Now", "thumbnail" : "", "sourceName" : "ReadyNutrition", "link" : "http://readynutrition.com/resources/25-must-have-survival-foods-put-them-in-your-pantry-now_03042013/"},
			{"id" : "", "sample" : "Carrying heavy boxes and coolers of camp food into camp is one of the least fun jobs of the whole camping trip, but experienced camp cooks know how to cut the weight of the food needed for camp meals almost in half.", "title" : "How to pack camp food", "thumbnail" : "", "sourceName" : "Camping with Gus", "link" : "http://campingwithgus.com/2010/12/02/camp-meals-pack-smart/"},
			{"id" : "", "sample" : "Sécurité publique Canada suggère fortement que chaque ménage canadien ait à sa portée une trousse de survie complète pour 72 heures.", "title" : "Trousse de survie de luxe 72 heures pour 2 personnes", "thumbnail" : "", "sourceName" : "Costco", "link" : "http://reviews.costco.ca/2070-fr_ca/100014285/in-case-of-inc-in-case-of-trousse-de-survie-de-luxe-72-heures-pour-2-personnes-reviews/reviews.htm"}
		],
        "rawData" : {"title" : "Classeur Excel", "link" : "/Contents/xlsx/GardeManger.xlsx"}
	},
	{
		"id" : "10",
		"index" : "7",
		"section" : "game",
		"title" : "",
		"text" : "Votre bon travail fait des vagues!  Vous recevez sur LinkedIn un message d’un recruteur dans votre domaine qui souhaite vous rencontrer pour vous offrir un poste dans une grande entreprise.\nAllez-vous le rencontrer?",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Oui"},
			{"id" : "2", "text" : "Non"},
		],
		"resources" : [
            {"id" : "", "sample" : "Je suis en réflexion sur mon avenir et je me demande s’il est opportun de contacter un recruteur. J’hésite à le faire car plusieurs amis m’ont mentionné avoir été déçu du résultat notamment sur les retours d’appels et le suivi de leur dossier.", "title" : "Devrais-je contacter un recruteur", "thumbnail" : "", "sourceName" : "Droit Inc.", "link" : "http://www.droit-inc.com/article13994-Devrais-je-contacter-un-recruteur"},
			{"id" : "", "sample" : "Many job seekers are confused about how hiring works, and, specifically, about how to work with recruiters. It is important to understand their role and how the process works in order to be successful.", "title" : "5 Things You Should Know About Job Recruiters", "thumbnail" : "", "sourceName" : "Huffington Post", "link" : "http://www.huffingtonpost.com/susan-p-joyce/job-recruiters_b_5059365.html"},
            {"id" : "", "sample" : "At some point or another, every technical person will conduct a job search. And either by design or accident, they will encounter the nemesis of job searching: The Recruiter.", "title" : "Why Recruiters are Bad for your Career", "thumbnail" : "", "sourceName" : "Brandon Savage", "link" : "https://www.brandonsavage.net/why-recruiters-are-bad-for-your-career/ "},
            {"id" : "", "sample" : "When you’re deep in the midst of your job search, it’s easy to feel like you’re on your own—just you and your resume, against the millions of other job-seekers.", "title" : "How Recruiters can help your job hunt", "thumbnail" : "", "sourceName" : "The Muse", "link" : "https://www.themuse.com/advice/how-recruiters-can-help-your-job-hunt"},
            {"id" : "", "sample" : "Top Ten reasons why its better to stick it out at a Big Company instead of leaving for a Startup", "title" : "Top Ten Reasons why it's better to stick it out at a Big Company", "thumbnail" : "", "sourceName" : "Forbes", "link" : "http://www.forbes.com/sites/ericjackson/2012/01/12/top-ten-reasons-why-its-better-to-stick-it-out-at-a-big-company-instead-of-leave-for-a-start-up/"},
            {"id" : "", "sample" : "You've graduated from college, diploma in hand (or in the mail), and you have a couple of job offers on the table. Other than being one of the lucky graduates in a weak economy, you have a choice to make.", "title" : "8 Reasons to choose a Startup over a Corporate Job", "thumbnail" : "", "sourceName" : "FastCompany", "link" : "http://www.fastcompany.com/1824235/8-reasons-choose-startup-over-corporate-job"}
		]
	},
	{
		"id" : "11",
		"index" : "8",
		"section" : "game",
		"title" : "",
		"text" : "Vous souhaitez commencer à épargner.  En faisant votre budget mensuel, vous remarquez que vous disposez d’environ %s$ par mois que vous aimeriez épargner régulièrement.  Vous avez également un prêt étudiant de 10000$, pour lequel vous avez un taux d’intérêt variable qui est actuellement à 4,5% annuel.  Vous aimeriez également que le montant épargné vous serve de mise de fond pour l’achat d’une propriété d’ici quelques années.\nInscrivez quel montant vous consacrez mensuellement au remboursement de votre prêt, quel montant vous investissez dans un REER, et quel montant vous placez dans un CELI.",
		"subText" : "",
		"hint" : "",
		"answerForm" : "text-multiple",
		"sum" : "meanDelta",
        "additionalInfoKey" : "meanDelta",
		"fields" : [
			{"name" : "debt", "title" : "Remboursement"},
			{"name" : "rrsp", "title" : "RÉÉR"},
			{"name" : "tfsa", "title" : "CÉLI"}
		],
		"resources" : [
            {"id" : "", "sample" : "Les liens suivant donnent accès aux renseignements pour les rentiers, cotisants, et bénéficiaires des régimes enregistrés pour la retraite, l'achat ou la construction d'une habitation admissible, ou pour l'éducation permanente.", "title" : "REER et régimes connexes", "thumbnail" : "", "sourceName" : "Agence du Revenu du Canada", "link" : "http://www.cra-arc.gc.ca/tx/ndvdls/tpcs/rrsp-reer/menu-fra.html"},
            {"id" : "", "sample" : "Vous avez 21 ans, vous venez de terminer vos études et d’entamer une carrière, et pour la première fois de votre vie, vous avez mis un peu d’argent de côté.", "title" : "L’importance de commencer jeune à épargner et à investir!", "thumbnail" : "", "sourceName" : "Groupe Investors", "link" : "http://www.groupeinvestors.com/fr/dans-les-medias/articles/placements/l-importance-de-commencer-jeune"},
            {"id" : "", "sample" : "Le compte d’épargne libre d’impôt (CELI) est un instrument d’épargne enregistré, souple et d’usage général, qui permet aux Canadiennes et aux Canadiens de gagner un revenu de placement libre d’impôt afin de combler plus facilement leurs besoins d’épargne tout au long de leur vie.", "title" : "Épargnez de l'argent grâce au compte d'épargne libre d'impôt", "thumbnail" : "", "sourceName" : "Gouvernement du Canada", "link" : "http://www.celi.gc.ca/"},
            {"id" : "", "sample" : "The millennial generation, a group encompassing people from those who are about 18 years old to those already into their early 30s, is educated, digitally savvy and community-minded.", "title" : "Millennials will get shortchanged in retirement", "thumbnail" : "", "sourceName" : "CNBC", "link" : "http://www.cnbc.com/2014/12/08/millennials-will-get-shortchanged-in-retirement.html"},
            {"id" : "", "sample" : "Le bilan personnel sert à établir la valeur nette d’une personne à une date donnée.", "title" : "Qui paye ses dettes s'enrichit", "thumbnail" : "", "sourceName" : "Les Affaires", "link" : "http://www.lesaffaires.com/mes-finances/planification/qui-paye-ses-dettes-s-enrichit/568644"},
            {"id" : "", "sample" : "After eight years of monthly payments, we finally managed to pay off our student loans last month.", "title" : "Pay Off Student Loans Or Save?", "thumbnail" : "", "sourceName" : "CanadianFinanceBlog", "link" : "http://canadianfinanceblog.com/pay-off-student-loans-or-save/"},
            {"id" : "", "sample" : "I recently graduated from school with about $35k in student loans. I have the capability of paying off the entire amount in about another year and a half but like all student loans I can pay it over 20-30 years at a 5.5% rate.", "title" : "Pay off student loans or save for downpayment on condo?", "thumbnail" : "", "sourceName" : "StreetEasy", "link" : "http://streeteasy.com/talk/discussion/18284-pay-off-student-loans-or-save-for-down-payment-on-a-condo"},
            {"id" : "", "sample" : "Suivez la règle : consacrez au moins 10 % à l’épargne!", "title" : "Consacrez au moins 10 % à l’épargne-retraite", "thumbnail" : "", "sourceName" : "QuestionRetraite.qc.ca", "link" : "http://www.questionretraite.qc.ca/fr/chroniques/consacrez-au-moins-10-a-lepargne-retraite/"}
		],
        "rawData" : {"title" : "Classeur Excel", "link" : "/Contents/xlsx/Epargne.xlsx"}
	},
	{
		"id" : "12",
		"index" : "9",
		"section" : "game",
		"title" : "",
		"text" : "Votre supérieur vous demande si vous aimeriez avoir un deuxième moniteur pour votre ordinateur au travail; vous savez toutefois que l’entreprise ne roule pas sur l’or par les temps qui courent.",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Oui"},
			{"id" : "2", "text" : "Non"},
		],
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "13",
		"index" : "10",
		"section" : "game",
		"title" : "",
		"text" : "Nous sommes dimanche soir; vous êtes à l’épicerie et faites l’épicerie pour vous-même.  Vous avez l’intention de faire des sandwiches au poulet pour la semaine.  Vous vous demandez s’il vaut mieux la peine d’acheter un poulet déjà cuit ou de simplement acheter un poulet et de le faire cuire vous-même ce soir.",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "J’achète le poulet cuit pour 14$"},
			{"id" : "2", "text" : "J’achète un poulet non-cuit pour 10$ et je le fais cuire ce soir"},
			{"id" : "3", "text" : "Tant pis.  J’irai chercher quelque chose au restaurant."},
		],
		"resources" : [
			{"id" : "", "sample" : "", "title" : "Épiecerie en ligne", "thumbnail" : "", "sourceName" : "IGA", "link" : "https://www.iga.net/fr/epicerie_en_ligne/parcourir/Viande/Poulet"},
            {"id" : "", "sample" : "Pour l’instant, nous avons une chance d’y échapper, d’ici quelques années, à moins de produire nous-même l’intégralité de notre alimentation, cela sera difficile, voire impossible.", "title" : "Viande clonée, aliments aux nanomatériaux : bataille au parlement européen", "thumbnail" : "", "sourceName" : "SantéNutrition", "link" : "http://www.sante-nutrition.org/viande-clonee-aliments-aux-nanomateriaux-bataille-au-parlement-europeen/"},
            {"id" : "", "sample" : "", "title" : "Circulaire", "thumbnail" : "", "sourceName" : "Provigo", "link" : "http://www.provigo.ca/fr_CA/flyers.banner@PROV.storenum@8458.html"},
            {"id" : "", "sample" : "Pourquoi le poulet cuit en épicerie est-il meilleur?", "title" : "Forum de discussion", "thumbnail" : "", "sourceName" : "Recettes.qc.ca", "link" : "http://www.recettes.qc.ca/forum/message.php?id=305729&categorie=1"},
            {"id" : "", "sample" : "", "title" : "Ma circulaire personnalisée", "thumbnail" : "", "sourceName" : "Metro", "link" : "http://www.metro.ca/circulaire/index.fr.html"},
            {"id" : "", "sample" : "La vraie nourriture, c’est celle qui n’est pas produite à rabais. C’est celle qui prend le temps de pousser naturellement, de grandir naturellement et d’être cuisinée naturellement.", "title" : "Le prix de la vraie nourriture", "thumbnail" : "", "sourceName" : "La Presse", "link" : "http://blogues.lapresse.ca/lortie/2011/08/17/le-prix-de-la-vraie-nourriture/"},
            {"id" : "", "sample" : "", "title" : "Cliquez, commandez, c'est livré", "thumbnail" : "", "sourceName" : "JustEat.ca", "link" : "https://www.just-eat.ca/fr/"}
		]
	},
	{
		"id" : "14",
		"index" : "11",
		"section" : "game",
		"title" : "",
		//"text" : "Un client important de l’entreprise où vous travaillez vous appelle.  C’est une personne qui est, pour le dire poliment, difficile.  Il arrive toutefois à un bien mauvais moment, puisque vous êtes déjà débordé.\nIl vous demande d’évaluer un projet dont il estime qu’il retirera un bénéfice de 200 000$.  Ce client paie les services de votre entreprise 100$/l’heure.\nCombien de temps consacrez-vous personellement à sa requête?  Suggérez-vous à votre supérieur de considérer la possibilité d’engager une nouvelle ressource pour s’occuper de ce dossier (et en enlever de vos épaules déjà surchargées)?",
        "text" : "Un client important de l’entreprise où vous travaillez vous appelle.  C’est une personne qui est, pour le dire poliment, difficile.  Il arrive toutefois à un bien mauvais moment, puisque vous êtes déjà débordé-e.\nIl vous demande d’évaluer un projet dont il estime qu’il retirera un bénéfice de 200 000$.  Ce client paie les services de votre entreprise 100$/l’heure.\nCombien de temps consacrez-vous personellement à sa requête?",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"scale" : [0,100],
        "options" : [
			{"id" : "1", "text" : "Pas de temps pour ça, tant pis!"},
			{"id" : "2", "text" : "1 heure"},
            {"id" : "3", "text" : "10 heures"},
			{"id" : "4", "text" : "50 heures"},
		],
		"resources" : [
			{"id" : "", "sample" : "Nellie Akalp is CEO of CorpNet.com. Since forming more than 100,000 corporations and LLCs across the U.S, she has built a strong passion to assist small business owners...", "title" : "How To: Deal With Bad Clients", "thumbnail" : "Mashable", "sourceName" : "", "link" : "http://mashable.com/2011/08/03/freelancing-bad-clients/"},
			 {"id" : "", "sample" : "chapitre C-27", "title" : "Code du Travail", "thumbnail" : "", "sourceName" : "Gouvernement du Québec", "link" : "http://www2.publicationsduquebec.gouv.qc.ca/dynamicSearch/telecharge.php?type=2&file=/C_27/C27.html"},
            {"id" : "", "sample" : "Got a few bad-egg clients? Maybe you should fire them. That's right-I said 'Fire them.' Cut them loose.", "title" : "Fire your Bad Clients", "thumbnail" : "", "sourceName" : "Entrepreneur.com", "link" : "http://www.entrepreneur.com/article/173108"},
            {"id" : "", "sample" : "What are the best tactics to take to convince The Powers That Be to hire additional staff?", "title" : "How can you convince your employer to hire additional staff?", "thumbnail" : "", "sourceName" : "AskAManager", "link" : "http://www.askamanager.org/2013/11/how-can-you-convince-your-employer-to-hire-additional-staff.html"}
		]
	},
	{
		"id" : "15",
		"index" : "12",
		"section" : "game",
		"title" : "",
		"text" : "Malheur!  Vous étiez en congé et rouliez joyeusement sur la route lorsque des gyrophares s’allument derrière vous: vous êtes en état d’arrestation, et un policier vous remet une contravention de 125$ pour excès de vitesse sur l’autoroute, assortie de deux points de démérite.  Puisque vous avez automatiquement appuyé sur les freins lorsque vous avez aperçu les gyrophares, vous n’avez pas vu quelle vitesse affichait votre propre odomètre.\nEn plus de la contravention, cela augmentera de 40$ par an le montant à payer pour renouveler votre permis de conduire, et augmentera de 10% votre prime d’assurance auto, si vous en avez une.\nVous considérez toutefois l’option de contester la contravention; en effet, l’ami d’un de vos amis affirme s’en tirer à chaque fois.  Pour ce faire, vous devrez toutefois passer 3 heures à la cour municipale, ce qui implique que vous manquerez des heures de travail.  De plus, si la cour vous déclare coupable, votre amende sera doublée.\nContestez-vous la contravention?",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Oui"},
			{"id" : "2", "text" : "Non"},
		],
		"resources" : [
			{"id" : "", "sample" : "Vous avez reçu une contravention que vous jugez imméritée? Vous pouvez la contester en cour.", "title" : "Comment contester une contravention?", "thumbnail" : "", "sourceName" : "Protégez-Vous", "link" : "http://www.protegez-vous.ca/automobile/comment-contester-une-contravention.html"},
            {"id" : "", "sample" : "Seul un juge, ou vous-même, est en mesure de vous reconnaître coupable.", "title" : "Pourquoi contester un ticket?", "thumbnail" : "", "sourceName" : "SOS Ticket.ca", "link" : "http://sosticket.ca/fr/pourquoi-contester-ticket"},
            {"id" : "", "sample" : "Code de la sécurité routière", "title" : "Foire aux Questions", "thumbnail" : "", "sourceName" : "SAAQ", "link" : "http://www.saaq.gouv.qc.ca/faq/faq_csr.php"},
            {"id" : "", "sample" : "POURQUOI CONTESTER UNE CONTRAVENTION?", "title" : "Quebec-Ticket", "thumbnail" : "", "sourceName" : "Quebec-Ticket.com", "link" : "http://www.quebec-ticket.com/"},
            {"id" : "", "sample" : "Le présent code régit l'utilisation des véhicules sur les chemins publics et, dans les cas mentionnés, sur certains chemins et terrains privés ainsi que la circulation des piétons sur les chemins publics.", "title" : "Code de la Sécurité Routière", "thumbnail" : "", "sourceName" : "Gouvernement du Québec", "link" : "http://www2.publicationsduquebec.gouv.qc.ca/dynamicSearch/telecharge.php?type=3&file=/C_24_2/C24_2.htm"}
		]
	},
	{
		"id" : "16",
		"index" : "13",
		"section" : "game",
		"title" : "",
		"text" : "Votre téléphone, que vous avez depuis un peu plus d’un an, s’est brisé.  Vous vous rendez chez votre fournisseur de téléphonie pour voir s’il est possible pour vous d’en avoir un neuf.  Votre contrat prend fin dans deux ans, et vous payez actuellement 50$ par mois.  Le vendeur vous propose les options suivantes:",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Acheter un nouvel appareil pour 400$, abandonner votre contrat sans frais et en signer un nouveau, où vous obtiendrez les mêmes services pour 40$ par mois"},
			{"id" : "2", "text" : "Acheter un nouvel appareil (le même qu’en A) à rabais pour 100$, mais reconduire votre contrat actuel pour une année supplémentaire"},
			{"id" : "3", "text" : "Tenter de faire réparer votre appareil actuel, sans rien modifier au contrat; cela vous coûtera 50$, mais n’offre que 50% de probabilité de réussite"},
		],
		"resources" : [
			{"id" : "", "sample" : "Je bosse pour Vidéotron. J'ai des conseil pour vous. Ne faites pas confiance au service a la clientele. Je travaille la bas, et on est obligé de mentir aux gens qui appellent.", "title" : "Je bosse pour Vidéotron. J'ai des conseils", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""},
            {"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		],
        "rawData" : {"title" : "Tableau comparatif", "link" : "/Contents/xlsx/Téléphones.xlsx"}
	},
	{
		"id" : "17",
		"index" : "14",
		"section" : "game",
		"title" : "",
		"text" : "En rentrant chez vous, vous trouvez une mauvaise surprise: pour la deuxième fois cette semaine, votre chat Jean-Charles a vomi sur votre tapis d’entrée, que vous devez remplacer.\nQue faites-vous?",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Je l’emmène chez le vétérinaire demain matin pour le faire soigner."},
			{"id" : "2", "text" : "Je change sa diète et je m’assure que mes plantes vertes soient hors de sa portée."},
			{"id" : "3", "text" : "J’adopte un autre chat pour lui tenir compagnie."}
		],
		"resources" : [
            {"id" : "", "sample" : "cela fait bientôt une semaine que mon chat vomit tout les jours. Hier, j'ai été voir le vétérinaire, qui a donné des médicaments.", "title" : "Sujet : mon chat vomit tout les jours", "thumbnail" : "", "sourceName" : "Doctissimo.fr", "link" : "http://forum.doctissimo.fr/sante/medecine-veterinaire/chat-vomit-jours-sujet_146425_1.htm"}, 
            {"id" : "", "sample" : "Les vomissements ne sont pas une maladie, mais plutôt le symptôme de plusieurs maladies possibles. ", "title" : "Les vomissements", "thumbnail" : "", "sourceName" : "Ordre des Médecins Vétérinaires du Québec", "link" : "http://www.omvq.qc.ca/chro_vomissements.html"}, 
            {"id" : "", "sample" : "Plusieurs plantes de  notre environnement représentent un danger pour les chiens et les chats.", "title" : "Prenez garde à vos plantes de maison et de jardin!", "thumbnail" : "", "sourceName" : "CHUV - UdeMontreal", "link" : "http://chuv.umontreal.ca/le-chuv/hopital-des-animaux-de-compagnie/ressources/prenez-garde-a-vos-plantes-de-maison-et-de-jardin/"}, 
            {"id" : "", "sample" : "La SPA de l’Estrie offre en adoption un vaste choix de chats de tous âges et de toutes races.", "title" : "Adopter à la SPA de l'Estrie : une option avantageuse!", "thumbnail" : "", "sourceName" : "SPA Estrie", "link" : "http://www.spaestrie.qc.ca/autres/adoptionchat.html"},
            {"id" : "", "sample" : "Les Canadiens sont accros à leurs boules de poils. Selon un sondage Ipsos paru en mai dernier, plus de la moitié des Canadiens possèdent un animal de compagnie.", "title" : "Un chien ou un chat... à quel prix?", "thumbnail" : "", "sourceName" : "La Presse Affaires", "link" : "http://affaires.lapresse.ca/finances-personnelles/consommation/201307/31/01-4675770-un-chien-ou-un-chat-a-quel-prix.php"}, 
            {"id" : "", "sample" : "il n' est jamais sorti a l' extérieur.", "title" : "Mon chat de 9 ans vomit tous les jours mais semble en très bonne forme, que faut-il faire?", "thumbnail" : "", "sourceName" : "Yahoo Answers", "link" : "https://fr.answers.yahoo.com/question/index?qid=20090701121907AA0yhdZ"}
		]
	},
	{
		"id" : "18",
		"index" : "15",
		"section" : "game",
		"title" : "",
		"text" : "Vous êtes enfin de retour dans un chez-soi digne de ce nom!  Vous en profitez pour remeubler les lieux.  Vous souhaitez également que vos meubles puissent durer (tant en intégrité physique qu’en style) afin de ne pas devoir en racheter de sitôt.\nVeuillez choisir l’un des quatre paniers suivants:",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "[X1, X2, X3, X4, X5, X6, X7] pour [Y1, Y2, Y3, Y4, Y5, Y6, Y7]"},
			{"id" : "2", "text" : "[X1, X2, X3, X4, X5, X6, X7, X8, X9, X10] pour [Y1, Y2, Y3, Y4, Y5, Y6, Y7, Y8, Y9, Y10]"},
			{"id" : "3", "text" : "[X1, X2, X3, X4, X5, X6] pour [Y1, Y2, Y3, Y4, Y5, Y5]"},
			{"id" : "4", "text" : "[X1, X2, X3, X4, X5] pour [Y1, Y2, Y3, Y4, Y5]"}
		],
		"resources" : [
            {"id" : "", "sample" : "C'est comme du color-blocking pour les nuls. Du tie-dye version moderne.", "title" : "Tendance 'dip it': quand meubles et objets design font trempette", "thumbnail" : "", "sourceName" : "Ton Petit Look", "link" : "http://www.tonpetitlook.com/fr/2012/02/29/tendance-dip-it-quand-meubles-et-objets-design-font-trempette"},
            {"id" : "", "sample" : "", "title" : "Catalogue IKEA", "thumbnail" : "", "sourceName" : "IKEA Canada", "link" : "http://www.ikea.com/ca/fr/"}, 
            {"id" : "", "sample" : "J’ai toujours été une grande fan de décoration intérieure, un des moments les plus excitants de mon adolescence fût lorsque mes parents m’ont annoncé qu’on allait redécorer ma chambre qui était, à l’époque, multicolore (j’exagère pas).", "title" : "Tendances décoration Intérieure", "thumbnail" : "", "sourceName" : "Les Pas Sortables", "link" : "http://www.lespassortables.com/tendances-decoration-interieure/"}, 
            {"id" : "", "sample" : "", "title" : "Pour le meilleur et pour le prix", "thumbnail" : "", "sourceName" : "Brault & Martineau", "link" : "http://www.braultetmartineau.com/fr/"},
            {"id" : "", "sample" : "Je suis un passionné de design intérieur. Je suis un habitué des émissions de déco et de réno des Canal Vie et HGTV de ce monde.", "title" : "Les tendances déco qui m'inspirent en 2015", "thumbnail" : "", "sourceName" : "Ton Barbier", "link" : "http://www.tonbarbier.com/2015/02/20/les-tendances-deco-qui-minspirent-en-2015"}
		],
        "rawData" : {"title" : "Tableau comparatif", "link" : "/Contents/xlsx/Meubles.xlsx"}
	},
	{
		"id" : "19",
		"index" : "16",
		"section" : "game",
		"title" : "",
		"text" : "Depuis cette semaine, vous souffrez de migraines sporadiques; elles vous coupent l’appétit et vous empêchent de vous concentrer.  Hier, vous avez même dû partir du travail quelques heures plus tôt.\nVous vous demandez si cela vaut la peine de prendre rendez-vous chez le médecin.",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Vous appelez pour prendre rendez-vous à la clinique, sachant que vous n’aurez pas de rendez-vous avant au moins un mois; si votre état persiste, vous pourriez devoir vous absenter du travail à quelques reprises d’ici-là."},
			{"id" : "2", "text" : "Vous vous rendez à l’urgence, sachant que vous devrez manquer une journée complète de travail dans la salle d’attente."},
			{"id" : "3", "text" : "Vous achetez une tisane biologique de gingembre citroné au marché spécialisé du coin, pour la somme de 15$."},
			{"id" : "4", "text" : "Vous attendez quelques jours encore avant de prendre une décision.  Vous prenez des comprimés d’acétaminophène dans votre armoire d’ici-là."}
		],
		"resources" : [
            {"id" : "", "sample" : "Migraines and other types of headaches, such as tension headache and sinus headache, are painful.", "title" : "Migraines & Headaches Health Center", "thumbnail" : "", "sourceName" : "WebMD.com", "link" : "http://www.webmd.com/migraines-headaches/"},
            {"id" : "", "sample" : "Une bonne nouvelle pour plusieurs hôpitaux : la durée moyenne de séjour sur civière a diminué depuis les derniers mois, et ce, un peu partout au Québec.", "title" : "Le temps d'attente sur les civières diminue au Québec", "thumbnail" : "", "sourceName" : "Radio-Canada", "link" : "http://ici.radio-canada.ca/nouvelles/societe/2015/02/08/004-urgence-temps-attente-hopitaux-civieres.shtml"}, 
            {"id" : "", "sample" : "Pour ceux qui souffrent de migraines, nous vous apportons une recette d’infusion au gingembre et au citron qui peut soulager la douleur de la migraine, et peut arrêter l’émergence de nouveaux maux de tête et ses symptômes désagréables.", "title" : "Stoppez la migraine instantanément avec le gingembre et le citron", "thumbnail" : "", "sourceName" : "SantéNutrition", "link" : "http://www.sante-nutrition.org/stoppez-la-migraine-instantanement-avec-le-gingembre-et-le-citron/"},
            {"id" : "", "sample" : "Idées fausses et préjugés circulent encore à propos de la migraine.", "title" : "La Migraine: Mythes et réalités", "thumbnail" : "", "sourceName" : "CHUM", "link" : "http://www.chumontreal.qc.ca/sites/default/files//documents/Votre_sante/PDF/migraine-mythes-et-realites_0.pdf"},
            {"id" : "", "sample" : "Les liens entre la migraine et le sommeil sont multiples. Le sommeil peut soulager ou déclencher une crise, ce qui constitue un des grands paradoxes apparents relatifs aux migraines.", "title" : "Sommeil: comment diminuer les migraines", "thumbnail" : "", "sourceName" : "Canoe.ca", "link" : "http://fr.canoe.ca/sante/bienetre/archives/2015/03/20150322-173629.html"}
		]
	},
	{
		"id" : "20",
		"index" : "17",
		"section" : "game",
		"title" : "",
		"text" : "Votre client préféré au travail - le même que tout à l’heure - vous rappelle et est de mauvaise humeur.  Le projet sur lequel vous avez travaillé précédemment, dont il estimait pouvoir tirer 200 000$, ne lui en a finalement rapporté que %s.  Après une pluie d’insultes, il demande un remboursement total des honoraires versés à votre entreprise.\nQue faites-vous?",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
        "additionalInfoKey" : "clientProfit",
		"options" : [
			{"id" : "1", "text" : "Vous lui expliquez poliment que les problèmes de son entreprise découlent ultimement de ses décisions, pas des vôtres."},
			{"id" : "2", "text" : "Vous le transférez derechef à votre superviseur."},
			{"id" : "3", "text" : "Vous tentez de négocier un remboursement de 10% des honoraires payés."},
			{"id" : "4", "text" : "Vous offrez de travailler 10 heures gratuitement pour lui sur un prochain projet."}
		],
		"resources" : [
            {"id" : "", "sample" : "Too many people, when faced with clients who range from dissatisfied to downright angry, choose the loser's path by putting off handling the situation.", "title" : "How to Handle an Angry Client", "thumbnail" : "", "sourceName" : "Entrepreneur.com", "link" : "http://www.entrepreneur.com/article/77404"},
            {"id" : "", "sample" : "La nature des fonctions liées à la gestion des plaintes amène souvent à faire face à des clientèles et des situations particulières;", "title" : "La gestion des clientèles difficiles et des situations particulières.", "thumbnail" : "", "sourceName" : "ARGP.ca", "link" : "http://argp.ca/gestionclientelesdifficiles.pdf"},
            {"id" : "", "sample" : "Alors que vous emballez vos premières commandes en sifflotant et que votre nouvelle activité  de commerce en ligne commence à prendre forme, vous appréhendez et songez au moment où le client ouvrira  son colis.", "title" : "Ecommerce : comment mieux gérer les demandes de remboursement ?", "thumbnail" : "", "sourceName" : "ECommerce-Pratique.info", "link" : "http://www.ecommerce-pratique.info/contents/fr/d93_demandes_remboursements.html"},
            {"id" : "", "sample" : "Nellie Akalp is CEO of CorpNet.com. Since forming more than 100,000 corporations and LLCs across the U.S, she has built a strong passion to assist small business owners...", "title" : "How To: Deal With Bad Clients", "thumbnail" : "Mashable", "sourceName" : "", "link" : "http://mashable.com/2011/08/03/freelancing-bad-clients/"},
            {"id" : "", "sample" : "chapitre C-27", "title" : "Code du Travail", "thumbnail" : "", "sourceName" : "Gouvernement du Québec", "link" : "http://www2.publicationsduquebec.gouv.qc.ca/dynamicSearch/telecharge.php?type=2&file=/C_27/C27.html"},
            {"id" : "", "sample" : "Got a few bad-egg clients? Maybe you should fire them. That's right-I said 'Fire them.' Cut them loose.", "title" : "Fire your Bad Clients", "thumbnail" : "", "sourceName" : "Entrepreneur.com", "link" : "http://www.entrepreneur.com/article/173108"},
            {"id" : "", "sample" : "What are the best tactics to take to convince The Powers That Be to hire additional staff?", "title" : "How can you convince your employer to hire additional staff?", "thumbnail" : "", "sourceName" : "AskAManager", "link" : "http://www.askamanager.org/2013/11/how-can-you-convince-your-employer-to-hire-additional-staff.html"}
		]
	},
	{
		"id" : "21",
		"index" : "18",
		"section" : "game",
		"title" : "",
		"text" : "Vous souhaitez prendre des vacances.\nCette année, vous jetez votre dévolu sur Austin, TX.  Vous avez deux semaines de vacances, fin octobre.\nVous devez choisir comment vous y rendre.  Veuillez indiquer le vol que vous prendrez.",
		"subText" : "",
		"hint" : "",
		"answerForm" : "text-multiple",
		"fields" : [
			{"name" : "from", "title" : "Aéroport de départ", "hint" : "YUL, YYZ, etc..."},
			{"name" : "flightNumber", "title" : "Numéro du vol"}
		],
		"resources" : [
			{"id" : "", "sample" : "", "title" : "", "thumbnail" : "", "sourceName" : "", "link" : ""}
		]
	},
	{
		"id" : "22",
		"index" : "19",
		"section" : "game",
		"title" : "",
		"text" : "De retour de vacances, on vous assigne la tâche de trouver de nouveaux bureaux pour l’entreprise où vous travaillez, en forte expansion; votre équipe compte présentement 10 personnes, mais est appelée à prendre de l’ampleur.  Vous pouvez acheter, louer ou même faire construire.\nVos options sont les suivantes:",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "1", "text" : "Louer un espace de 2000 pieds carrés au centre-ville (loyer de 2000$/mois) et le meubler pour 20 000$."},
            {"id" : "2", "text" : "Vous inscrire à un espace de co-travail.  Les frais sont de 250$/mois, par employé."},
            {"id" : "3", "text" : "Acheter un bâtiment de 5000 pieds carrés à Rock Forrest pour 300 000$.  Vous devez aussi faire pour 50 000$ de rénovations et le meubler pour 20 000$."},
            {"id" : "4", "text" : "Acheter un terrain au centre-ville (60 000$) et construire un immeuble de 10 000 pieds carrés (coût : 500 000$), le meubler (20 000$) et louer la partie que vous n’utilisez pas."}
		],
		"resources" : [
            {"id" : "", "sample" : "Faits saillants", "title" : "Rapport Sur le marché Locatif", "thumbnail" : "", "sourceName" : "SCHL", "link" : "http://www.cmhc-schl.gc.ca/odpub/esub/64449/64449_2014_A01.pdf"},
            {"id" : "", "sample" : "", "title" : "Rapport annuel 2012", "thumbnail" : "", "sourceName" : "CommerceSherbrooke", "link" : "http://commercesherbrooke.com/wp-content/uploads/2015/05/Rapport-annuel-2012.pdf"}, 
            {"id" : "", "sample" : "For some startup founders, working from home or out of someone's living room is fine when you're first getting off the ground.", "title" : "Shared Office Space: What Your Small Business Needs to Know", "thumbnail" : "", "sourceName" : "BusinessNewsDaily", "link" : "http://www.businessnewsdaily.com/7902-smb-coworking-spaces.html"}, 
            {"id" : "", "sample" : "", "title" : "Rôle d'évaluation et compte de taxes", "thumbnail" : "", "sourceName" : "Ville de Sherbrooke", "link" : "https://www.ville.sherbrooke.qc.ca/services-municipaux/service-des-finances/role-devaluation-et-compte-de-taxes/"},
            {"id" : "", "sample" : "", "title" : "Bâtiments et locaux industriels", "thumbnail" : "", "sourceName" : "Sherbrooke Innopole", "link" : "http://batiments.sherbrooke-innopole.com/"}, 
            {"id" : "", "sample" : "Le lancement du nouvel incubateur d'entreprises de Sherbrooke, Espace-INC, aura lieu mercredi dans ses locaux de la rue Marquette.", "title" : "L'incubateur Espace-INC ouvrira ses portes mercredi", "thumbnail" : "", "sourceName" : "La Tribune", "link" : "http://www.lapresse.ca/la-tribune/economie-et-innovation/201503/20/01-4853912-lincubateur-espace-inc-ouvrira-ses-portes-mercredi.php"}, 
            {"id" : "", "sample" : "L'une des décisions les plus difficiles pour de nombreux entrepreneurs est celle d'acheter ou de louer leur établissement commercial.", "title" : "Décision délicate: louer ou acheter votre espace", "thumbnail" : "", "sourceName" : "BDC", "link" : "http://www.bdc.ca/FR/articles-outils/strategie-affaires-planification/gerer-affaires/Pages/immeubles-commerciaux-acheter-louer.aspx"}, 
            {"id" : "", "sample" : "Business rivalry is becoming tougher, competitive pressure is increasing.", "title" : "The 5 Main Office Trends for 2015", "thumbnail" : "", "sourceName" : "Wiesner-Hager", "link" : "http://www.wiesner-hager.com/en/press/the-5-main-office-trends-for-2015-67/"}, 
            {"id" : "", "sample" : "", "title" : "Calculatrice de prêt", "thumbnail" : "http://www4.bmo.com/images/bmobankpopup_fr.gif", "sourceName" : "BMO - Banque de Montréal", "link" : "http://www4.bmo.com/popup/prets/Calculator.html"},
            {"id" : "", "sample" : "La construction d'un bâtiment commercial exige un investissement énorme en temps et argent. Vous devez donc avant tout vous assurer de prendre la bonne direction. ", "title" : "Construire son bâtiment commercial: 12 conseils pour ériger des assises solides", "thumbnail" : "", "sourceName" : "DBC", "link" : "http://www.bdc.ca/FR/articles-outils/strategie-affaires-planification/gerer-affaires/Pages/nouveau-batiment-commercial-12-conseils.aspx"}
		],
        "rawData" : {"title" : "Tableau comparatif", "link" : "/Contents/xlsx/Bureaux.xlsx"}
	},
	{
		"id" : "23",
		"index" : "20",
		"section" : "game",
		"title" : "",
		"text" : "Après un an au travail, on souligne votre dévouement en vous remettant un bonus de %s.  De plus, puisque l’entreprise a été profitable, un dividende sera versé aux actionnaires; dans votre cas, cela représente %s.  Cela vous fait donc un montant total de %s. \nVous pouvez faire diverses choses avec cet argent.",
		"subText" : "",
		"hint" : "",
		"answerForm" : "text-multiple",
		"sum" : "bonus",
		"additionalInfoKey" : "bonus",
		"fields" : [
			{"name" : "rrsp", "title" : "RÉÉR"},
			{"name" : "tfsa", "title" : "CÉLI"},
			{"name" : "spoil", "title" : "Pour me gâter"}
		],
		"resources" : [
			{"id" : "", "sample" : "Les liens suivant donnent accès aux renseignements pour les rentiers, cotisants, et bénéficiaires des régimes enregistrés pour la retraite, l'achat ou la construction d'une habitation admissible, ou pour l'éducation permanente.", "title" : "REER et régimes connexes", "thumbnail" : "", "sourceName" : "Agence du Revenu du Canada", "link" : "http://www.cra-arc.gc.ca/tx/ndvdls/tpcs/rrsp-reer/menu-fra.html"},
            {"id" : "", "sample" : "Vous avez 21 ans, vous venez de terminer vos études et d’entamer une carrière, et pour la première fois de votre vie, vous avez mis un peu d’argent de côté.", "title" : "L’importance de commencer jeune à épargner et à investir!", "thumbnail" : "", "sourceName" : "Groupe Investors", "link" : "http://www.groupeinvestors.com/fr/dans-les-medias/articles/placements/l-importance-de-commencer-jeune"},
            {"id" : "", "sample" : "Le compte d’épargne libre d’impôt (CELI) est un instrument d’épargne enregistré, souple et d’usage général, qui permet aux Canadiennes et aux Canadiens de gagner un revenu de placement libre d’impôt afin de combler plus facilement leurs besoins d’épargne tout au long de leur vie.", "title" : "Épargnez de l'argent grâce au compte d'épargne libre d'impôt", "thumbnail" : "", "sourceName" : "Gouvernement du Canada", "link" : "http://www.celi.gc.ca/"},
            {"id" : "", "sample" : "The millennial generation, a group encompassing people from those who are about 18 years old to those already into their early 30s, is educated, digitally savvy and community-minded.", "title" : "Millennials will get shortchanged in retirement", "thumbnail" : "", "sourceName" : "CNBC", "link" : "http://www.cnbc.com/2014/12/08/millennials-will-get-shortchanged-in-retirement.html"},
            {"id" : "", "sample" : "Le bilan personnel sert à établir la valeur nette d’une personne à une date donnée.", "title" : "Qui paye ses dettes s'enrichit", "thumbnail" : "", "sourceName" : "Les Affaires", "link" : "http://www.lesaffaires.com/mes-finances/planification/qui-paye-ses-dettes-s-enrichit/568644"},
            {"id" : "", "sample" : "After eight years of monthly payments, we finally managed to pay off our student loans last month.", "title" : "Pay Off Student Loans Or Save?", "thumbnail" : "", "sourceName" : "CanadianFinanceBlog", "link" : "http://canadianfinanceblog.com/pay-off-student-loans-or-save/"},
            {"id" : "", "sample" : "I recently graduated from school with about $35k in student loans. I have the capability of paying off the entire amount in about another year and a half but like all student loans I can pay it over 20-30 years at a 5.5% rate.", "title" : "Pay off student loans or save for downpayment on condo?", "thumbnail" : "", "sourceName" : "StreetEasy", "link" : "http://streeteasy.com/talk/discussion/18284-pay-off-student-loans-or-save-for-down-payment-on-a-condo"},
            {"id" : "", "sample" : "Suivez la règle : consacrez au moins 10 % à l’épargne!", "title" : "Consacrez au moins 10 % à l’épargne-retraite", "thumbnail" : "", "sourceName" : "QuestionRetraite.qc.ca", "link" : "http://www.questionretraite.qc.ca/fr/chroniques/consacrez-au-moins-10-a-lepargne-retraite/"},
            {"id" : "", "sample" : "", "title" : "Tables d'impôts", "thumbnail" : "", "sourceName" : "Desjardins", "link" : "https://www.desjardins.com/ressources/pdf/table-impot-p-quebec-2015-f.pdf?resVer=1425482649000"}
		],
        "rawData" : {"title" : "Classeur Excel", "link" : "/Contents/xlsx/Epargne.xlsx"}
	},
	{
		"id" : "24",
		"index" : "1",
		"section" : "personal",
		"title" : "Âge *",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "text"
	},
	{
		"id" : "25",
		"index" : "2",
		"section" : "personal",
		"title" : "Sexe *",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "F", "text" : "Féminin"},
			{"id" : "M", "text" : "Masculin"}
		]
	},
	{
		"id" : "26",
		"index" : "3",
		"section" : "personal",
		"title" : "Programme d'études *",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select",
		"options" : [
			{"id" : "econ", "text" : "Économie"},
			{"id" : "mark", "text" : "Marketing"},
			{"id" : "admin", "text" : "Administration"},
			{"id" : "grh", "text" : "Gestion des ressources humaines"},
			{"id" : "compta", "text" : "Comptabilité"},
			{"id" : "finance", "text" : "Finance"},
			{"id" : "math", "text" : "Mathématiques"},
			{"id" : "psy", "text" : "Psychologie"},
			{"id" : "autre", "text" : "Autre"},
		],
	},
	{
		"id" : "27",
		"index" : "4",
		"section" : "personal",
		"title" : "Adresse courriel *",
		"text" : "",
		"subText" : "",
		"hint" : "Sera seulement utilisée pour le virement PayPal, et sera supprimée ensuite.",
		"answerForm" : "text"
	},
	{
		"id" : "28",
		"index" : "5",
		"section" : "personal",
		"title" : "Si vous occupez un emploi, quel est votre salaire horaire?",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "text"
	},
	{
		"id" : "29",
		"index" : "6",
		"section" : "personal",
		"title" : "Sur une échelle de 1 à 10 (1 étant très faible et 10 étant la perfection), à combien évaluez-vous votre compréhension de l'anglais écrit?",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "text"
	},
	{
		"id" : "30",
		"index" : "7",
		"section" : "personal",
		"title" : "Parmi les suivantes, quelles sources d’information consultez-vous sur Internet?",
		"text" : "",
		"subText" : "",
		"hint" : "",
		"answerForm" : "select-multi",
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
			{"id" : "12", "text" : "InfoWars"},
			{"id" : "13", "text" : "Le Journal de Montréal"},
			{"id" : "14", "text" : "Vice News"},
			{"id" : "15", "text" : "Dr. Oz"},
			{"id" : "16", "text" : "Radio-Canada.ca"},
			{"id" : "17", "text" : "Slate"},
			{"id" : "18", "text" : "I Fucking Love Science"},
			{"id" : "19", "text" : "Zero Hedge"},
			{"id" : "20", "text" : "The Christian Science Monitor"},
			{"id" : "21", "text" : "TechCrunch"},
			{"id" : "22", "text" : "Jezebel"},
			{"id" : "23", "text" : "Santé Nutrition"},
			{"id" : "24", "text" : "MTL Blog"},
			{"id" : "25", "text" : "The Onion"},
			{"id" : "26", "text" : "The Chive"},
			{"id" : "27", "text" : "Ricochet"},
			{"id" : "28", "text" : "The Atlantic"},
			{"id" : "29", "text" : "The Toronto Star"},
			{"id" : "30", "text" : "Trois Fois par Jour"},
			{"id" : "31", "text" : "Nouvel Ordre Mondial"},
			{"id" : "32", "text" : "ClickHole"},
			{"id" : "33", "text" : "CBC.ca"},
			{"id" : "34", "text" : "NarCity"},
			{"id" : "35", "text" : "TVA Nouvelles"},
			{"id" : "36", "text" : "The New York Times"},
			{"id" : "37", "text" : "Ton Petit Look"},
			{"id" : "38", "text" : "The Food Babe"},
			{"id" : "39", "text" : "The Washington Post"},
			{"id" : "40", "text" : "MSNBC"},
			{"id" : "41", "text" : "FOX News"},
			{"id" : "42", "text" : "BuzzFeed"},
			{"id" : "43", "text" : "The Economist"},
			{"id" : "44", "text" : "Bloomberg"},
			{"id" : "45", "text" : "Forbes"},
			{"id" : "46", "text" : "The Wall Street Journal"},
			{"id" : "47", "text" : "Wikipedia"},
			{"id" : "48", "text" : "BBC News"},
			{"id" : "49", "text" : "PBS Newshour"},
			{"id" : "50", "text" : "Business Insider"},
			{"id" : "51", "text" : "Protégez-Vous"},
		],
	}

];