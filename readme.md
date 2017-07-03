# Calendar Web Part
## Coding Exercize by Jeremy Leff

Thank you for the opportunity to participate in this coding exercize!

### Overview

A working demo of the calendar web part can be viewed [here](http://www.jeremyleff.com/calendarwebpart).

Any code I have written can be viewed in one of three files:

 * default.aspx
 * Content/calendar.css
 * Scripts/calendar.js

Most of the heavy lifting is done in the JavaScript file.

### How It Works

The only libraries I used to assist me are jQuery and Bootstrap. The HTML was written as semantically and cleanly as possible and contains no presentation information. All styling is in the CSS file.

Change event callbacks are registered for the date and days controls. Once they both contain valid values, javascript is used to generate the HTML for the calendar and inject it into the DOM of the page.

After setting some initial variables, a hierchy of loops run, each checking to be sure that the number of requested days has been reached. The very outer most loop tracks the month, since each month with have a separate table. From there, the next loop manages the week of the month, or the row in the table, and finally a loop manages each day of the week, of which there are a fixed number at 7.

Logic is implemeted throughout the loop in order to control exit, and to ensure proper formatting of dates, weekends, and holidays.

Each time a value in the date or days input is change, the entire calendar is erased and regenerated.

The holidays are hard-coded as a JSON object. If you hover the mouse over a holiday on the calendar, a tooltip will display the name of that holiday.

### Known Issues

 * If the calendar spills over into a third year, it does not handle the third year and any subsequent years very gracefully. This seemed like an edge case and I didn't have time to debug it.

 * The bonus requirement of storing the date, days, and current user were also not met.

### What would I do differently?

 * This is not an actual SharePoint web part. Though this was not explicity stated in the requirements, I assume that was the final intent. However since I knew this would primarily be implemented client-side, I started out working on this in a simple CodePen before copying the code over to Visual Studio and commiting to Git. Given the 2 hour time limit and the fact that I didn't have a SharePoint development environment already setup and ready to go, I opted to focus on the code, which were largely remain unchanged if this were to be packaged in an actual SharePoint application.
 * I would probably refactor this code to make it neater and more effecient.
 * I am not a fan of using JavaScript strings to inject large amounts of HTML into the DOM. As such, I would probably use a templating framework like HandleBars, or an app framework like Knockout or Angular, but that seemed overkill for this exercize.
 * I would make a RESTful call to the SharePoint WebAPI to store the user data in a list, and to retrieve it on initial page load.
 * I would also store the holidays in a SharePoint list, and use WebAPI to pull those down.

### Final Thoughts

This was a fun project to work on. In fact I was enjoying it so much that I lost track of time and went slightly over the time limit. I would say I spent about 2.5 hours coding. That does not include time spent publishing the working demo, the code the GitHub, or writing this document, which was probably another half hour.

If you have any questions feel free to reach out to me at jeremy@jeremyleff.com or 334-444-3499.
Thanks!