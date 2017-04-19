// MODEL
//
//Storage for the datasets and the AJAX-calls

// var cities = source for the initial observable Array
var cities =
[{city:"Istanbul",population:9897599,country:"Turkey",class:6,countrycode:"TR",location:{lat:41.0082376,lng:28.97835889999999}},{city:"London (greater city)",population:8256400,country:"United Kingdom",class:6,countrycode:"UK",location:{lat:51.504827,lng:-0.0786263999999619}},{city:"Paris (greater city)",population:6695233,country:"France",class:6,countrycode:"FR",location:{lat:48.8627013,lng:2.288661700000034}}];

// Creating an Array with all names for the autocomplete
// TO DO: ein Array clonen, nicht nur auf das Original verweisen,
// denn das Original wird durch observable verändert.
var cityList = [];
var map;
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

    }).fail(function(){

        console.log("Couldn´t load the article");
    })

    .done(function(nytData){
         console.log("done meldet: alles hat geklappt");
         console.log(nytData);
         viewModel.nytData(nytData.response.docs);
    });

}


// Ajax-call for Wikipedia
function wikipedia(choosenCity){
    //looking for the strings before the first space, so that wikipedia looks up the city and not any further descriptions like "greater City"
    var wikiCity = choosenCity.split([" "]);

    var wikiURL = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+choosenCity+"&format=json&callback=wikiCallback";

//jsonp hat keine .false-Methode, die müssen wir uns selbst bauen
//folgender Trick: Wir schreiben eine setTimeout-Function, eine Art Zeitzünder
// wir schalten den Zeitzünder im Ajax-Request ab, wenn Success vermeldet wird
var wikiRequestTimeout = setTimeout(function(){
    console.log("failed to get wikipedia resources");
}, 8000);

//Hier starten wir den Ajax-Call und geben ein paar Settings mit auf den Weg,
// die Wikipedia für die Bearbeitung benötigt.
$.ajax({
    // hier hätten wir auch schreiben können $ajax(wikiURL, { ...})
    url: wikiURL,
    // dataType: "jsonp" setzt das Setting automatisch aurf jsonp: "callback"
    // es gibt aber auch APIs, die die Callback-Function anders nennen,
    // dann müssen wir das händisch ändern, indem wir jsonp: "callback-functionname" setzen
    dataType: "jsonp",

    // Hier geben wir eine sucess-object mit rein, das zündet bei erfolg
    // die response ist ein Javascript-Objekt, das in eine function eingebettet ist
    // ist notwendig für die jsonp-Methode.
    success: function(response) {
        //response gibt hier mehrere Objekte mit Listen von Artikeln heraus
        //in den Arrays stecken aber nur die Überschriften/Artikelnamen, keine weiteren Inhalte
        // daher iterieren wir über die Array, ziehen die Artikelnamen raus
        // und packen sie in eine URL, die wir dann auf die Seite zaubern
        var articleList = response[1];
        console.log(response);
        for (var i=0; i<articleList.length; i++) {
            var articleStr = articleList[i];
            var newUrl = "http://en.wikipedia.org/wiki/" + articleStr;
            console.log(newUrl);
            viewModel.wikiData.push(newUrl);
        }
        clearTimeout(wikiRequestTimeout);
    }
});






    return false;
}



// VIEWMODEL - knockout

var mapShow;
var markers = [];
var viewModel = {

    selectedCity: ko.observable("Please select City!"),
    nytData: ko.observableArray(),
    wikiData: ko.observableArray(),


    cityArray: ko.observableArray(cities),
    myFunction: function(){
        console.log("Ich bin eine Methode im Bind");
    },

    burgerMenu: function(){
        console.log ("BurgerMenu gezündet");
        burger.classList.toggle("open");
        drawer.classList.toggle("open");
        mapShow=true;

    },

    lookForcity: function(e){
        console.log("mouseTest läuft");
        var city = e.city;
        viewModel.query(e.city);
        viewModel.askAjax();
    },

    zoomToCity: function(e){
        var position = e.location;
        var choosenCity = e.city;
        viewModel.zoomIn(position);
        viewModel.askAjax(choosenCity);


    },

    zoomToCityTextInput: function(){
        var city = viewModel.cityArray()[0];
        var position = city.location;
        var choosenCity = city.city;
        viewModel.zoomIn(position);
        viewModel.askAjax(choosenCity);
    },

    zoomIn: function(position){

        var bounds = new google.maps.LatLngBounds();
        bounds.extend(position);
        map.fitBounds(bounds);
        map.setZoom(13);

    },

    menuOut: function(){
        console.log("Main is clicked");
        if (mapShow===true) {
        drawer.classList.remove("open");
        cityInfo.classList.remove("open");
        burger.classList.remove("open");
        }
    },

    remove: function(){
        this.cityArray.pop();
    },

    query: ko.observable(),

    search: function(value){
        console.log("Search gezündet");

        viewModel.cityArray.removeAll();
        console.log(cities);
        for (var index in cityList){
            if(cityList[index].city.toLowerCase().indexOf(value.toLowerCase()) >=0) {
                console.log("jetzt soll gepusht werden");
                viewModel.cityArray.push(cityList[index]);

            }
        }
        viewModel.setMarker();
    },

    askAjax: function(city){
        // TODO CHECK EINBAUEN, OB ETWAS EINGEGEBEN WURDE
        console.log (choosenCity);
        // TODO Eventuell nach erstem Leerzeichen abbrechen, sonst kommt bei Wikipedia nichts heraus.
        var cityParts = city.split([" "]);
        var choosenCity = cityParts[0];
        viewModel.selectedCity(choosenCity);
        nyTimes(choosenCity);
        wikipedia(choosenCity);

        viewModel.menuOut();
    },

    cityInfo: function(){


        console.log("cityInfo feuert");
        cityInfo.classList.toggle("open");

    },

    highlightList: function(e){
        console.log(e);
    },

    defaultList: function(){
        listElement.classList.toggle("open");
    },


    initMap: function(){
        map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 52.420112, lng: 10.790285},
        zoom: 4
        });
        viewModel.setMarker("DROP");
    },

    // deleteMarkers: function(map){
    //     for (var i=0; i<markers.length; i++){
    //         markers[i].setMap = null;
    //     }
    // }

    setMarker: function(animeStyle){
        console.log(markers);
        //creating a variable with the length of the actual
        //marker-array for
        //clearing the map of the old marker
        var markersLength = markers.length;
        for (var i=0; i<markers.length; i++){
            markers[i].setMap(null);
        }

        // variables for the color of the marker (default and mouseover)
        var defaultIcon = makeMarkerIcon("1C407A");
        var highlightedIcon = makeMarkerIcon("5782C6");
        var infowindow = new google.maps.InfoWindow();
        var animeStyle = animeStyle;
        // collecting the actual cityArray with the actual results of the search
        var city = viewModel.cityArray();

        for (var i=0; i<city.length; i++) {
            console.log(animeStyle);
            var position = city[i].location;
            var title = city[i].city;
            var country = city[i].country;
            var population = city[i].population;
            // creating a marker for each locations-element
            // animeStyle is set to "Drop" in the initMap-function,
            // so in the first time, markers are animated.
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



        marker.addListener("mouseover", function(){
            populateInfowindow(this, infowindow);
            this.setIcon(highlightedIcon);

        });

        //Mouseout-Eventhandler
        marker.addListener ("mouseout", function(){
            this.setIcon(defaultIcon);

            infowindow.setMap(null);
        });

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
function populateInfowindow(marker, infowindow){
        //first checking if the window of the choosen marker is allready open
            // if not, run the function
            if (infowindow.marker != marker){
                //hier schaffen wir den key marker und
                //belegen ihn mit dem Wert marker
                infowindow.marker = marker;
                //Jetzt fülle ich das infowindow mit Text
                infowindow.setContent ("<div>" + marker.title + "</div><br><div>"+marker.population+"</div>");
                //dann öffne ich das Infowindow des Markers in der Map
                infowindow.open(map, marker);
                // dann setzen wir noch eine Closeclick-Function, um das
                //Infowindow zu schließen. Das geht glaube ich auch ohne.
                // infowindow.addListener("closeclick", function(){
                //     console.log("closeklick pressed");
                //     infowindow.marker = null;
                // });
            }
        }

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
viewModel.query.subscribe(viewModel.search);
ko.applyBindings(viewModel);






var mapShow = false;

