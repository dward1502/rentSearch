//calling zillow api  api=X1-ZWz1g5yoogg9or_aau4
//calling rent range api = b3ce352444676f3a4a72


function zillowAPI(address,state,city) {
    let add = address;
    let st = state;
    let cit = city;
    let queryURL = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1g5yoogg9or_aau4b&address="+add+"&citystatezip="+cit+"+"+st+"";
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "xml",
        success: function (response) {
            let zpid = $(response).find('zpid').text();
            let zpidData = zpid;
            let zEstURL = "http://www.zillow.com/webservice/GetZestimate.htm?zws-id=X1-ZWz1g5yoogg9or_aau4b&zpid=" + zpidData + "&rentzestimate=true";
            console.log(zEstURL);

            $.ajax({
                url: zEstURL,
                method: "GET",
                dataType: "xml",
                success: function (data) {
                    console.log(data);
                    $(data).find('rentzestimate').each(function () {
                        let rentEst = $(this).find('amount').text();
                        $("#zillow-display").append("$ " + rentEst);
                    });
                }
            })
        }
    });
};
//&City=Boulder&State=CO&Zipcode=80305&Beds=3&Baths=3&YearBuilt=1999&Sqft=1200&Lat=40.0156810&Lon=-105.27036&PropType=1
function rentRangeAPI(address, zipcode, sqft, bed, bath, city, state, prop){
    let add = address;
    let zip = zipcode;
    let sft = sqft;
    let beds = bed;
    let baths = bath;
    let cit = city;
    let st = state;
    let property = prop;
    let queryURL = "https://www.rentrange.com/API/advancedReportAPI.php?Address="+add+"&City="+ cit + "&State="+st+"&Zipcode="+zip+"&Beds="+beds+"&Baths="+baths+"&Sqft="+sft+"&PropType="+property+"&Key=b3ce352444676f3a4a72"
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "xml",
        success: function (response){
            console.log(response);
            $(response).find('rentrangeAPI').each(function(){
                let rentEst = $(this).find('RentEstimate').text();
                console.log(rentEst);
                $("#rentRange-display").append("$ " + rentEst);
            })
        }
    })
};


//taking input from address text field
$("#submit").on("click", function(e){
e.preventDefault();
    let addStr = $("#address").val().trim();
    let address = addStr.split(' ').join('+');
    let zipcode = $("#zipcode").val().trim();
    let sqft = $("#sqft").val().trim();
    let bed = $("#beds").val().trim();
    let bath = $("#baths").val().trim();
    let cityStr = $("#city").val().trim();
    let city = cityStr.split(' ').join('+');
    let state = $("#state").val().trim();
    let prop = $("#property").val();

    zillowAPI(address,city,state);
    rentRangeAPI(address,zipcode,sqft,bed,bath,city,state,prop);
       
});


