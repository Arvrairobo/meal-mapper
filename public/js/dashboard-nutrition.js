$(document).ready(function() {
    var saveButton = $("#save-nutrition-button");
    var dietInput = $("#diet-input");

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
    };

    saveButton.on("click", function(event) {
      var nutritionData = {
          diet: dietInput.val(),
      };

      updateDiet(nutritionData.diet);

      $('#nutrition-modal').modal('close');
    });

//    Update nutrition info
    function updateDiet(diet) {
        $.post("/api/user_data/diet", { diet: diet }
        ).then(function(data) {
          window.location.replace('/dashboard');
          // If there's an error, log the error
        }).catch(function(err) {
          console.log(err);
        });
      };


      $.get("/api/user_data").then(function(data) {

        $("#dietPref").text(data.diet);

      });


})