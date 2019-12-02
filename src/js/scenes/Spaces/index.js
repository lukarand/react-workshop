import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Button, Input
} from 'reactstrap';
import Api from '../../apis/app';
import SelectSpace from './SelectSpace';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      filterSpaces: [],
      selected: {}
    };
  }

  async componentDidMount() {
    const { response, body: spaces } = await Api.get('api/space/list');
    switch (response.status) {
      case 200:
        this.setState({
          spaces,
          filterSpaces: spaces,
          selected: {}
        });
        break;
      default:
        break;
    }
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

  handleEditSpaces() {
    const { selected } = this.state;
    this.props.history.push('/edit-spaces', selected);
  }

  handleBack() {
    const { item } = this.state;
    this.props.history.push('/', { updateSpaces: item });
  }

  render() {
    const {
      selected, filterSpaces
    } = this.state;
    return (
      <Container>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-4">Spaces Management</h4>
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
              <div>Spaces: </div>
              <div>
                <Button
                  type="button"
                  color="link"
                  onClick={this.handleEditSpaces.bind(this)}
                >
                  Edit Spaces
                </Button>
              </div>
            </div>
            <div className="info-item d-flex justify-content-between align-items-center">
              <Input
                type="text"
                placeholder="Search Spaces ..."
                name="filterSpace"
                onChange={this.handleFilterSpaces.bind(this)}
              />
            </div>
            <div className="spaces-list">
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
      </Container>
    );
  }
}

export default withRouter(Spaces);
