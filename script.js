const apiURL = "https://api.spoonacular.com/recipes/"
const Apikey= "75631c11b2144e099239ea019d07a989"
var recipeId;



let userInput = prompt("what would you like to make?")


function getRecipeID(){

    
    let newURL = `${apiURL}complexSearch?query=${userInput}&apiKey=${Apikey}` 

    $.ajax({
        url: newURL  ,
        method: "GET"
    }).then(function(response){
        recipeId = response.results[0].id;
        console.log(recipeId);
    }).then(getRecipe())
    
}

getRecipeID()

function getRecipe(){
    
  
    let newURL = `https://api.spoonacular.com/recipes/${recipeId}/information&apiKey=${Apikey}`

    $.ajax({
        url: newURL  ,
        method: "GET"
    }).then(function(response){
        console.log(response)
    })

    console.log("this is working")
}
