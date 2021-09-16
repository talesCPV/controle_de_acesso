<?php

  $resp = "";

	if (IsSet($_POST["path"])){
	  $path = $_POST["path"];
   
      if (file_exists($path)) {
          $fp = fopen($path, "r");
          while (!feof ($fp)) {
              $resp = $resp . fgets($fp,4096);
          }
          fclose($fp);
        }
    }

//    $rows = explode("\r\n", $resp);

	print json_encode($resp);

?>