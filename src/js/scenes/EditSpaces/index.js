import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Button
} from 'reactstrap';
import AddSpace from './AddSpace';
import DeleteSpace from './DeleteSpace';
import RenameSpace from './RenameSpace';

import Space from '../../components/spaces';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      selectSpace: {},
      isOpenAddSpace: false,
      isOpenDeleteSpace: false,
      isOpenRenameSpace: false
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {

    if (props.location.state && props.location.state.spaces) {
      this.setState({
        item: props.location.state.spaces
      });
    } else {
      this.setState({
        item: []
      });
    }
  }

  handleToggleAddSpace() {
    const { isOpenAddSpace } = this.state;
    this.setState({
      isOpenAddSpace: !isOpenAddSpace
    });
  }

  handleToggleDeleteSpace() {
    const { isOpenDeleteSpace } = this.state;
    this.setState({
      isOpenDeleteSpace: !isOpenDeleteSpace
    });
  }

  handleToggleRenameSpace(value) {
    const { isOpenRenameSpace } = this.state;
    this.setState({
      isOpenRenameSpace: !isOpenRenameSpace
    });
    if (!isOpenRenameSpace) {
      this.setState({
        selectSpace: value && value.node
      });
    }
  }

  handleAddSpace(value) {
    this.setState({
      item: value
    });
  }

  handleDeleteSpace(value) {
    this.setState({
      item: value
    });
  }

  handleMoveSpace(spaces) {
    this.setState({
      item: spaces
    });
  }

  handleBack() {
    const { item } = this.state;
    this.props.history.push('/spaces', { updateSpaces: item });
  }

  render() {
    const {
      isOpenAddSpace, isOpenDeleteSpace, isOpenRenameSpace, selectSpace, item
    } = this.state;
    return (
      <Container>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-4">Edit Spaces</h4>
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
            <Space
              spaces={item && item.length > 0 ? item : []}
              onAddSpace={this.handleToggleAddSpace.bind(this, item)}
              onDeleteSpace={this.handleToggleDeleteSpace.bind(this, item)}
              onRenameSpace={this.handleToggleRenameSpace.bind(this)}
              onMovedSpace={this.handleMoveSpace.bind(this)}
            />
          </div>
          <AddSpace
            isOpen={isOpenAddSpace}
            onToggle={this.handleToggleAddSpace.bind(this)}
            onAddSpace={this.handleAddSpace.bind(this)}
            spaces={item && item.length > 0 ? item : []}
          />
          <DeleteSpace
            isOpen={isOpenDeleteSpace}
            onToggle={this.handleToggleDeleteSpace.bind(this)}
            onDeleteSpace={this.handleDeleteSpace.bind(this)}
            spaces={item && item.length > 0 ? item : []}
          />
          <RenameSpace
            isOpen={isOpenRenameSpace}
            onToggle={this.handleToggleRenameSpace.bind(this)}
            spaces={item && item.length > 0 ? item : []}
            space={selectSpace}
          />
        </div>
      </Container>
    );
  }
}

export default withRouter(Spaces);
