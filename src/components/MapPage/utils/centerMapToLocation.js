export default (map) => 
{
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
        },
        () => {
            //TODO: handle bad current position request
        }
      );
    } else {
        // TODO: handle restrictions error
    }

}