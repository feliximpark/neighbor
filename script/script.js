// MODEL
//
//Storage for the datasets and the AJAX-calls

// var cities = source for the initial observable Array
// Content: all European cities with more than 500000 inhabitants
var cities=[{city:"Istanbul",population:9897599,country:"Turkey",class:6,countrycode:"TR",location:{lat:41.0082376,lng:28.97835889999999}},{city:"London (greater city)",population:8256400,country:"United Kingdom",class:6,countrycode:"UK",location:{lat:51.504827,lng:-.0786263999999619}},{city:"Paris (greater city)",population:6695233,country:"France",class:6,countrycode:"FR",location:{lat:48.858429,lng:2.350642}},{city:"Berlin",population:3501872,country:"Germany",class:6,countrycode:"DE",location:{lat:52.52000659999999,lng:13.404953999999975}},{city:"Ankara",population:3401573,country:"Turkey",class:6,countrycode:"TR",location:{lat:39.9333635,lng:32.85974190000002}},{city:"Madrid",population:3233527,country:"Spain",class:6,countrycode:"ES",location:{lat:40.4167754,lng:-3.7037901999999576}},{city:"Barcelona (greater city)",population:3202571,country:"Spain",class:6,countrycode:"ES",location:{lat:41.4037897,lng:2.19129810000004}},{city:"Milano (greater city)",population:3105489,country:"Italy",class:6,countrycode:"IT",location:{lat:45.48960899999999,lng:9.200795999999968}},{city:"Napoli (greater city)",population:3103234,country:"Italy",class:6,countrycode:"IT",location:{lat:40.8383025,lng:14.251865299999963}},{city:"Athina (greater city)",population:2989023,country:"Greece",class:5,countrycode:"EL",location:{lat:37.978098,lng:23.725977}},{city:"Greater Manchester",population:2693800,country:"United Kingdom",class:5,countrycode:"UK",location:{lat:53.4575955,lng:-2.157837699999959}},{city:"Roma",population:2638842,country:"Italy",class:5,countrycode:"IT",location:{lat:41.895869,lng:-12.482653}},{city:"Izmir",population:2386759,country:"Turkey",class:5,countrycode:"TR",location:{lat:38.423734,lng:27.142826000000014}},{city:"Bucuresti",population:1883425,country:"Romania",class:5,countrycode:"RO",location:{lat:44.4267674,lng:26.102538399999958}},{city:"Lisboa (greater city)",population:1849472,country:"Portugal",class:5,countrycode:"PT",location:{lat:40.1858455,lng:-8.438638399999945}},{city:"Hamburg",population:1798836,country:"Germany",class:5,countrycode:"DE",location:{lat:53.5510846,lng:9.99368179999999}},{city:"Budapest",population:1727495,country:"Hungary",class:5,countrycode:"HU",location:{lat:47.497912,lng:19.04023499999994}},{city:"Warszawa",population:1715517,country:"Poland",class:5,countrycode:"PL",location:{lat:52.2296756,lng:21.012228700000037}},{city:"Wien",population:1687271,country:"Austria",class:5,countrycode:"AT",location:{lat:48.2081743,lng:16.37381890000006}},{city:"Stockholm (greater city)",population:1579896,country:"Sweden",class:5,countrycode:"SE",location:{lat:59.3316586,lng:18.07354459999999}},{city:"Lyon",population:1307101,country:"France",class:5,countrycode:"FR",location:{lat:45.764043,lng:4.835658999999964}},{city:"Bursa",population:1336111,country:"Turkey",class:5,countrycode:"TR",location:{lat:40.1885281,lng:29.060963600000036}},{city:"München",population:1378176,country:"Germany",class:5,countrycode:"DE",location:{lat:48.1351253,lng:11.581980599999952}},{city:"Dublin (greater city)",population:1261332,country:"Ireland",class:5,countrycode:"IE",location:{lat:53.385062,lng:-6.256786599999941}},{city:"Praha",population:1246780,country:"Czech Republic",class:5,countrycode:"CZ",location:{lat:50.0755381,lng:14.43780049999998}},{city:"Sofia",population:1208097,country:"Bulgaria",class:5,countrycode:"BG",location:{lat:42.6977082,lng:23.321867500000053}},{city:"Adana",population:1197332,country:"Turkey",class:5,countrycode:"TR",location:{lat:36.9914194,lng:35.33082850000005}},{city:"Bruxelles / Brussel",population:1159448,country:"Belgium",class:5,countrycode:"BE",location:{lat:50.8503396,lng:4.351710300000036}},{city:"Lille",population:1113813,country:"France",class:5,countrycode:"FR",location:{lat:50.62925,lng:3.057256000000052}},{city:"Birmingham",population:1079900,country:"United Kingdom",class:5,countrycode:"UK",location:{lat:52.48624299999999,lng:-1.8904009999999971}},{city:"Liverpool (greater city)",population:1063200,country:"United Kingdom",class:5,countrycode:"UK",location:{lat:51.5484543,lng:-.10974429999998847}},{city:"Helsinki / Helsingfors (greater city)",population:1059631,country:"Finland",class:5,countrycode:"FI",location:{lat:60.1690226,lng:24.95413659999997}},{city:"Marseille",population:1042873,country:"France",class:5,countrycode:"FR",location:{lat:43.296482,lng:5.369779999999992}},{city:"Amsterdam (greater city)",population:1021754,country:"Netherlands",class:5,countrycode:"NL",location:{lat:52.373247,lng:4.891390}},{city:"Köln",population:1017155,country:"Germany",class:5,countrycode:"DE",location:{lat:50.937531,lng:6.960278600000038}},{city:"Rotterdam (greater city)",population:977584,country:"Netherlands",class:4,countrycode:"NL",location:{lat:51.9173191,lng:4.4883204000000205}},{city:"Porto (greater city)",population:968905,country:"Portugal",class:4,countrycode:"PT",location:{lat:41.14115090000001,lng:-8.608794399999965}},{city:"Gaziantep",population:945804,country:"Turkey",class:4,countrycode:"TR",location:{lat:37.065953,lng:37.37810999999999}},{city:"Torino",population:872091,country:"Italy",class:4,countrycode:"IT",location:{lat:45.070312,lng:7.686856499999976}},{city:"Konya",population:829636,country:"Turkey",class:4,countrycode:"TR",location:{lat:37.8746429,lng:32.49315539999998}},{city:"Valencia",population:797028,country:"Spain",class:4,countrycode:"ES",location:{lat:39.4699075,lng:-.3762881000000107}},{city:"Zagreb",population:779145,country:"Croatia",class:4,countrycode:"HR",location:{lat:45.8150108,lng:15.981919000000062}},{city:"Kraków",population:758334,country:"Poland",class:4,countrycode:"PL",location:{lat:50.06465009999999,lng:19.94497990000002}},{city:"Leeds",population:754200,country:"United Kingdom",class:4,countrycode:"UK",location:{lat:53.8007554,lng:-1.5490773999999874}},{city:"Bordeaux",population:720028,country:"France",class:4,countrycode:"FR",location:{lat:44.837789,lng:-.5791799999999512}},{city:"Lódz",population:718960,country:"Poland",class:4,countrycode:"PL",location:{lat:51.7592485,lng:19.45598330000007}},{city:"Toulouse",population:714318,country:"France",class:4,countrycode:"FR",location:{lat:43.604652,lng:1.4442090000000007}},{city:"Sevilla",population:702355,country:"Spain",class:4,countrycode:"ES",location:{lat:37.3890924,lng:-5.984458899999936}},{city:"Bilbao (greater city)",population:785793,country:"Spain",class:4,countrycode:"ES",location:{lat:43.264003,lng:-2.927844999999934}},{city:"Frankfurt am Main",population:691518,country:"Germany",class:4,countrycode:"DE",location:{lat:50.1109221,lng:8.682126700000026}},{city:"Antalya",population:689665,country:"Turkey",class:4,countrycode:"TR",location:{lat:36.8968908,lng:30.713323299999956}},{city:"Zaragoza",population:679624,country:"Spain",class:4,countrycode:"ES",location:{lat:41.6488226,lng:-.8890853000000334}},{city:"Palermo",population:654987,country:"Italy",class:4,countrycode:"IT",location:{lat:38.1156879,lng:13.361267099999964}},{city:"Riga",population:649853,country:"Latvia",class:4,countrycode:"LV",location:{lat:56.9496487,lng:24.10518639999998}},{city:"Greater Nottingham",population:641900,country:"United Kingdom",class:4,countrycode:"UK",location:{lat:52.9546639,lng:-1.1580059000000347}},{city:"Wroclaw",population:631188,country:"Poland",class:4,countrycode:"PL",location:{lat:51.1078852,lng:17.03853760000004}},{city:"Oslo",population:623966,country:"Norway",class:4,countrycode:"NO",location:{lat:59.9138688,lng:10.752245399999993}},{city:"Stuttgart",population:613392,country:"Germany",class:4,countrycode:"DE",location:{lat:48.7758459,lng:9.182932100000016}},{city:"Diyarbakir",population:609465,country:"Turkey",class:4,countrycode:"TR",location:{lat:37.9249733,lng:40.210982599999966}},{city:"Zürich (greater city)",population:598986,country:"Suisse",class:4,countrycode:"CH",location:{lat:47.3891278,lng:8.516750499999944}},{city:"Glasgow",population:594100,country:"United Kingdom",class:4,countrycode:"UK",location:{lat:55.864237,lng:-4.251805999999988}},{city:"Nantes",population:593983,country:"France",class:4,countrycode:"FR",location:{lat:47.218371,lng:-1.553621000000021}},{city:"Genova",population:582320,country:"Italy",class:4,countrycode:"IT",location:{lat:44.4056499,lng:8.946255999999948}},{city:"Essen",population:573468,country:"Germany",class:4,countrycode:"DE",location:{lat:51.4556432,lng:7.011555199999975}},{city:"Málaga",population:567433,country:"Spain",class:4,countrycode:"ES",location:{lat:36.7212737,lng:-4.42139880000002}},{city:"København",population:559440,country:"Denmark",class:4,countrycode:"DK",location:{lat:55.6760968,lng:12.568337100000008}},{city:"Düsseldorf",population:592393,country:"Germany",class:4,countrycode:"DE",location:{lat:51.2277411,lng:6.773455600000034}},{city:"Kayseri",population:572170,country:"Turkey",class:4,countrycode:"TR",location:{lat:38.720489,lng:35.48259699999994}},{city:"Dortmund",population:580956,country:"Germany",class:4,countrycode:"DE",location:{lat:51.5135872,lng:7.465298100000041}},{city:"Sheffield",population:554600,country:"United Kingdom",class:4,countrycode:"UK",location:{lat:53.38112899999999,lng:-1.47008500000004}},{city:"Leipzig",population:531809,country:"Germany",class:4,countrycode:"DE",location:{lat:51.3396955,lng:12.373074699999961}},{city:"Dresden",population:529781,country:"Germany",class:4,countrycode:"DE",location:{lat:51.0504088,lng:13.737262099999953}},{city:"Bremen",population:548319,country:"Germany",class:4,countrycode:"DE",location:{lat:53.07929619999999,lng:8.801693699999987}},{city:"Vilnius",population:533279,country:"Lithuania",class:4,countrycode:"LT",location:{lat:54.6871555,lng:25.279651400000034}},{city:"Bradford",population:523900,country:"United Kingdom",class:4,countrycode:"UK",location:{lat:53.795984,lng:-1.7593980000000329}},{city:"Hannover",population:525875,country:"Germany",class:4,countrycode:"DE",location:{lat:52.3758916,lng:9.732010400000036}},{city:"Portsmouth (greater city)",population:522500,country:"United Kingdom",class:4,countrycode:"UK",location:{lat:50.800693,lng:-1.109834}},{city:"Poznan",population:550742,country:"Poland",class:4,countrycode:"PL",location:{lat:52.406374,lng:16.925168100000064}},{city:"Göteborg",population:520374,country:"Sweden",class:4,countrycode:"SE",location:{lat:57.70887,lng:11.974559999999997}},{city:"Nice",population:522008,country:"France",class:4,countrycode:"FR",location:{lat:43.7101728,lng:7.261953199999994}},{city:"Nürnberg",population:510602,country:"Germany",class:4,countrycode:"DE",location:{lat:49.4254092,lng:11.079655300000013}},{city:"Antwerpen",population:507368,country:"Belgium",class:4,countrycode:"BE",location:{lat:51.2194475,lng:4.40246430000002}},{city:"'s-Gravenhage",population:502055,country:"Netherlands",class:4,countrycode:"NL",location:{lat:52.0704978,lng:4.3006999000000405}}];

// Creating an Array with all names for the autocomplete-search-function
var cityList = [];
function createCityList(){
    for (var i=0; i<cities.length; i++){
        cities[i].label = cities[i].city;
        cities[i].value = cities[i].country;
        cityList.push(cities[i]);
    }
}
createCityList();

//AJAX-Calls
// Ajax-call for the New York Times
// then handling the collected data to the viewmodel
function nyTimes(choosenCity){
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url+="?" + $.param({
        "api-key": "ac3bf3e29d5b4ce79a09ff9aac21bb12",
        "q": choosenCity
    });

    $.getJSON(url, function(data) {
    //if an error orcurs, the fail-function is invoked
    }).fail(function(){
        viewModel.nytData("No connection to NYT");
    })
    .done(function(nytData){
        viewModel.nytData(nytData.response.docs);
    });
}

// Ajax-call for Wikipedia
function wikipedia(choosenCity){
    //looking for the strings before the first space, so that wikipedia looks up the city and not any further descriptions like "greater City"
    var wikiCity = choosenCity.split([" "]);
    var wikiURL = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+wikiCity+"&format=json&callback=wikiCallback";
    //error-handling: if wikipedia doesn´t answer in 3 sec, an error-message occurs
    var wikiRequestTimeout = setTimeout(function(){
    $("#wikipedia").append("<h2>No connection to Wikipedia</h2>");
    }, 3000);
// starting the ajax-call for the Wikipedia-API
    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(response) {
            var articleList = response[1];
            var newArray = [];
            viewModel.wikiData.removeAll();
            for (var i=0; i<articleList.length; i++) {
                var articleStr = articleList[i].replace(/ /gi, "_");
                var newUrl = "http://en.wikipedia.org/wiki/" + articleStr;
                newArray.title = articleList[i];
                newArray.url = newUrl;
                viewModel.wikiData.push(newArray);
            }
            clearTimeout(wikiRequestTimeout);
        }
    });
    return false;
}

// VIEWMODEL - includes the map-functions and the knockout-observables
var map;
var markers = [];
var viewModel = {
    selectedCity: ko.observable("Please select City!"),
    nytData: ko.observableArray(),
    wikiData: ko.observableArray(),
    cityPicture: ko.observable(""),
    cityArray: ko.observableArray(cities),
    //activates the animation of the burger-symbol and pushes the left search-menu into the viewport
    burgerMenu: function(){
        burger.classList.toggle("open");
        drawer.classList.toggle("open");
        cityInfo.classList.remove("open");
    },
    // function that is invoked by clicking on a list entry in the city-search-list, zooming into the map and invoking the AJAX-calls for the choosen city
    zoomToCity: function(e){
        var position = e.location;
        var choosenCity = e.city;
        viewModel.zoomIn(position);
        viewModel.askAjax(choosenCity);
    },
    //invoked by clicking the "ok"-Button or the enter-key
    //takes the city-name from the input-form (or the closes entry in the cities-Array), zooms into the map and invoking the AJAX-calls for the choosen city
    zoomToCityTextInput: function(){
        var city = viewModel.cityArray()[0];
        var position = city.location;
        var choosenCity = city.city;
        viewModel.zoomIn(position);
        viewModel.askAjax(choosenCity);
    },
    // zooms closer into the map
    zoomIn: function(position){
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(position);
        map.fitBounds(bounds);
        map.setZoom(13);
    },
    //is invoked, when the user clicks into the map while one of the menus is open. Menu will be closed then.
    menuOut: function(){
        drawer.classList.remove("open");
        cityInfo.classList.remove("open");
        burger.classList.remove("open");
        cityInfo.classList.remove("open");
    },
    //ko.observable where the actual content of the search input field is stored
    query: ko.observable(),
    //search-funktion where the content of the input field is compared with the content of the cityList-Array
    //hits will be pushed in the ko-observable-array cityArray and will be published in the search-list
    search: function(value){
        viewModel.cityArray.removeAll();
        for (var index in cityList){
            if(cityList[index].city.toLowerCase().indexOf(value.toLowerCase()) >=0) {
                viewModel.cityArray.push(cityList[index]);
            }
        }
        viewModel.setMarker();
    },
    //invoking the two AJAX-calls
    askAjax: function(city){
        //taking only the first part of the city-name, otherwise wikipedia-API wouldn´t work
        var cityParts = city.split([" "]);
        var choosenCity = cityParts[0];
        viewModel.selectedCity(choosenCity);
        nyTimes(choosenCity);
        wikipedia(choosenCity);
        //closing the search-menu
        viewModel.menuOut();
    },
    //opens the right infobar by clikcing the small handler on the right of the screen
    cityInfo: function(){
        cityInfo.classList.toggle("open");
        burger.classList.remove("open");
        drawer.classList.remove("open");
    },
    // google map is invoked
    initMap: function(){
        map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 52.420112, lng: 10.790285},
        zoom: 4
        });
        viewModel.setMarker("DROP");
    },
    setMarker: function(animeStyle){
        //creating a variable with the length of the actual
        //marker-array for
        //clearing the map of the old marker while searching
        for (var i=0; i<markers.length; i++){
            markers[i].setMap(null);
        }
        // variables for the color of the marker (default and mouseover)
        var defaultIcon = makeMarkerIcon("1c407a");
        var highlightedIcon = makeMarkerIcon("5782c6");
        var infowindow = new google.maps.InfoWindow();
        // collecting the actual cityArray with the actual results of the search
        var city = viewModel.cityArray();
        for (var i=0; i<city.length; i++) {
            var position = city[i].location;
            var title = city[i].city;
            var country = city[i].country;
            var population = city[i].population;
            // creating a marker for each locations-element
            // animeStyle is set to "Drop" in the initMap-function,
            // so in the first time, markers are animated.
            // the marker-setting during the search goes without animation
            if (animeStyle === "DROP") {
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: title,
                    population: population,
                    country: country,
                    animation: google.maps.Animation.DROP,
                    icon: defaultIcon,
                    id: i
                });
            }else{
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: title,
                    population: population,
                    country: country,
                    animation: google.maps.Animation.animeStyle,
                    icon: defaultIcon,
                    id: i
                });
            }
            // now pushing the marker into the markers array
            markers.push(marker);
            //adding addListener to the marker by using closures in IIFEs
            marker.addListener("mouseover", (function(markercopy){
                return function(){
                    populateInfowindow(markercopy, infowindow);
                    markercopy.setIcon(highlightedIcon);
                };
            })(marker));
            //Mouseout-Eventhandler
            marker.addListener ("mouseout", (function(markercopy){
                return function(){
                    markercopy.setIcon(defaultIcon);
                    infowindow.setMap(null);
                };
            })(marker));
            //Using a closure in an IIFE for the click-Event to avoid that the eventhandler always calls the last value of "marker"
            marker.addListener("click", (function(markercopy){
                return function(){
                    var choosenCity = markercopy.title;
                    var position = markercopy.position;
                    viewModel.zoomIn(position);
                    viewModel.askAjax(choosenCity);
                };
            })(marker));
        }       // End of the for-loop
        // here is the function for creating the infowindows of the marker
        function populateInfowindow(marker, infowindow){
        //first checking if the window of the choosen marker is allready open
            // if not, run the function
            if (infowindow.marker != marker){
                infowindow.marker = marker;
                infowindow.setContent ("<div>" + marker.title + "</div><br><div>"+marker.population+"</div>");
                //open the infowindow in the map
                infowindow.open(map, marker);
            }
        }
        //defining the look of the marker
        function makeMarkerIcon(color){
            var markerImage = new google.maps.MarkerImage(
                'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ color +
                '|40|_|%E2%80%A2',
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34),
                new google.maps.Size(21,34));
            return markerImage;
        }
    }
};
//subscribing for the search-function
viewModel.query.subscribe(viewModel.search);
//invoking knockout
ko.applyBindings(viewModel);