import React from 'react'
import { renderToString } from "react-dom/server";

export default poi => {
    if(poi == null) return '<div></div>';
    return renderToString(
        <div className="infoWindowContainer">
          <div className="infoWindowHeader" id={`infoWindow${poi.place_id}`}>
            <h3>{poi.name}</h3>
          </div>
          {poi.photos? <img className="infoWindowImage" src={poi.photos[0].getUrl()}></img> : <div></div>}
          <div className="infoWindowAddress">{poi.formatted_address}</div>
      </div>    
    );
}