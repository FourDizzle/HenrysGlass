(function(window, $){
  'use strict';

  var phoneRegex = /^\(\d{3}\)\s\d{3}\-\d{4}$/
  var emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  function sendMessage(message) {
    console.log(message);
  }

  function alertFormSuccessfullySent(form) {
    console.log('Success!!!');
  }

  function validateMessageInput(messageInput) {
    if (messageInput.val().length === 0) {
      messageInput.removeClass('is-valid');
      messageInput.addClass('is-invalid');
      return false;
    } else if (messageInput.hasClass('is-invalid') && messageInput.val().length > 0) {
      messageInput.addClass('is-valid');
      messageInput.removeClass('is-invalid');
    }
    return true;
  }

  function testValidEmail() {
    var emailInput = $(this);
    console.log(emailInput.val());
    if (emailRegex.test(emailInput.val())) {
      if (emailInput.hasClass('is-invalid')) {
        emailInput.removeClass('is-invalid');
        emailInput.addClass('is-valid');
      }
      return true;
    } else {
      emailInput.addClass('is-invalid');
      return false;
    }
  }

  function testValidPhoneNumber() {
    var phoneNumberInput = $(this);
    if (phoneRegex.test(phoneNumberInput.val())) {
      if (phoneNumberInput.hasClass('is-invalid')) {
        phoneNumberInput.removeClass('is-invalid');
        phoneNumberInput.addClass('is-valid');
      }
      return true;
    } else {
      phoneNumberInput.addClass('is-invalid');
      return false;
    }
  }

  function validateNameInput(input) {
    if (input.val().length === 0) {
      input.removeClass('is-valid');
      input.addClass('is-invalid');
      return false;
    }

    if (input.hasClass('is-invalid') && input.val().length > 0) {
      input.removeClass('is-invalid');
      input.addClass('is-valid');
    }

    return true;
  }

  function validateContactMethodSelect(selectMenu) {
    if (!selectMenu.is(':visible')) {
      selectMenu.removeClass('is-invalid');
      selectMenu.removeClass('is-valid');
      return true;
    }

    if (selectMenu.val() === 'Choose...') {
      selectMenu.removeClass('is-valid');
      selectMenu.addClass('is-invalid');
      return false;
    } else if (selectMenu.hasClass('is-invalid') && selectMenu.val() !== 'Choose...') {
      selectMenu.removeClass('is-invalid');
      selectMenu.addClass('is-valid');
    }
    return true;
  }

  function validateContactMethod(contactInput) {
    if (!contactInput.is(':visible')) {
      contactInput.removeClass('is-invalid');
      contactInput.removeClass('is-valid');
      return true;
    }

    if (contactInput.attr('name') === 'email') {
      return testValidEmail.call(contactInput);
    } else if (contactInput.attr('name') === 'phonenumber') {
      return testValidPhoneNumber.call(contactInput);
    } else {
      contactInput.removeClass('is-valid');
      contactInput.addClass('is-invalid');
      return false;
    }
  }

  function resetForm(form) {
    var firstname = $(form).find('input[name=firstname]'),
    lastname = $(form).find('input[name=lastname]'),
    primaryContactSelect = $(form).find('.primary-contact-select'),
    primaryContact = $(form).find('.primary-method'),
    secondaryContactSelect = $(form).find('.secondary-contact-select'),
    secondaryContact = $(form).find('.secondary-method'),
    message = $(form).find('textarea');

    firstname.val('');
    lastname.val('');
    primaryContactSelect.val('Choose...');
    primaryContactSelect.closest('.row').find('.contact-method-group').hide();
    secondaryContactSelect.val('Choose...');
    primaryContact.val('');
    secondaryContact.val('');
    message.val('');

    $(form).find('.add-contact-method').hide();
    $(form).find('.secondary-contact-method').hide();

    console.log('finished');
  }

  function validateAndGetFormValue(form) {
    var firstname = $(form).find('input[name=firstname]'),
    lastname = $(form).find('input[name=lastname]'),
    primaryContactSelect = $(form).find('.primary-contact-select'),
    primaryContact = $(form).find('.primary-method'),
    secondaryContactSelect = $(form).find('.secondary-contact-select'),
    secondaryContact = $(form).find('.secondary-method'),
    message = $(form).find('textarea'),
    isValid = true,
    formValue = {},
    addToFormValue = function(valueKey, input, inputValidator) {
      if (inputValidator(input)) {
        if (input.val().length > 0) formValue[valueKey] = input.val();
      } else {
        isValid = false;
      }
    };

    addToFormValue('firstname', firstname, validateNameInput);
    addToFormValue('lastname', lastname, validateNameInput);
    if (validateContactMethodSelect(primaryContactSelect)) {
      var primaryKey = 'primary' + primaryContact.prop('name');
      addToFormValue(primaryKey, primaryContact, validateContactMethod);
    }
    if (validateContactMethodSelect(secondaryContactSelect)) {
      var secondaryKey = 'secondary' + secondaryContact.prop('name');
      addToFormValue(secondaryKey, secondaryContact, validateContactMethod);
    }
    addToFormValue('message', message, validateMessageInput);
    if (isValid) {
      return formValue;
    } else {
      return false;
    }
  }

  function autoFormatPhoneNumber() {
    var phoneNumberInput = $(this),
    input = phoneNumberInput.val().replace(/[^0-9\(\)\s\-]/g, ''),
    numbers = phoneNumberInput.val().replace(/\D/g,''),
    newInput = '';

    for (var i = 0; i < numbers.length; i++) {
      if (i === 0) {
        newInput += '(' + numbers[i];
      } else if (i === 3) {
        newInput += ') ' + numbers[i];
      } else if (i === 6) {
        newInput += '-' + numbers[i];
      } else if (i > 9) {
        newInput = newInput;
      } else {
        newInput += numbers[i];
      }
    }

    phoneNumberInput.val(newInput);
  }

  function resetContactInput(contactInput) {
    contactInput.off('focusout', testValidEmail);
    contactInput.off('keyup paste', autoFormatPhoneNumber);
    contactInput.off('focusout', testValidPhoneNumber);
    contactInput.val('');
    contactInput.removeClass('is-valid');
    contactInput.removeClass('is-invalid');
  }

  $('.add-contact-method, .secondary-contact-method, .contact-method-group').hide();

  // if name fields are touched but left empty alert user
  $('input[name=firstname], input[name=lastname]').focusout(function() {
    var input = $(this);
    validateNameInput(input);
  });

  // if name fields were invalid but have been changed to contain something
  // alert user
  $('input[name=firstname], input[name=lastname]').on('change', function() {
    var input = $(this);
    validateNameInput(input);
  });

  $('textarea').on('keyup change', function() {
    validateMessageInput($(this));
  });

  // $('.contact-method-select').focusout(function() {
  //   var selectMenu = $(this);
  //   validateContactMethodSelect(selectMenu);
  // });

  $('.contact-method-select').on('focusout change', function() {
    var selectMenu = $(this),
    row = selectMenu.closest('.row'),
    contactMethodGroup = row.find('.contact-method-group'),
    contactMethodLabel = row.find('.contact-method-label'),
    contactInput = row.find('.contact-method'),
    contactInvalid = row.find('.contact-method-invalid'),
    addContactMethod = selectMenu.closest('form').find('.add-contact-method');

    if (selectMenu.hasClass('primary-contact-select')) {
      addContactMethod.show();
    }

    validateContactMethodSelect(selectMenu)

    if (selectMenu.val() === 'Email') {
      resetContactInput(contactInput);
      contactMethodGroup.show();
      contactMethodLabel.text('Email *');
      contactInput.prop('name', 'email');
      contactInput.prop('placeholder', 'john.doe@example.com');
      contactInvalid.text('Please provide a valid email');
      contactInput.on('focusout', testValidEmail);
    } else if (selectMenu.val() === 'Phone Number') {
      resetContactInput(contactInput);
      contactMethodGroup.show();
      contactMethodLabel.text('Phone Number *');
      contactInput.prop('name', 'phonenumber');
      contactInput.prop('placeholder', '(281) 555-1234');
      contactInvalid.text('Please provide a valid phone number');
      contactInput.on('keyup paste', autoFormatPhoneNumber);
      contactInput.on('focusout', testValidPhoneNumber);
    } else {
      addContactMethod.hide();
      contactMethodGroup.css({visibility: 'hidden'});
      selectMenu.removeClass('is-valid');
      selectMenu.addClass('is-invalid');
    }
  });

  $('.add-contact-method button').on('click', function() {
    var secondaryContactMethod = $(this).closest('form').find('.secondary-contact-method');
    $(this).closest('.row').hide();
    secondaryContactMethod.show();
  });

  $('.remove-contact-method').on('click', function() {
    var addContactMethod = $(this).closest('form').find('.add-contact-method');
    $(this).closest('.row').hide();
    addContactMethod.show();
  });

  $('.message-submit').on('click', function() {
    var form, message;

    if ($(this).attr('id') === 'modal-send-message') {
      form = $('#modal-form');
    } else {
      form = $('#contact-us-form');
    }

    message = validateAndGetFormValue(form);

    if (message) {
      sendMessage(message);
      resetForm(form);
      alertFormSuccessfullySent(form)
    }
  });

}(window, jQuery))
