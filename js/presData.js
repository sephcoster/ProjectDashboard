var project = {
	//Place General Project Data Here:
	start: "4/15/2014",
	end: "7/17/2014",
	description: "This slide and the sprint slides are all pulled dynamically from a JSON object. Wiring up a web API will be easy because this all uses Handlebars.JS",
	totalPoints: 411, // Total number of points for the entire project / release
	pointsCompleted: 57, // Sum total of all points completed to date

	//Enter Sprint Details Below
	sprints: [
		{
			name: "Sprint 1",
			start: "4/15/2014",
			end: "4/25/2014",
			status: "Completed",
			subSprints: [
				{
					name: "Sprint 1a",
					start: "4/25/2014",
					end: "5/05/2014",
					status: "Completed"
				},
				{
					name: "Sprint 1b",
					start: "4/25/2014",
					end: "5/05/2014",
					status: "Completed"
				}
			]
		},
			{
			name: "Sprint 2",
			start: "4/15/2014",
			end: "4/25/2014",
			status: "In Progress",
			subSprints: [
				{
					name: "Sprint 2a",
					start: "4/25/2014",
					end: "5/05/2014",
					status: "In Progress"
				},
				{
					name: "Sprint 2b",
					start: "4/25/2014",
					end: "5/05/2014",
					status: "Not Started"
				}
			]
		},
		{
			name: "Sprint 3",
			start: "4/15/2014",
			end: "4/25/2014",
			status: "Not Started",
			subSprints: [
				{
					name: "Sprint 3a",
					start: "4/25/2014",
					end: "5/05/2014",
					status: "Not Started"
				},
				{
					name: "Sprint 3b",
					start: "4/25/2014",
					end: "5/05/2014",
					status: "Not Started"
				}
			]
		},
	],

	// All Helper Functions have been put here - they use the data entered above
	// to present data in a different format that is more useful for the slides.
	pointsRemaining: function(){
		return this.totalPoints - this.pointsCompleted;
	},
	daysRemaining: function(){
		var end = new Date( this.end );
		console.log("Days Remaining End: ", end);
		var today = new Date();
		console.log("Today: ", today);
		console.log("End minus Today: ", end-today );
		return Math.round( (end-today)/(1000*60*60*24) );
	}
};

