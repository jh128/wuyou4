<?php
      header("Content-type:text/html;charset=utf-8");
	$servername = "localhost:3306";
      $username = "root";
      $pwd = "";
      $dbname = "wuyou";
      // 创建连接
      $conn = new mysqli($servername, $username, $pwd,$dbname);
      // 检测连接
      if ($conn->connect_error) {
          die("连接失败: " . $conn->connect_error);
      }
      echo "连接成功";

?>