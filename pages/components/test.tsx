import { bodyStreamToNodeStream } from "next/dist/server/body-streams";
import React from "react";
import { gradeNums, subjects, testTypes } from "../../constants/constants";

interface TestData {
    subject: String
    type: String
    dueDate: number
    classNums: number[]
    gradeNum: number
    details?: string
    upcomingStyle?: boolean

}
 
 
class Test extends React.Component<TestData,TestData> {

    constructor(props : TestData) {
        super(props);
    }
   
    render() {
        if(this.props.upcomingStyle) {
            return <div className="card h-50 bg-[#fa4371] shadow-xl mt-1 mx-2">
            <div className="card-body inverse">
                {this.renderTestBody()}
            </div>
        </div>
        }

        return <div className="card h-50 bg-[#5aaef2] shadow-xl mt-5 mx-2">
        <div className="card-body inverse">
            {this.renderTestBody()}
        </div>
    </div>;
    }

    renderTestBody() {
        let body = [];

        if(this.props.upcomingStyle)
            body.push(<div className="card-title font-bold inverse">{gradeNums.get(this.props.gradeNum)} - {testTypes.get(this.props.type)} {subjects.get(this.props.subject)}</div>)
        else
            body.push(<div className="card-title inverse">{gradeNums.get(this.props.gradeNum)} - {testTypes.get(this.props.type)} {subjects.get(this.props.subject)}</div>)
        body.push( <div className="">{this.displayClassNums(this.props.classNums)}</div>)
        body.push(this.renderDate())   
           
       return body;  
    }

    renderDate() {
        if(this.props.dueDate == undefined) return;
        let date = new Date(this.props.dueDate)
        let mo = new Intl.DateTimeFormat('he', { month: 'long' }).format(date)
        let da = new Intl.DateTimeFormat('he', { day: 'numeric' }).format(date)
        let days: any = Math.round((date.getTime() - new Date().getTime()) / 86400000)
        if(days <= 0) 
            days = "היום"
        else if(days == 1)
            days = "מחר"
        else 
            days = "(עוד " + days +  "  ימים)"        

        return <div className="flex flex-row font-bold">ב-{da} {mo} &nbsp;<div className=" font-normal italic">{days}</div></div>
    }
    
    displayClassNums(classNums : number[]) {
        let display = "לכיתות: "
        if(classNums === undefined)
            return "לא נטען. אין כיתות?";   

        let isEveryone = false;    
        classNums.forEach((num,index) => {
            if(num == -1 && !isEveryone) display = "שכבתי"
            else if(!isEveryone) {
                display += num;
                if(index != classNums.length-1) display += ", "
            }
        })
        return display;
    }
}
export default Test;