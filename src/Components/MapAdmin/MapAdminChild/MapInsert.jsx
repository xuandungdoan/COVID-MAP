import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faTimesCircle,
  faEdit,
  faUserPlus,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  Button,
  Form,
  FormText,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

// import "react-datepicker/dist/react-datepicker.css";

class MapInsert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      time: new Date(),
      coorFormNum: 0,
      statusCovid: true,
      name: "",
      route: "",
      address: "",
      position: {
        lat: "",
        lng: "",
      },
      coordinateRoute: [{ lat: "", lng: "" }],
      modalStatus: false,
    };
  }

  // get Time form date check

  handleTime = (date) => {
    this.setState({
      time: date,
    });
  };

  // hand easy form

  handleOnChange = (e) => {
    if (e.target.name === "lat")
      return this.setState({
        position: {
          lat: e.target.value,
          lng: this.state.position.lng,
        },
      });
    if (e.target.name === "lng")
      return this.setState({
        position: {
          lng: e.target.value,
          lat: this.state.position.lat,
        },
      });
    if (e.target.name === "statusCovid") {
      return this.setState({
        statusCovid: e.target.value === "true" ? true : false,
      });
    }

    return this.setState({ [e.target.name]: e.target.value });
  };

  // handle get value each input into route arr

  handleOnChangeRouteArr = (e, index) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    let coorRouteTemp = [...this.state.coordinateRoute];
    if (name === "lat") {
      coorRouteTemp[index].lat = value;
      return this.setState({
        coordinateRoute: coorRouteTemp,
      });
    }
    if (name === "lng") {
      coorRouteTemp[index].lng = value;
      return this.setState({
        coordinateRoute: coorRouteTemp,
      });
    }
  };

  // auto scroll when add more field coordinate

  scrollToBottom = () => {
    if (this.state.coorFormNum !== 0)
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  // add more coordinate field

  handleAddCoordinate = () => {
    let coorTemp = [...this.state.coordinateRoute];
    coorTemp.push({ lat: null, lng: null });
    let numTemp = this.state.coorFormNum;
    numTemp++;
    this.setState({
      coorFormNum: numTemp,
      coordinateRoute: coorTemp,
    });
  };

  // close form when click close

  handleCloseForm = () => {
    this.props.closeForm();
    this.props.clearEditForm();
  };

  // clear data when insert or cancel

  handleClearData = () => {
    this.setState({
      time: new Date(),
      coorFormNum: 0,
      statusCovid: true,
      name: "",
      route: "",
      address: "",
      position: {
        lat: "",
        lng: "",
      },
      coordinateRoute: [{ lat: "", lng: "" }],
      modalStatus: false,
    });
  };

  // toggle modal for clear button

  handleModalClear = () => {
    this.setState({
      modalStatus: !this.state.modalStatus,
    });
  };
  // prevent load again from click submit

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.id) {
      this.props.creatPatient(this.state);
    } else if (this.state.id) {
      this.props.updatePatient(this.state.id, this.state);
    }
    this.handleClearData();
    return this.handleCloseForm();
  };

  // logic when delete coordinate field

  handleDeleteCoorField = (index) => {
    let coorRouteTemp = [...this.state.coordinateRoute];
    coorRouteTemp.splice(index, 1);
    this.setState({
      coordinateRoute: coorRouteTemp,
    });
  };

  // handle add more content in form -> auto scroll to bottom

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.setState({
      id: "",
      time: new Date(),
      coorFormNum: 0,
      statusCovid: true,
      name: "",
      route: "",
      address: "",
      position: {
        lat: "",
        lng: "",
      },
      coordinateRoute: [{ lat: "", lng: "" }],
    });
    // }
  }

  //  update whenever receive props

  static getDerivedStateFromProps(props, state) {
    if (!props.dataEdit._id) {
      return null;
    }
    if (props.dataEdit._id !== state.id) {
      return {
        id: props.dataEdit._id,
        time: moment(props.dataEdit.time).toDate(),
        coorFormNum:
          (props.dataEdit.coordinateRoute &&
            props.dataEdit.coordinateRoute.length) ||
          0,
        statusCovid: props.dataEdit.statusCovid,
        name: props.dataEdit.name,
        route: props.dataEdit.route,
        address: props.dataEdit.address,
        position: props.dataEdit.position,
        coordinateRoute: props.dataEdit.coordinateRoute,
      };
    }
  }

  render() {
    const { id } = this.state;

    return (
      <Container fluid={true}>
        <Row>
          <Col lg="12">
            <CardHeader>
              <CardTitle className="space-between">
                <strong> {id ? "Sửa bệnh nhân" : "Thêm bệnh nhân"} </strong>
                <Button color="danger" onClick={this.handleCloseForm}>
                  Đóng form <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
              </CardTitle>
            </CardHeader>
            <Card body>
              <Form
                onSubmit={this.handleSubmit}
                method="post"
                encType="multipart/form-data"
              >
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label for="name">Tên</Label>
                      <Input
                        type="text"
                        name="name"
                        id="namePatient"
                        placeholder="Điền tên bệnh nhân"
                        onChange={this.handleOnChange}
                        value={this.state.name}
                        invalid={this.state.name ? false : true}
                      />
                      <FormFeedback>Không được bỏ trống</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="address">Địa chỉ</Label>
                      <Input
                        type="text"
                        name="address"
                        value={this.state.address}
                        id="addressPatient"
                        placeholder="Điền địa chỉ bệnh nhân"
                        onChange={this.handleOnChange}
                        invalid={this.state.address ? false : true}
                      />
                      <FormFeedback>Không được bỏ trống</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="route">Hành trình</Label>
                      <Input
                        type="textarea"
                        name="route"
                        value={this.state.route}
                        id="routePatient"
                        placeholder="Điền hành trình bệnh nhân"
                        onChange={this.handleOnChange}
                        invalid={this.state.route ? false : true}
                      />
                      <FormFeedback>Không được bỏ trống</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="statusCovid">Trạng thái</Label>
                      <Input
                        type="select"
                        name="statusCovid"
                        value={this.state.statusCovid}
                        id="statusPatient"
                        onChange={this.handleOnChange}
                      >
                        <option value={true}>Nhiễm bệnh</option>
                        <option value={false}>Đã hồi phục</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="time">Thời gian</Label> <br />
                      <DatePicker
                        selected={this.state.time}
                        onChange={this.handleTime}
                        dateFormat="dd/MM/yyyy"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <Row>
                      <Col lg="12">
                        <span>Toạ độ bệnh nhân</span>
                        <FormText color="muted">
                          Nhập toạ độ vị trí của bệnh thân lúc phát bệnh. Lat và
                          Lng(hai thông số này có thể lấy từ Google Maps).
                        </FormText>
                        <FormGroup>
                          <Row>
                            <Col lg="6">
                              <Label for="lat">Nhập Lat</Label>
                              <Input
                                type="number"
                                step="any"
                                name="lat"
                                value={
                                  (this.state.position &&
                                    this.state.position.lat) ||
                                  ""
                                }
                                id="latPatient"
                                onChange={this.handleOnChange}
                                invalid={
                                  this.state.position && this.state.position.lat
                                    ? false
                                    : true
                                }
                              ></Input>
                              <FormFeedback>Không được bỏ trống</FormFeedback>
                            </Col>
                            <Col lg="6">
                              <Label for="lng">Nhập Lng</Label>
                              <Input
                                type="number"
                                step="any"
                                name="lng"
                                value={
                                  (this.state.position &&
                                    this.state.position.lng) ||
                                  ""
                                }
                                id="lngPaLient"
                                onChange={this.handleOnChange}
                                invalid={
                                  this.state.position && this.state.position.lng
                                    ? false
                                    : true
                                }
                              ></Input>
                              <FormFeedback>Không được bỏ trống</FormFeedback>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <span>Toạ độ hành trình bệnh nhân</span>
                        <FormText color="muted">
                          Nhập toạ độ vị trí của bệnh thân lúc phát bệnh và toạ
                          độ các vị trí di chuyển của bệnh thân trong lúc nhiễm
                          bệnh.
                        </FormText>
                        {this.state.coordinateRoute &&
                          this.state.coordinateRoute.map((i, index) => (
                            <FormGroup key={index}>
                              <Row>
                                <Col lg="5">
                                  <Input
                                    type="number"
                                    name="lat"
                                    value={
                                      this.state.coordinateRoute[index].lat ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      this.handleOnChangeRouteArr(e, index)
                                    }
                                    invalid={
                                      this.state.coordinateRoute[index].lat
                                        ? false
                                        : true
                                    }
                                  ></Input>
                                  <FormFeedback>
                                    Không được bỏ trống
                                  </FormFeedback>
                                </Col>
                                <Col lg="5">
                                  <Input
                                    type="number"
                                    name="lng"
                                    value={
                                      this.state.coordinateRoute[index].lng ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      this.handleOnChangeRouteArr(e, index)
                                    }
                                    invalid={
                                      this.state.coordinateRoute[index].lng
                                        ? false
                                        : true
                                    }
                                  ></Input>
                                  <FormFeedback>
                                    Không được bỏ trống
                                  </FormFeedback>
                                </Col>
                                <Col lg="2">
                                  {index !== 0 ? (
                                    <Button
                                      className="mt-1"
                                      color="danger"
                                      size="sm"
                                      onClick={() =>
                                        this.handleDeleteCoorField(index)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </Col>
                              </Row>
                            </FormGroup>
                          ))}
                        <Button
                          size="sm"
                          color="warning"
                          onClick={this.handleAddCoordinate}
                        >
                          Thêm toạ độ
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col lg="3" xs="6">
                    {" "}
                    <Button
                      color="success"
                      type="submit"
                      disabled={
                        !this.state.name ||
                        !this.state.address ||
                        !this.state.route ||
                        !this.state.position.lat ||
                        !this.state.position.lng ||
                        !this.state.coordinateRoute[0].lat ||
                        !this.state.coordinateRoute[0].lng
                      }
                    >
                      {id ? "Sửa" : "Thêm"}
                      {id ? (
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ margin: "0px 7px" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          style={{ margin: "0px 10px" }}
                        />
                      )}
                    </Button>
                  </Col>
                  <Col lg="3" xs="6">
                    {" "}
                    <Button color="warning" onClick={this.handleModalClear}>
                      Huỷ bỏ <FontAwesomeIcon icon={faEraser} />
                    </Button>
                  </Col>
                </Row>
                <Modal
                  isOpen={this.state.modalStatus}
                  toggle={this.handleModalClear}
                >
                  <ModalHeader toggle={this.handleModalClear}>
                    Cảnh báo
                  </ModalHeader>
                  <ModalBody>Bạn muốn huỷ bỏ các giá trị?</ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.handleClearData}>
                      Vơn
                    </Button>{" "}
                    <Button color="secondary" onClick={this.handleModalClear}>
                      Không
                    </Button>
                  </ModalFooter>
                </Modal>
              </Form>
              <div
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              ></div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { dataEdit: state.EditPatient };
};
const mapDispatchToProps = (dispatch, prop) => {
  return {
    closeForm: () => dispatch(actions.closeFormMap()),
    updatePatient: (id, patient) =>
      dispatch(actions.UpdatePatient(id, patient)),
    creatPatient: (patient) => dispatch(actions.CreatePatient(patient)),
    clearEditForm: () => dispatch(actions.ClearEditPatient()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapInsert);
