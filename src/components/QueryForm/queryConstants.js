
export const placeHolder = {
    poiPlaceHolders : ["bookstores","coffee shops","restaurants","stores","libraries"],
    defaultNumberOfPoi : 2,
    distanceNum: 1,
};

// TODO: generate unique id's as a function of timestamp to avoid name clashes
export const formIDS = {
    poiIds : ["formControlPOI1","formControlPOI2","formControlPOI3","formControlPOI4","formControlPOI5"],
    distanceNumber: "formControlDistanceNumber",
    distanceCase: "formControlDistanceCase",
};

export const maxPOIs = 5;

export const imageUrls = {
    distanceToggleDown: process.env.PUBLIC_URL + "/images/circle-down.png",
    distanceToggleUp: process.env.PUBLIC_URL + "/images/circle-up.png"
}