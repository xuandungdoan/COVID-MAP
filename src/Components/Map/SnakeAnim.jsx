import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useLeaflet } from "react-leaflet";
import L from "leaflet";
import * as actions from "../../store/actions";

import "leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js";
import icon from "./constants";
const SnakeAnim = ({ startAnimation, dataLine }) => {
  const { map } = useLeaflet();
  const oldRoute = useSelector((state) => state.MapPage);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!startAnimation) return;

    if (!dataLine) {
      console.log("khong ton tai data");
      return;
    }
    if (dataLine && !dataLine.coordinateRoute) {
      console.log("khong ton tai route");
      return;
    }
    // remove oldroute before draw a new route
    if (oldRoute) {
      oldRoute.map((layer) => {
        return map.removeLayer(layer[1]);
      });
    }
    // init
    let markerList = [];
    let polyLineList = [];
    let lines = [];
    for (let i = 0; i < dataLine.coordinateRoute.length; i++) {
      markerList.push(
        L.marker(
          [dataLine.coordinateRoute[i].lat, dataLine.coordinateRoute[i].lng],
          { icon }
        ).bindTooltip(`${dataLine.name}`)
      );
      if (dataLine.coordinateRoute[i + 1]) {
        polyLineList.push(
          L.polyline(
            [
              [
                dataLine.coordinateRoute[i].lat,
                dataLine.coordinateRoute[i].lng,
              ],
              [
                dataLine.coordinateRoute[i + 1].lat,
                dataLine.coordinateRoute[i + 1].lng,
              ],
            ],
            {
              snakingSpeed: 500,
              color: `${dataLine.statusCovid === true ? "#DE8686" : "#28C8A0"}`,
            }
          )
        );
        if (i === dataLine.coordinateRoute.length - 1) {
          markerList.push(
            L.marker(
              [
                dataLine.coordinateRoute[i + 1].lat,
                dataLine.coordinateRoute[i + 1].lng,
              ],
              { icon }
            )
          );
        }
      }
    }
    let l = Math.min(markerList.length, polyLineList.length);
    // create poly route using merge arr
    for (let i = 0; i < l; i++) {
      lines.push(markerList[i], polyLineList[i]);
      if (i === l - 1) {
        let j = i + 1;
        lines.push(markerList[j]);
      }
    }

    const route = L.featureGroup(lines, { snakingPause: 50 });

    if (!route) return;
    map.fitBounds(route.getBounds());

    map.addLayer(route);

    let RouteArr = Object.keys(route._layers).map((key) => [
      key,
      route._layers[key],
    ]);
    dispatch(actions.GetOldRoute(RouteArr));

    route.snakeIn();

    // route.on("snakestart snake snakeend", (ev) => {
    //   console.log(ev.type);
    // });
  }, [startAnimation, dataLine]);

  return null;
};

SnakeAnim.propTypes = {
  startAnimation: PropTypes.bool.isRequired,
  dataLine: PropTypes.object,
};

export default SnakeAnim;
