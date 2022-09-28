## School Test Site
[![wakatime](https://wakatime.com/badge/user/e02dbcc1-d0c7-4388-997f-0f0b3d73eaac/project/fb82c312-1181-419a-bf6a-6cdf40cc4664.svg)](https://wakatime.com/badge/user/e02dbcc1-d0c7-4388-997f-0f0b3d73eaac/project/fb82c312-1181-419a-bf6a-6cdf40cc4664)

### What is this project?
This, as the name of the repository says, is a site where people can view all of the tests they have coming up and in the test schedule generally.

This is combined of two apps, one app is a [java "server side"](https://github.com/danielml2/TestSyncer) which takes all of the tests from the excel file of the test schedule and exports them for each grade, onto a firebase database, and essentially syncs it up with any changes that happen to the test schedule.

And this is where it shows the tests on a website, nicely organized and stuff.

### Why do this?
Honestly, just for fun & it's good practice for web development, and also gives something back for people to use in the school and all that.

however, this is 100% out of my own free time and other than that i don't get much from it, so I'm not obligated to keep this up 100% of the time, total time spent on this website project alone - can be seen on the wakatime badge.

### Technical details

Each test is built from 5 key properties:

`dueDate`: the time the test is set on for, as system time (e.g. ms since Sep 1st 1970)

`subject`: name of the subject, obviously

`type`: Type of the test (e.g. Bagrot, Matconet, etc)

`classNums`: An array of numbers representing which classes have that test, since usually on middle school they have class specific test, if it's the entire grade it would be a one element array with -1

`gradeNum`: Grade number, (e.g. Grade 7,8,9)

and 2 extra mostly debug values:

`manuallyCreated`: whether the test was manually created by me and not by the syncer (Usually manually adding is only when there's wrong detection of a test, or is a situation the syncer doesn't know how to handle)

`creationText`: Shows to the users what text was in the spreadsheet cell that the syncer detected it from and added to the database

## [Java "Server Side"](https://github.com/danielml2/TestSyncer)

Basically, the way i get the tests from the excel file, is by simply downloading the excel file using Google Drive API

Running over the entire excel document, checking each cell for two things to contain in it:

A name of a subject, and a type of test [see here](constants/constants.ts),
If I detect those things in that specific cell on the file, I go to the most right column of the spreadsheet where the dates are at and parse the date from there.

After that, I check the column it shows at, and if it shows on multiple columns in the same row, and by the index of the column, I can get which classes are getting the test, If it's a test universal to the whole grade, I just put a -1 in the classNums array

Every time it runs and checks the whole thing, it compares the tests loaded to the tests stored in currently in the database to the newly "more updated" version that it gets from the excel file.

This could be hosted as a server-side application, but since i don't have any hosting it currently, it is more like a "server-side" in quotes since i just run it manually and sync it up.
