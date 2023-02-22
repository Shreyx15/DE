
document.getElementById("month").addEventListener("click", function () {
    var month = document.getElementById("month").value;
    var day = $("#day");
    length = day.children().length;


    if (length > 2) {
        day.empty(".days");
    }


    if (day.children().length > 2) {
        day.empty(".days");
    }

    function isleapYear(year) {
        if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
            return true;
        } else {
            return false;
        }
    }
    switch (month) {
        case "January":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 32; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "February":
            var year = $("#year")[0].value;

            if ($("#year")[0].value == "Year") {
                alert("Please select the Year!");
            }

            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            if (isleapYear(year)) {
                for (var i = 1; i < 30; i++) {
                    day.append("<option value=" + i + " class ='days' >" + i + "</option>");
                }
            } else {
                for (var i = 1; i < 29; i++) {
                    day.append("<option value=" + i + " class ='days' >" + i + "</option>");
                }
            }
            break;
        case "March":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 32; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "April":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 31; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "May":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 32; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "June":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 31; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "July":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 32; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "August":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 32; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "September":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 31; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "October":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 32; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "November":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 31; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
        case "December":
            if (length > 2) {
                day.append("<option selected disabled>Day</option>");
            }
            for (var i = 1; i < 32; i++) {
                day.append("<option value=" + i + " class ='days' >" + i + "</option>");
            }
            break;
    }
});


document.getElementById("day").addEventListener("click", function () {
    if ($("#month")[0].value == "Month") {
        $("#day").remove(".days");
    }
});

// $(".btn").click(function () {

// });

$("#form-send").click(function (e) {
    e.preventDefault();
    const length = $(".form-control").length;
    var isValid = true;
    for (var i = 0; i < length; i++) {
        if ($(".form-control")[i].hasAttribute("required") && $(".form-control")[i].value == "") {
            isValid = false;
        }
    }

    if (!isValid) {
        if ($(".left-bar").css("display") != "none") {
            $("alert").css("margin", "20px 20px 0 280px");
        }
        $(".alert").css("display", "block");
    } else {
        $(".success-card").css("display", "block");
        document.body.style.overflow = "hidden";


    }
});

$("#success-form").submit(function (e) {
    e.preventDefault();
    $("#myform").submit();
}); 