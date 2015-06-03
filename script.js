$(function () {
  $('html, body').animate({ scrollTop: 0 }, 1000);
  //Change an error message to Swedish.
  $('#myform input[type=text]').on('change invalid', function () {
    var textfield = $(this).get(0);
    
    //To see whether the field really is invalid, remove the message first.
    textfield.setCustomValidity('');
    
    if(!textfield.validity.valid) {
      textfield.setCustomValidity('Fyll i detta fält.');
    }
  });
  
  //Animation scroll when input is filled in.
  $('input').change(function(e) {
    if($('.year').val()) {
      $('html, body').animate({ scrollTop: 300 }, 1000);
    }
    
    if($('.year').val() && $('.month').val()) {
      $('html, body').animate({ scrollTop: 600 }, 1000);
    }
  });
  
  $(window).keydown(function(event){   
      if(isValidDate() == true) {
        $("#error").hide();
        $(".submit-button").fadeIn("slow");
        $(".social-buttons").fadeOut("slow");
        $(".page").css("max-width", "800px");
      } else {
        //Prevent click enter when all fields have values.
        if($('.year').val() && $('.month').val() && $('.day').val() && (event.keyCode == 13)) {
          $("#error").show();
          event.preventDefault();
          return false;
        } else {
          $("#error").hide();
        }
      }
    }); 
  
 //Text input pink&blue-background rotation
  $('input').focus(function() {
    AnimateRotatePink(4, this);
    AnimateRotateBlue(-4, this);
  });
  
  $('input').focusout(function() {
    AnimateRotatePink(-4, this);
    AnimateRotateBlue(4, this);
  });
  
  // Add class to html tag depends if ios device or not.
  var ios = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
  var html = document.getElementsByTagName("HTML")[0];
  //html.className = html.className + " ios";
  
  if(ios) {
    $("html").addClass("ios");
  } else {
    $("html").addClass("not-ios");
  }
  
  $( "#myform" ).submit(function( event ) {
    
    //Hide social buttons and show submit button if isValidDate() == true
    //This is when submit button is clicked.
    if(isValidDate() == true) {
        $("#error").hide();
        $(".submit-button").fadeIn("slow");
        $(".social-buttons").fadeOut("slow");
        $(".page").css("max-width", "800px");
      } else {
        //Show Submit button and
        //Prevent click enter when all fields have values.
        if($('.year').val() && $('.month').val() && $('.day').val()) {
          $("#error").show();
          event.preventDefault();
          return false;
        } else {
          $("#error").hide();
        }
      }

    /******1.Fira varje år!*****/
    $('html, body').animate({ scrollTop: 0 }, 1000);
    $("#myform").hide();
    $(".result-container").append($(".social-buttons"));
    $(".social-buttons").fadeIn("slow")
                        .css("margin-top","70px");
    
    var today = new Date();
    var this_year = today.getFullYear();
    var this_month = today.getMonth();
    var this_day = today.getDate();
    var my_year = document.getElementsByName('year')[0].value;
    var monthElementValue = document.getElementsByName('month')[0].value;
    var monthName = monthElementValue.charAt(0).toUpperCase()+monthElementValue.slice(1);
    var my_month;
    // javascript array months are between 0-11
    for(i=0; i<12; i++) {
      // Check if monthName is the same as one of object:months 
      // And if it was found month is defined as the number of the month.
      if(months[i] == monthName) {
        my_month = i;
      }
    }
    var my_day = document.getElementsByName('day')[0].value;
    var next_age;
    var next_year = this_year + 1;
    
    //if my birthday has come already in this months
    if(my_month == this_month && my_day < this_day) {
      var next_bday = new Date(next_year, my_month, my_day);
      next_age = this_year - my_year + 1;
    } else if(my_month < this_month) {
      var next_bday = new Date(next_year, my_month, my_day);
      //my_month and this_moth, both are between 0-11
      next_age = this_year - my_year + 1; 
    } else if(my_month >= this_month) {
      var next_bday = new Date(this_year, my_month, my_day);
      next_age = this_year - my_year;
    }
    
    //Funciton to count days between two dates
    function countDays(fromDateObj, toDateObj) {
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var diffDays = Math.ceil((toDateObj.getTime() - fromDateObj.getTime())/(oneDay));
      return diffDays;
    }
    
    var yeardiffDays = countDays(today, next_bday);
    var yearResult1 = yeardiffDays + " dagar"; 
    var yearResult2 = next_age + " år";
    
    document.getElementById('year-answer1').innerHTML = yearResult1;
    document.getElementById('year-answer2').innerHTML = yearResult2;
    $(".result1-container").show();
    
    /******2.Fira varje månad!*****/
    
    function countMonths(pastdateObj, futuredateObj) {
      var allYears = futuredateObj.getFullYear() - pastdateObj.getFullYear();
      var partialMonths = futuredateObj.getMonth() - pastdateObj.getMonth();
      if (partialMonths < 0) {
        allYears--;
        partialMonths = partialMonths + 12;
      }
      var totalMonths = 12 * allYears + partialMonths;
      return totalMonths;
    }
    
    //If add totalMonths to my birthday, when will it be?
    function addMonths(dateObj, num) {
      var currentMonth = dateObj.getMonth() + dateObj.getFullYear() * 12;
      dateObj.setMonth(dateObj.getMonth() + num);
      var diff = dateObj.getMonth() + dateObj.getFullYear() * 12 - currentMonth;
      
      //If do not the same, set date to the last day of the previous month
      if (diff != num) {
        dateObj.setDate(0);
      }
      return dateObj;
    }
  
    var my_bday = new Date(my_year, my_month, my_day);
    
    //Months in total from my birthday to the previous monthly birth.
    var pre_monthly_age = countMonths(my_bday, today);
    var pre_monthly_bday = addMonths(my_bday, pre_monthly_age);
    var next_monthly_bday = addMonths(pre_monthly_bday, 1);
    var next_monthly_age = pre_monthly_age + 1;
    
    //Compare today and my_next_monthly_bday
    var monthdiffDays = countDays(today, next_monthly_bday);
    var monthResult1 = monthdiffDays +" dagar";
    var monthResult2 = next_monthly_age + " månader";

    document.getElementById('month-answer1').innerHTML = monthResult1;
    document.getElementById('month-answer2').innerHTML = monthResult2;
    $(".result2-container").show();
    
    /******3.Fira varje 100 dagar*****/
    
    //Because of addMonths function the value was changed. initialize it.
    my_bday = new Date(my_year, my_month, my_day);
    
    //Check the differece between today and my birthdate in days
    var daydiffDays = countDays(my_bday, today);
    
    //Divide (amont of days between birthdate and today) by 100
    //var divRemain is division-remainder
    var divRemain = daydiffDays % 100;
    var nthHundra = (daydiffDays - divRemain)/100;
    var daysToHundra = 100 - divRemain;
    var dayResult1 = daysToHundra + " dagar";
    var dayResult2 = nthHundra + " * 100dagar";
    
    document.getElementById('day-answer1').innerHTML = dayResult1;
    document.getElementById('day-answer2').innerHTML = dayResult2;
    $(".result3-container").show();
    
    event.preventDefault();
  });
});

//Animate pinkbox background jQuery
function AnimateRotatePink(angle, element) {
  var elem1 = $(element).next('.pink-box-base');
  
 //animation starts from 0 to angle.
 $({deg: 0}).animate({deg: angle}, {
        duration: 200,
        step: function(now){
            elem1.css({
                 transform: "rotate(" + now + "deg)"
            });
        }
    });
}

//Animate bluebox background jQuery
function AnimateRotateBlue(angle, element) {
  var elem2 = $(element).next('.pink-box-base').next('.blue-box-base');
  
 //animation starts from 0 to angle.
 $({deg: 0}).animate({deg: angle}, {
        duration: 200,
        step: function(now){
            elem2.css({
                 transform: "rotate(" + now + "deg)"
            });
        }
    });
}

// Add colon automatically when hours(2numbers) were typed.
function colon(x) {
   var hours =/^(2[0-3])|[01][0-9]$/;
   if(x.value.length<3 && hours.test(x.value))
      x.value+=":";
}

// Validation
var months = [
      "Januari",
      "Februari",
      "Mars",
      "April",
      "Maj",
      "Juni",
      "Juli",
      "Augusti",
      "September",
      "Oktober",
      "November",
      "December"
    ];

function isValidDate() {
  var my_year = document.getElementsByName('year')[0].value;
  var monthElementValue = document.getElementsByName('month')[0].value;
  var errorMessage = document.getElementById('error');
  if(!isNaN(monthElementValue)) {
    errorMessage.innerHTML = "Du har skrivit fel. Försök igen. Har du skrivit på svenska?";
    errorMessage.style.display = "block";
    return false;
  }
  var monthName = monthElementValue.charAt(0).toUpperCase()+monthElementValue.slice(1);
  var my_month;
  // javascript array months are between 0-11
  for(i=0; i<12; i++) {
    // Check if monthName is the same as one of object:months 
    // And if it was found month is defined as the number of the month.
    if(months[i] == monthName) {
      my_month = i;
    }
  }
  var my_day = document.getElementsByName('day')[0].value;
  //in Javascript months are started from 0. months array is also between 0-11.
  var my_bday = new Date(my_year, my_month, my_day);
  var valid = my_bday && (my_bday.getMonth()) == my_month && my_bday.getDate() == Number(my_day);
  return valid; 
} 

