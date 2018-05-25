<?php
	header("Content-type:text/html;charset=utf-8");
	require("./connect.php");

	$username = @$_POST["username"];
	$pwd = @$_POST["pwd"];
	// echo $username;
    
    $sql_login = "SELECT username,pwd FROM login";
    $result_login = $conn->query($sql_login);

    // echo $result_login->num_rows;
	  if($result_login->num_rows <= 0){
	    die("0");
	  }

	$haspwd = FALSE;//该用户名密码是否正确;
	$select_res = FALSE;//储存用户信息;

	  while($row = $result_login->fetch_assoc()){
	    // echo $row["username"];
	    if($row["username"] == $username && $row["pwd"] == md5($pwd)){
	    	$select_res = json_encode($row);
	    	$haspwd = TRUE;
	        break;
	    }
	    // echo json_encode($row);
	  }
	  // echo $haspwd;
	  

	  if($haspwd == TRUE){
	  	die($select_res);
	  }else{
	  	die("success");
	  }

	  // die("/er");

?>