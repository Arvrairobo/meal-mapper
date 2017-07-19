$(document).ready(function() {
    //Navigation bar for smaller screens
    $(".button-collapse").sideNav();

    //Progress bar
    $(function() {
        $(".meter > span").each(function() {
            $(this)
                .data("origWidth", $(this).width())
                .width(0)
                .animate({
                    width: $(this).data("origWidth")
                }, 1200);
        });
    });

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

    //Fitness profile

//    $('#edit-button').click(function(){
//      $('#edit-button').hide();
//      $('.fitness-info').each(function(){
//        var content = $(this).html();
//        $(this).html('<input>' + content + '</input>');
//      });
//
//      $('#save-button').show();
//    });
//
//    $('#save-button').click(function(){
//      $('#save-button').hide();
//      $('input').each(function(){
//        var content = $(this).val();//.replace(/\n/g,"<br>");
//        $(this).html(content);
//        $(this).contents().unwrap();
//      });
//
//      $('#edit-button').show();
//    });



    $.get("/api/user_data").then(function(data) {
        $("#name").text(data.firstName + " " + data.lastName);
        $("#email").text(data.email);
      });

});