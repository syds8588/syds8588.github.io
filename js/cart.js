$('#cart-trigger').on('click', function(e) {
    e.preventDefault();
    
    if (!$('#cart').hasClass('active')) {
        populateCart();
    }
    
    $('#cart').toggleClass('active');
});


function populateCart () {
    
    var cart = JSON.parse(localStorage.getItem('cart'))
    var $newList = $('<ul />');
    
    if (cart) {
        addEm(cart, $newList)
        $('#cart').prepend($newList);
        $('#cart ul:nth-child(2)').detach();
    }
}

function addEm (obj, $list) {
        Object.keys(obj).forEach(d => {
        const v = obj[d]
       if (typeof v === 'string') {
           if (isNaN(v)) {
                $list.append($('<li />').text(`${d}: ${v}`))
           } else {
               
            if (v !== '0') {
                $list.append($('<li />').text(`${v}x ${d}`))
            }   
           }
       } else {
           addEm(v, $list);
       }
    });   
}

$('#cart p').on('click', purchase);

function purchase() {
    
    var list = $('#cart ul').clone();
    if ($('li:first-child', list).text() !== 'No items in cart') {
        delete localStorage.cart
//        alert(JSON.stringify(list, null, 2))
        $('#completed-cart').html(list);
        $('#cart-modal').modal('show');
$('#cart-modal').on('hidden.bs.modal', function (e) {
  $('#cart-trigger').click()
  if ($('[data-target="#bs-navbar-collapse"]').is(':visible')) {
      $('[data-target="#bs-navbar-collapse"]').click()
  }
})
    }
}