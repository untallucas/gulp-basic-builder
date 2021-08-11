// HOME PAGE ANIMATIONS
/* global $, images */

function assignClick () {
  if ($(window).width() >= 320) {
    $('.thumb').click(function () {
      $('#modal-gallery').modal('show')
    })
  } else {
    $('.thumb').unbind('click')
  }
}

$(document).ready(function () {
  if ($('body').hasClass('offers')) {
    var thumbTemplate
    var galleryTemplate

    images.reverse()
    $.each(images, function (i, item) {
      thumbTemplate = $('#thumbs-model').clone()
      thumbTemplate.removeAttr('id')
      thumbTemplate.find('.thumb').attr('src', item)
      thumbTemplate.children('a').attr('data-slide-to', images.length - i - 1)
      thumbTemplate.insertAfter('#thumbs-model')
      thumbTemplate.show()
    })
    $('#thumbs-model').remove()

    $.each(images, function (i, item) {
      galleryTemplate = $('#gallery-model').clone()
      galleryTemplate.removeAttr('id')
      galleryTemplate.children('img').attr('src', item)
      galleryTemplate.insertAfter('#gallery-model')
      if (i === 0) {
        galleryTemplate.addClass('active')
      }
    })
    $('#gallery-model').remove()

    assignClick()

    $(window).on('resize', function () {
      assignClick()
    })

    $(document).keydown(function (e) {
      if (e.keyCode === 37) {
        $('.carousel-control.left').click()
        return false
      }
      if (e.keyCode === 39) {
        $('.carousel-control.right').click()
        return false
      }
    })
  }
})
