import { getDatabase, onValue, ref, DataSnapshot} from "firebase/database";
import { initializeApp } from "firebase/app";
const app = initializeApp({
    apiKey: "AIzaSyDIsnhdo4bc6-vFu24Hah9BGdfMb61aXeE",
    authDomain: "schooltests-419f5.firebaseapp.com",
    databaseURL: "https://schooltests-419f5-default-rtdb.europe-west1.firebasedatabase.app/"
})

const db = getDatabase(app);


const loadTests = async (updateTests : (snapshot: any) => void) => {
    onValue(ref(db, "tests/"), (snapshot) => updateTests(reloadTests(load(snapshot))))
}

function load(snapshot: DataSnapshot) {
    let snap = snapshot.val();
    // We can seperate the grades to each be an element in an array via the object's properties
    let newArr: any[] = Object.keys(snap).map((key) => {
        let obj = snap[key];
        return obj;
    }); 
    return newArr;
}

function reloadTests(snapshot: any[]) {
    // Since basically every test is like a property key in the database, we can loop over the keys and get the test objects from there
    let tests = [];
    for(let grade of snapshot) {
        let newArr: any[] = Object.keys(grade).map((key) => {
            let obj = grade[key];
            return obj;
        }).filter((value) => value != "t");
     tests.push(...newArr)
    }
    return tests;    
}

export {loadTests, db}