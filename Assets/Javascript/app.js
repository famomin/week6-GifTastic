$(document).ready(function(){

	var movies = ["Inception" , "The Dark Knight", "The Departed" , "Avatar", "Donnie Darko", 
				  "District 9", "Zero Dark Thirty", "The Social Network", "The Avengers", "The Martian"];

	//calling buttons to show when page loads
	renderButtons();


	// Function to create buttons for each movie movies
	function renderButtons(){ 

		// Deletes the movies prior to adding new movies 
		$(".moviesButtonList").empty();

		// Loops through the array of movies
		for (var i = 0; i < movies.length; i++){

		    var moviesButton = $("<button>"); //creating buttons
		    moviesButton.addClass("clickMovie btn btn-primary"); // Added a class 
		    moviesButton.attr("data-name", movies[i]); // Added a data-attribute
		    moviesButton.text(movies[i]); // giving text to all buttons
		    $(".moviesButtonList").append(moviesButton); // appending buttons at the top of browswe
		}
	}

	// function for user input on movies
	$('#submitButton').on("click", function(){

		//grabing user provided movie
		var movie = $('#moviesInputList').val().trim();

		//checking index of the movie input by user
		var xyz = $.inArray(movie, movies);

		//checking if the movie is already in the list
		if (xyz<0) {
			
			//pushing that movie to array
			movies.push(movie);					
			//make it run thru render buttons function to create button for user movie
			renderButtons();
		}
		
		else if(xyz>=0) {
			console.log("already in the list");
			alert(movie + " is already in the list.");
		}	

		//empty for field after user hit submit button
		$("#moviesInputList").val('');

		// avoid refresh
		return false;	
	});


	// function for user to remove on movies
	$('#removeButton').on("click", function(){

		//grabing user provided movie
		var movie = $('#moviesInputList').val().trim();

		//checking index of the movie input by user
		var xyz = $.inArray(movie, movies);

		//checking if the movie is already in the list
		if (xyz>=0) {
			
			//pushing that movie to array
			movies.splice(xyz,1);					
			//make it run thru render buttons function to create button for user movie
			renderButtons();
		}
		
		else if(xyz<0) {
			console.log("not in the list");
			alert(movie + " is not in the list to remove.");
		}	

		//empty for field after user hit submit button
		$("#moviesInputList").val('');

		// avoid refresh
		return false;
	});


	//function to get all the gifs to show on page
	$(".moviesButtonList").on("click", ".clickMovie", function(){
		$(".moviesGifSection").html("");

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

					moviesImage.attr("src", gifResults[i].images.original_still.url);
    	 			moviesImage.attr("data-still", gifResults[i].images.original_still.url);
    	 			moviesImage.attr("data-animate", gifResults[i].images.original.url);
    	 			moviesImage.attr("data-state", "still");
    	 			moviesImage.addClass("gif");

					moviesDiv.append(gifRating);
					moviesDiv.append(moviesImage);

					$(".moviesGifSection").prepend(moviesDiv);
				}


			});

	});

	//function to animate gif on click
 	$(document).on("click", ".gif", function() {
 		console.log("working"); //to check if this runs on clicks or not
     
        var state = $(this).attr("data-state");

        if (state === "still") {
        	console.log("still Working"); //to check if this runs on clicks or not
            $(this).attr("src",  $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }

        else {
        	console.log("not working"); //to check if this works on clicks or not
            $(this).attr("src",  $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }


	});

});

