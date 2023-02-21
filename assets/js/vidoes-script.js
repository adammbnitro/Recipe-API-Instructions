$(document).ready(function(){

    const apiKey = "AIzaSyCkT-nixMdwXNJYm8c3Qd_ScBUzmZ7r0Sk"
    
    var video = ""
    
    $('form').submit(function(event){
        event.preventDefault();
        //get user input but this can be chnaged to get the recipe title from he API
        var userInput = $('#user-input').val()

        videoSearch(apiKey, userInput,3);

    })

    function videoSearch(apiKey,userInput,max){
        
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?key=" + apiKey +"&type=video&part=snippet&maxResults=" + max + "&q=" + userInput  ,
            method: "GET"
        }).then(function(response){
            
            response.items.forEach(item => {
                video = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                $("#video").append(video);

            });
            
        })

    }

})


