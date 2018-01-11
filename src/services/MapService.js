import mapUtils from '../utils/mapUtils';

const google = window.google;

function updatePolyline() {
    this.polyline && this.polyline.setMap(null);
    this.polyline = mapUtils.getPolyline(this.dots); // TODO: think about update line here or throught render AppScene by OnDrag?
    this.polyline.setMap(this.map);
}

function initMarker(marker) {

    const contentString = `<div class="infowindow"><p>${marker.title}</p></div>`;

    google.maps.event.addListener(marker, 'click', () => {
        this.infoWindow.setContent(contentString);
        this.infoWindow.open(this.map, marker);
    });

    google.maps.event.addListener(marker, 'dragend', (event) => {
        const dot = marker.getPosition();
        const position = {
            lng: dot.lng(),
            lat: dot.lat(),
        };
        this.onMarkerDrag && this.onMarkerDrag(marker.uuid, position);
        updatePolyline.call(this, this.dots); //update lines after drag marker
    });
}


function addMarkers(dotsForAdd) {
    const markers = mapUtils.addMarkers(this.map, dotsForAdd);
    for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        initMarker.call(this, marker);
        this.markers.push(marker);
    }
}

function removeMarkers(markersForRemove) {
    mapUtils.removeMarkers(this.map, markersForRemove);
    for (let i = 0; i < markersForRemove.length; i++) {
        const delMarker = markersForRemove[i];
        this.markers = this.markers.filter(el => el.uuid !== delMarker.uuid);
    }
}


export default class GoogleMap {
    constructor(container, center, onDrag) {
        this.map = this.initMap(center, container);
        this.markers = [];
        this.dots = [];
        this.polyline = null;
        this.infoWindow = new google.maps.InfoWindow();
        this.onMarkerDrag = onDrag;
    }

    initMap(center, container) {
        const centerLocation = new google.maps.LatLng(center.lat, center.lng);
        const mapOptions = {
            zoom: 8,
            center: centerLocation,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        const map = new google.maps.Map(container, mapOptions);
        google.maps.event.addListener(map, 'click', () => {
            this.infoWindow.close();
        });
        return map;
    }

    setCenter(center) {
        const newCenter = new google.maps.LatLng(center.lat, center.lng);
        this.map.setCenter(newCenter);
    }

    updateMap(dots) {
        this.dots = dots;
        const {dotsForAdd, markersForRemove} = mapUtils.getDotsDifference(dots, this.markers);

        removeMarkers.call(this, markersForRemove);

        addMarkers.call(this, dotsForAdd);

        updatePolyline.call(this);
    }
};
