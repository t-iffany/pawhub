const googleAPIKey = "AIzaSyDRii-QG1bSXUWEz7bypIOSrFS7y68PDtM";
const libraries = ["places"];
const closeOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 3,
  fillOpacity: 0.0625,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const radius = 5 * 1000;
const defaultLat = 49.232332;
const defaultLng = -123.116773;

const homeIcon = "http://maps.google.com/mapfiles/kml/pal3/icon56.png";
const petStoreIcon = "http://maps.google.com/mapfiles/kml/pal3/icon26.png";
const vetIcon = "http://maps.google.com/mapfiles/kml/pal3/icon46.png";

const getUrl = (lat, lng, radius, placeType) => `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${placeType}&key=${googleAPIKey}`;



export {
  googleAPIKey,
  libraries,
  closeOptions,
  radius,
  defaultLat,
  defaultLng,
  getUrl,
  petStoreIcon,
  vetIcon,
  homeIcon
}

