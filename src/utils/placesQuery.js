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

*/
import axios from 'axios';
import secrets from '../secrets'
import { placesAPI } from '../constants'

export const placeQuery = async (queryText,radius,location) => {
  //latitude,longitude for the query.
  const queryString = placesAPI.url + placesAPI.textSearchEndPoint + 
    "?query=" + queryText+ 
    "&location=" +location.lat +","+ location.lon + "&radius=" + radius +
    "&key=" + secrets.googleMapApiKey;
    const response = await axios.get(queryString);
    const data = await response.json();
    console.log(data);
    return data;
}