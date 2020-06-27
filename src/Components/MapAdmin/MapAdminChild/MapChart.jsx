import React, { Component } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Col, Row } from "reactstrap";
import moment from "moment";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class MapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoughnut: {
        labels: ["Nhiễm bệnh", "Đã hồi phục"],
        datasets: [
          {
            label: "Covid",
            backgroundColor: ["#F80000", "#97F1BC"],
            hoverBackgroundColor: ["#EEB41B", "#EEB41B"],
            data: [],
          },
        ],
      },
      dataLine: {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
        datasets: [
          {
            label: "Ca nhiễm bệnh",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "#F80000",
            borderColor: "#F80000",
            borderWidth: 2,
            data: [65, 59, 80, 81, 56],
          },
        ],
      },
      countPatients: 0,
    };
  }
  componentDidMount() {
    this.props.getAllPatients();
  }
  static getDerivedStateFromProps(props, state) {
    if (props.dataPatients) {
      const { dataPatients } = props;
      const countP = dataPatients.length;
      const covid = dataPatients.filter((i) => i.statusCovid === true).length;
      const heal = dataPatients.length - covid;

      let countCovid = [];
      for (let i = 1; i < 6; i++) {
        let start = new Date(`2020-0${i}-01`);
        let end = new Date(`2020-0${i}-31`);
        let count = dataPatients.filter((patient) => {
          return (
            start <= moment(patient.time).toDate().getTime() &&
            moment(patient.time).toDate().getTime() <= end
          );
        }).length;
        countCovid.push(count);
      }

      return {
        dataDoughnut: {
          labels: ["Nhiễm bệnh", "Đã hồi phục"],
          datasets: [
            {
              label: "Covid",
              backgroundColor: ["#F80000", "#97F1BC"],
              hoverBackgroundColor: ["#EEB41B", "#EEB41B"],
              data: [covid, heal],
            },
          ],
        },
        dataLine: {
          labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
          datasets: [
            {
              label: "Ca nhiễm bệnh",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "#F80000",
              borderColor: "#F80000",
              borderWidth: 2,
              data: countCovid,
            },
          ],
        },
        countPatients: countP,
      };
    }
  }
  render() {
    return (
      <Row>
        <Col lg="6">
          {" "}
          <Line
            data={this.state.dataLine}
            options={{
              title: {
                display: true,
                text: `Số ca nhiễm mới mỗi tháng`,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </Col>
        <Col lg="6">
          {" "}
          <Doughnut
            data={this.state.dataDoughnut}
            options={{
              title: {
                display: true,
                text: `Biểu đồ biểu thị số lượng bệnh nhân  (Tổng số bệnh nhân: ${this.state.countPatients})`,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  dataPatients: state.MapAdmin,
});
const dispatchToProps = (dispatch, props) => {
  return {
    getAllPatients: () => dispatch(actions.requestAllPatients()),
  };
};
export default connect(mapStateToProps, dispatchToProps)(MapChart);
