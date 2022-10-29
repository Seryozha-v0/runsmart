document.addEventListener('DOMContentLoaded', function (event) {

    let carousel = tns({
        container: '.carousel__inner',
        items: 1,
        autoplay: false,
        nav: true,
        navPosition: 'bottom',
        controls: false,
        mouseDrag: true,
        responsive: {
            992: {
                nav: false,
            },
        }
    });

    document.querySelector('.carousel_prev').addEventListener('click', function () {
        carousel.goTo('prev');
    });

    document.querySelector('.carousel_next').addEventListener('click', function () {
        carousel.goTo('next');
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('fast');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text( $('.catalog-item__subtitle').eq(i).text() );
            $('.overlay, #order').fadeIn('fast');
        })
    });

    validateForms('#consultation-form');
    validateForms('#consultation .feed-form');
    validateForms('#order .feed-form');

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                name: "Введите свое имя",
                phone: "Введите свой номер телефон",
                email: {
                    required: "Введите почту",
                    email: "Неправильная почта",
                },
            }
        });
    }

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut('fast');
            $('.overlay, #thanks').fadeIn('fast')
            $('form').trigger('reset');
        });

        return false;
    });

    //Smooth scroll and pageup

    $(window).scroll(function() {
        if ( $(this).scrollTop() > 1600 ) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $('a[href^="#"').on('click', function() {
        const _href = $(this).attr('href');
        $('html,body').animate({
            scrollTop: $(_href).offset().top + 'px'
        });
        return false;
    });

    wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animate__animated', // default
      });

    wow.init();
});