$(document).ready(function(){

$.ajax({
    type: "POST",
    url: "./DBread.php",
    dataType: "json",

    success: function(data, dataType){

        if(data == null) alert('データが０件でした');
        $content = $("#output");

        // jQueryでINSERTの結果→配列→JSONをしようと思ったけど、、、
            // var arr = mysql_fetch_array(data);
            // console.log(arr);

            // var json = $.toJSON(arr);
        
        for(var i=0; i<data.length; i++){
            $content.append('<p>Name is ['+data[i].name+'] -> Value is ['+data[i].value+']</p>');
        }

    },
    error: function(){
        alert('Read - Error');
    }
});

//LOADボタンを押された場合も、同じ処理
$('#reload').click(function(){
    $.ajax({
    type: "POST",
    url: "./DBread.php",
    dataType: "json",

    success: function(data, dataType){

        if(data == null) alert('データが０件でした');
        $content = $("#output");

        //contentの内容を消してからappend
        $($content).html("");        

        for(var i=0; i<data.length; i++){
            $content.append('<p>Name is ['+data[i].name+'] -> Value is ['+data[i].value+']</p>');
        }

    },
    error: function(){
        alert('Read - Error');
    }
    });
});

//-------------------------------------------------------------------
// 送信ボタンクリックしたら、DBに追加開始
$('#send').click(function(){
    //POSTメソッドで送るデータを定義します var data = {パラメータ名 : 値};
    var data = 
        {
            name: $('#name').val(),
            value: $('#value').val()
            
        };

    /**
     * Ajax通信メソッド
     * @param type  : HTTP通信の種類
     * @param url   : リクエスト送信先のURL
     * @param data  : サーバに送信する値
     */
    $.ajax({
        type: "POST",
        url: "./DBwrite.php",
        data: data,
        /**
         * Ajax通信が成功した場合に呼び出されるメソッド
         *ああ、function(data, dataType)とdataが１つしかないから、１つの変数使うんやわ
         */
        success: function(data, dataType){
        //successのブロック内は、Ajax通信が成功した場合に呼び出される
        console.log('成功');
        //PHPからかえってくるデータ??
        console.log(data);
        },
        //Ajax通信が失敗した場合に呼び出されるメソッド
        error: function(XMLHttpRequest, textStatus, errorThrown)
        {
            //通常はここでtextStatusやerrorThrownの値を見て処理を切り分けるか、単純に通信に失敗した際の処理を記述します。

            //this;
            //thisは他のコールバック関数同様にAJAX通信時のオプションを示します。

            //エラーメッセージの表示
            alert('Error : ' + errorThrown);
        }
    });

    //サブミット後、ページをリロードしないようにする
    return false;
});

});