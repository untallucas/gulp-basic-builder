// CONTACT FORM
/* global $ */

var contactForm = $('#contact-form')
var contactFormTrigger = $('#contact-form-trigger')
var contactUrl = $('#contact-form').attr('action')
var contactError = $('#contact-form-error')

// Email validation
function validateEmail (email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/
  if (email) {
    return emailReg.test(email)
  }
}

// Validate required fields
function validateFields () {
  var contactName = $('#form-name').val()
  var contactEmail = $('#form-email').val()

  if (contactName !== '' && validateEmail(contactEmail)) {
    return true
  }
}

// Submit form
contactForm.submit(function (e) {
  e.preventDefault()
  contactFormTrigger.attr('disabled', 'disabled').addClass('disabled')
  contactError.html('').hide()

  if (validateFields()) {
    var contactData = $(this).serialize()

    $.ajax({
      type: 'POST',
      url: contactUrl,
      data: contactData,
      dataType: 'json',

      success: function (pResponse) {
        if (pResponse.success) {
          // Shows success message; resets form and reenables button after 3 sec
          contactError.html(pResponse.message).addClass('success').show()
          setTimeout(function () {
            contactError.html('').hide().removeClass('success error')
            contactFormTrigger.removeAttr('disabled').removeClass('disabled')
            contactForm.find(':input').not('input[type=button], input[type=submit], input[type=reset]').each(function () {
              $(this).val('')
            })
          }, 3000)
        } else {
          // Shows EMAIL error message; reenables button after 5 sec
          contactError.html(pResponse.message).addClass('error').show()
          setTimeout(function () {
            contactError.html('').hide().removeClass('success error')
            contactFormTrigger.removeAttr('disabled').removeClass('disabled')
          }, 5000)
        }
      },

      error: function (pResponse) {
        // Shows AJAX error message; reenables button after 5 sec
        contactError.html('Ocurrió un error al enviar el email, por favor reinténtelo.').addClass('error').show()
        setTimeout(function () {
          contactError.html('').hide().removeClass('success error')
          contactFormTrigger.removeAttr('disabled').removeClass('disabled')
        }, 5000)
      }
    })
  } else {
    // Shows FIELD VALIDATION error message; reenables button after 5 sec
    contactError.html('Ingrese su nombre y su email para que podamos contactarlo.').addClass('error').show()
    setTimeout(function () {
      contactError.html('').hide().removeClass('success error')
      contactFormTrigger.removeAttr('disabled').removeClass('disabled')
    }, 5000)
  }
})
