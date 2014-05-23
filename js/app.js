
			$(document).ready(function(){
				var source = $("#sprintOverviewTemplate").html(); 
				var template = Handlebars.compile(source); 	
				$('#sprintOverview').append( template(project.sprints) );

				var overview = $("#releaseOverviewTemplate").html(); 
				var overviewTemplate = Handlebars.compile(overview); 							
				$('#releaseOverview').append( overviewTemplate(project) );

				var sprintStatus = $("#sprintStatusTemplate").html(); 
				var sprintStatusTemplate = Handlebars.compile(sprintStatus); 	
				$('#sprintStatus').append( sprintStatusTemplate(project.sprints) );

				var testData = $("#testDataTemplate").html(); 
				var testDataTemplate = Handlebars.compile(testData); 	
				$('#testData').append( testDataTemplate(testingData) );

				initialize();
			});


			Handlebars.registerHelper("formatDate", function(date){
			  console.log("Date: ", date);
			  date = new Date(date);
			  if (typeof(date) == "undefined") {
			    return "Unknown";
			  }
			  console.log("Date getMonth: ", date.getMonth());
			  return date.getMonth() + "." + date.getDay() + "." + date.getFullYear();
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
		buildLine("#stackedChart1", data);
		buildLine("#stackedChart2", data);
		buildLine("#stackedChart3", data);
		buildLine("#stackedChart4", data);
		buildLine("#stackedChart5", data);
		buildLine("#stackedChart6", data);
		buildLine("#stackedChart7", data);
		buildLine("#stackedChart8", data);

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