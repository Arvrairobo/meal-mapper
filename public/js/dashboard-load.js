//    Calculate progress bar width
function renderProgress(startWeight, currentWeight, targetWeight) {
     var progressWidth;

     if (startWeight == null || currentWeight == null || targetWeight == null) {
         progressWidth = "width: 0%"
         $("#progress-bar").attr("style", progressWidth)
         return;
     }

     var percent = 0;
     var total = targetWeight - startWeight;

     var progress = targetWeight - currentWeight

     percent = (1- (progress/total)) * 100

     progressWidth = "width: " + percent + "%"

     $("#progress-bar").attr("style", progressWidth)

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
};

function renderActivityLevel(activityLevel) {
    if (activityLevel == 1) {
        $("#activity").text("Sedentary (little or no exercise)");
    } else if (activityLevel == 2) {
        $("#activity").text("Lightly active (light exercise 1-3 days/week)");
    } else if (activityLevel == 3) {
        $("#activity").text("Moderately active (moderate exercise 3-5 days/week)");
    } else if (activityLevel == 4) {
        $("#activity").text("Very active (hard exercise 6-7 days a week)");
    } else if (activityLevel == 5) {
        $("#activity").text("Extra active (very hard exercise & physical job)");
    };
};

function renderRateOfChange(rateOfChange) {
    if (rateOfChange == 1) {
        $("#rateOfChange").text("Gain 1lb per week");
    } else if (rateOfChange == 2) {
        $("#rateOfChange").text("Gain .5lb per week");
    } else if (rateOfChange == 3) {
        $("#rateOfChange").text("Lose .5lb per week");
    } else if (rateOfChange == 4) {
        $("#rateOfChange").text("Lose 1lb per week");
    };
};

//function drawChart(calories) {
//    google.charts.load("current", {packages:["corechart"]});
//    google.charts.setOnLoadCallback(function () {
//
//        var proteinGram = 0;
//        var carbGram = 0;
//        var fatGram = 0;
//
//        proteinGram = Math.round(0.3 * calories / 4);
//        carbGram = Math.round(0.45 * calories / 4);
//        fatGram = Math.round(0.25 * calories / 9);
//
//        var data = google.visualization.arrayToDataTable([
//         ['Macronutrient', 'Grams'],
//         ['Protein', proteinGram],
//         ['Carbohydrates', carbGram],
//         ['Fat',  fatGram]
//        ]);
//
//        var options = {
//         is3D: true,
//         backgroundColor: { fill:'transparent' }
//        };
//
//        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
//        chart.draw(data, options);
//    });
//};

function drawChart(protein, carbs, fat) {
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(function () {

        var data = google.visualization.arrayToDataTable([
         ['Macronutrient', 'Grams'],
         ['Protein', protein],
         ['Carbohydrates', carbs],
         ['Fat',  fat]
        ]);

        var options = {
         is3D: true,
         backgroundColor: { fill:'transparent' }
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    });
};

$(document).ready(function() {
    $.get("/api/user_data").then(function(user) {
    // Populate user info in fitness profile section
        $("#name").text(user.firstName + " " + user.lastName);
        $("#email").text(user.email);
        $("#gender").text(user.gender);
        $("#age").text(user.age);
        $("#totalCalories").text(user.calories);
        $("#height").text(user.height ? user.height + " inches" : '');
        $(".currentWeight").text(user.currentWeight ? user.currentWeight + " lbs." : '');
        $("#startWeight").text(user.startWeight ? user.startWeight + " lbs." : '');
        $("#targetWeight").text(user.targetWeight ? user.targetWeight + " lbs." : '');
        renderActivityLevel(user.activityLevel);
        renderRateOfChange(user.rateOfChange);

        //Populate user info in nutrition profile
        $("#dietPref").text(user.diet);
        $("#protein").text(user.protein + "g");
        $("#fat").text(user.fat + "g");
        $("#carbs").text(user.carbs + "g");

        //Populate user info in fitness modal
        $("#gender-input option[value='" + user.gender + "']").attr("selected", "selected");
        $("#activity-level-input option[value='" + user.activityLevel + "']").attr("selected", "selected");
        $("#change-rate-input option[value='" + user.rateOfChange + "']").attr("selected", "selected");
        $("#age-input").attr("value", user.age);
        $("#height-input").attr("value", user.height);
        $("#current-weight-input").attr("value", user.currentWeight);
        $("#start-weight-input").attr("value", user.startWeight);
        $("#target-weight-input").attr("value", user.targetWeight);

        //Populate user info in nutrition modal
        $("#diet-input option[value='" + user.diet + "']").attr("selected", "selected");

        renderProgress(user.startWeight, user.currentWeight, user.targetWeight);

        drawChart(user.protein, user.carbs, user.fat);

        Materialize.updateTextFields();

        localStorage.setItem('id', user._id);
    });
});