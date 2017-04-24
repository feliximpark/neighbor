neighbor

# The Euro-City-Finder
## A project for the Udacity-Nanodegree Front-End-Developer

----------

Welcome to my Euro-City-Finder. You´ll find a working version under https://feliximpark.github.io/neighbor.

-------

##1. App-Content

In this app, you´ll find the biggest cities in Europe with more than 500000 inhabitants (based on statistics of the European Union). You can choose one city on the map or the implemented searchfunction.

After you choose a city, the map will zoom onto that place. On the right of the viewport you find a small handler with the text "more city-infos". If you klick it, an infowindow pops out an shows the latest New-York-Times-Articles and some Wikipedia-Articles about the choosen city.
-----------

##2. The city-search (left navigation-menu)

If you hit the burger-menu-sign in the left upper corner, the search-menu will pop up. There you find a list of all the 100 cities (it´s scrollable).

You have three possibilities to choose your city: 1. Just type in a name, the search-engine will automaticly filter the city-names and will only show those cities, in which names the entered combination of letters exist. If you hit the enter-key or press the OK-Button, the first result of the search is choosen. 2. You can click on a list-entry to choose your city. 3. You can click on a marker on the map to choose a city.
---------

##3. City-Zoom

When you choose your city, the map will automaticly center on this city. Also the app will zoom in and will show you the center of your choosen city.
---------

##4. City-Information

When you choose a city, the app will start two AJAX-calls. The answer of the first call is a list of New-York-Times-Articles. The app will look for the ten latest articles. The answer for the second call involves a list of the ten most important wikipedia-articles.
You can find those results by clicking the small blue handler on the right of the screen (the handler with the words "more city-infos"). An infowindow will pop up. There you find the articles. Press on an entry to open the article on the NYT- oder wikipedia-homepage. To close the menu, just click again on the small blue handler.
-------

## 5. Troubleshooting

In case the googlemaps-API is not delivering the map, an alert-Window will pop up and inform you, that you have to check your connection and to try again.

In case the Wikipedia- or NYT-API is not working correctly, you will find an information in the article-window, where normally the results would be displayed (in the right menu).
-------

## Credits

####The Burger-Menu-Icon#### is inspired by a work of Jesse Couch, https://codepen.io/designcouch/pen/Atyop.

####The search-engine#### is inspired by code written by brandon Keepers, http://opensoul.org/2011/06/23/live-search-with-knockoutjs/