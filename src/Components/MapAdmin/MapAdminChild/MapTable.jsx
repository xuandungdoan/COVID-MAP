import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Dropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  Card,
  CardBody,
  Collapse,
} from "reactstrap";
import moment from "moment";
import MapInsert from "./MapInsert";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
class MapTable extends Component {
  constructor(props) {
    super(props);
    this.pagesCount = 1;
    this.state = {
      dataPatients: [],
      filterName: "",
      filterAddress: "",
      filterDate: new Date(),
      filterStatusCovid: -1,
      filter: {},
      currentPage: 0,
      pageSize: 5,
      nameSort: "date",
      valueSort: -1,
      modalStatus: false,
      openCollapse: false,
      idDel: "",
    };
  }

  // handle when click pagination, move to index page

  handleClickPagination(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index,
    });
  }

  // get value from filter input

  handleOnchange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    if (name === "filterStatusCovid") {
      value = parseInt(value);
    }
    return this.setState({ [name]: value });
  };

  // get value from filter datepicker

  handleFilterDate = (date) => {
    this.setState({
      filterDate: date,
    });
  };

  // logic show form when edit or create

  handleToggleForm = () => {
    if (this.props.dataEdit && this.props.isShowForm) {
      this.props.clearEditForm();
    }
    this.props.openForm();
  };

  // only show form

  handleShowForm = () => {
    this.setState({
      isShowForm: true,
    });
  };

  // only close form

  handleCloseForm = () => {
    this.setState({
      isShowForm: false,
      dataEdit: null,
    });
  };

  // get data from component child and insert to table

  // get patient data for showing on edit form when click button "edit"

  handleShowEditForm = (id) => {
    this.props.editPatient(id);
    this.props.openForm();
  };

  // delete patient when click button "xoá"

  handleDeleteData = () => {
    this.handleModalDel();
    this.props.deletePatient(this.state.idDel);
    this.props.closeForm();
  };
  // toggle modal for delete button and get id for delete action

  handleModalDelGetId = (id) => {
    this.setState({
      modalStatus: !this.state.modalStatus,
      idDel: id,
    });
  };
  // toggle modal for delete button

  handleModalDel = () => {
    this.setState({
      modalStatus: !this.state.modalStatus,
    });
  };

  // findIndex in arr by id

  findIndex = (id) => {
    return this.props.dataPatients.findIndex((i) => i._id === id);
  };

  // set value when click in dropdown sorting

  handleChangeDrop = (name, value) => {
    this.setState({
      nameSort: name,
      valueSort: value,
    });
  };

  handleToggleCollapes = () => {
    this.setState({
      openCollapse: !this.state.openCollapse,
    });
    window.scrollTo(0, document.body.scrollHeight);
  };

  scrollToBottom = () => {
    if (this.state.openCollapse)
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  // trans unicode to latin

  change_alias = (alias) => {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // str = str.replace(
    //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    //   " "
    // );
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
  };

  async componentDidMount() {
    this.props.requestAllPatients();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    let { currentPage, nameSort, valueSort } = this.state;
    let { isShowForm, dataPatients } = this.props;

    // Filter logic

    if (this.state.filterName) {
      dataPatients = dataPatients.filter((patient) => {
        return (
          this.change_alias(patient.name).indexOf(
            this.change_alias(this.state.filterName)
          ) !== -1
        );
      });
    }
    dataPatients = dataPatients.filter((patient) => {
      return (
        moment(patient.time).toDate().getTime() <=
        this.state.filterDate.getTime()
      );
    });
    dataPatients = dataPatients.filter((patient) => {
      if (this.state.filterStatusCovid === -1) {
        return patient;
      } else {
        return (
          patient.statusCovid ===
          (this.state.filterStatusCovid === 1 ? true : false)
        );
      }
    });
    if (this.state.filterAddress) {
      dataPatients = dataPatients.filter((patient) => {
        return (
          this.change_alias(patient.address).indexOf(
            this.change_alias(this.state.filterAddress)
          ) !== -1
        );
      });
    }
    // Sort logic

    if (nameSort === "status") {
      dataPatients = dataPatients.sort((a, b) => {
        if (a.statusCovid > b.statusCovid) return -valueSort;
        else if (a.statusCovid < b.statusCovid) return valueSort;
        else return 0;
      });
    } else {
      dataPatients = dataPatients.sort((a, b) => {
        if (
          moment(a.time).toDate().getTime() > moment(b.time).toDate().getTime()
        )
          return valueSort;
        else if (
          moment(a.time).toDate().getTime() < moment(b.time).toDate().getTime()
        )
          return -valueSort;
        else return 0;
      });
    }
    this.pagesCount = Math.ceil(dataPatients.length / this.state.pageSize);

    const InsertForm = isShowForm ? <MapInsert /> : "";

    return (
      <Container fluid={true}>
        <Row>
          <Col lg="12">
            {" "}
            <Card className="collapse-mapAdmin">
              <CardHeader className="maptable_card-header">
                Danh sách thông tin bệnh nhân
                <FontAwesomeIcon
                  icon={this.state.openCollapse ? faMinus : faPlus}
                  onClick={this.handleToggleCollapes}
                  style={{ cursor: "pointer", margin: "0 1rem" }}
                />
              </CardHeader>
              <Collapse isOpen={this.state.openCollapse}>
                <CardBody>
                  <Row>
                    {" "}
                    <Col lg={isShowForm ? "6" : ""}>{InsertForm}</Col>
                    <Col lg={isShowForm ? "6" : "12"}>
                      <Row className="mt-2">
                        <Col lg="6" xs="6">
                          {" "}
                          <Button color="info" onClick={this.handleToggleForm}>
                            Thêm Bệnh Nhân
                          </Button>
                        </Col>
                        <Col lg="6" xs="6">
                          <Dropdown
                            isOpen={this.state.drop}
                            toggle={() => {
                              this.setState({ drop: !this.state.drop });
                            }}
                          >
                            <DropdownToggle caret color="primary">
                              Sắp xếp
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => this.handleChangeDrop("date", 1)}
                              >
                                Ngày tăng dần
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  this.handleChangeDrop("date", -1)
                                }
                              >
                                Ngày giảm dần
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem
                                onClick={() =>
                                  this.handleChangeDrop("status", 1)
                                }
                              >
                                Nhiễm bệnh
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  this.handleChangeDrop("status", -1)
                                }
                              >
                                Đã hồi phục
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col lg="12">
                          <Table style={{ overflowX: "hidden" }}>
                            <thead>
                              <tr>
                                <th>Tên</th>
                                <th className="hiddenTimeRes">
                                  Ngày phát bệnh
                                </th>
                                {!isShowForm ? (
                                  <th className="hiddenAddressRes">Địa chỉ</th>
                                ) : null}
                                <th className="hiddenStatusRes">Tình trạng</th>
                                <th>Hành động</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Input
                                    type="text"
                                    name="filterName"
                                    value={this.state.filterName}
                                    onChange={this.handleOnchange}
                                  ></Input>
                                </td>
                                <td className="hiddenTimeRes">
                                  <DatePicker
                                    selected={this.state.filterDate}
                                    onChange={this.handleFilterDate}
                                    dateFormat="dd/MM/yyyy"
                                    className="datePickerMapPage"
                                  />
                                </td>
                                {!isShowForm ? (
                                  <td className="hiddenAddressRes">
                                    <Input
                                      type="text"
                                      name="filterAddress"
                                      value={this.state.filterAddress}
                                      onChange={this.handleOnchange}
                                    ></Input>
                                  </td>
                                ) : null}

                                <td className="hiddenStatusRes">
                                  <Input
                                    type="select"
                                    name="filterStatusCovid"
                                    onChange={this.handleOnchange}
                                    value={this.state.filterStatusCovid}
                                  >
                                    <option value={-1}>Tất cả</option>
                                    <option value={0}>Đã hồi phục</option>
                                    <option value={1}>Nhiễm bệnh</option>
                                  </Input>
                                </td>
                              </tr>
                              {dataPatients
                                .slice(
                                  currentPage * this.state.pageSize,
                                  (currentPage + 1) * this.state.pageSize
                                )
                                .map((patient, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{patient.name}</td>
                                      <td className="hiddenTimeRes">
                                        {moment(patient.time).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </td>
                                      {!isShowForm ? (
                                        <td className="hiddenAddressRes">
                                          {patient.address}
                                        </td>
                                      ) : null}

                                      <td className="hiddenStatusRes">
                                        {" "}
                                        <div
                                          className={
                                            patient.statusCovid
                                              ? "badge badge-danger"
                                              : "badge badge-warning"
                                          }
                                        >
                                          {patient.statusCovid
                                            ? "Nhiễm bệnh"
                                            : "Đã hồi phục"}{" "}
                                        </div>
                                      </td>

                                      <td>
                                        <Row>
                                          <Col lg="6" className="p-0">
                                            {" "}
                                            <Button
                                              className="mb-2"
                                              onClick={() =>
                                                this.handleShowEditForm(
                                                  patient._id
                                                )
                                              }
                                              color="warning"
                                            >
                                              <FontAwesomeIcon
                                                icon={faEdit}
                                                style={{}}
                                              />
                                            </Button>
                                          </Col>
                                          <Col lg="6" className="p-0">
                                            <Button
                                              onClick={() =>
                                                this.handleModalDelGetId(
                                                  patient._id
                                                )
                                              }
                                              color="danger"
                                            >
                                              <FontAwesomeIcon
                                                icon={faTrash}
                                                style={{}}
                                              />
                                            </Button>
                                            <Modal
                                              isOpen={this.state.modalStatus}
                                              toggle={this.handleModalDel}
                                            >
                                              <ModalHeader
                                                toggle={this.handleModalDel}
                                              >
                                                Cảnh báo
                                              </ModalHeader>
                                              <ModalBody>
                                                Bạn muốn xoá bệnh nhân này?
                                              </ModalBody>
                                              <ModalFooter>
                                                <Button
                                                  color="primary"
                                                  onClick={
                                                    this.handleDeleteData
                                                  }
                                                >
                                                  Vơn
                                                </Button>{" "}
                                                <Button
                                                  color="secondary"
                                                  onClick={this.handleModalDel}
                                                >
                                                  Không
                                                </Button>
                                              </ModalFooter>
                                            </Modal>
                                          </Col>
                                        </Row>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </Col>
                        <Col lg="12">
                          {" "}
                          <Pagination className="paginationMap">
                            <PaginationItem disabled={currentPage <= 0}>
                              <PaginationLink
                                onClick={(e) =>
                                  this.handleClickPagination(e, currentPage - 1)
                                }
                                previous
                                href="#"
                              />
                            </PaginationItem>

                            {[...Array(this.pagesCount)].map((page, i) => (
                              <PaginationItem
                                active={i === currentPage}
                                key={i}
                              >
                                <PaginationLink
                                  onClick={(e) =>
                                    this.handleClickPagination(e, i)
                                  }
                                  href="#"
                                >
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}

                            <PaginationItem
                              disabled={currentPage >= this.pagesCount - 1}
                            >
                              <PaginationLink
                                onClick={(e) =>
                                  this.handleClickPagination(e, currentPage + 1)
                                }
                                next
                                href="#"
                              />
                            </PaginationItem>
                          </Pagination>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
                <div
                  style={{ float: "left", clear: "both" }}
                  ref={(el) => {
                    this.messagesEnd = el;
                  }}
                ></div>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isShowForm: state.FormMap,
    dataPatients: state.MapAdmin,
    dataEdit: state.EditPatient,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    openForm: () => dispatch(actions.openFormMap()),
    requestAllPatients: () => dispatch(actions.requestAllPatients()),
    editPatient: (patient) => dispatch(actions.EditPatient(patient)),
    deletePatient: (id) => dispatch(actions.DeletePatient(id)),
    closeForm: () => dispatch(actions.closeFormMap()),
    clearEditForm: () => dispatch(actions.ClearEditPatient()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapTable);
