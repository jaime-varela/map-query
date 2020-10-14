export default (markerMap) => {
    if(markerMap == {}) {return;}    
    for(const [key, marker] of Object.entries(markerMap)) {
        marker.setMap(null);
    }
}