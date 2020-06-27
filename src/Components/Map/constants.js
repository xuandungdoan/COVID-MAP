import L from "leaflet";
import icon2 from "./icons/run.svg";
const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: icon2,
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  tooltipAnchor: [0, -41],
});

export default icon;
