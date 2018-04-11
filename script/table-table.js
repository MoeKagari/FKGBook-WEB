FKGBook.table.table.init = function() {
  var thead_tr = $("#thead tr");
  for (tableColumnInfo of FKGBook.table.tableColumnInfoArray) {
    var new_th = $("<th>" + tableColumnInfo.name + "</th>");
    new_th.css("padding", "0px");
    new_th.css("background-color", FKGBook.table.table.tableRowBackgroundColor.header);
    thead_tr.append(new_th);
  }

  var tbody = $("#tbody");
  for (var row_index = 0, size = FKGBook.data.masterdata.length; row_index < size; row_index++) {
    tbody.append(FKGBook.table.table.createNewTableRow(row_index, FKGBook.data.masterdata[row_index]));
  }

  FKGBook.table.table.reheightTable();
  $(window).resize(FKGBook.table.table.reheightTable);
};

FKGBook.table.table.reheightTable = function() {
  function extraTotalHeight(style) {
    return parseInt(style.css("marginTop")) + parseInt(style.css("marginBottom")) +
      parseInt(style.css("borderTop")) + parseInt(style.css("borderBottom")) +
      parseInt(style.css("paddingTop")) + parseInt(style.css("paddingBottom"));
  }

  var div_option = $("#div_option");
  var tbody_height = $("#center").height() - div_option.height() - extraTotalHeight(div_option) - extraTotalHeight($("#table")) - $("#thead").height();
  $("#tbody").css("height", tbody_height + "px");
}

FKGBook.table.table.tableRowBackgroundColor = {
  "header": "#09294a88",
  "hover": "#99ccff55",
  "odd": "#99999944",
  "even": "#99999911"
};

FKGBook.table.table.changeTableRowColor = function(tableRow, row_index, hover) {
  if (hover) {
    //鼠标移入时行颜色
    tableRow.css("background-color", FKGBook.table.table.tableRowBackgroundColor.hover);
  } else {
    //鼠标移出时行颜色,奇偶行不同颜色
    if (row_index % 2 == 0) {
      tableRow.css("background-color", FKGBook.table.table.tableRowBackgroundColor.even);
    } else {
      tableRow.css("background-color", FKGBook.table.table.tableRowBackgroundColor.odd);
    }
  }
};

FKGBook.table.table.createNewTableCell = function(row_index, getValue, data) {
  var new_td = $("<td>" + getValue(data, row_index) + "</td>");
  new_td.css("padding", "0px");
  new_td.css("border", "0px");
  return new_td;
};

FKGBook.table.table.createNewTableRow = function(row_index, data) {
  var new_tr = $("<tr></tr>");
  new_tr.addClass("chara");
  new_tr.attr("id", "chara" + data.id);
  new_tr.css("cursor", "pointer"); //鼠标移入 变化鼠标样式

  //点击table行时,
  new_tr.bind("click", function() {});

  //初始化默认行颜色
  FKGBook.table.table.changeTableRowColor(new_tr, row_index, false);

  //鼠标移动到行变色
  new_tr.hover(
    function() { //鼠标进入
      FKGBook.table.table.changeTableRowColor($(this), row_index, true);
    },
    function() { //鼠标移开
      FKGBook.table.table.changeTableRowColor($(this), row_index, false);
    }
  );

  //添加数据
  for (tableColumnInfo of FKGBook.table.tableColumnInfoArray) {
    new_tr.append(FKGBook.table.table.createNewTableCell(row_index, tableColumnInfo.getValue, data));
  }

  return new_tr;
}
