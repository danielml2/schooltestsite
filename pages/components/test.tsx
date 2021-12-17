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
     
        return <div className="test">
            <div>Grade ({this.props.gradeNum}) {this.props.type}: {this.props.subject}</div>
            <div>{displayClassNums(this.props.classNums)}</div>
            {this.renderDate()}
        </div>;
    }

    renderDate() {
        if(this.props.dueDate == undefined) return;
        let date = new Date(this.props.dueDate)
        const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
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
    classNums.forEach((num,index) => {
        if(num == -1) display += "ALL"
        else {
            display += num;
            if(index != classNums.length-1) display += ", "
        }
    })
    return display;
}
export default Test;