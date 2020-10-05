export default (targetLocation, myLocation) => {
    // return undefined if we are missing either coordinate
    if (!targetLocation || !myLocation) {
      return undefined;
    }
  
    // haversine formula is used
    // https://www.movable-type.co.uk/scripts/latlong.html
    const degreesToRadians = degrees => (degrees * Math.PI) / 180;
    const RADIUS_OF_EARTH = 6371000;
    // convert degrees to radians
    const latTargetLocation = degreesToRadians(targetLocation.lat());
    const latMyLocation = degreesToRadians(myLocation.lat());
  
    // calculate changes in latitude and longitude
    const changeInLat = degreesToRadians(
      myLocation.lat() - targetLocation.lat()
    );
  
    const changeInLong = degreesToRadians(
      myLocation.lng() - targetLocation.lng()
    );
  
    // a is the square of half the chord length between the points
    const a =
      Math.sin(changeInLat / 2) ** 2 +
      Math.cos(latTargetLocation) *
        Math.cos(latMyLocation) *
        Math.sin(changeInLong / 2) ** 2;
  
    // c is angular distance in radians
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInMeters = RADIUS_OF_EARTH * c;
  
    return distanceInMeters;
  };
  