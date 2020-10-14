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
          var ipRequest = new XMLHttpRequest();
          ipRequest.open('GET', 'https://freegeoip.app/json/');
          ipRequest.setRequestHeader('Accept', 'application/json');
          ipRequest.onreadystatechange = () => {
            let data = {};
            if (ipRequest.readyState === 4) {
              data = JSON.parse(ipRequest.responseText);
              map.setCenter({lat: data.latitude,
                 lng: data.longitude,
              });
            }
          };
          ipRequest.send();
    });
   } else {
    console.log("Geolocation services are not supported by your web browser.");
    }

}