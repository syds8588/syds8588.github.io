// this behavior is different from the other pages. only shows if scrolled right at top.
$(window).on('scroll', function (e) {
    var cur = window.pageYOffset
    if (cur <= 50) {
        $('.navbar').addClass('show-nav')
    } else {
        $('#cart').removeClass('active');
        $('.navbar').removeClass('show-nav')
    }
});

$('[data-target]').on('click', function (e) {
    
    if ($(e.target).hasClass('active')) {
        return false;
    }
    
    if ($(e.target).is('li')) {
        var targetSet = $(e.target).attr('data-target');

    $('[data-target].active').removeClass('active');
    $(e.target).addClass('active');

    $('[data-for-target].active').animate({
        opacity: 0
    }, 300, function () {
        $('[data-for-target].active').removeClass('active');
        $('.custom-menu-item-info').animate({
            scrollTop: 0
        }, 1);
        $('.custom-menu-items-list').animate({
            scrollTop: 0
        }, 1);
        $(`[data-for-target="${targetSet}"]`).css('opacity', 0).addClass('active');
        $(`[data-for-target="${targetSet}"]`).animate({
            opacity: 1
        }, 300);
    });
    }
    
});

// store what's in the tank for the cart
var initailCartState = {'tank-selection': 'aqua-open-spaces'}
var cartState = localStorage.getItem('cart') || initailCartState
if (!localStorage.getItem('cart')) {
    cartState = initailCartState
    localStorage.setItem('cart', JSON.stringify(cartState))
} else {
    cartState = JSON.parse(localStorage.getItem('cart'))
}

    // change what's in the tank
$('input[name*=quantity]').on('change click keyup ', updateTankUI);

// change tank background image
$('input[name="tank-selection"]').on('change', function (e) {
    $('#cart').removeClass('active');
    var newImg = $(e.target).val();
    $('.tank-image-wrapper').css('background-image', `url(${newImg})`);
    cartState['tank-selection'] = newImg.split('.')[0]
    
    localStorage.setItem('cart', JSON.stringify(cartState))
});


function updateTankUI(e) {
    $('#cart').removeClass('active');
    var myName = $(e.target).attr('name').split(':');
    var category = myName[0];
    var subCategory = myName[1];
    var val = $(e.target).val();
    if (cartState[category] === undefined) {
        cartState[category] = {}
    }
    
    
    if (val === cartState[category][subCategory]) {
        return false;
    }
    
    cartState[category][subCategory] = val
    
    $(`.tank-image-wrapper img[data-tank-image="${myName.join(':')}"]`).detach();
    
    for (var i = 0; i < val; i++) {
        var $newImg = $(`.tank-image-templates img[data-tank-image="${myName.join(':')}"]`).clone();
        
        $(`.tank-image-wrapper`).append($newImg);   
        
        if (subCategory.indexOf('snail') !== -1) {
            Scuttle($newImg)
        } else if ( category.indexOf('plants') !== -1) {
            PlacePlant($newImg)
        } else {
            Swim($newImg);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cartState))
}

function Swim(s) {
    var theContainer = $(".tank-image-wrapper").parent(),
        maxLeft = theContainer.width() - s.width(),
        maxTop = theContainer.height() - s.height(),
        leftPos = Math.floor(Math.random() * maxLeft),
        topPos = Math.floor(Math.random() * maxTop),
        randL = Math.floor(Math.random() * maxLeft),
        randT = Math.floor(Math.random() * maxTop),
        curL = parseInt(s.css('left')),
        curT = parseInt(s.css('top')),
        newT, newL,
        varianceT = Math.floor(Math.random() * 30),
        varianceL = Math.floor(Math.random() * 60),
        faceLeft = true;
    if (s.attr('style')) {
        if ((varianceL + curL) > maxLeft) {
            faceLeft = true
            newL = curL - varianceL
        } else if (curL - varianceL < 0) {
            faceLeft = false
            newL = curL + varianceL    
        } else {
            var b = !!Math.floor(Math.random() * 2)
            
            if (b) {
                faceLeft = false
                newL = curL + varianceL    
            } else {
                newL = curL - varianceL    
            }
        }
        
        if ((varianceT + curT) > maxTop) {
            newT = curT - varianceT
        } else if (curT - varianceT < 0) {
            newT = curT + varianceT
        } else {
            
            var b = !!Math.floor(Math.random() * 2)
            
            if (b) {
                newT = curT + varianceT
            } else {
                newT = curT - varianceT
            }
        }
        
        s.animate({
            "left": newL,
            "top": newT
        }, Math.floor(Math.random() * 2000) + 2000, function () {
          Swim(s)
        });
    } else {
        newT = randT;
        newL = randL;
        
        s.css({
            "left": newL,
            "top": newT
        });
        
        setTimeout(function() {
            Swim(s)
        }, 500);
        
    }
    
    if (faceLeft) {
        s.removeClass("right").addClass("left");
    } else {
        s.removeClass("left").addClass("right");
    }
    return s
}


function Scuttle(s) {
    var theContainer = $(".tank-image-wrapper").parent(),
        maxLeft = theContainer.width() - s.width(),
        maxTop = theContainer.height() - s.height(),
        leftPos = Math.floor(Math.random() * maxLeft),
        topPos = (maxTop * .9) + Math.floor(Math.random() * maxTop * .1),
        randL = Math.floor(Math.random() * maxLeft),
        randT = Math.floor(Math.random() * maxTop),
        curL = parseInt(s.css('left')),
        curT = parseInt(s.css('top')),
        newT, newL,
        varianceT = Math.floor(Math.random() * 5),
        varianceL = Math.floor(Math.random() * 20),
        faceLeft = true;

    if (s.is(':visible')) {
        if ((varianceL + curL) > maxLeft) {
            faceLeft = true
            newL = curL - varianceL
        } else if (curL - varianceL < 0) {
            faceLeft = false
            newL = curL + varianceL    
        } else {
            var b = !!Math.floor(Math.random() * 2)
            
            if (b) {
                faceLeft = false
                newL = curL + varianceL    
            } else {
                newL = curL - varianceL    
            }
        }
        
        if ((varianceT + curT) > maxTop) {
            newT = curT - varianceT
        } else if (curT - varianceT < (maxTop * .9)) {
            newT = curT + varianceT
        } else {
            
            var b = !!Math.floor(Math.random() * 2)
            
            if (b) {
                newT = curT + varianceT
            } else {
                newT = curT - varianceT
            }
        }
        
        s.animate({
            "left": newL,
            "top": newT
        }, Math.floor(Math.random() * 2000) + 10000, function () {
          Scuttle(s)
        });
    } else {
        newT = randT;
        newL = randL;
        
        s.css({
            "left": newL,
            "top": newT
        });
        
        setTimeout(function() {
            Scuttle(s)
        }, 500);
        
    }
    
    
    
    if (faceLeft) {
        s.removeClass("right").addClass("left");
    } else {
        s.removeClass("left").addClass("right");
    }
    
    
    
    return s
}


function PlacePlant (s) {
    var theContainer = $(".tank-image-wrapper").parent(),
        maxLeft = theContainer.width() - s.width(),
        maxTop = theContainer.height() - s.height(),
        leftPos = Math.floor(Math.random() * maxLeft),
        topPos = (maxTop * .8) + Math.floor(Math.random() * maxTop * .2);
    
    s.css({top: topPos, left: leftPos});
    return s
}
