(function(window, $){
  $('#gallery-modal .close').on('click', function() {
    var galleryModal = $('#gallery-modal');
    galleryModal.modal({show: false,});
  });

  $('#gallery a').on('click', function(event) {
    var imgSrc = $(this).attr('href');
    var lightboxImg = $('#gallery-modal img');
    var modalDialog = $('#gallery-modal .modal-dialog');
    var modalBody = $('#gallery-modal .modal-body');
    var heightDiff = 55 + parseInt(modalDialog.css('margin-top')) * 2
      + parseInt(modalBody.css('padding-top')) * 2;
    console.log(heightDiff);
    var imgHeight = window.innerHeight - heightDiff;
    var galleryModal = $('#gallery-modal');

    event.preventDefault();

    lightboxImg.attr('src', imgSrc);
    lightboxImg.css({height: imgHeight + 'px'});
    // lightboxImg.css({height: '100%',});
    // $('#gallery-modal .modal-content').css({height: lightboxHeight + 'px'});
    galleryModal.modal({show: true,});
  });
}(window, jQuery));
