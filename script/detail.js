FKGBook.detail.init = function() {
  $("#container_detail").bind("click", function() {
    FKGBook.table.show();
    FKGBook.detail.hide();
  });
}

FKGBook.detail.show = function(data_dump) {
  $("#container_detail").css("display", "block");
  console.log(data_dump);
}

FKGBook.detail.hide = function() {
  $("#container_detail").css("display", "none");
}
