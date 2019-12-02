import React, {
  Component
} from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      item: props.item
    });
  }

  render() {
    const { item } = this.state;
    const { onSelect } = this.props;
    return (
      <tr onClick={onSelect}>
        <td>{item.teach_org_id}</td>
        <td>{item.Id}</td>
        <td><div>{item.fileName}</div></td>
        <td className="text-center">{}
        </td>
        <td className="text-center">
          {
            item.storageKey ? "Yes" : "No"
          }
        </td>
        <td>{item.infoTypeName}</td>
        <td className="text-center">
          {
            item.spaces && item.spaces.length > 0 ? item.spaces.length : 0
          }
        </td>
        <td>{item.name_id}</td>
        <td>{item.package}</td>
      </tr>
    );
  }
}

Item.defaultProps = {
  item: {},
  onSelect: () => {}
};

export default Item;
