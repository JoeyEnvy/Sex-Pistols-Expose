<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    $to = "apollo-heatsource@hotmail.com";
    $subject = "Contact Form Submission";
    $headers = "From: $email\r\n";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
}
?>
