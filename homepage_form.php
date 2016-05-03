<?php
	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$phone = $_POST['phone'];
		$status = $_POST['status'];
		$comments = $_POST['comments'];
		// $human = intval($_POST['human']);
		$from = 'Homepage Contact Form';
		$to = 'tlflow33@gmail.com';
		$subject = 'Message from Church of Philadelphia Contact Form ';

		$body ="From: $name\n E-Mail: $email\n Message:\n $message";

		// Check if name has been entered
    if (empty($_POST["name"])) {
      $errName = "Name is required";
    } else {
      $name = test_input($_POST["name"]);
      // check if name only contains letters and whitespace
      if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
        $errName = "Only letters and white space allowed";
      }
    }

		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}

		//Check if message has been entered
		if (!$_POST['comments']) {
			$errComments = 'Please enter your message';
		} else {
      $message = test_input($_POST["message"]);
    }

		//Check if simple anti-bot test is correct
		// if ($human !== 5) {
		// 	$errHuman = 'Your anti-spam is incorrect';
		// }

// If there are no errors, send the email
if (!$errName && !$errEmail && !$errComments) {
	if (mail ($to, $subject, $body, $from)) {
		$result='<div class="alert alert-success">Thank You! We will be in touch</div>';
	} else {
		$result='<div class="alert alert-danger">Sorry, there was an error sending your message. Please try again later.</div>';
	}
}
	}
?>

<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
    <div class="row">
        <div class="medium-6 columns">
            <label class="text-left">Name
                <input type="text" placeholder="Your First &amp; Last Name" value="<?php echo htmlspecialchars($_POST['name']); ?>">
            </label>
        </div>
    </div>
    <div class="row">
        <div class="small-6 columns">
            <label class="text-left">Email
                <input type="email" id="email" name="email" placeholder="Your e-mail" value="<?php echo htmlspecialchars($_POST['email']); ?>">
            </label>
        </div>
        <div class="small-6 columns">
            <label class="text-left">Phone
                <input type="tel" id="phone" name="phone" placeholder="Your phone number" value="<?php echo htmlspecialchars($_POST['phone']); ?>">
            </label>
        </div>
    </div>
    <div class="row">
        <div class="medium-6 columns">
            <label class="text-left">Status
                <select name="status" id="status">
                    <option value="going-to-visit">Would like to visit</option>
                    <option value="first-time">First Time Visitor</option>
                    <option value="second-time">Second Time Visitor</option>
                    <option value="regular-attender">Regular Attender</option>
                </select>
            </label>
        </div>

    </div>
    <div class="row">
      <div class="small-12 columns">
        <label for="">Comments
          <textarea name="comment" rows="5" cols="40"><?php echo $comment;?></textarea>
        </label>
      </div>
    </div>
    <fieldset class="text-left">
        <div class="row">
            <div class="small-12 medium-6 columns">
                <input id="checkbox1" type="checkbox">
                <label for="checkbox1">More information about Church of Philadelphia</label>
            </div>
            <div class="small-12 medium-6 columns">
                <input id="checkbox2" type="checkbox">
                <label for="checkbox2">Join a small group</label>
            </div>
        </div>
    </fieldset>
    <div class="row">
        <div class="small-12 columns">
            <a class="blue-custom-btn" href="/">submit</a>
        </div>
    </div>

</form>

<?php echo $result; ?>
