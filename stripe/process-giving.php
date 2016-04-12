<?php
  require_once('./config.php');

  $token = $_POST['stripeToken'];
  $tokenid = $_POST['tokenid'];
  $donation = $_POST['donationAmt'];
  $email = $_POST['email'];
  //

  try
  {
    $customer = \Stripe\Customer::create(array(
        'email' => $email,
        'card'  => $tokenid
    ));
    $charge = \Stripe\Charge::create(array(
        'customer' => $customer->id,
        'amount'   => $donation,
        'currency' => 'usd'
    ));

    header('Location: thankyou.html');
    exit;
  }
  catch(\Stripe\Error\Card $e)
  {
    header('Location:oops.html');
    //   error_log("unable to sign up customer:" . $_POST['stripeEmail'].
    //     ", error:" . $e->getMessage());
  }

?>
