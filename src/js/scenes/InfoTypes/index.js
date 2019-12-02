import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Button
} from 'reactstrap';
import Select from 'react-select';
import Api from '../../apis/app';

class InfoTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infotypes: [],
      selected: {}
    };
  }

  async componentDidMount() {
    const { response, body } = await Api.get('api/infotype/list');
    switch (response.status) {
      case 200:
        this.setState({
          infotypes: body
        });
        break;
      default:
        break;
    }
  }

  handleChangeInfoType(value) {
    this.setState({
      selected: value
    });
  }

  handleEditInfoTypes() {
    const { selected } = this.state;
    this.props.history.push('/edit-infotype', { selected });
  }

  handleBack() {
    this.props.history.push('/');
  }

  render() {
    const {
      infotypes, selected
    } = this.state;

    return (
      <Container>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-4">InfoType Management</h4>
            <div>
              <Button
                type="button"
                color="primary"
                onClick={this.handleBack.bind(this)}
              >
                &#10226; Back Home
              </Button>
            </div>
          </div>
          <div className="spaces-work" style={{ height: '80vh' }}>
            <div className="info-item d-flex justify-content-between align-items-center">
              <div>Information Type: </div>
              <div>
                <Button
                  type="button"
                  color="link"
                  onClick={this.handleEditInfoTypes.bind(this)}
                >
                  Edit InfoTypes
                </Button>
              </div>
            </div>
            <div className="info-item">
              <Select
                classNamePrefix="react-select"
                placeholder="Info Type"
                indicatorSeparator={null}
                options={infotypes}
                value={selected}
                getOptionValue={option => option.uid}
                getOptionLabel={option => option.name}
                onChange={this.handleChangeInfoType.bind(this)}
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(InfoTypes);
