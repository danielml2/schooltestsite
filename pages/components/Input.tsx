import React from "react";
import OptionSelect from "./optionselect"
import { subjects, testTypes, gradeNums, classNums } from "../../constants/constants"

interface InputProps {
    sendInput: (value: any) => void
}
 
interface InputState  {
    subject: String 
    grade: number
    classNum: number
    testType: String
    includeHistory: boolean
}
 
class Input extends React.Component<InputProps, InputState> {
  
    constructor(props: InputProps) {
        super(props);
    }
    
    async componentDidMount() {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString)
        params.forEach((value, key) => console.log(key + ": " + value))

        let filterParams = {
            subject: !params.has("subject") ? "ALL" : String(params.get("subject")),
            grade: !params.has("grade") ?  -1 : Number(params.get("grade")),
            classNum: !params.has("classNum") ? -1 : Number(params.get("classNum")),
            testType: !params.has("testType") ? "ALL" : String(params.get("testType")),
            includeHistory: !params.has("includeHistory") ? false : Boolean(params.get("includeHistory")),
        }
        this.setState(filterParams)
        this.props.sendInput(filterParams)
    }

    render() { 
        if(this.state == undefined)
            return <div>Loading...</div>
      
        return <div className="collapse collapse-plus">
        <input type="checkbox" /> 
        <div style={{ direction: "rtl"}} className="collapse-title  text-xl font-medium text-white">
            הגדרות סינון
        </div>
        <div className="collapse-content"> 
        <div style={{ direction: "rtl"}} className="mx-auto">
            <OptionSelect mapOptions={subjects} onChange={(val) => this.onFilterChange("subject", val)} startValue={this.state.subject}></OptionSelect>

            <OptionSelect mapOptions={testTypes} onChange={(val) => this.onFilterChange("testType", val)} startValue={this.state.testType}></OptionSelect>

            <OptionSelect arrOptions={classNums} onChange={(val) => this.onFilterChange("classNum", val)} startValue={this.state.classNum}></OptionSelect>

            <OptionSelect  mapOptions={gradeNums} onChange={(val) => this.onFilterChange("grade", val)} startValue={this.state.grade}></OptionSelect>
            <div style={{ direction: "rtl"}}>
            <input type="checkbox" onChange={(event) => this.onFilterChange("includeHistory", event.target.checked) } checked={this.state.includeHistory}></input> 

            
            <label style={{ direction: "rtl"}} className="text-white text-center">
                להראות מבחנים קודמים להיום?
            </label>
            </div>
        </div>
        </div>
        </div>;
        
        
    }

    onFilterChange(key: string, value: any) {
        if(value == "שכבתי")
             value = -1;
        
        const defaultValues = ["ALL", -1, "שכבתי","-1",false]

       let newState = this.state;
       (newState as any)[key] = value;
       this.setState(newState, () => {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString)

        if(defaultValues.includes(value))
            params.delete(key)
        else
            params.set(key, value)

        window.history.replaceState(null,'', "?"+params.toString())
        this.props.sendInput(this.state);
    })
    }

}
 
export default Input;