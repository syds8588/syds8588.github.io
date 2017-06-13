var pageHeight = $(document).height();

// parallax for CTA buttons
$(window).on('scroll', function (e) {
    var yVal = window.pageYOffset * 80 / pageHeight;
  
    $('.page-1-info li div').css('background-position', `50% ${yVal}%`);
});


// scroll animation down to how it works section.
$('.howItWorks').on('click', function (e) {
   e.preventDefault;
    $('html, body').animate({scrollTop: $('#howItWorks').offset().top}, 500)
    return false
});