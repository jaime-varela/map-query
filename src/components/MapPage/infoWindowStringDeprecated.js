import React from 'react'
import { renderToString } from "react-dom/server";

export default async (poi,service) => {
    if(poi == null) return '<div></div>';    
    let request = {
      placeId: poi.place_id,
      fields: ['rating', 'formatted_phone_number','website','opening_hours']      
    }
    let details = await (new Promise((resolve,reject) => {
      service.getDetails(request,(place,status) => {
        if(status == window.google.maps.places.PlacesServiceStatus.OK){
          resolve(place);
        }
        resolve(null);
      })
    }));
    // console.log(details);
    return renderToString(
        <div className="infoWindowContainer">
          <div className="infoWindowHeader" id={`infoWindow${poi.place_id}`}>
            {(details && details.website)? <a className="infoWindowHeaderLink" href={details.website} target="_blank"><h3>{poi.name}</h3></a>
            : <h3>{poi.name}</h3>}
          </div>
          {poi.photos? <img className="infoWindowImage" src={poi.photos[0].getUrl()}></img> : <div></div>}
          {(details && details.formatted_phone_number)? 
          <div className="infoWindowPhone"><a href={`tel:${details.formatted_phone_number}`}>{details.formatted_phone_number}</a> </div>
        : <div className="infoWindowPhone"></div>}
          <div className="infoWindowAddress">{poi.formatted_address}</div>
      </div>
    );
}