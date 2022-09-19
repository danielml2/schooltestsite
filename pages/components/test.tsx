import React from "react";

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
            return <div className="card h-75 bg-[#fa4371] shadow-xl mt-1 mx-2">
            <div className="card-body">
                <div className="card-title font-bold">Grade ({this.props.gradeNum}) {this.props.type}: {this.props.subject}</div>
                <div className="">{displayClassNums(this.props.classNums)}</div>
                {this.renderDate()}
            </div>
        </div>
        }

        return <div className="card h-50 bg-[#5aaef2] shadow-xl mt-5 mx-2">
        <div className="card-body">
            <div className="card-title ">Grade ({this.props.gradeNum}) {this.props.type}: {this.props.subject}</div>
            <div className="">{displayClassNums(this.props.classNums)}</div>
            {this.renderDate()}
        </div>
    </div>;
    }

    renderDate() {
        if(this.props.dueDate == undefined) return;
        let date = new Date(this.props.dueDate)
        const mo = new Intl.DateTimeFormat('he', { month: 'long' }).format(date)
        const da = new Intl.DateTimeFormat('he', { day: '2-digit' }).format(date)
        return <div className="">{da} {mo}</div>
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