import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import React from "react";

interface TestData {
    subject: String
    type: String
    dueDate: number
    classNums: number[]
    gradeNum: number
    details?: string

}
 
 
class Test extends React.Component<TestData,TestData> {

    constructor(props : TestData) {
        super(props);
    }
   
    render() {
     
        return <div>
            <h3>Grade ({this.props.gradeNum}) {this.props.type}: {this.props.subject}</h3>
            {displayClassNums(this.props.classNums)} {this.renderDate()}
        </div>;
    }

    renderDate() {
        if(this.props.dueDate == undefined) return;
        let date = new Date(this.props.dueDate)
        const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
        const da = new Intl.DateTimeFormat('he', { day: '2-digit' }).format(date)
        return <div>{da} {mo}</div>
    }

    getSubject() {
        return this.props.subject;
    }

    
}
 function displayClassNums(classNums : number[]) {
    let display = ""
    if(classNums === undefined)
        return display;
    classNums.forEach((num) => {
        if(num == -1) display += "ALL"
        else display += num + ","
    })
    return display;
}
export default Test;