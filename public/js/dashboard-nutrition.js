$(document).ready(function() {
    var saveButton = $("#save-nutrition-button");
    var dietInput = $("#diet-input");

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
            $("#dietPref").text(data.diet);
//          window.location.replace('/dashboard');
          // If there's an error, log the error
        }).catch(function(err) {
          console.log(err);
        });
      };
})