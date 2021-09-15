<?php

    $query_db = array(
         "0" => "SELECT * FROM tb_user WHERE y0='x0' AND y1='x1';",
         "1" => "INSERT INTO tb_usuario VALUES ('a','b','c');",
         "2" => "SELECT * FROM tb_schedule where id_user='x0' AND dt_schedule between 'x1' and 'x2';",
         "3" => "INSERT INTO tb_schedule (y0, y1, y2) VALUES(x0, 'x1', 'x2') ON DUPLICATE KEY UPDATE txt='x2';",
         "4" => "DELETE FROM tb_schedule WHERE y0 = x0 AND y1 = 'x1' ;"
    );


    if (IsSet($_POST["cod"]) && IsSet($_POST["params"]) && IsSet($_POST["token"]) ){

        $cod = $_POST["cod"];        
        $params = json_decode($_POST["params"],true); 
        $token = $_POST["token"];

        include "connect.php";        
        if($cod == 0){ // login
            $mytoken = crip($params["user"].date("h:i:s"));
            $query = "UPDATE tb_user SET token = '{$mytoken}' WHERE user = '{$params['user']}' AND pass = '{$params['pass']}';";
            mysqli_query($conexao, $query);
        }

        $query = $query_db[$_POST["cod"]];
        $i = 0;
        foreach($params as $key => $val ){
            $query = str_replace('y'.$i, $key,$query); // fields
            $query = str_replace('x'.$i, $val,$query); // values
            $i++;
        }



		$result = mysqli_query($conexao, $query);
		$qtd_lin = $result->num_rows;

		if($qtd_lin > 0){
			$rows = array();
			while($r = mysqli_fetch_assoc($result)) {
			    $rows[] = $r;
			}
//            array_push($rows,"teste");
			print json_encode($rows);



		}

	    $conexao->close();        

    }


?>