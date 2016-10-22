<?php

  //Where 1 for endDateString is 1 month
  $startDateString = date("Y-m-d");
  $endDateString = date("Y-m-d", (mktime(0,0,0,date("m")+3,date("d"),date("Y"))));

  // URL string
  $url = 'https://churchofphiladelphia.ccbchurch.com/app/api.php?srv=public_calendar_listing&date_start='.$startDateString.'&date_end='.$endDateString.'';
  $myusername = 'website';
  $mypassword = 'jesuslives10';


  // Init curl
  $curl = curl_init($url);
  curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1 );
  curl_setopt( $curl, CURLOPT_SSL_VERIFYPEER, 0 );
  curl_setopt( $curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
  curl_setopt( $curl, CURLOPT_USERPWD, $myusername . ':' . $mypassword );

  // Execute and close
  $result = curl_exec($curl);

  if ($result===false){ print curl_error($curl); }

  $xml= simplexml_load_string($result);

  // var_dump($xml);

  echo json_encode($xml);

?>
