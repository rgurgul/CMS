<?php
echo '<?xml version="1.0" encoding="iso-8859-2"?>';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-
transitional.dtd">
<html>
<head>
<meta http-equiv="Content-type" content="text/html; charset=iso-8859-2" />
<title>Upload File</title>
</head>
<body>

<div>
<form enctype="multipart/form-data" action="file.php?dir=<?php echo $_GET['dir']; ?>" method="POST">
<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />
<input name="plik" type="file" />
<input type="submit" value="Wyślij plik" />
</form>
</div>

<script>
    function displayMessage (evt) {
        var message;
        if (evt.origin !== location.hostname) {
            message = "You are not worthy";
        }
        else {
            message = "I got " + evt.data + " from " + evt.origin;
        }
        document.getElementById("received-message").innerHTML = message;

        //parent.postMessage('test', "http://onet.pl");
        //window.opener.postMessage(10, "*")

    }

    if (window.addEventListener) {
        // For standards-compliant web browsers
        window.addEventListener("message", displayMessage, false);
    }
    else {
        //window.attachEvent("onmessage", displayMessage);
    }
</script>


<?php
$plik_tmp = $_FILES['plik']['tmp_name'];
$plik_nazwa = $_FILES['plik']['name'];
$plik_rozmiar = $_FILES['plik']['size'];

if(is_uploaded_file($plik_tmp)) {
     move_uploaded_file($plik_tmp, "../img/upload/" . $_GET['dir'] . "/$plik_nazwa");
    echo "Plik: <strong>$plik_nazwa</strong> o rozmiarze
    <strong>$plik_rozmiar bajtów</strong> został przesłany na serwer!";
    echo "<script>window.opener.postMessage('img/upload/" . $_GET['dir'] . "/" . $plik_nazwa . "', '*')</script>";
} else {
     //echo "ERROR";
}

//echo "<script>alert('upload/" . $plik_nazwa . "')</script>";

?>


<p id="received-message">I've heard nothing yet</p>

</body>
</html>