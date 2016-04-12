<?php require_once('./config.php'); ?>

<script src="https://checkout.stripe.com/checkout.js"></script>

<input type="number"
       id="donation-amount"
       placeholder="10.00"
       min="0"
       step="10.00"/>
<button id="customButton">Purchase</button>

<script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
<script>
  var handler = StripeCheckout.configure({
    key: '<?php echo $stripe['publishable_key']; ?>',
    image: 'https://churchofphiladelphia.com/images/cop-logo.svg',
    token: function(token, args) {
      // Use the token to create the charge with a server-side script.
      // You can access the token ID with `token.id`
      console.log("token", token);

      var $donationAmount = $("#donation-amount").val() * 100;

      $.ajax({
        url: 'process-giving.php',
        type: 'post',
        data: {token: token, tokenid: token.id, email: token.email, donationAmt: $donationAmount},
        success: function(data) {
            if (data == 'success') {
                console.log("Card successfully charged!");
            }
            else {
                console.log("Success Error!");
                console.log("data", data);
            }

          },
          error: function(data) {
            console.log("Ajax Error!");
          }
        }); // end ajax call
      }
    });


  $('#customButton').on('click', function(e) {
    // Open Checkout with further options

     var amount = $("#donation-amount").val() * 100;

    handler.open({
      name: 'Tithes and Offering',
      description: 'Your giving',
      amount: amount
    });
    e.preventDefault();
  });

  // Close Checkout on page navigation
  $(window).on('popstate', function() {
    handler.close();
  });
</script>
