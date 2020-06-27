import React, { Component, Fragment } from "react";
import axios from "axios";
import moment from "moment";

import L from "leaflet";
import { Map, TileLayer, Popup, Marker, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-markercluster";

import { Button, Row, Col, Input } from "reactstrap";
import DatePicker from "react-datepicker";

import SnakeAnim from "./SnakeAnim";
// import icon
import coronaIcon from "./icons/virus.svg";
import healIcon from "./icons/heal.svg";
import locationIcon from "./icons/location.svg";

const hiddenChinese = [
  [15.761089361201783, 110.89599609375001],
  [17.437202984583884, 116.46606445312501],
  [8.973289903752416, 111.92596435546876],
];
const host = process.env.REACT_APP_COVID_API;
function getLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        resolve(
          fetch("https://ipapi.co/json")
            .then((res) => res.json())
            .then((location) => {
              return {
                lat: location.latitude,
                lng: location.longitude,
              };
            })
        );
      }
    );
  });
}

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerPosition: {
        lat: 10.7743,
        lng: 106.6669,
      },
      zoom: 4,
      RouteId: null,
      startAnimation: false,
      setStartAnimation: false,
      data: [],
      dataLine: null,
      choose: -1,
      filterDate: new Date(),
      clientLocation: {
        lat: "",
        lng: "",
      },
    };
  }
  async componentDidMount() {
    try {
      // get all patients from be

      const res = await axios.get(`${host}/api/map`);
      this.setState({
        data: res.data.patients,
      });
      getLocation().then((location) => {
        if (location)
          this.setState({
            clientLocation: location,
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  // function to get id of patient to draw correspondent route

  watchRoute = async (id) => {
    this.setState({
      RouteId: id,
      setStartAnimation: true,
    });
    // get patient by id from backend
    const res = await axios.get(`${host}/api/patient/${id}`);

    return this.setState({
      dataLine: res.data.patient,
    });
  };

  // get value from select status input

  handleChoose = (e) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 10),
    });
  };
  // get value from filter datepicker

  handleFilterDate = (date) => {
    this.setState({
      filterDate: date,
    });
  };

  render() {
    const coronaMarker = L.icon({
      iconUrl: coronaIcon,
      iconSize: [35, 35],
    });
    const healMarker = L.icon({
      iconUrl: healIcon,
      iconSize: [45, 45],
    });
    const locationMarker = L.icon({
      iconUrl: locationIcon,
      iconSize: [25, 25],
    });

    let { data } = this.state;
    // handle filter with status selection

    data = data.filter((patient) => {
      if (this.state.choose === -1) return patient;
      else
        return patient.statusCovid === (this.state.choose === 0 ? true : false);
    });

    // handle filter with data select value

    data = data.filter((patient) => {
      return (
        moment(patient.time).toDate().getTime() <=
        this.state.filterDate.getTime()
      );
    });

    return (
      <Fragment>
        <Map
          id="mapid"
          className="markercluster-map"
          center={this.state.centerPosition}
          zoom={this.state.zoom}
          maxZoom={18}
        >
          <Row className="filterAdminForm">
            <Col lg="6">
              <Input
                type="select"
                name="choose"
                value={this.state.choose}
                onChange={this.handleChoose}
                className="selectStatusMapPage"
              >
                <option value={-1}>Tất cả</option>
                <option value={0}>Nhiễm bệnh</option>
                <option value={1}>Đã hồi phục</option>
              </Input>
            </Col>
            <Col lg="6">
              <DatePicker
                selected={this.state.filterDate}
                onChange={this.handleFilterDate}
                dateFormat="dd/MM/yyyy"
                className="datePickerMapPage"
              />
            </Col>
          </Row>

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {data ? (
            <MarkerClusterGroup showCoverageOnHover={false}>
              {data.map((patient, index) => {
                if (patient.statusCovid === true) {
                  return (
                    <Marker
                      className="blinking"
                      key={index}
                      position={patient.position}
                      icon={coronaMarker}
                    >
                      <Popup>
                        {" "}
                        <p>
                          <b>Tên:</b> {patient.name}{" "}
                        </p>
                        <p>
                          <b>Địa chỉ:</b> {patient.address}{" "}
                        </p>
                        <p>
                          <b>Thời gian:</b>{" "}
                          {moment(patient.time).format("MM/DD/YYYY")}{" "}
                        </p>
                        <p>
                          <b>Lộ trình di chuyển: </b>
                          {patient.route}
                        </p>
                        {patient.coordinateRoute.length > 1 ? (
                          <Button
                            color="danger"
                            onClick={() => {
                              this.watchRoute(patient._id);
                            }}
                          >
                            Xem tuyến đường
                          </Button>
                        ) : (
                          ""
                        )}
                      </Popup>
                    </Marker>
                  );
                } else {
                  return (
                    <Marker
                      className="blinking"
                      key={index}
                      position={patient.position}
                      icon={healMarker}
                    >
                      <Popup>
                        <p>
                          <b>Tên:</b> {patient.name}
                        </p>
                        <p>
                          <b>Địa chỉ:</b> {patient.address}{" "}
                        </p>
                        <p>
                          <b>Thời gian:</b>{" "}
                          {moment(patient.time).format("MM/DD/YYYY")}{" "}
                        </p>
                        <p>
                          <b>Lộ trình di chuyển: </b>
                          {patient.route}
                        </p>
                        {patient.coordinateRoute.length > 1 ? (
                          <Button
                            color="danger"
                            onClick={() => {
                              this.watchRoute(patient._id);
                            }}
                          >
                            Xem tuyến đường
                          </Button>
                        ) : (
                          ""
                        )}
                      </Popup>
                    </Marker>
                  );
                }
              })}
            </MarkerClusterGroup>
          ) : (
            "none"
          )}
          <SnakeAnim
            startAnimation={this.state.setStartAnimation}
            dataLine={this.state.dataLine && this.state.dataLine}
          />
          {this.state.clientLocation.lat && (
            <Marker position={this.state.clientLocation} icon={locationMarker}>
              <Popup autoPan={false}>
                <b>Vị trí hiện tại của bạn</b>
              </Popup>
            </Marker>
          )}
          <Rectangle bounds={hiddenChinese} color="#aad3df" opacity="1" />
        </Map>
      </Fragment>
    );
  }
}

export default MapPage;
