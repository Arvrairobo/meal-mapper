$(document).ready(function() {
     //Pie Chart
        google.charts.load("current", {packages:["corechart"]});
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Macronutrient', 'Grams'],
              ['Protein', 27],
              ['Carbohydrates', 45],
              ['Fat',  8]
            ]);

            var options = {
              is3D: true,
              backgroundColor: { fill:'transparent' },
//              width:400,
//              height:300
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
            chart.draw(data, options);
          }


})