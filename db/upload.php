<?php

echo "antes<br>" ;

foreach ($_POST as $key => $value) {

    echo $key.":".$value."<br>";
}

echo $_FILES["filename"]."<br>" ;

if (IsSet($_FILES["filename"])){  

    echo $file_name;

}

  if (IsSet($_FILES["up_file"])){    

    echo "entrou<br>" ;

    $file_name = $_POST["filename"];;


    
    copy($_FILES["up_file"]["tmp_name"],$file_name);

  }
?>