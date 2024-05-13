$(document).ready(function () {

    var crtToggle = $('#crt-toggle');

    crtToggle.on('click', function () {

        $('#crt-screen').toggleClass('crt');
        $('#crt-text').toggleClass('crt-text-off');

        //Save a cookie with the value of the screen
        var isCrtEnabled = $('#crt-screen').hasClass('crt');
        if (isCrtEnabled) {
            setBooleanCookie('ScreenFXEnabled');
        }
        else {
            deleteCookie('ScreenFXEnabled');
        }
    });

    //If the cookie isn't true, the screen FX should not be enabled, so we disable them here
    if (cookieExists('ScreenFXEnabled') && !isCookieTrue('ScreenFXEnabled')) {
        $('#crt-screen').toggleClass('crt');
        $('#crt-text').toggleClass('crt-text-off');
    }
});


function setBooleanCookie(name) {
    var stringValue = name + '=true'; // Add '=' to separate name and value

    // Add SameSite and Secure attributes
    stringValue += '; SameSite=None; Secure';

    // Set the cookie
    document.cookie = stringValue;
}

function deleteCookie(name) {
    var stringValue = name + '=false'; // Add '=' to separate name and value

    // Add SameSite and Secure attributes
    stringValue += '; SameSite=None; Secure';

    // Set the cookie
    document.cookie = stringValue;
}


// Function to check if a cookie exists by name
function cookieExists(name) {
    // Split the document.cookie string into individual cookies
    var cookies = document.cookie.split(';');

    // Loop through the cookies array to find the specified cookie
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); // Remove any leading or trailing spaces
        // Check if the cookie starts with the specified name
        if (cookie.indexOf(name + '=') === 0) {
            return true; // Cookie found
        }
    }

    // Cookie not found
    return false;
}

// Function to check if a cookie is set to true or false
function isCookieTrue(cookieName) {
    // Retrieve the cookie value
    var cookieValue = getCookie(cookieName);

    // If the cookie value is "true", return true, otherwise return false
    return cookieValue === 'true';
}

// Function to retrieve the value of a cookie by name
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}