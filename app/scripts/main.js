/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  if (
    'serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case 'redundant':
                  throw new Error(
                    'The installing ' + 'service worker became redundant.'
                  );

                default:
                // Ignore
              }
            };
          }
        };
      })
      .catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here

  //Script for submodule
  const dollarImg = document.querySelector('.dollar-img');
  const moreMoneyBtn = document.querySelector('.more-money-btn');
  const moneyContainer = document.querySelector('.money-container');

  moreMoneyBtn &&
    moreMoneyBtn.addEventListener('click', () => {
      const money = dollarImg.cloneNode();
      moneyContainer.appendChild(money);
    });

  //Checkout
  const checkoutForm = document.querySelector('.form');
  const countrySelector = document.querySelector('.form-input__container');
  const countryDropdown = document.querySelector(
    '.form-input__country-dropdown'
  );
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

  const countries = document.querySelectorAll('.form-dropdown-item');
  const formSubmitBtn = document.querySelector('.form__submit-btn');
  const inputs = document.querySelectorAll('input');
  if (checkoutForm) {
    countrySelector.addEventListener('click', () => {
      countryDropdown.classList.add('opened');
    });
    countries.forEach(country => {
      country.addEventListener('click', () => {
        console.log(country.textContent);
        countrySelector.querySelector('#country').value = country.textContent;
        countryDropdown.classList.remove('opened');
      });
    });

    //Form validation
    function showError(container, errorMessage) {
      var msgElem = document.createElement('span');
      msgElem.className = 'error-message';
      msgElem.innerHTML = errorMessage;
      container.appendChild(msgElem);
    }

    function resetError(container) {
      if (container.lastChild.className == 'error-message') {
        container.removeChild(container.lastChild);
      }
    }
    function validation(form) {
      const elems = form.elements;
      console.log(form.elements);
      resetError(elems.first_name.parentNode);
      if (!elems.first_name.value) {
        showError(elems.first_name.parentNode, 'Please enter your first name.');
      }
      resetError(elems.last_name.parentNode);
      if (!elems.last_name.value) {
        showError(elems.last_name.parentNode, 'Please enter your last name.');
      }
      resetError(elems.email.parentNode);
      if (!elems.email.value) {
        showError(elems.email.parentNode, ' Please enter your email address.');
      } else if (!reg.test(elems.email.value)) {
        showError(
          elems.email.parentNode,
          ' Please enter your valid email address.'
        );
      }
      resetError(elems.postal_code.parentNode);
      if (!elems.postal_code.value) {
        showError(
          elems.postal_code.parentNode,
          ' Please enter your postal code.'
        );
      }

      resetError(elems.phone_number.parentNode);
      if (!elems.phone_number.value) {
        showError(
          elems.phone_number.parentNode,
          ' Please enter your phone number.'
        );
      }
      resetError(elems.card_number.parentNode.parentNode);
      if (!elems.card_number.value) {
        showError(
          elems.card_number.parentNode.parentNode,
          ' Please enter your card number.'
        );
      }
      resetError(elems.security_code.parentNode);
      if (!elems.security_code.value) {
        showError(
          elems.security_code.parentNode,
          ' Please enter your card security code.'
        );
      }
      resetError(elems.exp_date.parentNode);
      if (!elems.exp_date.value) {
        showError(
          elems.exp_date.parentNode,
          ' Please enter your card expiration date.'
        );
      }
    }

    formSubmitBtn.addEventListener('click', e => {
      e.preventDefault();
      validation(checkoutForm);
      if (checkoutForm.checkValidity()) {
        formSubmitBtn.insertAdjacentHTML(
          'afterend',
          `<div class="form-valid">
        Form is valid!
      </div>
      `
        );
      }
    });
  }
})();
