<?php
  if (!isset($_POST)){
    die();
  }

  $emailTo = 'ventas@lcielectricidad.com.ar';
  $emailCC = '';
  $emailBCC = '';
  $name = trim($_POST['form-name']);
  $email = trim($_POST['form-email']);
  $phone = trim($_POST['form-phone']);
  $message = trim($_POST['form-message']);
  $subject = trim($_POST['form-subject']);

  if( $name == '' || $email == '' ){
    die();
  }

  $emailSubject = $subject;

  $emailHeaders .= "From: ".$name." <".$email.">\r\n";
  $emailHeaders .= "Reply-To: " . $email . "\r\n";
  $emailHeaders .= $emailCC != ''? "Cc: " . $emailCC . "\r\n" : '';
  $emailHeaders .= $emailBCC != ''? "Bcc: " . $emailBCC . "\r\n" : '';
  $emailHeaders .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

  $emailMessage = '';
  $emailMessage .= '<b>Nombre:</b> '.$name.'<br>';
  $emailMessage .= '<b>Email:</b> '.$email.'<br>';
  $emailMessage .= '<b>Teléfono:</b> '.$phone.'<br>';
  $emailMessage .= '<b>Mensaje:</b> '.$message;

  if ( mail( $emailTo, $emailSubject, $emailMessage, $emailHeaders ) ) {
    $result = array( 'success' => true, 'message' => 'Gracias por escribirnos, nos pondremos en contacto a la brevedad.' );
  }
  else {
    $result = array( 'success' => false, 'message' => 'Ocurrió un error al enviar el email, por favor reinténtelo.' );
  }
  echo json_encode( $result );
?>
