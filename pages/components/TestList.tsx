import React, { ChangeEventHandler } from "react";
import { loadTests, db } from "../../firebase/firebase";
import Test from "./test";
import TestData from "./test";
import Input from "./Input";
import InputState from "./Input"
import { testTypes } from "../../constants/constants";
class TestList extends React.Component {
  state = {
    tests: [],
    displayTests: [],
    filterSubject: "",
  };

  render() {
    return (
      <div>
        <h1>Total Tests: {this.state.tests && this.state.displayTests.length}</h1>{" "}
        <Input sendInput={this.onSearch.bind(this)}></Input>
        <br />
        {this.state.displayTests && this.renderTests(this.state.displayTests)}
        <br />
      </div>
    );
  }

  async componentDidMount() {
    await loadTests(this.setTests.bind(this));
  }

  onSearch(filters: any) {
      console.log(filters)
    let filtered = this.state.tests.filter(value => {
        // i hate that i have to do the casting for each type here but typescript is big dumb so i have to, and yeah
        let subjectFilter = filters.subjectFilter == "ALL" ? true : String(value["subject"]) == filters.subjectFilter

        let classFilter = (filters.classNumFilter == -1) ? true : this.numberArray(value["classNums"]).includes(Number(filters.classNumFilter)) || this.numberArray(value["classNums"]).includes(-1)
        let gradeFilter = Number(value["gradeNum"]) == filters.gradeFilter || filters.gradeFilter == -1;
        let typeFilter = filters.typeFilter == "ALL" ? true : String(value["type"]) == filters.typeFilter

        return subjectFilter && classFilter && gradeFilter && typeFilter;
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
