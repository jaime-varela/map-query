import infoWindowString from '../infoWindowString'
import handleInfoWindowEvents from '../handleInfoWindowEvents'
import { iconURLS } from '../constants'

export default async (map, markerMap, poiMap, adjacencyList,service) => {
    if(markerMap == null) {return;};
    for(const [key, marker] of Object.entries(markerMap)) {

        let placeId = marker.name;
        let infowindow = new window.google.maps.InfoWindow();
        marker.addListener("click", async () => {
            let poi = poiMap[key];
            const contentString = await infoWindowString(poi, service);
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
            /*
              Event handlers of info window childs must be handled only when they are domready.
            */
           window.google.maps.event.addListener(infowindow, "domready", () => {
            handleInfoWindowEvents(placeId);
          });    

        });

        // Green on hover icons
        marker.addListener("mouseover", () => {
            if(adjacencyList == null) {return;}
            let pid = marker.name;
            let adjacentMakers = adjacencyList[pid];
            if(adjacentMakers == null) {return;}
            if(adjacentMakers.length == 0) {return;}
            adjacentMakers.map(markerID => {
                markerMap[markerID].setIcon({url: iconURLS.greenIcon});
            });        
        });

        // restore icons when off hover
        marker.addListener("mouseout", () => {
            if(adjacencyList == null) {return;}
            let pid = marker.name;
            let originatingColorUrl = marker.icon.url;
            let originalColor = (originatingColorUrl === iconURLS.redIcon)? iconURLS.blueIcon : iconURLS.redIcon        
            let adjacentMakers = adjacencyList[pid];
            if(adjacentMakers == null) {return;}
            if(adjacentMakers.length == 0) {return;}
            adjacentMakers.map(markerID => {
                markerMap[markerID].setIcon({url: originalColor});
            });        
        });

        
    }
}