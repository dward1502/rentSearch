//taking input from address text field
$("#submit").on("click", function(){
let searchInput = $("#search").val().trim();
console.log(searchInput);
    //calling zillow api  api=X1-ZWz1g5yoogg9or_aau4
    let queryURL = "https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1g5yoogg9or_aau4&address=3668+Quimby+Street&citystatezip=San+Diego%2C+CA"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
    })

});
