$(document).ready(function() {
    var saveButton = $("#save-nutrition-button");
    var dietInput = $("#diet-input");

            // Macrosliders

            noUiSlider.create(rangeSlider1, {
                        start: [ 25 ],
                        step: 1,
                        range: {
                            'min': [  10 ],
                            'max': [ 40 ]
                }
            });

            var rangeSliderValueElement = document.getElementById('slider-range-value1');

            rangeSlider1.noUiSlider.on('update', function( values, handle ) {
                rangeSliderValueElement.innerHTML = values[handle];
            });

            //Fat Slider

            noUiSlider.create(rangeSlider2, {
                start: [ 25 ],
                step: 1,
                range: {
                    'min': [  10 ],
                    'max': [ 40 ]
                }
            });

            

            var rangeSliderValueElement2 = document.getElementById('slider-range-value2');

            rangeSlider2.noUiSlider.on('update', function( values, handle ) {
                rangeSliderValueElement2.innerHTML = values[handle];
            });

            //Carb Slider

            noUiSlider.create(rangeSlider3, {
                start: [ 50 ],
                step: 1,
                range: {
                    'min': [  0 ],
                    'max': [ 60 ]
                }
            });

            var rangeSliderValueElement3 = document.getElementById('slider-range-value3');

            rangeSlider3.noUiSlider.on('update', function( values, handle ) {
                rangeSliderValueElement3.innerHTML = values[handle];
            });

            rangeSlider1.noUiSlider.on('change', setPct);
            rangeSlider2.noUiSlider.on('change', setPct);
            rangeSlider3.noUiSlider.on('change', setPct);
            

            function setPct(){


            var proPct = rangeSlider1.noUiSlider.get()
            var fatPct = rangeSlider2.noUiSlider.get()
            var carbPct = rangeSlider3.noUiSlider.get()

            };

            saveButton.on("click", function(event) {
              var nutritionData = {
                  diet: dietInput.val(),
              };

              // End Macrosliders

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