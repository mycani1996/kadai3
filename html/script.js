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

bsCustomFileInput.init();
// 制限サイズ
const sizeLimit = 1024 * 1024 * 1;
//参照ファイル変換
const fileInput = document.getElementById('inputFile');
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

// ファイル選択時にloadLocalCsvを発火
fileInput.addEventListener('change', loadLocalCsv);

eel.expose(view_log_js)
function view_log_js(text){
    document.getElementById("charactor_textarea").value += text + "\n"
    document.getElementById("charactor_textarea").scrollTop = document.getElementById("charactor_textarea").scrollHeight
}

function csv_data(dataPath) {
  const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
  request.addEventListener('load', (event) => { // ロードさせ実行
      const response = event.target.responseText; // 受け取ったテキストを返す
      return csv_array(response); //csv_arrayの関数を実行
  });
  request.open('GET', dataPath, true); // csvのパスを指定
  request.send();
}

function csv_array(data) {
  const dataArray = []; //配列を用意
  const dataString = data.split('\n'); //改行で分割
  for (let i = 0; i < dataString.length; i++) { //あるだけループ
      dataArray[i] = dataString[i].split(',');
  }
  output_csv.innerHTML = dataArray; //表示
  // console.log(dataArray);
  return dataArray;
}