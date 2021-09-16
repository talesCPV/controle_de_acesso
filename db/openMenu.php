<?php

    if (IsSet($_POST["token"])){
        $token = $_POST["token"];
        include "connect.php";

        $query = "SELECT class FROM tb_user WHERE token = '{$token}';";
        $result = mysqli_query($conexao, $query);
        $class = 0;

        while($resp = mysqli_fetch_assoc($result)) {
            $class = $resp["class"];
        }

        $json = file_get_contents('../assets/menu.json');
        $json = json_decode($json, true);

        $out = [];

        foreach ( $json["modulos"] as $item){

            if (in_array($class, $item["perm"])) { 
                    $sub = [];
                foreach ( $item['itens'] as $menu_sub){
                    if (in_array($class, $menu_sub["perm"])) {
                        array_push($sub,$menu_sub);
                    }                
                }
                $item["itens"] = $sub;
                array_push($out,$item);
            }
       
        }

        print json_encode($out);

    }

?>