const subjects: Map<String, String> = new Map([
  ["ALL", "כל המקצועות"],
  ["PHYSICS", "פיזיקה"],
  ["MEKRA", "תנך"],
  ["MATH", "מתמטיקה"],
  ["CS", "מדעי המחשב"],
  ["BIOLOGY", "בילוגיה"],
  ["HEBREW", "עברית"],
  ["HISTORY", "היסטוריה"],
  ["TAVURA", "תיאוריה"],
  ["CHEMISTRY", "כימיה"],
  ["PHILOSOPHY", "פילוסופיה"],
  ["OTHER", "אחר"],
  ["MAGAMOT_B", "אשכול ב"],
  ["MAGAMOT_A", "אשכול א"],
  ["SAFROT", "ספרות"],
  ["ENGLISH", "אנגלית"],
  ["CITIZENSHIP", "אזרחות"],
  ["SPORTS", "חדר כושר"],
  ["THEATER", "תיאטרון"],
  ["ARABIC", "ערבית"],
  ["GEOGRAPHY", "גיאוגרפיה"],
  ["PSYCHOLOGY", "פסיכולוגיה"],
  ["FILM", "תקשורת"],
  ["SCIENCE", "מדעים"],
  ["TARBUT_ISRAEL", "תרבות ישראל"],
  ["ANATOMY", "אנטומיה"],
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
  [7, "'שכבה ז"],
  [8, "'שכבה ח"],
  [9, "'שכבה ט"],
  [10, "'שכבה י'"],
  [11, "'שכבה יא"],
  [12, "'שכבה יב"],
]);

const classNums: any[] = ["שכבתי",1,2,3,4,5,6,7,8];

export { subjects, testTypes, classNums, gradeNums };
