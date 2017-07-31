var favfoods = ["Fried Catfish", "Pickles", "Chana Masala", "Shrimp Poboy", "Pho"]
renderButtons();
getGif();


function getGif(){
	$('button').on('click', function(){
		$('#food-display').empty();
		var food = $(this).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    food + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
    	url: queryURL,
    	method: "GET"
    })
    .done(function(response){
    	console.log(queryURL);
    	var results = response.data;
    	
    	for (var i = 0; i < results.length; i++) {
    		var foodDiv = $('<div>');
    		foodDiv.addClass('foodcontainer');
    		var p = $('<p>').text('Rating: ' + results[i].rating);
    		var foodImage = $('<img>');
      	var animated = results[i].images.fixed_height.url;
    		var still = results[i].images.fixed_height_still.url;
				foodImage.attr('src',still);
				foodImage.attr('data-still', still);
				foodImage.attr('data-animate', animated);
				foodDiv.append(p);
				foodDiv.append(foodImage);
				$('#food-display').prepend(foodDiv);
				
				
						$('img').click(function(){
							if($(this).attr('src') == $(this).attr('data-still')){
							$(this).attr('src',$(this).attr('data-animate'));
							}
							else if($(this).attr('src') == $(this).attr('data-animate')){
							$(this).attr('src',$(this).attr('data-still'));
							}
						})
			}	
	  })
  })

}

function renderButtons(){
	$('#foodBtn').empty();

	for (var i=0; i<favfoods.length; i++){
		var btn = $('<button>');
		btn.addClass('food');
		btn.attr('data-name', favfoods[i]);
		btn.text(favfoods[i]);
		$('#foodBtn').append(btn);
	}
}

$('#add-food').on('click',function(event){
	event.preventDefault();
	var addfood = $('#food-input').val().trim();
	favfoods.push(addfood);
	renderButtons();
	getGif();
})








