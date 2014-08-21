$(document).ready(function(){

// ロードされたときに掲示板を読み込み反映させる
$.ajax({
    type: "POST",
    url: "./DBread.php",
    dataType: "json",

    success: function(data, dataType){
    // ajax通信に成功したとき実行される
        if(data == null){alert('データが０件でした');}

        // underscoreを使った書込み
        var tpl = _.template($("#tpl").html());
        for(var i=0; i<data.length; i++){
            // $("#done").html(tpl({
            //     name: data[i].name,
            //     value: data[i].value
            // }));
            // ↓同じ処理
            $("#done").append(tpl(data[i]));
        }
    },
    error: function(){
        alert('AJAX - Error');
    }
});

//LOADボタンを押された場合も、同じ処理
$('#reload').click(function(){
    $.ajax({
    type: "POST",
    url: "./DBread.php",
    dataType: "json",

    success: function(data, dataType){
        if(data == null){alert('データが０件でした');}

            // #doneの内容初期化
            $("#done").html("");

            var tpl = _.template($("#tpl").html());
            for(var i=0; i<data.length; i++){
                $("#done").append(tpl(data[i]));
            }
    },
    error: function(){
        alert('AJAX - Error');
    }
    });
});

// 送信ボタンを押されたら、DBに追加開始
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

        // Ajax通信が成功した場合に呼び出されるメソッド
        success: function(data, dataType){
        //successのブロック内は、Ajax通信が成功した場合に呼び出される
        console.log('成功');
        //PHPからかえってくる（最後，echoされてる）データ
        console.log(data);
        },
        //Ajax通信が失敗した場合に呼び出されるメソッド
        error: function(XMLHttpRequest, textStatus, errorThrown)
        {
            //通常はここでtextStatusやerrorThrownの値を見て処理を切り分けるか、単純に通信に失敗した際の処理を記述します。
            //エラーメッセージの表示
            alert('Error : ' + errorThrown);
        }
    });
    //サブミット後、ページをリロードしないようにする
    return false;
});
});