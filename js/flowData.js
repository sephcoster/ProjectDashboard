		var flowData = {
      combined: {
        name: "All Teams",
        shortName: "allteams",
        data: [],
        stories: 34,
        planned: 2,
        inprogress: 7,
        complete: 25
      },
      brv: {
        name: "BRV",
        shortName: "brv",
        stories: 34,
        planned: 2,
        inprogress: 7,
        complete: 25,
        data: [
        { 
         "key" : "Backlog",
         "values" : [ [ 0 , 411] , [ 1 , 411] , [ 2 , 411] , [ 3 , 450] , [ 4 , 450] , [ 5 , 450] , [ 6 , 450] , [7, 450], [8,450], [9,450],[10,450]],
         "area" : true
        }, 

        { 
          "key" : "Development",
          "values" : [ [ 0 , 0] , [ 1 , 15] , [ 2 , 30] , [ 3 , 75] , [ 4 , 80] , [ 5 , 85] , [ 6 , 150] , [7, 175], [8,250], [9,350],[10,450] ],
          "area": true
        }, 

        { 
          "key" : "Test",
          "values" : [ [ 0, 0 ] , [ 1, 5] , [ 2, 25] , [ 3, 65] , [ 4, 70] , [ 5, 80] , [ 6, 100] , [ 7, 140] , [ 8, 200] , [ 9, 275] , [ 10, 375] ],
          "area": true
        },

        { 
          "key" : "Done",
          "values" : [ [ 0, 0 ] , [ 1, 0] , [ 2, 20] , [ 3, 50] , [ 4, 55] , [ 5, 60] , [ 6, 70] , [ 7, 125] , [ 8, 175] , [ 9, 225] , [ 10, 350] ],
          "area": true
        }]
      },
      ofs: {
        name: "OF&S",
        shortName: 'ofs',
        stories: 34,
        planned: 2,
        inprogress: 7,
        complete: 25,
        data: [
        { 
          "key" : "Backlog",
          "values" : [ [ 0 , 411] , [ 1 , 411] , [ 2 , 411] , [ 3 , 450] , [ 4 , 450] , [ 5 , 450] , [ 6 , 450] , [7, 450], [8,450], [9,450],[10,450]],
          "area" : true
        }, 

        { 
          "key" : "Development",
          "values" : [ [ 0 , 0] , [ 1 , 15] , [ 2 , 30] , [ 3 , 75] , [ 4 , 80] , [ 5 , 85] , [ 6 , 150] , [7, 175], [8,250], [9,350],[10,450] ],
          "area": true
        }, 

        { 
          "key" : "Test",
          "values" : [ [ 0, 0 ] , [ 1, 5] , [ 2, 25] , [ 3, 65] , [ 4, 70] , [ 5, 80] , [ 6, 100] , [ 7, 140] , [ 8, 200] , [ 9, 275] , [ 10, 375] ],
          "area": true
        },

        { 
          "key" : "Done",
          "values" : [ [ 0, 0 ] , [ 1, 0] , [ 2, 20] , [ 3, 50] , [ 4, 55] , [ 5, 60] , [ 6, 70] , [ 7, 125] , [ 8, 175] , [ 9, 225] , [ 10, 350] ],
          "area": true
        }]
      },
      pp: {
        name: "P&P",
        shortName: 'pp',
        stories: 34,
        planned: 2,
        inprogress: 7,
        complete: 25,
        data: [
        { 
          "key" : "Backlog",
          "values" : [ [ 0 , 411] , [ 1 , 411] , [ 2 , 411] , [ 3 , 450] , [ 4 , 450] , [ 5 , 450] , [ 6 , 450] , [7, 450], [8,450], [9,450],[10,450]],
          "area" : true
        }, 

        { 
          "key" : "Development",
          "values" : [ [ 0 , 0] , [ 1 , 15] , [ 2 , 30] , [ 3 , 75] , [ 4 , 80] , [ 5 , 85] , [ 6 , 150] , [7, 175], [8,250], [9,350],[10,450] ],
          "area": true
        }, 

        { 
          "key" : "Test",
          "values" : [ [ 0, 0 ] , [ 1, 5] , [ 2, 25] , [ 3, 65] , [ 4, 70] , [ 5, 80] , [ 6, 100] , [ 7, 140] , [ 8, 200] , [ 9, 275] , [ 10, 375] ],
          "area": true
        },

        { 
          "key" : "Done",
          "values" : [ [ 0, 0 ] , [ 1, 0] , [ 2, 20] , [ 3, 50] , [ 4, 55] , [ 5, 60] , [ 6, 70] , [ 7, 125] , [ 8, 175] , [ 9, 225] , [ 10, 350] ],
          "area": true
        }]
      }  
    }    
 
//Get the sprint data.
// Get the values in the array. For the first array, concatenate. Second array, rebaseline all of the days with new values based on an index equal to the number of days already passed.
// Continue indexing until you concatenate all three arrays with their new baseline values.

  var arrayHolder = {"Backlog": [], "Development": [], "Test": [], "Done": []}; // Made global for Debug

function getCombined(){
  // Outline the sprints that will be used to sum this data.
  // ALso create placeholder arrays for all of the different data types across the sprints

  var teamData = [flowData.brv.data, flowData.ofs.data, flowData.pp.data];
  
  // For each of the above sprint datasets (this will loop three times)
  for (var i=0; i< teamData.length; i++){
    
    // For each object inside each data set (this will loop four times)
    $.each(teamData[i], function(index, val){
      var vals = val.values;
      var keyVal = val.key;
      console.log("keyVal: ", keyVal);
      var keyArray = arrayHolder[keyVal]; //The placeholder we'll be using is the one for that specific combined chart
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
          //Then, for each of these values, add the number of existing days to the number of days in the sprint to get combined days.

          $.each(vals, function(j, val){
            vals[j][0] = vals[j][0] + increment;
            vals[j][1] = vals[j][1] + lastMax;
          });
          console.log("Vals after Increment: ", vals);



          //Once you've added all the days, concatenate the existing array val to that specific data type (backlog, etc)
          keyArray.push.apply(keyArray, vals);
        }

      });  // End loop inside sprint
    console.log("Array Holder after team:", arrayHolder);    
    } // End loop of all sprints.
    console.log("Array Holder just after loop:", arrayHolder);
    flowData.combined.data.push({"key": "Backlog", "values": arrayHolder["Backlog"], area:true});
    flowData.combined.data.push({"key": "Development", "values": arrayHolder["Development"], area:true});
    flowData.combined.data.push({"key": "Test", "values": arrayHolder["Test"], area:true});
    flowData.combined.data.push({"key": "Done", "values": arrayHolder["Done"], area:true});
    console.log(flowData);
  }

getCombined();

