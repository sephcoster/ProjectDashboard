var project = {
	start: new Date("4/15/2014"),
	end: new Date("7/17/2014"),
	today: new Date(),
	daysRemaining: function(){
		return this.today - this.end;
	},
	totalPoints: 411,
	pointsCompleted: 57,
	pointsRemaining: function(){
		return this.totalPoints - this.pointsCompleted;
	},
	description: "This is a project description that will go on the page somewhere"
};

var sprintSummary = {
	"Sprint 1": {
		start: new Date("4/15/2014"),
		end: new Date("4/25/2014"),
		status: "Completed",
		"Sprint 1a": {
			start: new Date("4/25/2014"),
			end: new Date("5/05/2014"),
			status: "Completed"
		},
		"Sprint 1b": {
			start: new Date("4/25/2014"),
			end: new Date("5/05/2014"),
			status: "Completed"
		}
	},
	"Sprint 2": {
		start: new Date("4/25/2014"),
		end: new Date("5/05/2014"),
		status: "In Progress",
		"Sprint 2a": {
			start: new Date("4/25/2014"),
			end: new Date("5/05/2014"),
			status: "Completed"
		},
		"Sprint 2b": {
			start: new Date("4/25/2014"),
			end: new Date("5/05/2014"),
			status: "Completed"
		}
	},
	"Sprint 3": {
		start: new Date("5/05/2014"),
		end: new Date("5/19/2014"),
		status: "Not Started",
		"Sprint 3a": {
			start: new Date("4/25/2014"),
			end: new Date("5/05/2014"),
			status: "Not Started"
		},
		"Sprint 3b": {
			start: new Date("4/25/2014"),
			end: new Date("5/05/2014"),
			status: "Not Started"
		}
	},
};