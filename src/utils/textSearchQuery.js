export const textQuery = async (map,request) => {
    const places = window.google.maps.places;
    var service = new places.PlacesService(map);
    // move this to a new file or whatever  

    return new Promise((resolve,reject) => {
        service.textSearch(request, function(results, status) {
        if (status === places.PlacesServiceStatus.OK) {
          resolve(results);
        }
        if (status === places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
        }
        //TODO reject error handling
        resolve([]);
      });
    })
  
}