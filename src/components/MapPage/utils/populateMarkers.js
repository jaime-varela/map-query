import { iconURLArray, iconURLS } from '../constants'

export default (map,poiArray) => {
    if(map == null || poiArray == null) return {};
    let dummyVal = poiArray[0];
    if(dummyVal.length == 0) return {};
    let firstEntry = dummyVal[0];
    if(firstEntry == null || Object.keys(firstEntry).length == 0) return {};
    // create red POI markers
    let resultMap = {};//final result map
    let poiMap = {};
    for (let poiIndex = 0; poiIndex < poiArray.length; poiIndex++) {
        let poiVal = poiArray[poiIndex];
        for (let poiInd = 0; poiInd < poiVal.length; poiInd++) {
            let poi = poiVal[poiInd];
            let pid = poi.place_id;
            let location = poi.geometry.location;
            //we do not double populate markers
            if(resultMap[pid]) {continue;}
            let marker = new window.google.maps.Marker({
                position: location,
                map,
                icon: {url: iconURLArray[poiIndex]},
                title: poi.name,
                name: poi.place_id,
            });
            resultMap[pid] = marker;        
            poiMap[pid] = poi;
        }                
    }
    return {makerMap: resultMap, poiMap: poiMap};
}