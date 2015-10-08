module.exports = {
	"1" : {
		"result" : function(value, user){
			var pv = Math.abs(parseFloat(value || 0));
			value = pv===pv ? (pv<=1 ? pv : pv/100) : 0;

			var yearlyRevenue = user.assets.hourlyRate*2080;
			var monthlyRevenue = 0;
			var provIncomeTax = (yearlyRevenue - 11305)*0.16;
			var fedIncomeTax = (yearlyRevenue - 11138)*0.125;
			var capStock = yearlyRevenue*value;

			monthlyRevenue = ((yearlyRevenue-capStock - provIncomeTax - fedIncomeTax))/12;
			user.recurringInflux.salary = monthlyRevenue;
			user.assets.workStatus *= (1+value);
			user.recurringRandom.push({
				"probability" : 1,
				"value" : capStock,
				"affects" : "assets.capStock",
				"method" : "inc"
			});

			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"2" : {
		"result" : function(value, user){
			if (value=="1") {
				user.balance -= 4000;
				user.recurringInflux["gas"] = -216.67;
				user.recurringInflux["carInsurance"] = -60;
				user.recurringRandom.push({
					"probability" : 0.05,
					"value" : (-1000-(Math.random()*2000)-(Math.random()*8*user.assets.hourlyRate)),
					"affects" : "balance",
					"method" : "inc"
				});
			} else if (value=="2") {
				user.recurringInflux["gas"] = -173.33;
				user.recurringInflux["carInsurance"] = -65;
				user.recurringInflux["carPayment"] = -283.07;
				user.recurringRandom.push({
					"probability" : 0.01,
					"value" : (-1000-(Math.random()*2000)-(Math.random()*8*user.assets.hourlyRate)),
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
				user.recurringInflux.rent = -550;
				user.balance -= 1950;
			} else if (value=="2") {

			} else if (value=="3") {
				if (user.recurringInflux.gas) {
					user.balance += user.recurringInflux.gas*18*5;
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
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"5" : {
		"result" : function(value, user){
			var instantImpact = 0;
			if (value=="1") {
				instantImpact = 1549*1.14975;
			} else if (value=="2") {
				instantImpact = 300.99*1.14975;
				user.assets.productivity *= 0.95;
			} else if (value=="3") {
				instantImpact = 1300.85*1.14975;
			} else if (value=="4") {
				instantImpact = 1399*1.14975;
			} else if (value=="5") {
				instantImpact = 2289*1.14975;
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
			if (value=="1") {
				user.assets.workStatus *= ((user.assets.workStatus < 1) ? 0.95 : 1)*user.assets.productivity;
				user.assets.productivity *= 1.05;
			} 

			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"9" : {
		"result" : {
			"1" : {"instantImpact" : 10, "recurringImpact" : 0},
			"2" : {"instantImpact" : 14, "recurringImpact" : 0},
			"3" : {"instantImpact" : 35, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"10" : {
		"result" : function(value, user){
			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"11" : {
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
	"12" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0},
			"2" : {"instantImpact" : 0, "recurringImpact" : 0},
			"3" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"13" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"14" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"15" : {
		"result" : function(value, user){
			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"16" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"17" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"18" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"19" : {
		"result" : {
			"1" : {"instantImpact" : 0, "recurringImpact" : 0}
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	},
	"20" : {
		"result" : function(value, user){
			return {"instantImpact" : 0, "recurringImpact" : 0};
		},
		"worst" : {"instantImpact" : 0, "recurringImpact" : 0}
	}
};