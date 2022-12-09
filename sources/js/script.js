import './app/gutenberg';
import Swiper from 'swiper/swiper-bundle';
import {gsap} from "./app/gsap/gsap";
import {ScrollTrigger} from "./app/gsap/ScrollTrigger";
import {isEven, isjQuery, Coordinates, videoResize} from "./app/functions";

gsap.registerPlugin(ScrollTrigger);


(function ($) {

    $('.js-open-mobile-menu').on('click', function () {
        let $self = $(this)

        $('body').toggleClass('overflow-hidden')
        $self.toggleClass('active')
        $('.js-header-mobile').toggleClass('active')
    })

})(jQuery);
