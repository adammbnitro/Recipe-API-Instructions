
// This code is for the scroll to top button on the main page

$(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
});

$('.scroll-to-top').click(function() {
    $('html, body').animate({scrollTop : 0},800);
    return false;
});
// --------------------------------------------------------

var search;
var rID;
var resultsElement = $("#results");



// function searchRecipe(){
// 	const settings = {
// 		"async": true,
// 		"crossDomain": true,
// 		"url": 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query='+search,
// 		"method": "GET",
// 		"headers": {
// 			"X-RapidAPI-Key": "020a1e0fa1mshf7a710d6a5d276bp1c379cjsnfe02e9854d05",
// 			"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
// 		}
// 	};
	
// 	$.ajax(settings).done(function (response) {
// 		let id = response.results[0].id;
// 		rID = id;

// 		console.log(rID);
// 		searchInstructions();
// 	});
// }

function searchInstructions(){
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+"607224"+"/information",
		"method": "GET",
		"headers": {
			"X-RapidAPI-Key": "020a1e0fa1mshf7a710d6a5d276bp1c379cjsnfe02e9854d05",
			"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	};
	
	$.ajax(settings).done(function (response) {
		console.log(response.analyzedInstructions[0].steps);
	});
}

// function start(){
	
// 	searchRecipe();

// }

// start();


var searchInput = $("#btnInput");

searchInput.on("click", function(){
	resultsElement.empty();
	let input = $("#searchBar").val();

	const settings = {
				"async": true,
				"crossDomain": true,
				"url": 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query='+input,
				"method": "GET",
				"headers": {
					"X-RapidAPI-Key": "020a1e0fa1mshf7a710d6a5d276bp1c379cjsnfe02e9854d05",
					"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
				}
			};
			
			$.ajax(settings).done(function (response) {
				let id = response.results[0].id;

				rID = id;

				console.log(id);

				console.log(response);
			
				let recipeResults = response.results;

				console.log(recipeResults[0]);

				for(let i = 0; i < recipeResults.length; i++){

					let dataHolder = $("<div>");
        			let dataImage = $("<img>");

        			let recipeTitle = recipeResults[i].title;
        			dataImage.attr("src", recipeResults[i].image);

					dataHolder.addClass('col-4');
					dataHolder.addClass('p-5');

        			dataHolder.append(dataImage);

        			dataHolder.append(recipeTitle);

        			resultsElement.append(dataHolder);

				}

				searchInstructions();
			});
	
	
	
})
