function searchCity(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=0e92073c3c58ca34ad6188f84fccee10";
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=0e92073c3c58ca34ad6188f84fccee10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $(".city-display").empty();
        var currentDate = " (" + moment().format("MM/DD/YYYY") + ") ";

        var currentInfoDiv = $("<div>");

        var cityNameH = $("<h2>").text(response.name);
        var displayDate = cityNameH.append(" " + currentDate);
        var temp = $("<p>").text("Tempraturer: " + response.main.temp);
        var hum = $("<p>").text("Humidity: " + response.main.humidity);
        var wind = $("<p>").text("Wind Speed: " + response.wind.speed);
        var currentweather = response.weather[0].main;

        if (currentweather === "Rain") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } 
        else if (currentweather === "Clouds") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        } 
        else if (currentweather === "Clear") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }
        else if (currentweather === "Drizzle") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }
        else if (currentweather === "Snow") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            currentIcon.attr("style", "height: 60px; width: 60px");
        }

        currentInfoDiv.append(displayDate, currentIcon, temp, hum, wind);
        $(".city-display").html(currentInfoDiv);
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var uvUrlLink = "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + lat + "&lon=" + lon;

        $.ajax({
            url: uvUrlLink,
            method: "GET"
        }).then(function(response2) {
            console.log(response2);
            $('#uv-index').empty();
            var uvResult = response2.value;
            console.log(uvResult);
            var uvlEl = $("<p>").text("UV Index: " + uvResult);

            