/**
 * Created by asdsda on 16.6.12.
 */
var citymap = {
    kaunas: {
        center: {lat: 54.8985, lng: 23.9036},
        population: 308831
    },
    vilnius: {
        center: {lat: 54.6872, lng: 25.2797},
        population: 535216
    },
    klaipeda: {
        center: {lat: 55.7033, lng: 21.1443},
        population: 159342
    },
    siauliai: {
        center: {lat: 55.9349, lng: 23.3137},
        population: 107080
    }
};


function initialize() {
    var mapProp = {
        center:new google.maps.LatLng(55.1694,23.8813),
        zoom:7,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var map=new google.maps.Map(document.getElementById("map"),mapProp);

    for (var city in citymap) {
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: citymap[city].center,
            radius: Math.sqrt(citymap[city].population) * 25
        });
    }
}

google.maps.event.addDomListener(window, 'load', initialize);