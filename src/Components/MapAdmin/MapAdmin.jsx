import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import MapChart from "./MapAdminChild/MapChart";
import MapTable from "./MapAdminChild/MapTable";
class MapAdmin extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col lg="12">
            <MapChart />
          </Col>
          <Col lg="12">
            {" "}
            <MapTable />{" "}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MapAdmin;
