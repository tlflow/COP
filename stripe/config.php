<?php
require_once('../vendor/autoload.php');

$stripe = array(
  "secret_key"      => "sk_test_ip3Pzo2eqyF9iKTEENrBU0tO",
  "publishable_key" => "pk_test_GMw0WpEXGUXL3yq4NvZ6pFcE"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
?>