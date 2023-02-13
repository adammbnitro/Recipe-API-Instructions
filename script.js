/*
recipe api request, someone else is working on it now

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
"https://www.googleapis.com/youtube/v3/search?part=snippet&key="
*/

$(document).ready(function(){

    const apiKey = "AIzaSyCkT-nixMdwXNJYm8c3Qd_ScBUzmZ7r0Sk"
    
    var video = ""
    
    $('form').submit(function(event){
        event.preventDefault();

        var userInput = $('#user-input').val()

        videoSearch(apiKey, userInput,1);

    })


    function videoSearch(apiKey,userInput,max){

        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?key=" + apiKey +"&type=video&part=snippet&maxResults=" + max + "&q=" + userInput  ,
            method: "GET"
        }).then(function(response){
            
            response.items.forEach(item => {
                video = `<iframe width="500" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder = "0" allowfullscreen></iframe>`

                $("#video").append(video);

            });
            
        })

    }

})


