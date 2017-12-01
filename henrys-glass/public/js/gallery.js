(function(window, $){
  $('#gallery-modal .close').on('click', function() {
    var galleryModal = $('#gallery-modal');
    galleryModal.modal({show: false,});
  });

  $('#gallery a').on('click', function(event) {
    var imgSrc = $(this).attr('href');
    var lightboxImg = $('#gallery-image img');
    var lightboxHeight = window.innerHeight - 120;
    var galleryModal = $('#gallery-modal');

    event.preventDefault();

    lightboxImg.attr('src', imgSrc);
    lightboxImg.css({height: lightboxHeight + 'px'});
    galleryModal.modal({show: true,});
  });
}(window, jQuery));
