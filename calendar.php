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

  //Remove eventually - just to work on Wachovia Proxy
    //curl_setopt( $curl, CURLOPT_PROXY, 'http://pac.wachovia.net:80' );
    //curl_setopt( $curl, CURLOPT_HTTPPROXYTUNNEL, 1 );


  // Execute and close
  $result = curl_exec($curl);

  if ($result===false){ print curl_error($curl); }

  $xml= simplexml_load_string($result);



  //  USE THIS TO SHOW ALL GROUPS

  // Start output buffering
  ob_start();

    // var_dump($xml);

  echo '<html><body>';

  $cnt = 60;
  for($i=0; $i<$cnt; $i++)
  {
    $group_name = $xml->response->items->item[$i]->group_name;
    $date = $xml->response->items->item[$i]->date;
    $title = $xml->response->items->item[$i]->event_name;
    $desc = $xml->response->items->item[$i]->event_description;
    $time = $xml->response->items->item[$i]->start_time;
    $location = $xml->response->items->item[$i]->location;

    $time_pieces = explode(":", $time);
    $date_pieces = explode("-", $date);

        switch ($time_pieces[0]){
            case "12":
                $first_part = "12";
        $last_part = "pm";
                break;
      case "13":
                $first_part = "01";
        $last_part = "pm";
                break;
            case "14":
                $first_part = "02";
        $last_part = "pm";
                break;
            case "15":
                $first_part = "03";
        $last_part = "pm";
                break;
            case "16":
                $first_part = "04";
        $last_part = "pm";
                break;
            case "17":
                $first_part = "05";
        $last_part = "pm";
                break;
            case "18":
                $first_part = "06";
        $last_part = "pm";
                break;
            case "19":
                $first_part = "07";
        $last_part = "pm";
                break;
            case "20":
                $first_part = "08";
        $last_part = "pm";
                break;
            case "21":
                $first_part = "09";
        $last_part = "pm";
                break;
            case "22":
                $first_part = "10";
        $last_part = "pm";
                break;
            case "23":
                $first_part = "11";
        $last_part = "pm";
                break;
            default:
                $first_part = $time_pieces[0];
        $last_part = "am";
        }

    switch ($date_pieces[1]){
            case "01":
                $event_month = "JAN";
                break;
            case "02":
                $event_month = "FEB";
                break;
            case "03":
                $event_month = "MAR";
                break;
            case "04":
                $event_month = "APR";
                break;
            case "05":
                $event_month = "MAY";
                break;
            case "06":
                $event_month = "JUN";
                break;
            case "07":
                $event_month = "JUL";
                break;
            case "08":
                $event_month = "AUG";
                break;
            case "09":
                $event_month = "SEP";
                break;
            case "10":
                $event_month = "OCT";
                break;
            case "11":
                $event_month = "NOV";
                break;
            case "12":
                $event_month = "DEC";
                break;
            default:
                $event_month = "Month not returned";
        }


    // add event type

    $teen_groups = array(
        '180 Degrees Teen Ministry'
    );

    $children_groups = array(
        'Above All Youth',
        'Seed of David'
    );

    $adult_groups = array(
        'Women of Wisdom',
        'The Brotherhood',
        'Single Adults Linked Together',
        'Living As One Together in Covenant'
    );

    $men_groups = array(
        'The Brotherhood'
    );

    $women_groups = array(
        'Women of Wisdom',
        'Women of Integrity'
    );

    $study_groups = array(
        'Monday School',
        'New Partners'
    );

    $services = array(
        'Morning Worship Service'
    );

    $bible_studies = array(
        'Weekly Bible Study'
    );


    // Build group categories for event

    $event_categories = array();

    if (in_array($group_name, $teen_groups)) {
        array_push($event_categories, 'teens');
    }
    if (in_array($group_name, $children_groups)) {
        array_push($event_categories, 'children5-8');
    }
    if (in_array($group_name, $men_groups)) {
        array_push($event_categories, 'men');
    }
    if (in_array($group_name, $women_groups)) {
        array_push($event_categories, 'women');
    }
    if (in_array($group_name, $adult_groups)) {
        array_push($event_categories, 'adults');
    }
    if (in_array($group_name, $study_groups)) {
        array_push($event_categories, 'study');
    }
    if (in_array($title, $services)) {
        array_push($event_categories, 'service');
    }
    if (in_array($title, $bible_studies)) {
        array_push($event_categories, 'bible-study');
    }

    // write event to markup

    if ($event_month != "Month not returned") {

        echo '<div class="event '. implode(' ', $event_categories).'">
            <div class="title">'.$title.'</div>
                <div class="date">
                    <span class="month">'.$event_month.'</span>
                    <span class="day">'.$date_pieces[2].'</span>
                </div>
                <div class="description">
                    <p>'.$desc.'</p>
                    <div class="group">'.$group_name.'</div>
                </div>
                <a href="/"><span></span>more</a>
            </div>';

    }

  }

  echo '</body></html>';

  // saving captured output to file
    file_put_contents('calendar.html', ob_get_contents());

    // end buffering and displaying page
    ob_end_flush();

curl_close($curl);

?>
