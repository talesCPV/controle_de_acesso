<?php

    $query_db = array(
         "0" => "SELECT * FROM tb_user WHERE y00='x00' AND y01='x01';",
         "1" => "INSERT INTO tb_usuario VALUES ('a','b','c');",
         "2" => "SELECT * FROM tb_schedule where dt_schedule between 'x01' and 'x02';",
         "3" => "INSERT INTO tb_schedule (y00, y01, y02) VALUES(x00, 'x01', 'x02') ON DUPLICATE KEY UPDATE txt='x02';",
         "4" => "DELETE FROM tb_schedule WHERE y00 = x00 AND y01 = 'x01' ;",
         "5" => "INSERT INTO tb_pessoa (y00, y01, y02, y03, y04, y05, y06, y07, y08, y09, y10) VALUES ('x00','x01','x02','x03','x04','x05','x06','x07','x08','x09','x10');",
         "6" => "INSERT INTO tb_casas (y00, y01, y02) VALUES ('x00', 'x01', 'x02') ;",
         "7" => "SELECT nome, rua, num FROM tb_pessoa WHERE y00 = 'x00' ;",
         "8" => "SELECT * FROM tb_ruas;",
         "9" => "INSERT INTO tb_ruas (y00) VALUES ('x00') ;",
         "10" => "DELETE FROM tb_ruas WHERE y00='x00' ;",
         "11" => "SELECT * FROM tb_pessoa WHERE y00 LIKE '%x00%' AND y01 LIKE '%x01%';",
         "12" => "UPDATE tb_pessoa SET y00='x00', y01='x01', y02='x02', y03='x03', y04='x04', y05='x05', y06='x06', y07='x07', y08='x08', y09='x09' WHERE y10='x10'; ",
         "13" => "DELETE FROM tb_pessoa WHERE y00='x00'; ",
         "14" => "INSERT INTO tb_acesso (y00, y01, y02) VALUES ('x00', 'x01', 'x02');",
         "15" => "SELECT v.nome AS Visitante, m.nome AS Morador, a.ent AS Entrada, a.sai AS Saida 
                FROM tb_acesso AS a 
                INNER JOIN tb_pessoa AS v 
                INNER JOIN tb_pessoa AS m 
                ON v.id = a.id_visit
                AND m.id = a.id_morad
                AND a.ent BETWEEN 'x00' AND 'x01'
                ORDER BY a.ent DESC ;",
         "16" => "SELECT v.nome AS Visitante, m.nome AS Morador, a.ent AS Entrada, a.sai AS Saida 
                FROM tb_acesso AS a 
                INNER JOIN tb_pessoa AS v 
                INNER JOIN tb_pessoa AS m 
                ON v.id = a.id_visit
                AND m.id = a.id_morad
                AND x00 LIKE '%x01%'
                ORDER BY a.ent DESC ;"                
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
            $y = 'y'.str_pad(strval($i), 2, "0", STR_PAD_LEFT);
            $x = 'x'.str_pad(strval($i), 2, "0", STR_PAD_LEFT);
        
            $query = str_replace($y, $key,$query); // fields
            $query = str_replace($x, $val,$query); // values
            $i++;
        }

//        echo $query;

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