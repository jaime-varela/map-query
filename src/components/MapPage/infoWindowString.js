import React from 'react'
import { renderToString } from "react-dom/server";

export default poi => {
    if(poi == null) return '<div></div>';
    return renderToString(
        <div>
          <div id={`infoWindow${poi.place_id}`}>
            <h3>{poi.name}</h3>
            <div>{poi.formatted_address}</div>
          </div>
      </div>    
    );
}