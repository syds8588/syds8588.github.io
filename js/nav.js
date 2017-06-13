var orgPos = 0
$(window).on('scroll', function (e) {
    var cur = window.pageYOffset
    if (cur <= 100 || cur < orgPos) {
        $('.navbar').addClass('show-nav')
    } else {
        $('#cart').removeClass('active');
        $('.navbar').removeClass('show-nav')
    }
    orgPos = cur;
});

var pageHeight = $(document).height;
$(window).on('scroll', function (e) {
    var yVal = window.pageYOffset * 60 / pageHeight;
    $('.page-1-info li div').css('background-position', `50% ${yVal}%`);
});