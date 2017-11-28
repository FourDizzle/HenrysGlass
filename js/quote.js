(function(window, $){
  'use strict';

  function wireUpQuoteForm(sendButtonId, firstId, lastId, emailId, phoneId, subjectId, messageId) {
    var sendButton = $('#' + sendButtonId),
    firstname = $('#' + firstId),
    lastname = $('#' + lastId),
    email = $('#' + emailId),
    phone = $('#' + phoneId),
    subject = $('#' + subjectId),
    message = $('#' + messageId),
    required = [firstname, lastname, email, message],
    allFields = [firstname, lastname, email, message, subject, phone],
    emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    function sendMessage() {
      allFields.forEach(function(field) {
        field.val('');
      });
      alert('message sent!');
    }

    function isEveryFieldValid() {
      var isValid = true;
      required.forEach(function(field) {
        if (field.hasClass('is-invalid')) isValid = false;
      });
      return isValid;
    }

    function disableOrEnableSend() {
      var shouldDisable = !isEveryFieldValid();
      if (shouldDisable) {
        sendButton.prop('disabled', true);
        sendButton.removeClass('btn-success');
        sendButton.addClass('btn-secondary');
      } else {
        sendButton.prop('disabled', false);
        sendButton.addClass('btn-success');
        sendButton.removeClass('btn-secondary');
      }
    }

    required.forEach(function(field) {
      field.on('focusout', function() {
        if ((field.hasClass('is-invalid')
              && field.attr('id') !== 'form_email'
              && field.val() !== null
              && field.val() !== undefined
              && field.val() !== '') || (field.attr('id') === 'form_email'
                          && field.hasClass('is-invalid')
                          && emailRegex.test(field.val()))) {
          field.removeClass('is-invalid');
          field.addClass('is-valid');
        }
        disableOrEnableSend();
      });
    });

    sendButton.click(function(){
      required.forEach(function(field) {
        if (field.val() === null || field.val() === undefined || field.val() === '') {
          field.addClass('is-invalid');
        }
      });

      if (email.hasClass('is-invalid') === false && emailRegex.test(email.val()) === false) {
        email.addClass('is-invalid');
      }
      disableOrEnableSend();

      if (isEveryFieldValid()) {
        sendMessage();
      }
    });
  }

  wireUpQuoteForm('send-message',
                  'form_name',
                  'form_lastname',
                  'form_email',
                  'form_phone',
                  'form_subject',
                  'form_message');

  wireUpQuoteForm('modal-send-message',
                  'modal-form_name',
                  'modal-form_lastname',
                  'modal-form_email',
                  'modal-form_phone',
                  'modal-form_subject',
                  'modal-form_message');

}(window, jQuery))
