// MODEL
//Here is our data





// VIEWMODEL - knockout
var mapShow = false;




//GOOGLE MAP

//global variables for the map, the array with the markers
var map;
var markers = [];


function initMap(){
    // creating a new google map
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 52.420112, lng: 10.790285},
        zoom: 11
    });

    // creating Markers with Info-Windows for displaying restaurants and
    // Bars in Wolfsburg
    // first we take the locations from the google places
    var locations = [
        {title: "Kunstmuseum", location: {lat: 52.418968, lng: 10.785190}},
        {title: "Autostadt", location: {lat: 52.433667, lng: 10.794675}},
        {title: "Volkswagen Werk", location: {lat: 52.435878, lng: 10.769532}},
        {title: "Planetarium", location: {lat: 52.416955, lng: 10.782018}},
        {title: "Schloss Fallersleben", location: {lat: 52.417154, lng: 10.716297}}
    ];

    //creating a new Variable with the function, that creates infowindows
    var infowindow = new google.maps.InfoWindow();

    //collecting the informationen from var locations to set the markers
    for (var i=0; i<locations.length; i++){
        console.log(locations[i].location);
        var position = locations[i].location;
        var title = locations[i].title;
        // creating a marker for each locations-element
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP,
            // icon: iconDefault,
            id: i
        });

        // now pushing the marker into the markers array
        markers.push(marker);

        // creating an click-Event for every marker
        // on click, the infoWindow will be opend with the
        // populateInfowindow-Function
        marker.addListener ("click", function(){
            //wir übergeben mit this den einzelnen Marker und mit
            // Infowindow die Variable mit der Funktion zur Schaffung
            // eines Infowindows
            populateInfowindow(this, infowindow);
        });
    }
    // function to create the Infowindow
    // function is calles in the for-loop iterating over the
    // locations-array
    function populateInfowindow(marker, infowindow){
        //first checking if the window of the choosen marker is allready open
        // if not, run the function
        if (infowindow.marker != marker){
            //hier schaffen wir den key marker und
            //belegen ihn mit dem Wert marker
            infowindow.marker = marker;
            //Jetzt fülle ich das infowindow mit Text
            infowindow.setContent ("<div>" + marker.title + "</div>");
            //dann öffne ich das Infowindow des Markers in der Map
            infowindow.open(map, marker);
            // dann setzen wir noch eine Closeclick-Function, um das
            //Infowindow zu schließen. Das geht glaube ich auch ohne.
            infowindow.addListener("closeclick", function(){
                infowindow.setMarker(null);
            });
        }

    }


}






// Burger Menu

var menu = document.getElementById("menu");
var drawer = document.getElementById("drawer");
var main = document.getElementById("map");

// VIEW
menu.addEventListener("click", function(e){
    console.log(e);
    menu.classList.toggle("hidden");
    drawer.classList.toggle("open");
    mapShow=true;
    e.stopPropagation();
});

main.addEventListener("click", function(){
    console.log("Main is clicked");
    if (mapShow===true) {
        drawer.classList.remove("open");
        menu.classList.remove("hidden");
    }
});
