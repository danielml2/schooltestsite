import React from "react";
import OptionSelect from "./optionselect"
import { subjects, testTypes, gradeNums, classNums } from "../../constants/constants"

interface InputProps {
    sendInput: (value: any) => void
}
 
interface InputState {
    subjectFilter: String 
    gradeFilter: number
    classNumFilter: number
    typeFilter: String
}
 
class Input extends React.Component<InputProps, InputState> {
  
    constructor(props: InputProps) {
        super(props);
    }

    state = {
        subjectFilter: "ALL",
        gradeFilter: 11,
        classNumFilter: -1,
        typeFilter: "ALL"
    }
    

    render() { 
      
        return <div>Subjects: <OptionSelect mapOptions={subjects} onChange={this.onSubjectChange.bind(this)}></OptionSelect>
            <OptionSelect mapOptions={testTypes} onChange={this.onTypeChange.bind(this)}></OptionSelect>
            <OptionSelect arrOptions={classNums} onChange={this.onClassNumChange.bind(this)}></OptionSelect>
            <OptionSelect  mapOptions={gradeNums} onChange={this.onGradeChange.bind(this)}></OptionSelect>
            <input type="button" value="Search" onClick={this.send.bind(this)}></input>
        </div>
    }

    send() {
        this.props.sendInput(this.state);
    }

    onSubjectChange(value: any) {
        this.setState({subjectFilter: value})
    }

    onClassNumChange(value : any) {
        if(value == "שכבתי")
            value = -1;
        this.setState({ classNumFilter: value})
    }

    onTypeChange(value : any) {
        this.setState({typeFilter:value })
    }

    onGradeChange(value : any) {
        this.setState({ gradeFilter: value })
    }

    getFilters() {
        return this.state;
    }

}
 
export default Input;