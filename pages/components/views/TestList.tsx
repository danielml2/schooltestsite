import React from "react";
import { loadTests, db } from "../../../firebase/firebase";
import Test from "../test";
import Input from "../Input";
import { testTypes } from "../../../constants/constants";



class TestList extends React.Component {
  state = {
    tests: [],
    displayTests: [],
  }

  render() {
    if((this.state.tests == undefined || this.state.tests.length <= 0)) {
      return <div>Loading...</div>
    }

  
    return (
      <div className="">
        <Input sendInput={this.filterTests.bind(this)}></Input>
        <div style={{ direction: "rtl"}} className="text-white text-center">כלל התוצאות: {this.state.tests && this.state.displayTests.length} (מתוך {this.state.tests && this.state.tests.length} סהכ מבחנים)</div>
        <div>
        {this.state.displayTests && this.renderTests(this.state.displayTests)}
        </div>
        <div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    
    await loadTests("2022-2023", this.setTests.bind(this));

  };


  filterTests(filters: any) {
      console.log(filters)
    if(filters == undefined)
          return;  
    let filtered = this.state.tests.filter(value => {
        // i hate that i have to do the casting for each type here but typescript is big dumb so i have to, and yeah
        let subjectFilter = filters.subjectFilter == "ALL" ? true : String(value["subject"]) == filters.subjectFilter

        let classFilter = (filters.classNumFilter == -1) ? true : this.numberArray(value["classNums"]).includes(Number(filters.classNumFilter)) || this.numberArray(value["classNums"]).includes(-1)
        let gradeFilter = Number(value["gradeNum"]) == filters.gradeFilter || filters.gradeFilter == -1;
        let typeFilter = filters.typeFilter == "ALL" ? true : String(value["type"]) == filters.typeFilter

        let historyFilter = filters.includeHistory ? true : new Date().getTime() < value["dueDate"];

        return subjectFilter && classFilter && gradeFilter && typeFilter && historyFilter;
    }) 
    this.setState({ displayTests: filtered.sort((a,b) => a["dueDate"] - b["dueDate"])})
  }

  numberArray(arr: any[]) {
      return arr.map(Number)
  }

  setTests(snapshot: any[]) {
    this.setState({ tests: snapshot, displayTests: snapshot.sort((a,b) => a["dueDate"] - b["dueDate"]) });
  }
  renderTests(tests: any[]) {
    return tests.map((test, index) => <Test key={index} {...test}></Test>);
  }
}

export default TestList;
