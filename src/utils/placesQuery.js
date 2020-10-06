
export const placeQuery = async (maps,map,queryText,radius,location) => {
  var request = {
    query: queryText,
    location: location,
    radius: radius,
    fields: ['name', 'geometry','business_status','formatted_address','placeId'],
  };// Photos may be useful
  const places = window.google.maps.places;
  var service = new places.PlacesService(map);

  return new Promise((resolve,reject) => {
      service.textSearch(request, function(results, status) {
      if (status === places.PlacesServiceStatus.OK) {
        resolve(results);
      }
      //TODO reject error handling
    });
  })    
}