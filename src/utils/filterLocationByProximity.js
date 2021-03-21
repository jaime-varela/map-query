/*
    Filter two point of interest set by their distance case.  A point will be in the set
    only if there is a corresponding point of interest in the other set whose distance is 
    below the threshold

    Returns a JS object of the form
    {
        filteredPOI1: [...],
        filteredPOI2: [...],
        adjacencyList: {id: [...]}
    }

    will return the full set of points if the case or distance is null.

    It may be a good idea to return a proximity map along with the filtered results.  TO check.
*/
import { cases } from '../constants'
import distanceBetweenGpsCoords from './distanceBetweenGpsCoords'

// conversion map which takes the form element to the distance in meters
export const caseConversionMap = (aCase) => {
    if(aCase == cases.MINUTES_WALKING)
    { 
        return 84.0; // avg human walking speed = 1.4 m/s ==> 1.4 (m/s) * 60 (s/min) * (Minutes walking) = distance
    }
    else if(aCase == cases.MINUTES_DRIVING){
        return 0;//TODO implement driving time
    }
    return 0;
}


export default (POI1, POI2 ,distance, aCase) => {
    // the distance in meters
    const distNum = caseConversionMap(aCase)*Number(distance);
    // return the full set if the distance or case is null
    if(distNum == 0 || aCase == null) {
        return {filteredPOI1: POI1, filteredPOI2: POI2};
    }
    // if one POI is empty then nothing is near the other
    if(POI1 == null || POI2 == null) {
        return {filteredPOI1: [], filteredPOI2: []};
    }
    if(POI1.length == 0 || POI2.length == 0) {
        return {filteredPOI1: [], filteredPOI2: []};
    }
    // visitor array
    let hasPOI2ElementBeenAdded = [];
    for (let poi2Ind = 0; poi2Ind < POI2.length; poi2Ind++) {
        hasPOI2ElementBeenAdded.push(false);
    }
    // Naive implementation for now
    let filteredPoints1 = [];
    let filteredPoints2 = [];
    let adjacencyList ={};

    for (let poi1Ind = 0; poi1Ind < POI1.length; poi1Ind++) {
        for (let poi2Ind = 0; poi2Ind < POI2.length; poi2Ind++) {
            let poi1 = POI1[poi1Ind];
            let poi2 = POI2[poi2Ind];
            if(distanceBetweenGpsCoords(poi1.geometry.location,poi2.geometry.location) < distNum)
            {
                filteredPoints1.push(poi1);
                if(adjacencyList[poi1.place_id]) {
                    adjacencyList[poi1.place_id].push(poi2.place_id);
                }
                else {
                    adjacencyList[poi1.place_id] = [poi2.place_id];
                }

                if(adjacencyList[poi2.place_id]) {
                    adjacencyList[poi2.place_id].push(poi1.place_id);
                }
                else {
                    adjacencyList[poi2.place_id] = [poi1.place_id];
                }

                // only add poi2 if it has not been added
                if(!hasPOI2ElementBeenAdded[poi2Ind])
                {
                    filteredPoints2.push(poi2);
                    hasPOI2ElementBeenAdded[poi2Ind] = true;
                }

            }
        }
        
    }

    return {filteredPOI1: filteredPoints1, filteredPOI2: filteredPoints2, adjacencyList: adjacencyList};
}