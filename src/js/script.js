document.addEventListener("DOMContentLoaded", function(event) {
    
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

    document.querySelector('.carousel_prev').onclick = function () {
        carousel.goTo('prev');
    };

    document.querySelector('.carousel_next').onclick = function () {
        carousel.goTo('next');  
    };

});