/*
    You'll need to do something with promises

    but probably better to use:
    https://javascript.info/async-await

  // use the get request API call https://developers.google.com/places/web-service/search
    TODO: get google places API key

    I really should consider redux but the following states probably need to be added:

      1. radius (needed for the places query but depend on the map bounds)


      stupid VSCode and you for believing it

      https://stackoverflow.com/questions/63931230/is-react-superprops-deprecated

      https://reactjs.org/docs/faq-functions.html
  // Call back to be passed into the form to update the state


  https://developers.google.com/maps/documentation/javascript/places#maps_place_search_pagination-typescript
*/
import axios from 'axios';
import secrets from '../secrets'
import { placesAPI } from '../constants'

export const placeQuery = async (maps,map,queryText,radius,location) => {
  var request = {
    query: queryText,
    fields: ['name', 'geometry','business_status','formatted_address'],
  };// Photos may be useful
  console.log(maps);
  const places = window.google.maps.places;
  var service = new places.PlacesService(map);

  return new Promise((resolve,reject) => {
      service.findPlaceFromQuery(request, function(results, status) {
      if (status === places.PlacesServiceStatus.OK) {
        resolve(results);
      }
      //TODO reject error handling
    });
  })    
}