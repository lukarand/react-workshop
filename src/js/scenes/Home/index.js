import React, {
  Component
} from 'react';
import { withRouter } from 'react-router-dom';
import {
  connect
} from 'react-redux';
import {
  Container, Row, Col, Form, FormGroup, Input, Button, Table
} from 'reactstrap';
import { Formik } from 'formik';
import Select from 'react-select';
import Item from '../../components/item';
import Api from '../../apis/app';
import SelectSpace from './SelectSpace';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      infotypes: [],
      spaces: [],
      filterSpaces: [],
      items: [],
      selected: {},
      select_package: {},
      filterItems: []
    };
  }

  async componentDidMount() {
    const { response, body } = await Api.get('api/package/list');

    body.sort((a, b) => a - b).reverse();

    switch (response.status) {
      case 200:
        this.setState({
          packages: body,
          select_package: body[0]
        });
        break;
      default:
        break;
    }

    const { response: response1, body: body1 } = await Api.get('api/infotype/list');
    switch (response1.status) {
      case 200:
        this.setState({
          infotypes: body1
        });
        break;
      default:
        break;
    }

    const { response: response2, body: spaces } = await Api.get('api/space/list');
    switch (response2.status) {
      case 200:
        this.setState({
          spaces,
          filterSpaces: spaces,
          // selected: {}
        });
        break;
      default:
        break;
    }

    this.componentWillReceiveProps(this.props);
  }

  async componentWillReceiveProps() {
    const { select_package } = this.state;

    const { response, body } = await Api.get(`api/model/teach_file_list?index=${select_package.Id}`);

    switch (response.status) {
      case 200:
        this.setState({
          items: body,
          filterItems: body
        });
        break;
      default:
        break;
    }
  }

  handleSubmit(values) {
    const { items } = this.state;
    if (values.filter) {
      const searcjQery = values.filter.toLowerCase();
      const displayedItems = items.filter((el) => {
        const searchValue = el.fileName.toLowerCase();
        return searchValue.indexOf(searcjQery) !== -1;
      });
      this.setState({
        filterItems: displayedItems
      });
    } else {
      this.setState({
        filterItems: items
      });
    }
  }

  async handleChangePackage(value) {
    const { response, body } = await Api.get(`api/model/teach_file_list?index=${value.Id}`);

    switch (response.status) {
      case 200:
        this.setState({
          select_package: value,
          selected: {},
          items: body,
          filterItems: body
        });
        break;
      default:
        break;
    }
  }

  handleSelectItem(value) {
    this.setState({
      selected: value
    });
  }

  handleChangeInfoType(value) {
    const { selected } = this.state;
    selected.infoTypeUid = value.uid;
    selected.infoTypeName = value.name;
    this.setState({
      selected
    });
  }

  handleCheckSpace(space) {
    const { selected } = this.state;
    if (selected.spaces && selected.spaces.length > 0) {
      selected.spaces.push(space);
    } else {
      selected.spaces = [];
      selected.spaces.push(space);
    }
    this.setState({
      selected
    });
  }

  handleUnCheckSpace(space) {
    const { selected } = this.state;
    if (selected.spaces && selected.spaces.length > 0) {
      const index = selected.spaces.indexOf(space);
      selected.spaces.splice(index, 1);
    } else {
      selected.spaces = [];
    }
    this.setState({
      selected
    });
  }

  handleFilterSpaces(event) {
    const { spaces } = this.state;
    if (event.target.value) {
      const searcjQery = event.target.value.toLowerCase(); const
        displayedSpaces = spaces.filter((el) => {
          const searchValue = el.name.toLowerCase();
          return searchValue.indexOf(searcjQery) !== -1;
        });
      this.setState({
        filterSpaces: displayedSpaces
      });
    } else {
      this.setState({
        filterSpaces: spaces
      });
    }
  }

  render() {
    const {
      packages, select_package, filterItems, selected, infotypes, filterSpaces
    } = this.state;
    let select_info_type = {};
    if (selected) {
      select_info_type = {
        uid: selected.infoTypeUid,
        name: selected.infoTypeName
      };
    }
    return (
      <Container fluid>
        <Row className="mt-4">
          <Col lg={8}>
            <div className="action-bar">
              <Formik
                initialValues={{
                  filter: ''
                }}
                onSubmit={this.handleSubmit.bind(this)}
                render={({
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit
                }) => (
                  <Form onSubmit={handleSubmit} className="d-flex justify-content-between">
                    <FormGroup className="w-90">
                      <Input
                        type="text"
                        name="filter"
                        value={values.filter}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Button
                        type="submit"
                        color="primary"
                        style={{ width: 80 }}
                      >
                        Filter
                      </Button>
                    </FormGroup>
                  </Form>
                )}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div style={{ marginBottom: 48 }}>
              <Select
                classNamePrefix="react-select"
                placeholder="Teach Information"
                value={select_package}
                options={packages}
                indicatorSeparator={null}
                getOptionValue={option => option.Id}
                getOptionLabel={option => option.name}
                onChange={this.handleChangePackage.bind(this)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={selected.Id ? 8 : 12}>
            <div className="table-responsive">
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>ORGID</th>
                    <th>ITEMID</th>
                    <th>ITEM NAME</th>
                    <th>DIM</th>
                    <th>MATCHED?</th>
                    <th>INFO TYPE</th>
                    <th>SPACES</th>
                    <th>IPACKS</th>
                    <th>UPACK</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filterItems && filterItems.length > 0 ? (
                      filterItems.map((item, index) => (
                        <Item
                          key={index}
                          item={item}
                          onSelect={this.handleSelectItem.bind(this, item)}
                        />
                      ))
                    ) : (
                      <tr>
                        <td style={{ textAlign: 'center' }} colSpan="9">No Result</td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </div>
          </Col>
          {
            selected.Id && (
              <Col md={4}>
                <div className="information-pane">
                  <div className="info-item">
                    <span>OrgId: </span>
                    {selected.teach_org_id}
                  </div>
                  <div className="info-item">
                    <span>Item Id: </span>
                    {selected.Id}
                  </div>
                  <div className="info-item">
                    <span>Item Name: </span>
                    {selected.fileName}
                  </div>
                  <div className="info-item d-flex justify-content-between align-items-center">
                    <div>Information Type: </div>
                  </div>
                  <div className="info-item">
                    <Select
                      classNamePrefix="react-select"
                      placeholder="Info Type"
                      indicatorSeparator={null}
                      options={infotypes}
                      value={select_info_type}
                      getOptionValue={option => option.uid}
                      getOptionLabel={option => option.name}
                      onChange={this.handleChangeInfoType.bind(this)}
                    />
                  </div>
                  <div className="info-item d-flex justify-content-between align-items-center">
                    <div>Spaces: </div>
                  </div>
                  <div className="spaces-work" style={{ height: 500 }}>
                    <div className="info-item d-flex justify-content-between align-items-center">
                      <Input
                        type="text"
                        placeholder="Search Spaces ..."
                        name="filterSpace"
                        onChange={this.handleFilterSpaces.bind(this)}
                      />
                    </div>
                    <div className="spaces-list" style={{ height: 400 }}>
                      {
                        filterSpaces && filterSpaces.length > 0 && (
                          filterSpaces.map((space, key) => (
                            <SelectSpace
                              key={key}
                              space={space}
                              item={selected}
                              selected={selected.spaces && selected.spaces.length > 0 && selected.spaces.filter(item => item.uid === space.uid)}
                              onChecked={this.handleCheckSpace.bind(this)}
                              unChecked={this.handleUnCheckSpace.bind(this)}
                            />
                          ))
                        )
                      }
                    </div>
                  </div>
                </div>
              </Col>
            )
          }
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
