module.exports = {
	"1" : {
		"result" : function(value, user){
            var vals = {
                "1" : 0,
                "2" : 0.01,
                "3" : 0.05,
                "4" : 0.10,
            };
			var pv = Math.abs(parseFloat(vals[value] || 0));
			value = pv;

			var yearlyRevenue = user.assets.hourlyRate*2080;
			var monthlyRevenue = 0;
            var netIncome = Application.user.getNetIncome(yearlyRevenue, 0);
			var capStock = netIncome*value;

			monthlyRevenue = netIncome/12;
			user.recurringInflux.salary = monthlyRevenue;
			user.assets.workStatus *= (1+value);
            user.savingPatterns.capStock = capStock/12;
			/*user.recurringRandom.push({
				"probability" : 1,
				"value" : capStock,
				"affects" : "financialAssets.capStock",
				"method" : "inc"
			});*/

			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"2" : {
		"result" : function(value, user){
			if (value=="1") {
                if (user.balance > 4000) {
                    user.balance -= 4000;
                } else {
                    user.financialAssets["carLoan"] = -4000;
                    user.assets["carLoanRate"] = 0.06;
                    user.recurringInflux["carLoanPayment"] = -77.33;
                }
				user.recurringInflux["gas"] = -216.67;
				user.recurringInflux["carInsurance"] = -60;
				user.recurringRandom.push({
					"probability" : 0.05,
					"value" : (-1000-(Data["randoms"]["carProblemSeverity"]*2000)-(Data["randoms"]["carProblemSeverity"]*8*user.assets.hourlyRate)),
					"affects" : "balance",
					"method" : "inc"
				});
			} else if (value=="2") {
				user.financialAssets["carLoan"] = -15000;
                user.assets["carLoanRate"] = 0.05;
                user.recurringInflux["gas"] = -173.33;
				user.recurringInflux["carInsurance"] = -65;
				user.recurringInflux["carLoanPayment"] = -283.07;
				user.recurringRandom.push({
					"probability" : 0.01,
					"value" : (-1000-(Data["randoms"]["carProblemSeverity"]*2000)-(Data["randoms"]["carProblemSeverity"]*8*user.assets.hourlyRate)),
					"affects" : "balance",
					"method" : "inc"
				});
			} else if (value=="3") {
				user.recurringInflux["busPass"] = -100;
				user.recurringInflux["busFare"] = -90;
				user.recurringInflux["carRental"] = -16.67;
				user.recurringRandom.push({
					"probability" : 0.1,
					"value" : ((-1)*user.assets.hourlyRate),
					"affects" : "balance",
					"method" : "inc"
				});
			}

			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : -4000, "recurringImpact" : -521.40}
	},
	"3" : {
		"result" : function(value, user){
			if (value=="1") {
				user.recurringInflux.rent = -275;
				user.balance -= 975;
			} else if (value=="2") {

			} else if (value=="3") {
				if (user.recurringInflux.gas) {
					user.balance += user.recurringInflux.gas*10;
				} else {
					user.balance -= 18*5*45;
				}
			} else if (value=="4") {
				user.balance -= user.assets.hourlyRate*3*18;
				user.assets.workStatus *= 0.95;
			}

			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"4" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0},
			"2" : {"instantImpact" : 0, "recurringImpact" : 0},
			"3" : {"instantImpact" : 0, "recurringImpact" : 0},
			"4" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"impactLess" : true,
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"5" : {
		"result" : function(value, user){
			var instantImpact = 0;
			var tax = 1.14975;
			if (value=="1") {
				instantImpact = 1549*tax;
			} else if (value=="2") {
				instantImpact = 300.99*tax;
				user.assets.productivity *= 0.95;
			} else if (value=="3") {
				instantImpact = 1300.85*tax;
			} else if (value=="4") {
				instantImpact = 1199*tax;
			} else if (value=="5") {
				instantImpact = 2289*tax;
			}

			return {"instantImpact" : instantImpact, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"6" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0},
			"2" : {"instantImpact" : 0, "recurringImpact" : 0},
			"3" : {"instantImpact" : 0, "recurringImpact" : 0},
			"4" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"impactLess" : true,
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"7" : {
		"result" : function(value, user){
			if (value=="1") {
				user.assets.workStatus *= ((Data.randoms["caughtMeetingRecruiter"] < 0.05) ? 0.99 : 1);
			} 

			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
    "8" : {
		"result" : function(value, user){
            var amount = Math.max((user.balance - (user.answeredGameQuestions[user.questionsAnswered-1].previousBalance || 0) - (user.answeredGameQuestions[user.questionsAnswered-1].instantImpact || 0)), 0)*0.9;
            var debt = parseInt(value.debt || 0)===parseInt(value.debt || 0) ? Math.min(parseInt(value.debt || 0), amount) : 0;
            amount -= debt;
            var rrsp = parseInt(value.rrsp || 0)===parseInt(value.rrsp || 0) ? Math.min(parseInt(value.rrsp || 0), amount) : 0;
            if (rrsp) {
                var netIncome = Application.user.getNetIncome(yearlyRevenue, rrsp*12);
                user.recurringInflux.salary = netIncome/12;
            }
            amount -= rrsp;
            user.savingPatterns.studentLoan += debt;
            user.savingPatterns.rrsp += rrsp;
            user.savingPatterns.tfsa += amount;
            
			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"9" : {
		"result" : function(value, user){
			if (value=="1") {
				user.assets.workStatus *= ((user.assets.workStatus < 1) ? 0.95 : 1)*user.assets.productivity;
				user.assets.productivity *= 1.05;
			} 

			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"10" : {
		"result" : {
			"1" : {"instantImpact" : 14, "recurringImpact" : 0},
			"2" : {"instantImpact" : 10, "recurringImpact" : 0},
			"3" : {"instantImpact" : 35, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"11" : {
		"result" : function(value, user){
            var vals = {
                "1" : 0,
                "2" : 1,
                "3" : 10,
                "4" : 50,
            };
            value = vals[value] || 0;
            
            var factor = 1+Math.log(1+value);
            user.assets.companyStanding *= factor;
            user.assets.workStatus *= factor;
            user.assets.productivity /= (factor*factor);
            user.assets.timeSpentWithDifficultClient = value;
			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"12" : {
		"result" : function(value, user){
			if (value=="1") {
				if (Data.randoms["winTicketContest"] < 0.5) {
					user.balance -= (250+(3*user.assets.hourlyRate));
					if (user.recurringInflux["carInsurance"]) {
						user.recurringInflux["extraLicensePremium"] = -3.33;
						user.recurringInflux["carInsurance"] *= 1.10;
					}
				} 
			} else {
				user.balance -= 125;
				if (user.recurringInflux["carInsurance"]) {
					user.recurringInflux["extraLicensePremium"] = -3.33;
					user.recurringInflux["carInsurance"] *= 1.10;
				}
			}

			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"13" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0},
			"2" : {"instantImpact" : 0, "recurringImpact" : 0},
			"3" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"14" : {
		"result" : function(value, user){
            var instantImpact = 0;
			if (value=="1") {
                if (Data.randoms.catIsSick < 0.5) {
                    instantImpact = 100;
                } else {
                    instantImpact = 500;
                    user.assets.productivity *= 0.99;
                    user.recurringInflux["recurringInflux"].catFood = 0;
                }
            } else if (value=="2") {
                if (Data.randoms.catIsSick > 0.5) {
                    user.assets.productivity *= 0.99;
                    user.recurringInflux["recurringInflux"].catFood = 0;
                } 
            } else {
                if (Data.randoms.catIsSick < 0.5) {
                    user.recurringInflux["recurringInflux"].catFood *= 2;
                } else {
                    user.assets.productivity *= 0.99;
                }
            }
            
            return {"instantImpact" : instantImpact, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"15" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"16" : {
		"result" : function(value, user){
			var instantImpact = 0;
            if (value=="1") {
                user.assets.productivity *= 0.99;
            } else if (value=="2") {
    
            } else if (value=="3") {    
                user.assets.workStatus *= 0.98;
                user.assets.productivity *= 0.95;
            } else {
                user.assets.workStatus *= 0.99;
                user.assets.productivity *= 0.95;
            }    
            
            return {"instantImpact" : instantImpact, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"17" : {
		"result" : function(value, user){
			var instantImpact = 0;
            if (value=="1") {
                user.assets.companyStanding *= 0.7;
                user.assets.workStatus *= 0.9;
            } else if (value=="2") {
                user.assets.companyStanding *= 0.99;
                user.assets.workStatus *= 0.8;
            } else if (value=="3") {    
                user.assets.companyStanding *= 0.95;
                user.assets.workStatus *= 0.99;
            } else {
                user.assets.companyStanding *= 0.95;
                user.assets.workStatus *= 1.01;
            }    
            
            return {"instantImpact" : instantImpact, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"18" : {
		"result" : function(value, user){
			var instantImpact = 0;
            if (value=="1") {
                
            } else if (value=="2") {
                
            } else if (value=="3") {    
                
            } else {
                
            }    
            
            return {"instantImpact" : instantImpact, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"19" : {
		"result" : function(value, user){
			var instantImpact = 0;
            if (value=="1") {
                user.assets.companyStanding *= 1.15;
                user.assets.workStatus *= 1.05;
                user.assets.productivity *= 1.02;
            } else if (value=="2") {
                user.assets.companyStanding *= 0.95;
                user.assets.workStatus *= 0.99;
            } else if (value=="3") {    
                user.assets.productivity *= 0.99;
            } else {
                user.assets.companyStanding *= 1.1;
                user.assets.workStatus *= 1.01;
                user.assets.productivity *= 1.02;
            }    
            
            return {"instantImpact" : instantImpact, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"20" : {
		"result" : function(value, user){
            var bonus = 5000*user.assets.workStatus*user.assets.productivity;
            var rate = Math.log(1+(Data.randoms.businessGrowth*user.assets.companyStanding));
            var dividend = (rate*user.financialAssets.capStock);
            var yearlyRevenue = user.assets.hourlyRate*2080;
            
            var amount = bonus+dividend;
            var tfsa = parseInt(value.tfsa || 0)===parseInt(value.tfsa || 0) ? Math.min(parseInt(value.tfsa || 0), amount) : 0;
            amount -= tfsa;
            var rrsp = parseInt(value.rrsp || 0)===parseInt(value.rrsp || 0) ? Math.min(parseInt(value.rrsp || 0), amount) : 0;
            if (rrsp) {
                var oldSalary = user.recurringInflux.salary*12;
                var netIncome = Application.user.getNetIncome(yearlyRevenue, rrsp*12);
                user.balance += (netIncome - oldSalary);
            }
            amount -= rrsp;
            user.financialAssets.tfsa += tfsa;
            user.financialAssets.rrsp += rrsp;
            
			return {"instantImpact" : amount, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	}
};