<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		http_response_code(400);
		echo "Lo sentimos, ha ocurido un error. Por favor intenta nuevamente.";
		exit;
	}

  $recipient = "jramondiaz96@gmail.com";

  $subject = "sujeto de prueba";

  $email_headers = "Hay alguien interesado desde la página web";

	$email_content = "Ponte en contacto con esta persona en: $email\n";

	if (mail($recipient, $subject, $email_content, $email_headers)) {
		http_response_code(200);
		echo "Muchas gracias por tu interés. Recibirás un correo en tu bandeja de entrada en breve";
	} else {
		http_response_code(500);
		echo "Lo sentimos, ha ocurido un error. Por favor intenta nuevamente.";
	}

} else {
	http_response_code(403);
	echo "Lo sentimos, ha ocurido un error. Por favor intenta nuevamente.";
}
?>
