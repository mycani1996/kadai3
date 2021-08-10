//入力ボタン処理
var btn = document.getElementById('charactor_button');
btn.addEventListener('click', () => {
    const char_word = document.getElementById("charactor_text").value;
    if(char_word != ""){
        eel.charactor_search(char_word)
        document.getElementById("charactor_text").value = ""
    }else{
        alert("No Word")
    }
})

//sourceファイル変更処理
var fileInput = document.getElementById('inputFile');
fileInput.addEventListener('change', loadLocalCsv);
// 制限サイズ
const sizeLimit = 1024 * 1024 * 1;
// changeイベントで呼び出す関数
function loadLocalCsv(e) {
  // ファイル情報を取得
  var fileData = e.target.files[0];
  console.log(fileData); // 取得した内容の確認用
  // 1MB以上であれば処理終了
  if (fileData.size > sizeLimit) {
    alert("ファイルサイズは1MB以下にしてください");
    return
  }
  // CSVファイル以外は処理終了
  if(!fileData.name.match('.csv$')) {
      alert('CSVファイルを選択してください');
      return;
  }

  // FileReaderオブジェクトを使ってファイル読み込み
  var reader = new FileReader();
  // ファイル読み込みに成功したときの処理
  reader.onload = function() {
    var cols = reader.result.split('\n');
    var data = [];
    for (var i = 0; i < cols.length; i++) {
        data[i] = cols[i].split(',');
        console.log(data[i])
        if(data[i].length != 1){
          alert('適切なフォーマットを使用してください。（キャラクター名を1行ずつ記入）');
          return;
        }
    }
    eel.change_source_file(data)
  }
  // ファイル読み込みを実行
  reader.readAsText(fileData);
}

// 表示領域を一番下に移動
bsCustomFileInput.init();

//キャラクター名を表示
eel.expose(view_log_js)
function view_log_js(text){
    document.getElementById("charactor_textarea").value += text + "\n"
    document.getElementById("charactor_textarea").scrollTop = document.getElementById("charactor_textarea").scrollHeight
}