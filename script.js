var search = "pie";
var rID;

function searchRecipe(){
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query='+search,
		"method": "GET",
		"headers": {
			"X-RapidAPI-Key": "020a1e0fa1mshf7a710d6a5d276bp1c379cjsnfe02e9854d05",
			"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	};
	
	$.ajax(settings).done(function (response) {
		let id = response.results[0].id;
		rID = id;

		console.log(rID);
		searchInstructions();
	});
}

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

function start(){
	
	searchRecipe();

}

start();
