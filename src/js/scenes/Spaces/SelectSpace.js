import React, { Component } from 'react';
import {
  Input, Label, FormGroup
} from 'reactstrap';

class SelectSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      space: {}
    };
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { space, selected } = nextProps;
    this.setState({
      space,
      checked: selected && selected.length > 0 && selected[0].uid === space.uid
    });
  }

  handleChange() {
    const { space, checked } = this.state;
    const { onChecked, unChecked } = this.props;
    if (!checked) {
      this.setState({
        checked: true
      });
      onChecked(space);
    } else {
      this.setState({
        checked: false
      });
      unChecked(space);
    }
  }


  render() {
    const { space, checked } = this.state;

    return (
      <FormGroup check>
        <Input
          id={space.uid}
          name={space.name}
          type="checkbox"
          checked={checked}
          onChange={this.handleChange.bind(this)}
        />
        <Label for={space.uid}>
          {space.name}
        </Label>
      </FormGroup>
    );
  }
}

SelectSpace.defaultProps = {
  space: {},
  selected: [],
  item: {},
  onChecked: () => {},
  unChecked: () => {}
};

export default SelectSpace;
