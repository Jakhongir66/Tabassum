//------------------ render Footer
function renderFooter(data) {
   const html = `   
      <div class="footer__column">
        <div class="footer__title" data-i18n="footer.titleWork">Рабочие часы:</div>
        <div class="footer__time time-footer">
               <p>${data.result.opening_hours.weekday_text[0]}</p>
                  <p>${data.result.opening_hours.weekday_text[1]}</p>
                  <p>${data.result.opening_hours.weekday_text[2]}</p>
                  <p>${data.result.opening_hours.weekday_text[3]}</p>
                  <p>${data.result.opening_hours.weekday_text[4]}</p>
                  <p>${data.result.opening_hours.weekday_text[5]}</p>
          <div>
            <p>Воскресенье</p>
            <span class="yesterday"> Выходной</span>
          </div>
        </div>
      </div>
      <div class="footer__column">
        <div class="footer__title" data-i18n="footer.titleContacts">Контакты:</div>
        <a href="tel:998935552212" class="footer__text">${data.result.international_phone_number}</a>
        <a href="emailto:loren@gmail.com" class="footer__text">loren@gmail.com</a>
        <p class="footer__text">${data.result.formatted_address}</p>
        <div class="footer__social">
          <a href="" class="facebook"></a>
          <a href="" class="instagram"></a>
          <a href="" class="youtube"></a>
          <a href="" class="telegram"></a>
        </div>
      </div>
   `;
   document.querySelector('.footer__row').insertAdjacentHTML('beforeend', html)
}

//------------------ render Doctor
var doctors = [];

fetch('../data/data.json',)
   .then(d => d.json())
   .then(data => {
      doctors = data.doctors;
      render();
   }).catch(() => console.log('Error data.json'));


const toDoctor = (doctor) =>
   `
            <div class="doctors__column">
              <div class="doctors__item item-doctors">
                <div class="item-doctors__mainimage"><img class="doctor-image1" src="img/doctors/${doctor.imgSrc}.jpg" alt=""></div>
                <div class="item-doctors__hover">
                  <div class="item-doctors__img"><img class="doctor-image2" src="img/doctors/${doctor.imgSrcHover}.jpg" alt=""></div>
                  <div class="item-doctors__content">
                    <div class="item-doctors__label">${doctor.name}</div>
                    <div class="item-doctors__text">${doctor.prof}</div>
                    <button type="button" onclick="_createPopup(${doctor.id})" class="item-doctors__btn ">ЗАПИСАТЬСЯ</button>
                  </div>
                </div>
              </div>
            </div>
   `;
function render() {
   const html = doctors.map(toDoctor).join('');
   document.querySelector('#doctor-contents').innerHTML = html;
}

//------------------ render Service
var services = [];

fetch('../data/services-data.json',)
   .then(d => d.json())
   .then(data => {
      services = data.services;
      renderService();
      return new Swiper('.services__slider.swiper-container', {
         slidesPerView: 4,
         // autoHeight: false,
         // allowSlidePrev: false,
         // allowSlideNext: false,
         // allowTouchMove: false,
         // slidesPerGroup: 1,
         centeredSlides: true,
         initialSlide: 1,
         // slidesPerColumn: 1,
         spaceBetween: 60,
         loop: true,
         autoplay: {
            delay: 5000,
         },
         speed: 600,
         navigation: {
            // nextEl: ".slider__body .swiper-button-next",
            // prevEl: ".slider__body .swiper-button-prev",
         },
         breakpoints: {
            320: {
               slidesPerView: 1.5,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
               allowTouchMove: true
            },
            370: {
               slidesPerView: 2,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
               allowTouchMove: true
            },
            630: {
               slidesPerView: 3,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
               allowTouchMove: true
            },
            768: {
               slidesPerView: 4,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
               allowTouchMove: true
            },
            990: {
               slidesPerView: 5,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
            },
         }
      });
   }).catch(() => console.log('Error services-data.json'));

const toService = (service) =>
   `
           <div class="services__slide slide-box swiper-slide">
                <img src="img/services/box-img.png" alt="" class="slide-box__topimage">
                <div class="slide-box__image first"><img src="img/services/${service.imgSrc}.png" alt=""></div>
                <div class="slide-box__label" data-i18n="services.box1.label">${service.label}</div>
                <div class="slide-box__text" data-i18n="services.box1.text"> ${service.texts}</div>
                <a href="#"  class="slide-box__link" data-i18n="services.link">${service.link}</a>
           </div>
   `;
function renderService() {
   const html = services.map(toService).join('');
   document.querySelector('#services-content').innerHTML = html;
}

let body = document.querySelector('body')
// ----------- popup ---------------
function _createPopup(id) {
   const doctor = doctors.find((f) => f.id === id);
   let popup = document.querySelector('#popup')

   if (doctor) {
      popup.classList.add('_active')

      body.classList.add('_lock')
      popup.insertAdjacentHTML('afterbegin', `<div class="popup">
      <div class="popup__body">
        <button type="button" class="popup__close"><img src="img/close.png" alt=""></button>
        <div class="popup__image"><img src="img/doctors/${doctor.imgSrcHover}.jpg" alt=""></div>
        <div class="popup__right">
          <div class="popup__topcontent">
            <div class="popup__title">ЗАПИСЬ К<span> ${doctor.name}</span></div>
            <div class="popup__prof">${doctor.prof}</div>
            <div class="popup__time">${doctor.time}</div>
            <div class="popup__days">${doctor.days}</div>
          </div>
          <div class="popup__main">
            <div class="popup__form">
              <form class="pform">
                <div class="pform__group">
                  <label>Ф.И.О.</label>
                  <input type="text" name="name" id="d-name" placeholder="Ф.И.О.">
                </div>
                <div class="pform__group">
                  <label>ТЕЛЕФОН</label>
                  <input type="text" id="d-phone" name="phone" placeholder="ТЕЛЕФОН">
                </div>
                <div class="pform__group">
                <div class="g-recaptcha" id="recaptcha-doctor"  data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
                </div>
                <button type="submit" class="pform__btn">ЗАПИСАТЬСЯ</button>
              </form>
            </div>
            <div class="popup__info">
              ${doctor.information}
            </div>
          </div>
        </div>
      </div>
    </div>`);
      setTimeout(() => {
         popup.children[0].classList.add('_active')
      }, 20)

      let popupCloseBtn = document.querySelector('.popup__close')
      popupCloseBtn.addEventListener('click', _closePopup)

      function _closePopup() {
         popup.classList.remove('_active')
         popup.children[0].classList.remove('_active')
         body.classList.remove('_lock')

      }

      popup.addEventListener('click', function (e) {
         if (e.target.children[0]?.classList.contains('_active')) {
            _closePopup();
         }
      })

      //  validation jQuery
      jQuery.validator.setDefaults({
         debug: false,
         success: "valid"
      });

      $(document).ready(function () {
         $(".pform").validate({
            rules: {
               name: {
                  required: true,
                  minlength: 3
               },
               phone: {
                  required: true,
                  minlength: 19
               }
            },
            submitHandler: function () {
               var firstname = $('#d-name').val();
               var phone = $('#d-phone').val();
               var formData = {
                  firstname,
                  phone
               }
               console.log(formData)
            }
         });
      });

      //----- sweetalert ------
      $('.pform__btn').click(function () {
         if ($(".pform").validate().checkForm()) {
            _closePopup()
            return Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Ваш запрос был успешно отправлен.',
               showConfirmButton: false,
               timer: 1500
            });
         };
      });
   };

   var recaptchaDoctor = document.querySelector("#recaptcha-doctor");
   if (recaptchaDoctor) {
      grecaptcha.render("recaptcha-doctor");
   }
}

// =======================================================================================================
// Validation Contact
jQuery.validator.setDefaults({
   debug: false,
   success: "valid"
});

$(document).ready(function () {
   $(".form").validate({
      rules: {
         name: {
            required: true,
            minlength: 3
         },
         phone: {
            required: true,
            minlength: 19
         }
      },
      submitHandler: function () {
         var firstname = $('#name').val();
         var phone = $('#phone').val();
         var formData = {
            firstname,
            phone
         }
         console.log(formData)
      }

   });
});

//----- sweetalert ------
$('.form__btn').click(function () {
   if ($(".form").validate().checkForm()) {
      return Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Ваш запрос был успешно отправлен.',
         showConfirmButton: false,
         timer: 1500
      });
   };
});

var recaptchaDoctor = document.querySelector("#recaptcha-contact");
if (recaptchaDoctor) {
   grecaptcha.render("recaptcha-contact");
}