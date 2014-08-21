<?php

if (isset($_POST['name']) && isset($_POST['value'])){

	$name = $_POST['name'];
	$value = $_POST['value'];
	include 'path.php';

	try{
	    //DBに接続
		$dbh = new PDO($dsn, $user, $password);
	    //DBに追加
		$stmt = $dbh->prepare("insert into LOG(name, value) values(:NAME, :VALUE)");
        $stmt->bindParam(':NAME', $name, PDO::PARAM_STR);
        $stmt->bindParam(':VALUE', $value, PDO::PARAM_STR);
        $stmt->execute();

        exit;

	} catch (PDOException $e){
    	die('Error:' . $e->getMessage());
	}

}else{
	echo 'The parameter of "request" is not found.';
}

?>