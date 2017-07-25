$(document).ready(function() {
    //Navigation bar for smaller screens
    $(".button-collapse").sideNav();

    $('.modal').modal();

    $('select').material_select();

    //Fitness profile
    $("#save-fitness-button").on("click", function(event) {
        var fitnessData = {
            gender: $("#gender-input").val(),
            age: $("#age-input").val().trim(),
            height: $("#height-input").val().trim(),
            currentWeight: $("#current-weight-input").val().trim(),
            startWeight: $("#start-weight-input").val().trim(),
            targetWeight: $("#target-weight-input").val().trim(),
            activityLevel: $("#activity-level-input").val(),
            rateOfChange: $("#change-rate-input").val(),
        };

        updateFitness(fitnessData);

        $('#fitness-profile-modal').modal('close');
    });

//    Update fitness info
     function updateFitness(fitnessData) {
        $.post("/api/user_data", fitnessData).then(function(data) {
          window.location.replace('/dashboard');
          // If there's an error, log the error
        }).catch(function(err) {
          console.log(err);
        });
      };
});