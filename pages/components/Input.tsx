import React, { useRef } from "react";
import OptionSelect from "./optionselect"
import { subjects, testTypes, gradeNums, classNums, subjectMajorsA, bothMajors, subjectMajorsB } from "../../constants/constants"

interface InputProps {
    sendInput: (value: any) => void
}
 
interface InputState  {
    subject: String 
    grade: number
    classNum: number
    testType: String
    includeHistory: boolean
    majorA?: string,
    majorB?: string
}
 
class Input extends React.Component<InputProps, InputState> {
  
    majorRef: any;

    constructor(props: InputProps) {
        super(props);
        this.majorRef = React.createRef();
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
            majorA: !params.has("majorA") ? "NONE" : String(params.get("majorA")),
            majorB: !params.has("majorB") ? "NONE" : String(params.get("majorB"))
        }
        this.setState(filterParams, () => {
            if(this.state.grade >= 10)
                this.majorRef.current.classList.remove("hidden");
        })
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

            <OptionSelect  mapOptions={gradeNums} onChange={(val) => this.onGradeChange(val)} startValue={this.state.grade}></OptionSelect>
            <div style={{ direction: "rtl"}}>
            <input type="checkbox" onChange={(event) => this.onFilterChange("includeHistory", event.target.checked) } checked={this.state.includeHistory}></input> 

            
            <label style={{ direction: "rtl"}} className="text-white text-center">
                להראות מבחנים קודמים להיום?
            </label>
            <div id="majors" ref={this.majorRef} className="hidden mx-auto mt-5">
                <div style={{ direction: "rtl"}} className="text-lg text-white">
                לסנן לפי מגמות: {' '}
                </div>
                <div>
                    <OptionSelect mapOptions={new Map([["NONE","בחר אשכול א"],...subjectMajorsA, ...bothMajors])} onChange={(val) => this.onSubjectMajorChange(val, true)} startValue={this.state.majorA}></OptionSelect>
                    <OptionSelect mapOptions={new Map([["NONE","בחר אשכול ב"],...subjectMajorsB, ...bothMajors])} onChange={(val) => this.onSubjectMajorChange(val, false)} startValue={this.state.majorB}></OptionSelect>
                </div> 
                <div className="text-base text-white">(מילואי התיבות האלה, ובחירת ב-כל המקצועות ובמספר כיתה שלכם, יגרום לזה להראות את כל המבחנים הרלוונטים אליכם)</div>
            </div>
            </div>
        </div>
        </div>
        </div>;
        
        
    }

    onFilterChange(key: string, value: any) {
        if(value == "שכבתי")
             value = -1;
        
        const defaultValues = ["ALL", -1, "שכבתי","-1",false, undefined]

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
    })}

    onGradeChange(val: any) {
        if(val >= 10)
            this.majorRef.current.classList.remove("hidden")
        else {
            this.majorRef.current.classList.add("hidden")
            this.setState({
                majorA: "NONE",
                majorB: "NONE"
            }, () => {
                const queryString = window.location.search;
                const params = new URLSearchParams(queryString)
        
                params.delete("majorA")
                params.delete("majorB")
        
                window.history.replaceState(null,'', "?"+params.toString())
            })
        }  
        this.onFilterChange("grade", val)
    }

    onSubjectMajorChange(major: any, isA: boolean) {
        this.setState({
            majorA: isA ? major : this.state.majorA,
            majorB: !isA ? major : this.state.majorB
        }, () => {
            if(this.state.majorA != "NONE" && this.state.majorA != undefined && this.state.majorB != "NONE" && this.state.majorB != undefined)
            {
                const queryString = window.location.search;
                const params = new URLSearchParams(queryString)
        
                params.set("majorA", this.state.majorA)
                params.set("majorB", this.state.majorB)
        
                window.history.replaceState(null,'', "?"+params.toString())
                this.props.sendInput(this.state);
            }
        })
    }


}
 
export default Input;