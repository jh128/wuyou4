<?php

	header("Access-Control-Allow-Origin:*");

	$usr = $_POST["username"];
	$tele = $_POST["tele"];
	$pwd = $_POST["pwd"];
	$type = $_POST["type"];
	echo $type;
	if($type !== "login" && $type !== "register"){
		$res = array("error"=>"i don't know what are u doing!");
		die(json_encode($res));
	}
	require("./connect.php");
	 // $pwd = md5($pwd);
    //根据不同情况进行不同判断;
    
    $sql_login = "SELECT username,pwd FROM login";
   
    $sql_register = "INSERT register(
        tele
    )
        VALUES 
    ('{$tele}')
    ";
    $result_login = $conn->query($sql_login);
    // $result_register = $conn->query($sql_register);
    

    
    $hasuser = FALSE; //用户名是否存在;
    $select_res = FALSE;//储存用户信息;
    $haspwd = FALSE;//该用户名密码是否正确;
    
    while($row = $result_login->fetch_assoc()){
        //array("username"=>yanghuaizhi,"pwd":"123456")
        if($row["username"] == $usr){
            $hasuser = TRUE;
            //如果是注册，没必要判断密码;
            if($type == "register"){
                break;
            }
            if($row["pwd"] == $pwd){
                $select_res = json_encode($row);
                $haspwd = TRUE;
                break;
            }
        }
    }

    if($type == "login" &&  $haspwd == TRUE){
    	//用户名密码都对，登录成功
        die($select_res);
    }else if($type == "login"){
        die("0"); //登录失败
    }

    if($type == "register" && $hasuser == TRUE){
        //用户名重名; => 2;
        echo 2;
    }else if($hasuser == FALSE && $result_register == TRUE){
        //注册成功成功;
        if($type == "register"){
        	$result_register = $conn->query($sql_register);
        }
        echo 1;
    }
    echo $hasuser;
?>