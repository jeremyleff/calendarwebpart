$(function () {

    function getLastDayOfMonth(date) {

        d = new Date(date.getFullYear(), date.getUTCMonth() + 1, 0);
        return d.getDate();
    }

    // Checks to see if the date is a holday
    function isHoliday(month, day, year) {

        holidays = [{ month:  1, day:  1, year: 2013, occassion: "New Year's Day"   },
                    { month:  2, day: 20, year: 2013, occassion: "President's Day"  },
                    { month:  5, day: 28, year: 2013, occassion: "Memorial Day"     },
                    { month:  7, day:  4, year: 2013, occassion: "Independence Day" },
                    { month:  9, day:  3, year: 2013, occassion: "Labor Day"        },
                    { month: 11, day: 22, year: 2013, occassion: "Thanksgiving Day" },
                    { month: 12, day: 25, year: 2013, occassion: "Christmas Day"    }];

        month = month + 1;  // account for the UTC month offset

        for (var i = 0; i < holidays.length; i++) {
            if ((holidays[i].year == year)
                    && (holidays[i].month == month)
                    && (holidays[i].day == day)) {

                return holidays[i].occassion;
            }
            else {
                return "";
            }
        }
    }

    function generateCalendar() {

        // Clear out the previous calendar when the dates change
        $("#calContainer").html("");

        var startDate   = new Date($('#date').val());
        startDate.setDate(startDate.getDate() + 1);
        var startDOW    = startDate.getDay() + 1;           // The day of week that we start on
        var dom         = startDate.getDate();              // Day of month
        var lastDOM     = getLastDayOfMonth(startDate);     // Last day of the current month
        var days        = parseInt($("#days").val());;      // Total number of days requested
        var day         = 1;                                // Day counter, towards the total #
        var startMonth  = startDate.getMonth();
        var startYear   = startDate.getYear() + 1900;
        var year        = startYear;

        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        if (days > 0) {

            // Loop through each month as needed
            for (var month = startMonth; day <= days; month++) {

                if (month > 11 && year == startYear) {
                    month = month - 12;
                    year += 1;
                }

                // add a new table for each month
                $("#calContainer").append("<table class='calendar' id='year" + year + "month" + month + "'><thead><tr><th colspan='7'>" + monthNames[month] + " " + year + "</th></tr><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr></thead><tbody></tbody></table>");

                if (month > startMonth) {
                    dom = 1;
                }

                var newMonthSet = false;    // Flag used to retain the value for the first day of week for the following month

                // Loop though each week as needed, and add a table row for each
                for (var week = 1; day <= days && dom <= lastDOM; week++) {

                    $("#year" + year + "month" + month + " tbody").append('<tr id="year' + year + 'month' + month + 'week' + week + '"></tr>');

                    // Loop through 7 days each week, regardless of how many are needed
                    for (var dow = 1; dow <= 7; dow++) {

                        var holiday = isHoliday(month, dom, year);
                        var tooltip = "";

                        // If it's the first week of the month, fill in blank days until the actual start date
                        if ((week == 1 && dow < startDOW) || day > days) {
                            dayClass = "emptyday";
                        }
                        else if (dom > lastDOM) {
                            dayClass = "emptyday";
                            
                            if (newMonthSet == false) {
                                newMonthSet = true;

                                startDOW = dow;         // reset the starting day of week for the next month

                                if (startDOW > 8) {
                                    startDOW = startDOW - 7;        // loop the DOW back around if it exceeds 7
                                }
                            }
                        }
                        else if (holiday != "") {
                            dayClass = "holiday";
                        }
                        else if (dow == 1 || dow == 7) {
                            dayClass = "weekend";
                        }
                        else if (dow >= 2 && dow <= 6) {
                            dayClass = "weekday";
                        }

                        // Add the HTML for the cell on each day of the week
                        $("#year" + year + "month" + month + "week" + week).append('<td id="year' + year + 'month' + month + 'week' + week + 'day' + dow + '" class="' + dayClass + '" title="' + holiday + '"></td>');

                        // Only put the day of month in the cell if we actually need it (otherwise, blank)
                        if (((week == 1 && dow >= startDOW && day <= days) || (week > 1 && day <= days)) && dom <= lastDOM) {

                            $("#year" + year + "month" + month + "week" + week + "day" + dow).html(dom);
                            day++;
                            dom++;
                        }  
                    }
                }
            }    
        }
    }

    // Register the event handler
    $('#date').change(generateCalendar);
    $('#days').change(generateCalendar);
});