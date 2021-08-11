// HOME PAGE ANIMATIONS
/* global $, scrollMonitor, TimelineLite, Power3, parallaxIt */

$(document).ready(function () {
  if ($('body').hasClass('home')) {
    // Navbar
    $('.navigation.headroom').headroom({
      'offset': ($(window).height() * 95 / 100).toFixed() - 200,
      'tolerance': {
        'up': 0,
        'down': 0
      }
    })

    $('.navigation a').click(function (event) {
      event.preventDefault()
      var hash = this.hash
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 600, function () {
        // window.location.hash = hash
      })
      // $('.navbar-collapse').collapse('hide')
    })

    // Bottom links
    $('section.quick-links').headroom({
      'offset': ($(window).height() * 95 / 100).toFixed(),
      'tolerance': {
        'up': 0,
        'down': 0
      }
    })

    // Scrollspy setup
    $('body').scrollspy({
      target: '.navigation',
      offset: 100
    })

    // Paralax Init
    parallaxIt()

    // In animations
    var defaultEasing = Power3.easeOut

    var companyWatcher = scrollMonitor.create($('.company'), -300)
    var companyTimeline = new TimelineLite()
    companyTimeline
      .staggerFrom('.company p, .company h2', 0.6, { opacity: 0, y: 60, ease: defaultEasing }, 0.2)
    companyTimeline.pause()
    companyWatcher.enterViewport(function () {
      companyTimeline.restart()
      companyWatcher.destroy()
    })

    var publicWatcher = scrollMonitor.create($('.public'), -300)
    var publicTimeline = new TimelineLite()
    publicTimeline
      .from('.public svg', 0.8, { opacity: 0, y: 60, ease: defaultEasing }, 0)
      .from('.public h2 ', 0.8, { opacity: 0, y: 40, ease: defaultEasing }, 0.3)
      .from('.public .button', 0.8, { opacity: 0, y: 20, ease: defaultEasing }, 0.6)
    publicTimeline.pause()
    publicWatcher.enterViewport(function () {
      publicTimeline.restart()
      publicWatcher.destroy()
    })

    var productsWatcher = scrollMonitor.create($('.products'), -300)
    var productsTimeline = new TimelineLite()
    productsTimeline
      .staggerFrom('.products .flat-card', 0.6, { opacity: 0, y: 60, ease: defaultEasing }, 0.2, 'card')
      .staggerFrom('.products .flat-card svg ', 0.6, { y: 40, ease: defaultEasing }, 0.2, 'card+=0.2')
      .staggerFrom('.products .flat-card h3', 0.6, { opacity: 0, y: 20, ease: defaultEasing }, 0.2, 'card+=0.6')
      .staggerFrom('.products .flat-card ul', 0.6, { opacity: 0, y: 20, ease: defaultEasing }, 0.2, 'card+=0.8')
    productsTimeline.pause()
    productsWatcher.enterViewport(function () {
      productsTimeline.restart()
      productsWatcher.destroy()
    })

    // Hero Slider Setup
    $('.hero-slider').slick({
      infinite: true,
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2500,
      fade: true,
      cssEase: 'linear',
      prevArrow: 'section.hero .slider-prev',
      nextArrow: 'section.hero .slider-next'
    })

    // Company Slider Setup
    $('.company-slider').slick({
      infinite: true,
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 1500,
      fade: true,
      cssEase: 'linear',
      prevArrow: 'section.company .slider-prev',
      nextArrow: 'section.company .slider-next',
      responsive: [
        {
          breakpoint: 479,
          settings: {
            dots: false,
            arrows: false
          }
        }
      ]
    })

    // Slider Slider Setup
    $('.fullscreen-slider').slick({
      infinite: true,
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2500,
      fade: true,
      cssEase: 'linear',
      prevArrow: 'section.fullscreen .slider-prev',
      nextArrow: 'section.fullscreen .slider-next'
    })

    // Brands Slider Setup
    $('.brands-slider').slick({
      infinite: true,
      dots: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2500,
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow: 'section.brands .slider-prev',
      nextArrow: 'section.brands .slider-next',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            arrows: false
          }
        },
        {
          breakpoint: 479,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: false,
            arrows: false
          }
        }
      ]
    })
  }
})
