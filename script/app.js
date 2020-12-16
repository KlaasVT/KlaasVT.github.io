var mymap = L.map('mapid').setView([0,0], 2);
var myLayer = L.geoJSON().addTo(mymap);

function initializeMap(){
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        accessToken: 'pk.eyJ1Ijoia2xhYXN2dCIsImEiOiJja2lya3huODkwcWszMnJyeDYxOGoybXJoIn0.uxm91QeO14zNKOljvA5BOw'
    }).addTo(mymap);
}

const showData = function(jsonObject){
    myLayer.clearLayers();    
    jsonObject.events.forEach(event => {
        var geojsonFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [event.geometries[event.geometries.length-1].coordinates[0],event.geometries[event.geometries.length-1].coordinates[1]]
            }
        };
        var marker = L.geoJSON(geojsonFeature).addTo(myLayer);
        marker.bindPopup(event.title);
        marker.on('click', function(){
            showDetails(event);
        });
    });
};

const showDetails = function(event){
    let div = document.querySelector(".js-visibility");
    div.classList.remove("is-invisible");
    div.classList.remove("fade-in");
    div.classList.add("fade-in");
    div.innerHTML = `<h4>Name of this event: ${event.title}</h4><p>This event was of the type: ${event.categories[0].title}</p><p>Date of this event ${event.geometries[event.geometries.length-1].date.substring(0,10)}</p>`
};

const showInfo = function(jsonObject){

}

const listenToDropDownChange = function(){
    const dropdown = document.querySelector(".js-dropdown");
    dropdown.addEventListener("change", function(){
        getData(dropdown.value);
    })
    
};

const getData = function(days){
    handleData("https://cors-anywhere.herokuapp.com/https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?days="+days, showData);
};


document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    // handleFloatingLabel();
    // handlePasswordSwitcher();
    initializeMap();
    getData(7);
    listenToDropDownChange();
});