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
    creationText?: string
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
        body.push(<span className="text-sm italic inverse"> נוצר מתוך הטקסט הזה: {"\""}{this.props.creationText}{"\""} <a href={this.reportLink()} className="text-md underline">תוצאה לא נכונה?</a></span>)
           
       return body;  
    }

    renderDate() {
        if(this.props.dueDate == undefined) return;
        let date = new Date(this.props.dueDate)
        let mo = new Intl.DateTimeFormat('he', { month: 'long' }).format(date)
        let da = new Intl.DateTimeFormat('he', { day: 'numeric' }).format(date)
        let days: any = Math.round((date.getTime() - new Date().getTime()) / 86400000)
        if(days <= 0) 
            days = "היום / עבר המועד"
        else if(days == 1)
            days = "מחר"
        else 
            days = "(עוד " + days +  "  ימים)"        

        return <div className="flex flex-row font-bold">ב-{da} {mo} &nbsp;<div className=" font-normal italic">{days}</div></div>
    }

    reportLink() {
        let params = new URLSearchParams()
        let date = new Date(this.props.dueDate)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        let newDate = ye + "_" + mo + "_" + da;

        params.set("testID", this.props.subject.toLowerCase() + "_" + this.props.type.toLowerCase() + "_" + newDate)
        params.set("grade", String(this.props.gradeNum))

        console.log(window.location.origin + "/report")
        return window.location.origin + "/report?" + params.toString() 
    }
    
    displayClassNums(classNums : number[]) {
        let display = "למספרי כיתות: "
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