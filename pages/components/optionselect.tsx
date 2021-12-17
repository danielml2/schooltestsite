import React from "react";

interface FilterProps {
  mapOptions?: Map<any, String>;
  arrOptions?: any[];
  onChange?: (value: any) => void;
}

class OptionSelect extends React.Component<FilterProps> {
  render() {
    return (
      <div>
        <select className="searchSelect" onChange={this.onSelect.bind(this)}>
          {this.renderOptions()}
        </select>
      </div>
    );
  }

  onSelect(event: any) {
    if (this.props.onChange != undefined)
      this.props.onChange(event.target.value);
  }

  renderOptions() {
    let arr: any[] = [];
    if (this.props.mapOptions != undefined)
      this.props.mapOptions.forEach((value, key) =>
        arr.push(<option key={key} value={String(key)}>{value}</option>)
      );
    if (this.props.arrOptions != undefined)
      return this.props.arrOptions.map((value) => (
        <option key={value} value={value}>{value}</option>
      ));
    return arr;
  }
}

export default OptionSelect;
