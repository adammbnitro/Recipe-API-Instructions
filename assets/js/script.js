
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

var rID;
var resultsElement = $("#results");
var searchInput = $("#btnInput");
var recipeBtn = $("recipeLink");

function searchInstructions(dataHolder){
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+rID+"/information",
		"method": "GET",
		"headers": {
			"X-RapidAPI-Key": "020a1e0fa1mshf7a710d6a5d276bp1c379cjsnfe02e9854d05",
			"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	};
	
	$.ajax(settings).done(function (response) {
		console.log(response);

		var dishTypeHolder = $("#dishTypeHolder");
		var servingHolder = $("#servingHolder");
		var timeHolder = $("#timeHolder");
		var imgHolder = $("#imgHolder");
		var instructionsHolder = $("#instructionsHolder");
		var ingredientsHolder = $("#ingredientsHolder")
		var titleHolder = $("#titleHolder");

		// //Getting instructions list through API
		let loopLength = response.analyzedInstructions[0].steps;

		for(let i = 0; i < loopLength.length; i++){
			let step = response.analyzedInstructions[0].steps[i].step;
			
			// console.log(step);

			let instructionLi = $("<li>");

			instructionLi.attr("class","p-2");
			
			instructionLi.append(step);

			instructionsHolder.append(instructionLi);

		}

		// Getting ingredients list through API
		for(let i = 0; i < response.extendedIngredients.length; i++){
			// console.log(response.extendedIngredients[i].name);

			let ingredientsName = response.extendedIngredients[i].name;
			let ingredientsMetrics = response.extendedIngredients[i].measures.metric.amount;
			let ingredientsUnit = response.extendedIngredients[i].measures.metric.unitLong;

			console.log(ingredientsUnit);
			
			let ingredientsElement = $("<li>");

			ingredientsElement.append(ingredientsName + " " + ingredientsMetrics + " " + ingredientsUnit);

			ingredientsHolder.append(ingredientsElement);

		}

		//Getting dish type data

		let dishType = response.dishTypes[0];

		dishTypeHolder.append(dishType);

		//getting serving amount data

		let serving = response.servings;

		servingHolder.append(serving);

		// getting amout of time to cook

		let timeToCook = response.readyInMinutes;

		timeHolder.append(timeToCook);
		
		// getting image

		imgHolder.attr("src", response.image);

		// getting title

		let title = response.title;

		titleHolder.append(title);

		console.log(title);

		if(instructionsHolder.val = null){
			console.log("unable to find results try a different recipe.")
		}

	});
}

searchInput.on("click", function(){
	//emptys results every time button is pressed
	resultsElement.empty();
	//gets search string from inputbox
	let input = $("#searchBar").val();

	//API details
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

				console.log(response);
			
				let recipeResults = response.results;
				

				for(let i = 0; i < 9; i++){

					let ID = response.results[i].id;

					console.log(ID);
					//pulling data from api
					let number = [i + 1] + " ";

					rID = response.results[i].id;
					let recipeTitle = recipeResults[i].title;
					
					//elements for object
					var dataHolder = $("<div>");
        			let dataImage = $("<img>");
					let dataTitle = $("<h2>");
					let button = $("<a>see recipe</a>")

					//setting attributes to elements
        			dataImage.attr("src", recipeResults[i].image);
					button.attr("href", "query.html");
					button.attr("type","button")
					
					//adding bootstrap to objects
					dataHolder.addClass('col');
					dataHolder.addClass('p-5');
					button.addClass('findInstructions');
					button.attr("id",ID);

					
					//adding elements to html
					dataTitle.append(number);

					dataTitle.append(recipeTitle);

					dataHolder.append(dataTitle);

					dataHolder.append(dataImage);

					dataHolder.append(button);

        			resultsElement.append(dataHolder);


				}

				find();
				
			});
	
})

function find(){

	let button = $(".findInstructions");
	let newData = $("#moreInfo");

	button.on("click", function(){
		let target = this.id;

		localStorage.setItem("target", target);

	})

}

let button = $(".btn");
let newData = $("#moreInfo");

button.on("click", function(){
	let target = this.id;

	console.log(target);

	localStorage.setItem("target", target);
	
	console.log(target);
})
 
window.addEventListener("load", function(){
	
	let getID = this.localStorage.getItem("target");

	rID = getID;

	searchInstructions();


})
