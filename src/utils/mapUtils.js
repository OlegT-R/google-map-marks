const google = window.google;

const defaultPosition = {
    lng: 0,
    lat: 0,
};

function getDotsDifference(dots, markers) {
    let dotsForAdd = [...dots];
    let markersForRemove = [...markers];
    for (let i = 0; i < markers.length; i++) { //remove crossing elements and get new and removed items
        const marker = markers[i];
        const item = dots.find((el => el.uuid === marker.uuid));
        if (item) {
            dotsForAdd = dotsForAdd.filter((el) => el.uuid !== item.uuid);
            markersForRemove = markersForRemove.filter((el) => el.uuid !== item.uuid);
        }
    }
    return {dotsForAdd, markersForRemove}
}

function matchCenterToDefault(map) {
    const center = map.getCenter();
    return center.lng() === defaultPosition.lng && center.lat() === defaultPosition.lat;
}

function getPolyline(dots) {
    const flightPlanCoordinates = [];
    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        flightPlanCoordinates.push({lat: dot.lat, lng: dot.lng});
    }
    const newPolyline = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#3009ff',
        strokeOpacity: 0.8,
        strokeWeight: 1
    });
    return newPolyline;
}

function updateMapCenter(map, center, dots) {
    if ((matchCenterToDefault(map) && dots.length) || (center !== defaultPosition)) { // if default center and has first dot or we have new center
        const newCenterDot = center !== defaultPosition ? center : dots[0];
        const newCenter = new google.maps.LatLng(newCenterDot.lat, newCenterDot.lng);
        map.setCenter(newCenter);
    }
}


function addMarkers(map, dots,) {
    const markers = [];
    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let center;
        if (dot.lat === defaultPosition.lat && dot.lng === defaultPosition.lng) {
            center = map.getCenter();
            dot.lat = center.lat();
            dot.lng = center.lng();
        } else {
            center = new google.maps.LatLng(dot.lat, dot.lng);
        }

        const marker = new google.maps.Marker({
            position: center,
            draggable: true,
            animation: google.maps.Animation.DROP,
            map: map,
            title: dot.name,
        });
        marker.uuid = dot.uuid;
        markers.push(marker);
    }
    return markers;
}

function removeMarkers(map, markers) {
    for (let i = 0; i < markers.length; i++) {
        let marker = markers[i];
        marker.setMap(null);
        marker = null;
    }
}


export default {
    defaultPosition,
    removeMarkers,
    addMarkers,
    updateMapCenter,
    getPolyline,
    getDotsDifference
}
