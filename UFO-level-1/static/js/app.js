// from data.js
var tableData = data;

// prevent form submit on enter
d3.select("#ufo_form").on("submit", function() {
    d3.event.preventDefault();
    return false;
  });

// assign table body from ufo table to variable
var ufo_tbody = d3.select("#ufo-table tbody");
// assign filter by date button to variable
var date_button = d3.select("#filter-btn");
// configure date parsing
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

// date_button on click action
date_button.on("click", function() {

    // hide alerts
    hide_alerts();

    // get filter by info
    var filterbydate = d3.select("#datetime").property("value");

    // parse to date object to check if format matches expected
    var filterbydate_obj=parseDate(filterbydate);
    if (!filterbydate_obj) {
        document.getElementById("baddate").style.display="block";
        console.log(filterbydate)
    } else {
        // console.log(filterbydate_obj);
        var filteredbydate = tableData.filter(ufo => ufo.datetime === filterbydate);
        console.log(filteredbydate);

        clear_ufo_table();

        filteredbydate.forEach((ufo) => {
            var ufo_row = ufo_tbody.append("tr");
            Object.entries(ufo).forEach(([key, value]) => {
              var ufo_cell = ufo_row.append("td");
              ufo_cell.text(value);
            });
          });

          if (!filteredbydate.length) {
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

