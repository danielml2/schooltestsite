import React from "react";
import { loadTests } from "../../../firebase/firebase";
import Test from "../test";
import Input from "../Input";
import { subjectMajorsB, subjectMajorsA, testTypes, bothMajors } from "../../../constants/constants";



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
        <div style={{ direction: "rtl"}} className="text-white text-center">כלל התוצאות: {this.state.tests && this.state.displayTests.length} (מתוך {this.state.tests && this.state.tests.length} סהכ מועדים)</div>
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
    if(filters == undefined)
          return; 
    let filtered = this.state.tests.filter(value => {
        // i hate that i have to do the casting for each type here but typescript is big dumb so i have to, and yeah
        let subjectFilter;
        if(this.isMajorSubject(filters.subject)) {
            subjectFilter = this.unselectedMajorFilter(filters, value["subject"])
        } else if(filters.grade >= 10 && filters.majorA != undefined && filters.majorA != "NONE" && filters.majorB != undefined && filters.majorB != "NONE") {
          subjectFilter = this.selectedMajorFilter(filters, value["subject"])
        }
        else 
            subjectFilter = filters.subject == "ALL" ? true : String(value["subject"]) == filters.subject

        let classFilter = (filters.classNum == -1) ? true : this.numberArray(value["classNums"]).includes(Number(filters.classNum)) || this.numberArray(value["classNums"]).includes(-1)
        let gradeFilter = Number(value["gradeNum"]) == filters.grade || filters.grade == -1;
        let typeFilter = filters.testType == "ALL" ? true : String(value["type"]) == filters.testType

        let historyFilter = filters.includeHistory ? true : new Date().getTime() <= value["dueDate"];

        return subjectFilter && classFilter && gradeFilter && typeFilter && historyFilter;
    }) 
    this.setState({ displayTests: filtered.sort((a,b) => a["dueDate"] - b["dueDate"])})
  }

  numberArray(arr: any[]) {
      return arr.map(Number)
  }

  isMajorSubject(subject: string) {
    return subject.includes("MAGAMOT") || subjectMajorsB.has(subject) || subjectMajorsA.has(subject) || bothMajors.has(subject);
  }

  unselectedMajorFilter(filters: any, testSubject: any) {
    
      return (filters.subject == "MAGAMOT_A" && (subjectMajorsA.has(testSubject) || bothMajors.has(testSubject))) 
      // If searching for ALL events relevant to major A/B, show all the tests that relate to the subjects that are on A/B
      || (filters.subject == "MAGAMOT_B" && (subjectMajorsB.has(testSubject) || bothMajors.has(testSubject)))
      || (filters.subject == testSubject) // If it's a major A/B event and we're looking for major a/b events
      || ((subjectMajorsA.has(filters.subject) || bothMajors.has(filters.subject)) && testSubject == "MAGAMOT_A") // Show all Major A events if the subject is a major A subject
      || ((subjectMajorsB.has(filters.subject) || bothMajors.has(filters.subject)) && testSubject == "MAGAMOT_B") // Show all Major B events if the subject is a major B subject
  }

  // I am not proud of this.
  selectedMajorFilter(filters: any, testSubject: any) {


    return testSubject == filters.subject ||
      filters.majorA == testSubject && (filters.subject == "ALL" || filters.subject == filters.majorA) ||
      filters.majorB == testSubject  && (filters.subject == "ALL" || filters.subject == filters.majorB) ||
      (testSubject == "MAGAMOT_A" && (subjectMajorsA.has(filters.majorA) || bothMajors.has(filters.majorA))) && (filters.subject == "ALL" || filters.subject == filters.majorA) ||
      (testSubject == "MAGAMOT_B" && (subjectMajorsB.has(filters.majorB) || bothMajors.has(filters.majorB))) && (filters.subject == "ALL" || filters.subject == filters.majorA) ||
      (!subjectMajorsA.has(testSubject) && !subjectMajorsB.has(testSubject) && !bothMajors.has(testSubject) && !(filters.grade == 12 && testSubject == "SAFROT" && filters.subject != "SAFROT") && filters.subject == "ALL")
  } 


  setTests(snapshot: any[]) {
    this.setState({ tests: snapshot, displayTests: snapshot.sort((a,b) => a["dueDate"] - b["dueDate"]) });
  }
  renderTests(tests: any[]) {
    if(tests.length == 0)
      return <div></div>
    let upcomingTest = tests[0]
    let upcomingTestDiv = [
    <div className="mt-5">
      <div style={{ direction: "rtl"}} className="mr-5 text-2xl text-[#fc2d62] text-right underline font-bold">המועד הקרוב הבא</div>
      <Test key={0}  {...upcomingTest} upcomingStyle={true}></Test>
      <hr className="mt-5"></hr>
    </div>
    ]

    return upcomingTestDiv.concat(tests.slice(1).map((test, index) => <Test key={index+1} {...test}></Test>));
  }
}

export default TestList;
