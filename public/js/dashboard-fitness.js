$(document).ready(function() {
    var saveButton = $("#save-button");
    var genderInput = $("#gender-input");
    var ageInput = $("#age-input");
    var heightInput = $("#height-input");
    var currentWeightInput = $("#current-weight-input");
    var startWeightInput = $("#start-weight-input");
    var targetWeightInput = $("#target-weight-input");
    var activityLevelInput = $("#activity-level-input");
    var changeRateInput = $("#change-rate-input");
    var progress = 0;
    var progressWidth = "width: " + progress + "%"

    //Navigation bar for smaller screens
    $(".button-collapse").sideNav();

    $('#fitness-profile-modal').modal();

    $('select').material_select();

    //Fitness profile
    saveButton.on("click", function(event) {
        var fitnessData = {
            gender: genderInput.val(),
            age: ageInput.val().trim(),
            height: heightInput.val().trim(),
            currentWeight: currentWeightInput.val().trim(),
            startWeight: startWeightInput.val().trim(),
            targetWeight: targetWeightInput.val().trim(),
            activityLevel: activityLevelInput.val(),
            rateOfChange: changeRateInput.val(),

        };

        updateFitness(fitnessData.gender, fitnessData.age, fitnessData.height, fitnessData.currentWeight, fitnessData.startWeight, fitnessData.targetWeight, fitnessData.activityLevel, fitnessData.rateOfChange);

        $('#fitness-profile-modal').modal('close');
    });

//    Update fitness info
     function updateFitness(gender, age, height, currentWeight, startWeight, targetWeight, activityLevel, rateOfChange) {
        $.post("/api/user_data", {
          gender: gender,
          age: age,
          height: height,
          currentWeight: currentWeight,
          startWeight: startWeight,
          targetWeight: targetWeight,
          activityLevel: activityLevel,
          rateOfChange: rateOfChange
        }).then(function(data) {
          window.location.replace('/dashboard');
          // If there's an error, log the error
        }).catch(function(err) {
          console.log(err);
        });
      };

//      Calculate progress bar width
        function calculateProgress(startWeight, currentWeight, targetWeight) {
            var percent = 0;
            var total = targetWeight - startWeight;
            var progress = targetWeight - currentWeight
            var progressWidth;

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

         }


//    Display user info on dashboard
    $.get("/api/user_data").then(function(data) {
        $("#name").text(data.firstName + " " + data.lastName);
        $("#email").text(data.email);
        $("#gender").text(data.gender);
        $("#age").text(data.age);

        var selected = $("#gender-input option[value='" + data.gender + "']").attr("selected", "selected");

        $("#age-input").attr("value", data.age);
        $("#height-input").attr("value", data.height);
        $("#current-weight-input").attr("value", data.currentWeight);
        $("#start-weight-input").attr("value", data.startWeight);
        $("#target-weight-input").attr("value", data.targetWeight);
        
        localStorage.setItem('id', data._id);

        if (data.height == null) {
            $("#height").text("")
        } else {
            $("#height").text(data.height + " inches");
        };

        if (data.height == null) {
            $(".currentWeight").text("")
        } else{
            $(".currentWeight").text(data.currentWeight + " lbs.");
        };

        if (data.height == null) {
            $(".startWeight").text("")
        } else{
            $("#startWeight").text(data.startWeight + " lbs.");
        };

        if (data.height == null) {
            $(".targetWeight").text("")
        } else{
            $("#targetWeight").text(data.targetWeight + " lbs.");
        };

        if (data.activityLevel == 1) {
            $("#activity").text("Sedentary (little or no exercise)");
        } else if (data.activityLevel ==2) {
            $("#activity").text("Lightly active (light exercise 1-3 days/week)");
        } else if (data.activityLevel ==3) {
            $("#activity").text("Moderately active (moderate exercise 3-5 days/week)");
        } else if (data.activityLevel ==4) {
            $("#activity").text("Very active (hard exercise 6-7 days a week)");
        } else if (data.activityLevel ==5) {
            $("#activity").text("Extra active (very hard exercise & physical job)");
        };

        if (data.rateOfChange == 1) {
            $("#rateOfChange").text("Gain 1lb per week");
        } else if (data.rateOfChange == 2) {
            $("#rateOfChange").text("Gain .5lb per week");
        } else if (data.rateOfChange == 3) {
            $("#rateOfChange").text("Lose .5lb per week");
        } else if (data.rateOfChange == 4) {
            $("#rateOfChange").text("Lose 1lb per week");
        };



        calculateProgress(data.startWeight, data.currentWeight, data.targetWeight);

        Materialize.updateTextFields();

        });

});