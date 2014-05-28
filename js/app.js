
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

//This is a nested mess that calculates cumulative project data information.
function getCumulative(){
  // Outline the sprints that will be used to sum this data.
  // ALso create placeholder arrays for all of the different data types across the sprints

  var sprintData = [flowData.sprint1.data, flowData.sprint2.data, flowData.sprint3.data];
  
  // For each of the above sprint datasets (this will loop three times)
  for (var i=0; i< sprintData.length; i++){
    
    // For each object inside each data set (this will loop four times)
    $.each(sprintData[i], function(index, val){
      var vals = val.values;
      var keyVal = val.key;
      console.log("keyVal: ", keyVal);
      var keyArray = arrayHolder[keyVal]; //The placeholder we'll be using is the one for that specific cumulative chart
      console.log("Key Array: ", keyArray);
      //If there's nothing in the backlog, then concatenate this to the backlog array.
      if (keyArray.length === 0){
          //Concatenate the values in our collector to the values in this array.
          keyArray.push.apply(keyArray, vals);
        //Otherwise...

        } else {
          //Get the current length of the backlog (or test, etc) array (number of days recorded)
          var increment = keyArray.length;
          //Get the last number of backlog items from each sprint and add it to all the point values.
          var lastMax = keyArray[keyArray.length-1][1];
          //Then, for each of these values, add the number of existing days to the number of days in the sprint to get cumulative days.

          $.each(vals, function(j, val){
            vals[j][0] = vals[j][0] + increment;
            vals[j][1] = vals[j][1] + lastMax;
          });
          console.log("Vals after Increment: ", vals);



          //Once you've added all the days, concatenate the existing array val to that specific data type (backlog, etc)
          keyArray.push.apply(keyArray, vals);
        }

      });  // End loop inside sprint
    console.log("Array Holder after sprint:", arrayHolder);    
    } // End loop of all sprints.
    console.log("Array Holder just after loop:", arrayHolder);
    return [{"key": "Development", "values": arrayHolder["Development"], area:true}, {"key": "Test", "values": arrayHolder["Test"], area:true}, 
            {"key": "Done", "values": arrayHolder["Done"], area:true} ]
    //flowData.cumulative.data.push({"key": "Backlog", "values": arrayHolder["Backlog"], area:true});
    console.log(flowData);
  }
