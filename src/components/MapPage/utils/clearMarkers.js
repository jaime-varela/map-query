export default (markerMap) => {
    if(markerMap == {}) {return;}    
    for(const [key, marker] of Object.entries(markerMap)) {
        console.log(marker.title);
        marker.setMap(null);
    }
}