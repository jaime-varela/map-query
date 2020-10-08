import React from 'react'
import { renderToString } from "react-dom/server";
import Card from 'react-bootstrap/Card'
import { infoWinClassNames } from './constants'

export default async (poi,service) => {
    if(poi == null) return '<div></div>';    
    // console.log(poi);
    // console.log(poi.opening_hours.open_now);
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
      <Card style={{ width: '18rem' }}>
        {poi.photos? <Card.Img variant="top" src={poi.photos[0].getUrl()} /> : <div></div>}
        <Card.Body>
          <Card.Title>{(details && details.website)? <a className="infoWindowHeaderLink" href={details.website} target="_blank"><h3>{poi.name}</h3></a>
            : <h3>{poi.name}</h3>}
          </Card.Title>
          <button type="button" class={infoWinClassNames.hoursCollapsible}>Open Collapsible</button>
          <div class={infoWinClassNames.hoursContent}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <Card.Text>
            {(details && details.formatted_phone_number)? 
            <div className="infoWindowPhone"><a href={`tel:${details.formatted_phone_number}`}>{details.formatted_phone_number}</a> </div>
          : <div className="infoWindowPhone"></div>}
            <div className="infoWindowAddress">{poi.formatted_address}</div>          </Card.Text>
        </Card.Body>
      </Card>
   );
}