import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { getTest, addReport } from "../firebase/firebase";
import Test from "./components/test";

function ReportPage() {

    const [testID, setTestID] = useState("");
    const [test, setTest]: any = useState();
    const [reportState, setReportState] = useState("Loading");
    const [details, setDetails] = useState("")
    const [issueType, setIssueType] = useState("TWO_TESTS")
    const [grade, setGrade] = useState(0)

    const inputRef = React.createRef();

    let [disableInput, setDisabled] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        if(!params.has("testID") || !params.has("grade"))
        {
            setReportState("InvalidOrFailed")
            return;
        } 

        let testID = String(params.get("testID"))
        let grade = Number(params.get("grade"))

        setGrade(grade)
        setTestID(testID)
        getTest(testID, grade, "2022-2023", (snapshot) => {
            setTest(snapshot)
            setReportState("FinishedLoading")
        })

    }, [])

    if((test == null || test == undefined) && reportState == "Loading") {
        return <div className="min-h-screen  bg-[#263238] overflow-hidden flex justify-center text-3xl text-white">
            <div className="mt-20">Loading...</div></div>
    } else if(test == null || test == undefined) {
        return <div className="min-h-screen  bg-[#263238] overflow-hidden flex justify-center text-3xl text-white">
            <div className="mt-20">Invalid ID or missing arguments</div>
        </div>
    } else if(reportState == "Submitted") {
        return <div className="min-h-screen  bg-[#263238] overflow-hidden flex justify-center text-3xl text-white">
            <div className="flex flex-col">
                <div className="mt-20 inverse">תודה על העזרה!</div>
                <input className="btn mt-10" type="button" onClick={() => { history.back() }} value="לחזור לרשימה"></input>
            </div>
        </div>
    }

    return <div className="min-h-screen  bg-[#263238] overflow-hidden flex justify-center">
        <div className="flex flex-col inverse">
            <div className="inverse text-3xl text-white mt-5 text-center">דוח טעות בזיהוי מבחן</div>
            <Test {...test} upcomingStyle={false}></Test>
            <label className="text-white mt-10">מה הטעות שהייתה?</label>
            <select id="type"  onChange={(event) => setIssueType(event.target.value)} disabled={disableInput}>
                <option value="TWO_TESTS">יש שני מועדים בטקסט, ומזוהה רק אחד</option>
                <option value="SUBJECT_WRONG">מקצוע לא נכון</option>
                <option value="ALL_WRONG">כל הפרטים לא נכונים</option>
                <option value="CLASS_NUMS_WRONG">המספר כיתות של המבחן לא נכון</option>
            </select>
            <label className="text-white mt-5">מה אמור להיות במקום?</label>
            <textarea className="inverse" style={{ minHeight: "6rem"}} onChange={(event) => setDetails(event.target.value)} disabled={disableInput}></textarea>
            <input type="submit" onClick={() => onSubmit()} className="btn mt-5" value="שלח דוח תיקון"></input>
        </div>
    </div>

    function onSubmit() {
        let report = {
            grade: grade,
            testID: testID,
            issueType: issueType,
            details: details,
            timestamp: new Date().getTime()
        }  
        setDisabled(true)
        addReport(report, () => {
            setReportState("Submitted")
        });

    }

}



export default ReportPage