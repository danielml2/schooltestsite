import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, DataSnapshot, get } from "firebase/database";
import { getFirestore, addDoc, collection} from "firebase/firestore" 


const loadApp = (): FirebaseApp => {
    if(getApps().length <= 0) {
        return initializeApp({
            apiKey: "AIzaSyDIsnhdo4bc6-vFu24Hah9BGdfMb61aXeE",
            authDomain: "schooltests-419f5.firebaseapp.com",
            databaseURL: "https://schooltests-419f5-default-rtdb.europe-west1.firebasedatabase.app/",
            projectId: "schooltests-419f5"
        })
    } else {
        return getApp();
    }
}


let firebaseApp: FirebaseApp = loadApp();

const realTimeDB = getDatabase(firebaseApp);
const firestoreDB = getFirestore(firebaseApp)

const loadTests = async (year: string, updateTests : (snapshot: any) => void) => {
    get(ref(realTimeDB, `years/${year}/tests/`)).then((snapshot) => updateTests(detachObjectsFromKeys(load(snapshot))));
}

const addReport = async (report: any, finishedCallback: () => void) => {
    await addDoc(collection(firestoreDB, "reports"), report).then(() => finishedCallback());
}

const loadLastUpdated = (setLastUpdated: React.Dispatch<React.SetStateAction<string>>) => {
    get(ref(realTimeDB, "last_update")).then((snapshot) => {
        setLastUpdated(snapshot.val())
    })
}

const getTest = (dbID: string, gradeNum: number, year: string, returnCallback: (snapshot: any) => void) => {
    get(ref(realTimeDB, `years/${year}/tests/grade${gradeNum}/${dbID}/`)).then((snapshot) => {
        returnCallback(snapshot.val())
    })
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

const loadChanges = async (limit: any,updateChanges : (snapshot: any) => void)  => {
    get(ref(realTimeDB,"changes/")).then((snasphot) => updateChanges(detachObjectsFromKeys((load(snasphot)))))
}

function detachObjectsFromKeys(snapshot: any[]) {
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

export {loadTests, loadChanges, loadLastUpdated, getTest, addReport}