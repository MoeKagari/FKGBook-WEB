FKGBook.detail.init = function() {
  $("#container_detail").bind("click", function() {
    FKGBook.table.show();
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
  $("#stand").attr("src", "stand/" + currentCharaData.image_id + ".png");
  $("#standS").attr("src", "stand_s/" + currentCharaData.image_id + ".png");

  var div_detail = $("#div_detail");
  div_detail.empty();
  div_detail.append("<p>" + currentCharaData.name + "</p>");
  div_detail.append("<p>" + FKGBook.data.getRarityString(currentCharaData.rarity) + "</p>");
}
