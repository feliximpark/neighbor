// MODEL
//Here is our data

var cities=[{city:"Istanbul",population:9897599,country:"Turkey",class:6,countrycode:"TR",location:{lat:41.0082376,lng:28.97835889999999}},{city:"London (greater city)",population:8256400,country:"United Kingdom",class:6,countrycode:"UK",location:{lat:51.504827,lng:-0.0786263999999619}},{city:"Paris (greater city)",population:6695233,country:"France",class:6,countrycode:"FR",location:{lat:48.8627013,lng:2.288661700000034}}];
// Creating an Array with all names for the autocomplete
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



// VIEWMODEL - knockout

// Beispiel von Niemeyer http://jsfiddle.net/rniemeyer/kEdT5/

ko.bindingHandlers.jqAuto = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var options = valueAccessor() || {};
        var allBindings = allBindingsAccessor();
        var unwrap = ko.utils.unwrapObservable;

        //handle value changing
        var modelValue = allBindings.jqAutoValue;
        if (modelValue) {
            var handleValueChange = function(event, ui) {
                var valueToWrite = ui.item ? ui.item.value : $(element).val();
                if (ko.isWriteableObservable(modelValue)) {
                   modelValue(valueToWrite );

                } else {  //write to non-observable
                   if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers']['jqAutoValue'])
                            allBindings['_ko_property_writers']['jqAutoValue'](valueToWrite );
                }
            };

            options.change = handleValueChange;
            options.select = handleValueChange;
        }

        //handle the choices being updated in a DO, so the update function doesn't have to do it each time the value is updated
        var mappedSource = ko.dependentObservable(function() {
            var source = unwrap(allBindings.jqAutoSource);
            var valueProp = unwrap(allBindings.jqAutoSourceValue);
            var labelProp = unwrap(allBindings.jqAutoSourceLabel) || valueProp;

            var mapped = ko.utils.arrayMap(source, function(item) {
                var result = {};
                result.label = labelProp ? unwrap(item[labelProp]) : unwrap(item).toString();  //show in pop-up choices
                result.value = valueProp ? unwrap(item[valueProp]) : unwrap(item).toString();  //value
                return result;
            });
            return mapped;
        });

        mappedSource.subscribe(function(newValue) {
           $(element).autocomplete("option", "source", newValue);
        });

        options.source = mappedSource();

        $(element).autocomplete(options);
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        //update value based on a model change
        var allBindings = allBindingsAccessor();
        var modelValue = allBindings.jqAutoValue;
        if (modelValue) {
           $(element).val(ko.utils.unwrapObservable(modelValue));
        }
    }
};



function Item(id, name) {
    return {
        id: ko.observable(id),
        name: ko.observable(name)
    };
}



var viewModel = {
    myOptions: ko.observableArray([
        new Item("One", "1 - One description"),
        new Item("Two", "2 - Two description"),
        new Item("Three", "3- Three description"),
        new Item("Four", "4- Four description"),
        new Item("Five", "5- Five description")
    ]),
    mySelectedOption: ko.observable()
};

ko.applyBindings(viewModel);


//Beispiel http://cameron-verhelst.be/blog/2014/04/20/knockoutjs-autocomplete/ ORIGINAL-TEXT kopiert
// ko.bindingHandlers.autoComplete = {
//     // Only using init event because the Jquery.UI.AutoComplete widget will take care of the update callbacks
//     init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
//         console.log("init des bindingHandlers läuft");
//         console.log(element);
//         console.log(valueAccessor());
//         console.log(allBindings());
//         console.log(viewModel);
//         console.log(bindingContext);
//         // { selected: mySelectedOptionObservable, options: myArrayOfLabelValuePairs }
//         var settings = valueAccessor();

//         var selectedOption = settings.selected;
//         var options = settings.options;

//         var updateElementValueWithLabel = function (event, ui) {
//             // Stop the default behavior
//             event.preventDefault();

//             // Update the value of the html element with the label
//             // of the activated option in the list (ui.item)
//             $(element).val(ui.item.label);

//             // Update our SelectedOption observable
//             if(typeof ui.item !== "undefined") {
//                 // ui.item - label|value|...
//                 selectedOption(ui.item);
//             }
//         };

//         $(element).autocomplete({
//             source: options,
//             select: function (event, ui) {
//                 updateElementValueWithLabel(event, ui);
//             },
//             focus: function (event, ui) {
//                 updateElementValueWithLabel(event, ui);
//             },
//             change: function (event, ui) {
//                 updateElementValueWithLabel(event, ui);
//             }
//         });
//     }
// };

// ko.bindingHandlers.autoComplete = {
//     // hier nutzen wir eine Init function. Einmal gefeuert, kümemrt sich jquery um die Aktualisierung
//     init: function (element, valueAccessor, allBindings, viewModel, bindingContext){
//         var settings = valueAccessor();
//         var selectedOption = settings.selected;
//         var options = settings.options;
//         var updateElementValueWithLabel = function (event, ui){
//             // stop the default behaviour
//             event.preventDefault();

//             // Update the value of the HTML-Element with the labe
//             // of the acitvated option in the list (ui.item)
//             $(element).val(ui.item.label);

//             //update our SelectedOtion observable
//             if(typeof ui.item!=="undefined"){
//                 selectedOption(ui.item);
//             }
//         };

//         $(element).autocomplete({
//             source: options,
//             select: function (event, ui){
//                 updateElementValueWithLabel(event, ui);
//             },
//             focus: function (event, ui){
//                 updateElementValueWithLabel(event, ui);
//             },
//             change: function (event, ui){
//                 updateElementValueWithLabel(event, ui);
//             }
//         });
//     }
// };


// function viewModel2(){
//     var self = this;
//     // Autocomplete-Testvar
//     self.users = cityList;
//     self.selectedOption = ko.observable();

//     // diese Funktion habe ich schon oben gemacht
//     // nämlich value und label für autocomplete setzen
//     self.options = self.users.map(function(element){
//         return{
//             label: element.city,
//             value: element.country,
//             // auf diese Weise können wir immer noch auf das
//             // Ausgangsobjekt zugreifen
//             object: element
//         };
//     });







//     self.markers = ko.observableArray();
//     self.cityArray = ko.observableArray(cities);
//     self.myFunction = function(){
//         console.log("Ich bin eine Methode im Bind");
//     };
//     self.burgerMenu = function(){
//         console.log ("BurgerMenu gezündet");
//         menu.classList.toggle("hidden");
//         drawer.classList.toggle("open");
//         mapShow=true;

//     };
//     self.menuOut = function(){
//         console.log("Main is clicked");
//         if (mapShow===true) {
//         drawer.classList.remove("open");
//         menu.classList.remove("hidden");
//         }
//     }
//     self.remove = function(){
//         this.cityArray.pop();
//     };



//     self.initMap = function(){
//         map = new google.maps.Map(document.getElementById("map"), {
//         center: {lat: 52.420112, lng: 10.790285},
//         zoom: 4
//         });
//         self.setMarker();
//     };



//     self.setMarker = function(){
//         var city = this.cityArray();
//         for (var i=0; i<city.length; i++) {

//         var position = city[i].location;
//         var title = city[i].city;
//         var population = city[i].population;
//         // creating a marker for each locations-element
//         var marker = new google.maps.Marker({
//             position: position,
//             map: map,
//             title: title,
//             population: population,
//             animation: google.maps.Animation.DROP,
//             // icon: defaultIcon,
//             id: i

//         });

//         // now pushing the marker into the markers array
//             self.markers.push(marker);
//         }
//     };
// }


//ko.applyBindings(viewModel());


// $(function () {
//     ko.applyBindings(new viewModel());
// });




var mapShow = false;




//GOOGLE MAP

//global variables for the map, the array with the markers
// var map;
// var markers = [];
// var placeMarkers = [];


// function initMap(){
//     // creating a new google map
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: {lat: 52.420112, lng: 10.790285},
//         zoom: 4
//     });


//     // setting the marker-style for highlighting the marker, when we hover over the marker and hover out
//     var defaultIcon = makeMarkerIcon("1C407A");
//     var highlightedIcon = makeMarkerIcon("5782C6");





//     //creating a new Variable with the function, that creates infowindows
//     var infowindow = new google.maps.InfoWindow();

//     // collecting the informationen from var locations to set the markers

//     for (var i=0; i<cities.length; i++) {

//         var position = cities[i].location;
//         var title = cities[i].city;
//         var population = cities[i].population;
//         // creating a marker for each locations-element
//         var marker = new google.maps.Marker({
//             position: position,
//             map: map,
//             title: title,
//             population: population,
//             animation: google.maps.Animation.DROP,
//             icon: defaultIcon,
//             id: i

//         });

//         // now pushing the marker into the markers array
//         markers.push(marker);

//         // creating an click-Event for every marker
//         // on click, the infoWindow will be opend with the
//         // populateInfowindow-Function
//         marker.addListener ("click", function(){
//             //wir übergeben mit this den einzelnen Marker und mit
//             // Infowindow die Variable mit der Funktion zur Schaffung
//             // eines Infowindows
//             populateInfowindow(this, infowindow);
//         });

//         // Mousehover-Eventhandler - when Mouse is over marker, change the style
//         // of the marker to highlighted
//         // marker.addListener("mouseover", function(){

//         //     this.setIcon(highlightedIcon);
//         //     populateInfowindowHover(this, infowindow);
//         // });
//         // //Mouseout-Eventhandler
//         // marker.addListener ("mouseout", function(){
//         //     this.setIcon(defaultIcon);
//         // });





//     }       // End of the for-loop

//     // function for creating the Markers. Function is called in the
//     // for-Loop which is iterating over the locations-array
//     function makeMarkerIcon(color){
//         var markerImage = new google.maps.MarkerImage(
//           "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|"+ color +
//           "|40|_|%E2%80%A2",
//             new google.maps.Size(21, 34),
//             new google.maps.Point(0, 0),
//             new google.maps.Point(10, 34),
//             new google.maps.Size(21,34));
//         return markerImage;
//     }



//     // function to create the Infowindow
//     // function is called in the for-loop iterating over the
//     // locations-array
//     function populateInfowindow(marker, infowindow){
//         //first checking if the window of the choosen marker is allready open
//         // if not, run the function
//         if (infowindow.marker != marker){
//             //hier schaffen wir den key marker und
//             //belegen ihn mit dem Wert marker
//             infowindow.marker = marker;
//             //Jetzt fülle ich das infowindow mit Text
//             infowindow.setContent ("<div>" + marker.title + "</div><br><div>"+marker.population+"</div>");
//             //dann öffne ich das Infowindow des Markers in der Map
//             infowindow.open(map, marker);
//             // dann setzen wir noch eine Closeclick-Function, um das
//             //Infowindow zu schließen. Das geht glaube ich auch ohne.
//             // infowindow.addListener("closeclick", function(){
//             //     console.log("closeklick pressed");
//             //     infowindow.marker = null;
//             // });
//         }

//     }

//     function populateInfowindowHover(marker, infowindow){
//         if (infowindow.marker != marker){
//             //hier schaffen wir den key marker und
//             //belegen ihn mit dem Wert marker
//             infowindow.marker = marker;
//             //Jetzt fülle ich das infowindow mit Text
//             infowindow.setContent ("<div>" + marker.title + "</div>");
//             //dann öffne ich das Infowindow des Markers in der Map
//             infowindow.open(map, marker);
//             // dann setzen wir noch eine Closeclick-Function, um das
//             //Infowindow zu schließen. Das geht glaube ich auch ohne.
//             infowindow.addListener("mouseout", function(){
//                 infowindow.marker = null;
//             });
//         }



//     }

//     // // SEARCHBOX
//     // // Creating the searchbox-functions
//     // // First we have to grab the input-form
//     // // Hier können wir mehr Optionen eingebauen
//     // // zum Beispiel: bounce, gibt an, in welchen Teilen der Daten
//     // // gesucht werden soll.
//     // var searchBox = new google.maps.places.SearchBox(
//     //     document.getElementById("searchPlaces"));
//     // searchBox.setBounds(map.getBounds());

//     // // two Eventlistener for choosing one place out of the list or to type one in yourself an press ok.

//     // searchBox.addListener("places_changed", function(){
//     //     searchBoxPlaces(this);
//     //     console.log ("Place choosen");
//     // });

//     // document.getElementById("go-places").addEventListener("click", textSearchPlaces);

//     //function for hiding all markers
//     function hideMarkers(markers){
//         for (var i=0; i<markers.length; i++){
//             markers[i].setMap(null);
//         }
//     }

//     // function that is invoked, if user clicks on place of the list

//     function searchBoxPlaces(searchBox){
//         hideMarkers(placeMarkers);
//         var places = searchBox.getPlaces();
//         createMarkersForPlaces(places);
//         if (places.lenght ==0){
//             console.log("No Place found");
//         }
//     }

//     // function that is invoked, when user press the Go-Button
//     function textSearchPlaces(){

//         var bounds = map.getBounds();
//         hideMarkers(placeMarkers);
//         var placesService = new google.maps.places.PlacesService(map);
//         placesService.textSearch({
//             query: document.getElementById("searchPlaces").value,
//             bounds: bounds
//         }, function(results, status) {
//             if (status===google.maps.places.PlacesServiceStatus.OK) {
//                 createMarkersForPlaces(results);
//             }
//         });
//     }

//     //Function that creates the marker
//     function createMarkersForPlaces(places){
//         var bounds = new google.maps.LatLngBounds();
//         for (var i=0; i<places.length; i++) {
//             var place = places[i];
//             var icon = {
//                 url: place.icon,
//                 size: new google.maps.Size(35,35),
//                 origin: new google.maps.Point(0,0),
//                 anchor: new google.maps.Point(15,34),
//                 scaledSize: new google.maps.Size(25,25)
//             };

// // Create a marker for each place

//             var marker = new google.maps.Marker({
//                 map: map,
//                 icon: icon,
//                 title: place.name,
//                 position: place.geometry.location,
//                 id: place.id
//             });

//             placeMarkers.push(marker);
//             if (place.geometry.viewport){
//                 bounds.union(place.geometry.viewport);
//             }else{
//                 bounds.extend(place.geopmetry.location);
//             }
//         }
//     }






//   //  map.fitBounds(bounds);
// }






// // Burger Menu

// var menu = document.getElementById("menu");
// var drawer = document.getElementById("drawer");
// var main = document.getElementById("map");

// // VIEW
// menu.addEventListener("click", function(e){
//     console.log(e);
//     menu.classList.toggle("hidden");
//     drawer.classList.toggle("open");
//     mapShow=true;
//     e.stopPropagation();
// });

// main.addEventListener("click", function(){
//     console.log("Main is clicked");
//     if (mapShow===true) {
//         drawer.classList.remove("open");
//         menu.classList.remove("hidden");
//     }
// });
