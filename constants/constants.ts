const subjectMajorsB: Map<string, string> = new Map([
  ["PHYSICS", "פיזיקה"],
  ["SPORTS", "ספורט/חדר כושר"],
  ["ARABIC", "ערבית"],
  ["PHILOSOPHY", "פילוסופיה"],
  ["THEATER", "תיאטרון"],
])


const subjectMajorsA: Map<string, string> = new Map([
  ["CHEMISTRY", "כימיה"],
  ["CS", "מדעי המחשב"],
  ["PSYCHOLOGY", "פסיכולוגיה"]
])

const bothMajors: Map<string, string> = new Map([
  ["FILM", "תקשורת"],
  ["BIOLOGY", "בילוגיה"],
  ["GEOGRAPHY", "גיאוגרפיה"]
])

const extraNamesForMajors: Map<string,string[]> = new Map([
    ["SPORTS",["ANATOMY"]]
])

const majors: Map<string, string> = new Map([
  ...subjectMajorsA,
  ...subjectMajorsB,
  ...bothMajors
])


const subjects: Map<String, String> = new Map([
  ["ALL", "כל המקצועות"],
  ...subjectMajorsB,
  ...subjectMajorsA,
  ...bothMajors,
  ["MEKRA", "תנך"],
  ["MATH", "מתמטיקה"],
  ["HEBREW", "עברית"],
  ["HISTORY", "היסטוריה"],
  ["TAVURA", "תיאוריה"],
  ["OTHER", "אחר"],
  ["MAGAMOT_B", "אשכול ב"],
  ["MAGAMOT_A", "אשכול א"],
  ["SAFROT", "ספרות"],
  ["ENGLISH", "אנגלית"],
  ["CITIZENSHIP", "אזרחות"],
  ["SCIENCE", "מדעים"],
  ["TARBUT_ISRAEL", "תרבות ישראל"],
]);



const testTypes: Map<String, String> = new Map([
  ["ALL", "הכל"],
  ["BAGROT", "בגרות"],
  ["MATCONET", "מתכונת"],
  ["TEST", "מבחן"],
  ["QUIZ", "בוחן"],
  ["SECOND_DATE", "מועד ב"],
]);

const gradeNums: Map<number, String> = new Map([
  [-1,"כל השכבות"],
  [7, "שכבה ז"],
  [8, "שכבה ח"],
  [9, "שכבה ט"],
  [10, "שכבה י"],
  [11, "שכבה יא"],
  [12, "שכבה יב"],
]);

const classNums: any[] = ["שכבתי",1,2,3,4,5,6,7,8];

export { subjects, testTypes, classNums, gradeNums, subjectMajorsA, subjectMajorsB, bothMajors,extraNamesForMajors, majors};
