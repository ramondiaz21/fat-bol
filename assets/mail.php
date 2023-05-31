<?php 
$destinatario = "auxventas@agroteso.com"; 
$asunto = "Correo desde página web."; 
$cuerpo = ' 
<html> 
<head> 
   <title>Correo desde página web</title> 
</head> 
<body> 
<h1>¡Hola amigos!</h1> 
<p> 
¡Hay alguien interesado en tener más información de Agroteso! 
</p> 
</body> 
</html> 
'; 

//para el envío en formato HTML 
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

//dirección del remitente 
$headers .= "From: Cliente Interesado Desde Página Web<".$_POST['email'].">\r\n"; 

//dirección de respuesta, si queremos que sea distinta que la del remitente 
//$headers .= "Reply-To: mariano@desarrolloweb.com\r\n"; 

//ruta del mensaje desde origen a destino 
//$headers .= "Return-path: holahola@desarrolloweb.com\r\n"; 

//direcciones que recibián copia 
//$headers .= "Cc: maria@desarrolloweb.com\r\n"; 

//direcciones que recibirán copia oculta 
//$headers .= "Bcc: pepe@pepe.com,juan@juan.com\r\n"; 

mail($destinatario,$asunto,$cuerpo,$headers) 
?>