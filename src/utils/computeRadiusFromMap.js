import distanceBetweenGpsCoords from './distanceBetweenGpsCoords'

export default (map) => {
    let bounds = map.getBounds();
    let NECorner = bounds.getNorthEast();
    let NECornerLtLng = new window.google.maps.LatLng(NECorner.lat(),NECorner.lng());
    let SWCorner = bounds.getSouthWest();
    let SWCornerLtLng = new window.google.maps.LatLng(SWCorner.lat(),SWCorner.lng()); 
    let diameter = distanceBetweenGpsCoords(SWCornerLtLng,NECornerLtLng);
    return diameter/2.0;
}