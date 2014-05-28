
			$(document).ready(function(){

				var overview = $("#releaseOverviewTemplate").html();
				var overviewTemplate = Handlebars.compile(overview);
				$('#releaseOverview').append( overviewTemplate(project) );

				var sprintStatus = $("#sprintStatusTemplate").html();
				var sprintStatusTemplate = Handlebars.compile(sprintStatus);
				$('#sprintStatus').append( sprintStatusTemplate(project.sprints) );

				var testData = $("#testDataTemplate").html();
				var testDataTemplate = Handlebars.compile(testData);
				$('#testData').append( testDataTemplate(testingData) );

				var cumulativeFlow = $("#cumulativeFlowTemplate").html();
				var cumulativeFlowTemplate = Handlebars.compile(cumulativeFlow);
				$('#cumulativeFlow').append( cumulativeFlowTemplate(flowData) );

				var buildData = $("#buildDataTemplate").html();
				var buildDataTemplate = Handlebars.compile(buildData);
				$('#buildData').append( buildDataTemplate(project) );

				initialize();
			});

			// Automated Page Refresh after XXX interval without key press. 
			var time = new Date().getTime();
			$(document.body).bind("mousemove keypress", function(e) {
				time = new Date().getTime();
			});

			var refreshTimeframe = 15;  // Number of minutes the screen should refresh data.
										// If dynamic data can implement long-polling
			function refresh() {
				if(new Date().getTime() - time >= (60000*refreshTimeframe) ){
					Reveal.next();
					window.location.reload(true);
				} else
					setTimeout(refresh, 3000);
			}

			setTimeout(refresh, 3000);

			// Handlebar Helpers
			Handlebars.registerHelper('statusCheck', function(field, status, options) {
			  if(field == status) {
			    return options.fn(this);
			  } else {
			    return;
			  }
			});

			Handlebars.registerHelper("buildStatusImage", function(status){
				imgObj = {"SUCCESS": "img/passing.png", "FAIL": "img/failing.png", "Error": "img/error.png"};
				return imgObj[status];
			});

			Handlebars.registerHelper("formatDate", function(date){
			  console.log("Date: ", date);
			  date = new Date(date);
			  if (typeof(date) == "undefined") {
			    return "Unknown";
			  }
			  console.log("Date getMonth: ", date.getMonth());
			  return (date.getMonth()+1) + "." + date.getDate() + "." + date.getFullYear();
			});

			Handlebars.registerHelper('getStatusButtonClass', function(currentStatus){
					var classMap = {'In Progress': 'btn-primary', 'Completed': 'btn-success', 'Not Started': 'btn-info', 'Not Completed': 'btn-warning'};
					console.log("Class Map Var: ", classMap[currentStatus]);
					return classMap[ currentStatus ];
			});

		function initialize(){
			// Main REVEAL.JS Configuration
			// Full list of configuration options available here:
			// https://github.com/hakimel/reveal.js#configuration
			Reveal.initialize({
				controls: true,
				progress: true,
				history: true,
				center: true,
			    width: 1580,
    			height: 900,
    			autoSlide: 5000,
    			loop: true,

				theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
				transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

				// Parallax scrolling
				// parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
				// parallaxBackgroundSize: '2100px 900px',

				// Optional libraries used to extend on reveal.js
				dependencies: [
					{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
					{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
					{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
					{ src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
				]
			});
		}

		//Script to build the NVD3 Stacked Chart
		function buildLine(targetId, dataSource){
			nv.addGraph(function() {
			  var chart = nv.models.lineChart()
			                .x(function(d) { return d[0] })
			                .y(function(d) { return d[1] })
			                .clipEdge(true)
			                .useInteractiveGuideline(true)
			                ;

			  chart.xAxis
			      .showMaxMin(false)
			      .tickFormat(d3.format(',.2f'));

			  chart.yAxis
			      .tickFormat(d3.format(',.2f'));

			  d3.select(targetId + ' svg')
			    .datum(dataSource)
			      .transition().duration(500).call(chart);

			  nv.utils.windowResize(chart.update);

			  return chart;
			});


		}
		
		// Create any required graph instances
		$.each(flowData, function(i, val){
			console.log("I: ", i, "& val: ", val);
			var data = flowData[i].data;
			var idName = "#" + flowData[i].shortName;
			console.log("idName: ", idName);
			buildLine(idName, data);
		});

		$.each(testingData, function(i, val){
			console.log("I: ", i, "& val: ", val);
			var data = testingData[i].testData;
			var idName = "#" + testingData[i].shortName;
			console.log("idName: ", idName);
			buildLine(idName, data);
		});

		// buildLine("#testChart1", testData);
		// buildLine("#testChart2", testData);
		// buildLine("#testChart3", testData);
		// buildLine("#testChart4", testData);


		// Script to build the Burndown Chart.
		function buildBurndown(targetId){
			nv.addGraph(function() {
			  var chart = nv.models.lineChart()
			    .useInteractiveGuideline(true)
			    ;

			  chart.xAxis
			    .axisLabel('Days')
			    .tickFormat(d3.format(',r'))
			    ;

			  chart.yAxis
			    .axisLabel('Points')
			    .tickFormat(d3.format('.02f'))
			    ;

			  d3.select(targetId + ' svg')
			    .datum(burndownData()) // Data variable specified here - if your data is not a function, then remove the extra ()
			    .transition().duration(500)
			    .call(chart)
			    ;

			  nv.utils.windowResize(chart.update);
			 
			  return chart;
			});
		}

		//Create the graph instances
		buildBurndown('#burnChart1')

