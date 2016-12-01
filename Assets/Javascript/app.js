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

	


});