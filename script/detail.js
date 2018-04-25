FKGBook.detail.init = function() {
    $("#container_detail").bind("click", function() {
        FKGBook.detail.hide();
    });
}

FKGBook.detail.show = function(data_dump) {
    /* 先更新数据,再显示 */
    FKGBook.detail.showChara(data_dump.currentCharaData, data_dump.charaGroupData);
    $("#container_detail").css("display", "block");
}

FKGBook.detail.hide = function() {
    $("#container_detail").css("display", "none");
}

FKGBook.detail.showChara = function(currentCharaData, charaGroupData) {

}
