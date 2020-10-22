import { textQuery } from "./textSearchQuery";

export const placeQuery = async (maps,map,queryText,radius,location) => {
  if(queryText == "") return new Promise((resolve,reject) => {resolve([])});
  var request = {
    query: queryText,
    location: location,
    radius: radius,
    fields: ['name', 'geometry','business_status','formatted_address','placeId'],
  };// Photos may be useful
  return await textQuery(map,request);
}