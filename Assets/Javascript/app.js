$(document).ready(function(){

	var movies = ["Inception" , "The Dark Knight", "The Departed" , "Avatar", "Donnie Darko", 
				  "District 9", "Zero Dark Thirty", "The Social Network", "The Avengers", "The Martian"];

	//calling buttons to show at loading of page
	renderButtons();


	// Function to create buttons of movies
	function renderButtons(){ 

		// Deletes the movies prior to adding new movies 
		$('.moviesButtonList').empty();

		// Loops through the array of movies
		for (var i = 0; i < movies.length; i++){

		    var moviesButton = $('<button>'); //creating buttons
		    moviesButton.addClass('clickMovie btn btn-default'); // Added a class 
		    moviesButton.attr('data-name', movies[i]); // Added a data-attribute
		    moviesButton.text(movies[i]); // giving text to all buttons
		    $('.moviesButtonList').append(moviesButton); // appending buttons at the top of browswe
		}
	}

	// function for user input on movies
	$('#submitButton').on('click', function(){

		//grabing user provided movie
		var movie = $('#moviesInputList').val().trim();

		// pushing that movie to array
		movies.push(movie);
			
		// make it run thru render buttons function to create button for user movie
		renderButtons();

		// avoid refresh
		return false;
	});

	//function to get all the gifs to show on page
	$(".moviesButtonList").on("click", ".clickMovie", function(){
		$('.moviesGifSection').html("");

		//grabing the name of the movie that was clicked on
		var ButtonMovieName = $(this).data("name");

		//personal check to see if movies button working or not
		console.log(ButtonMovieName);

		//public API key
		var publicApiKey = "dc6zaTOxFJmzC";

		//creating URL for movies name clicked on
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + ButtonMovieName + "&api_key=" + publicApiKey + "&limit=10";

		//Ajax Request
		$.ajax ({url: queryURL, method:"GET"})
			.done(function(response){

				//printing out quesrURL for personal use
				console.log(queryURL);

				var gifResults = response.data;

				//console logging resposse object
				console.log(gifResults);


				//looping thru gifResults objects 
				for (var i = 0; i < gifResults.length; i++) {

					var moviesDiv = $("<div>");

					var gifRating = $("<p>").text("Rating: " + gifResults[i].rating);

					var moviesImage = $("<img>");

					moviesImage.attr ({
						"src": gifResults[i].images.fixed_height_still.url,
						"data-still": gifResults[i].images.fixed_height_still.url,
						"data-animated": gifResults[i].images.fixed_height_downsampled.url,
						"data-state": "still",
						//"class": "gif"
					});
					moviesImage.addClass("gif");

					moviesDiv.append(gifRating);
					moviesDiv.append(moviesImage);

					$('.moviesGifSection').prepend(moviesDiv);
				}


			});

	});

	//function to animate gif on click
 	$('.gif').on("click", function() {
     
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src",  $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        }

        else if (state!== "still") {
            $(this).attr("src",  $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }

	});

});

