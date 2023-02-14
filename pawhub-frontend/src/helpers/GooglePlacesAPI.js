import API_KEY from "../components/api_keys";

const mapId = "30817c9c0541d59e";
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

const defaultLat = 49.232332;
const defaultLng = -123.116773;

const homeIcon = "https://img.icons8.com/ios/35/null/puppy.png";
const petStoreIcon = "https://img.icons8.com/ios/35/000000/shopaholic.png";
const vetIcon = "https://img.icons8.com/ios/35/000000/dog-paw-print.png";

const getUrl = (lat, lng, radius, placeType) => `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${placeType}&key=${API_KEY.googleAPIKey}`;



export {
  libraries,
  closeOptions,
  defaultLat,
  defaultLng,
  getUrl,
  petStoreIcon,
  vetIcon,
  homeIcon,
  mapId
}

