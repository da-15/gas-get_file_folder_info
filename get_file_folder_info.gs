function onOpen(){
  //メニュー配列
  var myMenu=[
    {name: "Dir情報を取得", functionName: "getFileInfo"},
  ];
  
  //メニューを追加
  SpreadsheetApp.getActiveSpreadsheet().addMenu("スクリプト",myMenu);
}

function getFileInfo() {
    var files;
    var file;
    var folders;
    var folder;
    var i;
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
    var folderId = Browser.inputBox('取得したいフォルダID');
    
    // ダイアログに何も入力されなかった場合→終了
    if(folderId == ''){
        return false;
    }

    // シートの中身を削除
    sh.clearContents();
    
    files = DriveApp.getFolderById(folderId).getFiles(); // ファイルリストを取得したい親フォルダをセット
    folders = DriveApp.getFolderById(folderId).getFolders(); // フォルダリストを取得したい親フォルダセット
    
    // ヘッダ情報
    sh.getRange(1, 1).setValue('Folder');
    sh.getRange(1, 2).setValue('ID');
    sh.getRange(1, 3).setValue('Name');
    
    
    for(i = 2; files.hasNext(); i++) {
        // 取得したファイル情報を書き出し
        file = files.next();
        sh.getRange(i, 1).setValue('');
        sh.getRange(i, 2).setValue(file.getId());
        sh.getRange(i, 3).setValue(file.getName());
    }
    
    for(; folders.hasNext(); i++){
        // 取得したフォルダ情報を書き出し
        folder = folders.next();
        sh.getRange(i, 1).setValue('●');
        sh.getRange(i, 2).setValue(folder.getId());
        sh.getRange(i, 3).setValue(folder.getName());
    }


}
