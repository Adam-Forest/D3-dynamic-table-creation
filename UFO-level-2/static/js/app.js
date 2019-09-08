// from data.js
var tableData = data;

// prevent form submit on enter
d3.select("#ufo_form").on("submit", function() {
    d3.event.preventDefault();
    return false;
  });

// assign table body from ufo table to variable
var ufo_tbody = d3.select("#ufo-table tbody");
// assign filter submit button to variable
var filter_button = d3.select("#filter-btn");

// append data to state filter
// map keys to get unique values (eazy peazy)
var stateselect=d3.select('#stateselect')
var options = stateselect
  .selectAll('option')
  .data(d3.map(tableData, function(d){return d.state.toUpperCase()}).keys().sort())
  .enter()
	.append('option')
	.text(function (d) { return d; });

// configure date parsing to check date format entered
var parseDate = d3.timeParse("%m/%d/%Y");

// function to remove all rows in ufo_table body (clear the table)
function clear_ufo_table(){
    ufo_tbody.selectAll("tr").remove();
}

// function to hide all alert 
function hide_alerts(){
    var x = document.getElementsByClassName("infos");
    var i;
    for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    }
}

// filter_button on click action
filter_button.on("click", function() {

    // hide alerts
    hide_alerts();

    // get filter by info from form variables
    var filterbyparams=[]
    filterbyparams["date"] = d3.select("#datetime").property("value");
    filterbyparams["state"] = d3.select("#stateselect").property("value");
    // console.log(filterbyparams["date"])
    // console.log(filterbyparams["state"])

    // parse to date object to check if format matches expected
    // can not compare date object to date object, not sure why
    var filterbyparams_obj=parseDate(filterbyparams["date"]);
    if (!filterbyparams_obj) {
        document.getElementById("baddate").style.display="block";
    } else {
        // console.log(filterbyparams_obj);
        var filteredbyparams = tableData.filter(function(ufo) {
          if ((ufo.datetime === filterbyparams["date"]) && ((ufo.state === filterbyparams["state"].toLowerCase()) || (filterbyparams["state"]=="Any State")))
            {
              return ufo;
            }
          });

        // console.log(filteredbyparams);
        clear_ufo_table();

        // populate table with filtered data
        filteredbyparams.forEach((ufo) => {
            var ufo_row = ufo_tbody.append("tr");
            Object.entries(ufo).forEach(([key, value]) => {
              var ufo_cell = ufo_row.append("td");
              ufo_cell.text(value);
            });
          });

          if (!filteredbyparams.length) {
            document.getElementById("nodatefound").style.display="block";
        }

    }
});

// populate ufo table with all data on initial page load
tableData.forEach((ufo) => {
  var ufo_row = ufo_tbody.append("tr");
  Object.entries(ufo).forEach(([key, value]) => {
    var ufo_cell = ufo_row.append("td");
    ufo_cell.text(value);
  });
});

