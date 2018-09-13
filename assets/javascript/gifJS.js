
var topics = ["Space", "Technology", "Medicine", "Biology", "Meme", "Jim Carrey", "John Mulaney"];
function displayTopicGif() {
    var topic = $(this).attr("data-name");
    // query url
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=20&rating=r&api_key=DoSOiDmEY8zysuwDHj4UEBXYkBH3J4ah";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        // for loop to create a variable for the index of the objects data
        for (var i = 0; i < results.length; i++) {




            // where the gif's will be dumped
            var topicDiv = $("<div class='topic'>");
            // rating of gif
            var rating = results[i].rating;
            console.log(rating);
            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);
            // add to the rating element
            topicDiv.append(pOne);
            // retrieve the IMG of the gif
            var stillURL = results[i].images.fixed_height_still.url;
            var imgURL = results[i].images.fixed_height.url;
            console.log(imgURL);    
            var image = $("<img>").attr("src", imgURL);
            
            $(image).attr("data-still",stillURL);
            $(image).attr("data-animate",imgURL);
            $(image).attr("class","gif");
            
            topicDiv.append(image);
            // put gif into topic-view div
            $("#topic-view").prepend(topicDiv);
            $(".gif").on("click",function(event){
                console.log(this);
                var state = $(this).attr("data-state");
                console.log(state);
                if (state === "animate") {
                    console.log("state was animated");
                    $(this).attr("src", stillURL);
                    $(this).attr("data-state","still");
                }
                else{
                    console.log("state was still");
                    $(this).attr("src", imgURL);
                    $(this).attr("data-state","animate");
                }
            });
        }
        
    });
}
function renderButtons() {
    // ensures no repeat buttons
    $("#topic-buttons").empty();
    //loops through the array of topics
    for (var i = 0; i < topics.length; i++) {
        // generates buttons for each topic in the array
        var addButton = $("<button>");
        //add a class to your button 
        addButton.addClass("topic-btn");
        // adding a data- "attribute name" with a value of the topic at index i
        addButton.attr("data-name", topics[i]);
        // gives buttons a label
        addButton.text(topics[i]);
        // adds buttons to the html
        $("#topic-buttons").append(addButton);
    }

}
// this function will handle the event click for adding topics
$("#add-topic").on("click", function (event) {
    // prevents page from reloading
    event.preventDefault();
    // pulls value user enters to add topics
    var topic = $("#topic-input").val().trim();
    console.log(topic);
    // add topic to array
    topics.push(topic);
    renderButtons();
});
// shows initial buttons
renderButtons();
$(document).on("click", ".topic-btn", displayTopicGif);

