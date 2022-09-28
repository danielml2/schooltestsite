import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { loadLastUpdated } from "../firebase/firebase";
import TestList from "./components/views/TestList";

const Home: NextPage = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    loadLastUpdated(setLastUpdated.bind(this))
  }, []);

  return (
    <div>
      <Head>
        <title>SchoolTests - לוח מבחנים</title>
      </Head>
      <div className="min-h-screen  bg-[#263238] overflow-hidden flex justify-center">
      <div className="flex flex-col"> 
      <div style={{ direction: "rtl"}} className="text-xl text-white text-center font-bold mt-10">עודכן לאחרונה ב-{displayLastUpdate()}</div>
      <div className="flex flex-row justify-center">
        <a className="mr-5 mt-2" href="https://github.com/danielml2/schooltestsite"><img src="github.svg"></img></a>
        <a href="מבורך" style={{ direction: "rtl"}} className="text-md text-white text-center font-bold mt-2">נוצר על ידי דניאל :)</a>
      </div>
    
      <TestList></TestList>
      </div>
    </div>
    </div>
    
     
  );

  function displayLastUpdate() {
    if(lastUpdated == "")
        return "..."

      
      let date = new Date(lastUpdated);
      let day = new Intl.DateTimeFormat('he', { dateStyle: "full"}).format(date)
      let hour = new Intl.DateTimeFormat('he', { hour: "2-digit", minute: "2-digit", second: "2-digit"}).format(date)
      return day + " בשעה " + hour;
  }
};

export default Home;
