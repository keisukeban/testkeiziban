<?php

//Ajax通信ではなく、直接URLを叩かれた場合はエラーメッセージを表示するらしい，コピペ．
if (!(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') 
    && (!empty($_SERVER['SCRIPT_FILENAME']) && 'json.php' === basename($_SERVER['SCRIPT_FILENAME']))) {
    die ('このページは直接ロードしないでください。');
}

include 'path.php';
try{
    //内容を受け取る変数をnullで初期化しておく
    $table = null;
    //DBに接続
    $dbh = new PDO($dsn, $user, $password);

    //テーブルのデータを取得する
    $sql = 'select * from LOG';// LOG = table名
    $stmt = $dbh->query($sql);// sqlの実行結果

    //取得したデータを配列に格納
    while ($row = $stmt->fetchObject()){
        $table[] = array(
            "name" => $row->name,
            "value" => $row->value
            );
    }
    //JSON形式で出力する
    header('Content-Type: application/json');
    echo json_encode( $table );

    exit;

}catch (PDOException $e){
    //例外処理
    die('Error:' . $e->getMessage());
}
?>