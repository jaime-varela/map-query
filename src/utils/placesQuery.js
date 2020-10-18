
export const placeQuery = async (maps,map,queryText,radius,location) => {
  if(queryText == "") return new Promise((resolve,reject) => {resolve([])});
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
      if (status === places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      }
      //TODO reject error handling
      resolve([]);
    });
  })    
}