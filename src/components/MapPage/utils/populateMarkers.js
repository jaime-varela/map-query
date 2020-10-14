import { iconURLS } from '../constants'

export default (map,poi1,poi2) => {
    if(map == null || (poi1 == null && poi2 == null)) return {};
    // create red POI markers
    let resultMap = {};//final result map
    if(poi1){
        for (let poiInd = 0; poiInd < poi1.length; poiInd++) {
            let poi = poi1[poiInd];
            let pid = poi.place_id;
            let location = poi.geometry.location;
            //we do not double populate markers
            if(resultMap[pid]) {continue;}
            let marker = new window.google.maps.Marker({
                position: location,
                map,
                icon: {url: iconURLS.redIcon},
                title: poi.name,
                name: poi.place_id,
            });
            resultMap[pid] = marker;        
        }
    }
    if(poi2){
        for (let poiInd = 0; poiInd < poi2.length; poiInd++) {
            let poi = poi2[poiInd];
            let pid = poi.place_id;
            //we do not double populate markers
            if(resultMap[pid]) {continue;}
            let marker2 = new window.google.maps.Marker({
                position: poi.geometry.location,
                map,
                icon: {url: iconURLS.blueIcon},
                title: poi.name,
                name: pid,
            });
            resultMap[pid] = marker2;        
        }
    }

    return resultMap;
}