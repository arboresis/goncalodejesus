var a, b, c,
    submitContent,
    captcha,
    locked,
    validSubmit = false,
    timeoutHandle;

// Method to add random characters from a given string
function addRandomCharacterFromString(str) {
    var randomIndex = Math.floor(Math.random() * str.length);
    return str.charAt(randomIndex);
}

// Generating a simple sum (a + b) to make with a result (c) with random characters
function generateCaptcha() {
    a = Math.ceil(Math.random() * 10);
    b = Math.ceil(Math.random() * 10);
    c = a + b;

    // Adding random characters next to each number
    var randomCharacters = '!"#$%&/()=?|\\∀∁∂∃∄∅∆∇∈∉∊∋∌∍∎∏∐∑−∓∔∕∖∗∘∙√∛∜∝∞∟∠∡∢∣ ∤ ∥ ∦ ∧ ∨ ∩ ∪ ∫ ∬ ∭ ∮ ∯ ∰ ∱ ∲ ∳ ∴ ∵ ∶ ∷ ∸ ∹ ∺ ∻ ∼ ∽ ∾ ∿ ≀ ≁ ≂ ≃ ≄ ≅ ≆ ≇ ≈ ≉ ≊ ≋ ≌ ≍ ≎ ≏ ≐ ≑ ≒ ≓ ≔ ≕ ≖ ≗ ≘ ≙ ≚ ≛ ≜ ≝ ≞ ≟ ≠ ≡ ≢ ≣ ≤ ≥ ≦ ≧ ≨ ≩ ≪ ≫ ≬ ≭ ≮ ≯ ≰ ≱ ≲ ≳ ≴ ≵ ≶ ≷ ≸ ≹ ≺ ≻ ≼ ≽ ≾ ≿ ⊀ ⊁ ⊂ ⊃ ⊄ ⊅ ⊆ ⊇ ⊈ ⊉ ⊊ ⊋ ⊌ ⊍ ⊎ ⊏ ⊑ ⊒ ⊓ ⊔ ⊕ ⊖ ⊗ ⊘ ⊙ ⊚ ⊛ ⊝ ⊞ ⊟ ⊠ ⊡ ⊢ ⊣ ⊤ ⊥ ⊦ ⊧ ⊩ ⊪ ⊫ ⊬ ⊭ ⊮ ⊯ ⊰ ⊱ ⊲ ⊳ ⊵ ⊶ ⊷ ⊸ ⊹ ⊺ ⊻ ⊼ ⊽ ⊾ ⊿ ⋁ ⋂ ⋃ ⋄ ⋅ ⋆ ⋇ ⋈ ⋉ ⋊ ⋋ ⋍ ⋎ ⋏ ⋐ ⋑ ⋒ ⋓ ⋔ ⋕ ⋖ ⋗ ⋙ ⋚ ⋛ ⋜ ⋝ ⋞ ⋟ ⋠ ⋡ ⋢ ⋣ ⋥ ⋦ ⋧ ⋨ ⋩ ⋪ ⋫ ⋬ ⋭ ⋮ ⋯ ⋱ ⋲ ⋳ ⋴ ⋵ ⋶ ⋷ ⋸ ⋹ ⋺ ⋻ ⋽ ⋾ ⋿';
    var randomNumbers = '0123456789';
    var randomCharA = addRandomCharacterFromString(randomCharacters);
    var randomCharB = addRandomCharacterFromString(randomNumbers);
    var randomCharC = addRandomCharacterFromString(randomCharacters);
    var randomCharD = addRandomCharacterFromString(randomCharacters);
    var randomCharE = addRandomCharacterFromString(randomNumbers);
    var randomCharF = addRandomCharacterFromString(randomCharacters);

    submitContent = '<span><i class="invisible-symbol">' + randomCharA + '</i>' + a + '<i class="invisible-symbol">' + randomCharB + randomCharC + '</i>' + '</span> + <span><i class="invisible-symbol">' + randomCharD + '</i>' + b + '<i class="invisible-symbol">' + randomCharE + randomCharF + '</i>' + '</span>' +
        ' = <input class="submit__input" type="text" maxlength="2" size="2" required />';
    $('.submit__generated').html(submitContent);

    init();
}


// Check the value 'c' and the input value.
function checkCaptcha() {
    if (captcha === c) {
        // Pop the green valid icon
        $('.submit__generated')
            .removeClass('unvalid')
            .addClass('valid');
        $('.submit').removeClass('overlay');
        $('.submit__overlay').fadeOut('fast');

        $('.submit__error').addClass('hide');
        $('.submit__error--empty').addClass('hide');
        validSubmit = true;
    }
    else {
        if (captcha === '') {
            $('.submit__error').addClass('hide');
            $('.submit__error--empty').removeClass('hide');
        }
        else {
            $('.submit__error').removeClass('hide');
            $('.submit__error--empty').addClass('hide');
        }
        // Pop the red unvalid icon
        $('.submit__generated')
            .removeClass('valid')
            .addClass('unvalid');
        $('.submit').addClass('overlay');
        $('.submit__overlay').fadeIn('fast');
        validSubmit = false;
    }
    enableSubmitButton(); // Check if submit button should be enabled
}

function unlock() { locked = false; }

// Enable or disable the submit button based on form validity
function enableSubmitButton() {
    var isFormValid = isFormFilled() && isValidEmail();
    var isSubmitValid = validSubmit && $('.submit__generated').hasClass('valid');
    if (isFormValid && isSubmitValid) {
        $('#submit-btn').prop('disabled', false);
        $('.submit').removeClass('overlay');
    } else {
        $('#submit-btn').prop('disabled', true);
        $('.submit').addClass('overlay');
    }
}

// Check if all form fields are filled
function isFormFilled() {
    var isFilled = true;
    $('#contact-form input[type="text"], #contact-form textarea, #message').each(function () {
        if ($(this).val().trim() === '') {
            isFilled = false;
            return false; // Exit the loop early
        }
    });
    return isFilled;
}

// Check if the email format is valid
function isValidEmail() {
    var email = $('#email').val().trim();

    if (email == "") {
        return true;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Refresh button click - Reset the captcha
$('.submit__control i.fa-refresh').on('click', function () {
    if (!locked) {
        locked = true;
        setTimeout(unlock, 500);
        generateCaptcha();
        setTimeout(checkCaptcha, 0);
    }
});

// Initialize the action handlers
// Initialize the action handlers
function init() {

    enableSubmitButton();

    // Captcha input result handler
    $('.submit__input').on('propertychange change keyup input paste', function () {
        // Prevent the execution on the first number of the string if it's a 'multiple number string'
        // (i.e: execution on the '1' of '12')
        window.clearTimeout(timeoutHandle);
        timeoutHandle = window.setTimeout(function () {
            captcha = $('.submit__input').val();
            if (captcha !== '') {
                captcha = Number(captcha);
            }
            checkCaptcha();
            enableSubmitButton(); // Check if submit button should be enabled
        }, 150);
    });

    // Form input change handler
    $('#contact-form input[type="text"], #contact-form textarea, #email, #message').on('input', function () {
    enableSubmitButton(); // Check if submit button should be enabled
});
}


// Call initial captcha generation
generateCaptcha();
