## School Test Site

This is combined of two apps, one app is a java "server side" which takes all of the tests from the Google Excel of the test schedule and exports them for each grade, onto a firebase database.

And this website which used to showcase the tests on a website, nicely organized and stuff.

Each test is built from 5 key properties:

`dueDate`: the time the test is set on for, as system time (e.g. ms since Sep 1st 1970)

`subject`: name of the subject, obviously

`type`: Type of the test (e.g. Bagrot, Matconet, etc)

`classNums`: An array of numbers representing which classes have that test, since usually on middle school they have class specific test, if it's the entire grade it would be a one element array with -1

`gradeNum`: Grade number, (e.g. Grade 7,8,9)

There's also a details property for comments later on about which lessons is it on, etc etc - might be removed currently is unused

## Java "Server Side"

Basically, the way i get the tests from the excel file, is by simply downloading the excel file using Google Drive API

Running over the entire excel document, checking each cell for two things to contain in it:

A name of a subject, and a type of test [see here](constants/constants.ts),
If I detect those things in that specific cell on the file, I go to the most right column of the spreadsheet where the dates are at and parse the date from there.

After that, I check the column it shows at, and if it shows on multiple columns in the same row, and by the index of the column, I can get which classes are getting the test, If it's a test universal to the whole grade, I just put a -1 in the classNums array

Every time it runs and checks the whole thing, it compares the tests loaded to the tests stored in the local JSON file, and removes/adds tests accordingly from the database and json file.

This could theoretically work as a server side application, It's just that I don't have any hosting to run it on so it just runs every time my computer turns on (and by that, we get daily updates 😎)
