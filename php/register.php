<?php
     header("Content-type:text/html;charset=utf-8");
    require("./connect.php");

    // $usr = $_POST["username"];
    $tele = $_POST["tele"];
    $pwd = $_POST["pwd"];
    $pwd2 = $_POST["pwd2"];
    // echo $tele;
    $pwd = md5($pwd);

    $sql = "INSERT INTO register(
        tele,pwd,pwd2)
        VALUES 
        ('{$tele}','{$pwd}','{$pwd2}')";
    $sql_login = "SELECT tele,pwd FROM register";

    $result_login = $conn->query($sql_login);

    $hasuser = FALSE; //用户名是否存在;
    $select_res = FALSE;//储存用户信息;

    while($row = $result_login->fetch_assoc()){
        if($row["tele"] == $tele){
            $hasuser = TRUE;
        }
    }
    if($hasuser == TRUE){
        //用户名重名; => 2;
        echo 2;
    }else if($hasuser == FALSE){
        //注册成功成功;
        echo 3;
    }
   
?>