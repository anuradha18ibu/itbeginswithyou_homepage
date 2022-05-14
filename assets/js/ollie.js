/*!
=========================================================
* Ollie Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
// smooth scroll
$(document).ready(function () {
  $('.navbar .nav-link').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        700,
        function () {
          window.location.hash = hash;
        },
      );
    }
  });

  var form = document.querySelector('form');
  const name = document.querySelector('input[name="contact_name"]'),
    contact = document.querySelector('input[name="contact_info"]'),
    message = document.querySelector('textarea'),
    submitButton = document.querySelector('.contact-form button'),
    serverMessage = document.querySelector('.server-message'),
    successMessage =
      'The request has been successfully submitted and our team will revert to your within 24 hours',
    failureMessage =
      'There was a error in processing this request - we are looking into it';

  form.addEventListener('submit', function (e) {
    e.preventDefault(), e.stopPropagation();
    var t = {
      name: name.value,
      contact: contact.value,
      message: message.value,
    };
    (submitButton.disabled = !0),
      submitButton.classList.toggle('button--loading'),
      name.setAttribute('disabled', !0),
      contact.setAttribute('disabled', !0),
      message.setAttribute('disabled', !0),
      axios
        .post('https://vmerg-contact-collect.herokuapp.com/api/addQuery', t)
        .then((e) => {
          (submitButton.disabled = !1),
            submitButton.classList.toggle('button--loading'),
            name.removeAttribute('disabled'),
            contact.removeAttribute('disabled'),
            message.removeAttribute('disabled'),
            (serverMessage.textContent = successMessage),
            serverMessage.classList.add('success', 'block'),
            setTimeout(() => {
              serverMessage.classList.remove('block'),
                serverMessage.classList.remove('success');
            }, 3e3),
            (name.value = ''),
            (contact.value = ''),
            (message.value = '');
        })
        .catch((e) => {
          (submitButton.disabled = !1),
            name.removeAttribute('disabled'),
            contact.removeAttribute('disabled'),
            message.removeAttribute('disabled'),
            submitButton.classList.toggle('button--loading'),
            serverMessage.classList.add('error', 'block'),
            setTimeout(() => {
              serverMessage.classList.remove('block'),
                serverMessage.classList.remove('error');
            }, 3e3);
        });
  });
});
