import React from "react";

interface FilterInputProps {
  mapOptions?: Map<any, String>;
  arrOptions?: any[];
  startValue?: any;
  onChange: (value: any) => void;
}

class OptionSelect extends React.Component<FilterInputProps> {

  constructor(props: FilterInputProps) {
    super(props)
  }

  render() {
    return (
        <select className="dark:text-black" onChange={this.onSelect.bind(this)}>
          {this.renderOptions()}
        </select>
    );
  }

  onSelect(event: any) {
      this.props.onChange(event.target.value);
  }

  renderOptions() {
    let arr: any[] = [];
    if (this.props.mapOptions != undefined)
      this.props.mapOptions.forEach((value, key) => { 
        if(key == this.props.startValue) {
          arr.push(<option style={{ direction: "rtl"}} key={key} value={String(key)} selected={true}>{value}</option>)
        } 
        else 
            arr.push(<option style={{ direction: "rtl"}} key={key} value={String(key)}>{value}</option>)
  });
   if (this.props.arrOptions != undefined)
      return this.props.arrOptions.map((value) => {
        if(value === this.props.startValue) {
          return (<option style={{ direction: "rtl"}} key={value} value={value} selected={true}>{value}</option>)
        }

        return (<option style={{ direction: "rtl"}} key={value} value={value} >{value}</option>)
      });
    return arr;
  }
}

export default OptionSelect;
