<?php
// process.php

  $name      = $_POST['name'];
  $email     = $_POST['email'];
  $phone     = $_POST['phone'];
  $status    = $_POST['status'];
  $moreinfo  = $_POST['moreinfo'];
  $joingroup = $_POST['joingroup'];
  $comment   = $_POST['comment'];

  // if you ever decide to do a check for anti-spam
  // $human = intval($_POST['human']);

  $from = 'Demo Contact Form';
  $to = 'tlflow33@gmail.com';
  $subject = 'Message from Contact Demo ';

  $body ="From: $name\n E-Mail: $email\n Phone: $phone\n Status: $status\n Wants More Info: $moreinfo\n Wants to Join Group: $joingroup\n Comment:\n $comment";

  $errors  = array();      // array to hold validation errors
  $data    = array();      // array to pass back data

// validate the variables ======================================================
    // if any of these variables don't exist, add an error to our $errors array

    if (empty($_POST['name']))
        $errors['name'] = 'Name is required.';

    if (empty($_POST['email']))
        $errors['email'] = 'Email is required.';

// return a response ===========================================================

    // if there are any errors in our errors array, return a success boolean of false
    if ( ! empty($errors)) {

        // if there are items in our errors array, return those errors
        $data['success'] = false;
        $data['errors']  = $errors;

    } else {

        // if there are no errors process our form, then return a message

        // DO ALL YOUR FORM PROCESSING HERE
        // MAIL OFF FORM ENTRY
        mail ($to, $subject, $body, $from);

        // show a message of success and provide a true success variable
        $data['success'] = true;
        $data['message'] = 'Success!';
    }

    // return all our data to an AJAX call
    echo json_encode($data);
