

function doSearch(){
    var apiKey = "trilogy"
    var userInput = $('#inputBox').val();
    var URL = "http://www.omdbapi.com/?apikey=" + apiKey + "&s=" + userInput

    console.log(URL)

    $.ajax({
        url: URL,
        method: "GET"
    });
}


