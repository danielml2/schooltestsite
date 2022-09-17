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
    includeHistory: boolean
    finished: boolean
}
 
class Input extends React.Component<InputProps, InputState> {
  
    constructor(props: InputProps) {
        super(props);
    }

    state = {
        subjectFilter: "ALL",
        gradeFilter: -1,
        classNumFilter: -1,
        typeFilter: "ALL",
        includeHistory: false,
        finished: false
    }

    
    async componentDidMount() {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString)
        params.forEach((value, key) => console.log(key + ": " + value))
        let filterParams = {
            subjectFilter: !params.has("subject") ? "ALL" : String(params.get("subject")),
            gradeFilter: !params.has("grade") ?  -1 : Number(params.get("grade")),
            classNumFilter: !params.has("classNum") ? -1 : Number(params.get("classNum")),
            typeFilter: !params.has("testType") ? "ALL" : String(params.get("testType")),
            includeHistory: !params.has("includeHistory") ? false : Boolean(params.get("includeHistory")),
            finished: true
        }
        this.setState(filterParams)
        console.log("component")
        this.props.sendInput(filterParams)
    }

    render() { 
        if(!this.state.finished)
            return <div>Loading...</div>
      
        return <div className="collapse collapse-plus">
        <input type="checkbox" /> 
        <div style={{ direction: "rtl"}} className="collapse-title  text-xl font-medium text-white">
            הגדרות סינון
        </div>
        <div className="collapse-content"> 
        <div style={{ direction: "rtl"}} className="mx-auto">
            <OptionSelect mapOptions={subjects} onChange={this.onSubjectChange.bind(this)} startValue={this.state.subjectFilter}></OptionSelect>
            <OptionSelect mapOptions={testTypes} onChange={this.onTypeChange.bind(this)} startValue={this.state.typeFilter}></OptionSelect>
            <OptionSelect arrOptions={classNums} onChange={this.onClassNumChange.bind(this)} startValue={this.state.classNumFilter}></OptionSelect>
            <OptionSelect  mapOptions={gradeNums} onChange={this.onGradeChange.bind(this)} startValue={this.state.gradeFilter}></OptionSelect>
            <div style={{ direction: "rtl"}}>
            <input  type="checkbox" onChange={this.onHistoryChange.bind(this)} checked={this.state.includeHistory}></input> 
            <label style={{ direction: "rtl"}} className="text-white text-center">
                להראות מבחנים קודמים להיום?
            </label>
            </div>
        </div>
        </div>
        </div>;
        
        
    }

    send() {
        this.props.sendInput(this.state);
    }

    onHistoryChange(value: any) {
      this.setState({ includeHistory: value.target.checked}, () => this.send())
    }

    onSubjectChange(value: any) {
        this.setState({subjectFilter: value}, () => this.send())
    }

    onClassNumChange(value : any) {
        if(value == "שכבתי")
            value = -1;
        this.setState({ classNumFilter: value}, () => this.send())
    }

    onTypeChange(value : any) {
        this.setState({typeFilter:value }, () => this.send())
    }

    onGradeChange(value : any) {
        this.setState({ gradeFilter: value }, () => this.send())
    }


}
 
export default Input;