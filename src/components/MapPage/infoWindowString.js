import React from 'react'
import { renderToString } from "react-dom/server";
import Card from 'react-bootstrap/Card'
import { infoWinClassNames } from './constants'

export default async (poi,service) => {
    if(poi == null) return '<div></div>';    

    let request = {
      placeId: poi.place_id,
      fields: ['rating', 'formatted_phone_number','website','opening_hours','utc_offset_minutes']      
    }
    let isOpen = false;
    let details = await (new Promise((resolve,reject) => {
      service.getDetails(request,(place,status) => {
        if(status == window.google.maps.places.PlacesServiceStatus.OK){
          isOpen = place.opening_hours.isOpen();
          resolve(place);
        }
        resolve(null);
      })
    }));
    let dateVal = new Date();
    let dayOfWeek = dateVal.getDay();
    let googleDaysOfWeek = [];
    let currentDay = "";
    let shiftedDayArray = [];
    if(details.opening_hours)
    {
      googleDaysOfWeek = details.opening_hours.weekday_text;
      currentDay = googleDaysOfWeek[(dayOfWeek + 6) % 7 ];
      // shifted array so current day is zero
      for (let index = 0; index < googleDaysOfWeek.length; index++) {
        shiftedDayArray[index] = googleDaysOfWeek[(dayOfWeek + 6 + index) % 7];      
      }
      // delete the current day
      delete shiftedDayArray[0];
      console.log(details);
      isOpen = details.opening_hours.open_now;  
    }

    return renderToString(
      <Card style={{ width: '18rem' }}>
        {poi.photos? <Card.Img variant="top" src={poi.photos[0].getUrl()} /> : <div></div>}
        <Card.Body>
          <Card.Title>{(details && details.website)? <a className="infoWindowHeaderLink" href={details.website} target="_blank"><h3>{poi.name}</h3></a>
            : <h3>{poi.name}</h3>}
          </Card.Title>
          <button type="button" id={"infoWindowCollapsible" + poi.place_id}class={infoWinClassNames.hoursCollapsible}>{currentDay? currentDay :
          "Hours not avaialble"
          }</button>
          <div class={infoWinClassNames.hoursContent}>
            <div></div>
            {shiftedDayArray? shiftedDayArray.map( day =>{
              return (<p>{day}</p>);
            }): <div></div>}
          </div>
          <div class={infoWinClassNames.OpenClosedInfo}>
            {isOpen? <p style={{color:"green"}}><strong>open now</strong></p>:<p style={{color:"red"}}><strong>closed or no info</strong></p>}
          </div>
          <Card.Text>
            {(details && details.formatted_phone_number)? 
            <div className="infoWindowPhone"><a href={`tel:${details.formatted_phone_number}`}>{details.formatted_phone_number}</a> </div>
          : <div className="infoWindowPhone"></div>}
            <div className="infoWindowAddress">{poi.formatted_address}</div>          
          </Card.Text>
        </Card.Body>
      </Card>
   );
}