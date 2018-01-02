//html document 加载完毕之后执行
$(document).ready(function() {
  //网页上方
  addFavorPart();
  addOebPart();
  //四种筛选条件
  $("#option").append(addFilterPart($("<div></div>")));

  //添加列头
  var thead_html = "";
  for (var index = 0, length = tableColumnInformationList.length; index < length; index++) {
    if(index == 1){

    }
    thead_html += "<th "+(index==1?"style='width:50px;'":"")+">" + tableColumnInformationList[index][tableColumnNameIndex] + "</th>";
  }
  $("#thead tr").html(thead_html);

  //添加数据
  loadData();
});

//添加数据
function loadData() {
  $.getJSON("masterdata.json", function(json) {
    var version = json.version;

    //根据筛选条件 过滤 数据
    var masterdata = json.masterdata.filter(function(data) {
      return oebFilter(data) && rarityFilter(data) && attackAttributeFilter(data) && countryFilter(data) && skillTypeFilter(data);
    });


    //清空,并添加新数据
    $("#tbody").html("");
    for (var row_index = 0, size = masterdata.length; row_index < size; row_index++) {
      $("#tbody").append(createNewTableRow(row_index, masterdata[row_index]));
    }
  });

  function createNewTableCell(row_index, value_fun, data) {
    if (value_fun === null) {
      return $("<td>" + row_index + "</td>");
    } else {
      return $("<td>" + value_fun(data) + "</td>");
    }
  }

  function createNewTableRow(row_index, data) {
    function changeTableRowColor(tableRow, row_index, hover) {
      if (hover) {
        //鼠标移入时行颜色
        tableRow.css("background-color", "#cccc00");
      } else {
        //奇偶行不同颜色,
        if (row_index % 2 == 0) {
          tableRow.css("background-color", "#bbf");
        } else {
          tableRow.css("background-color", "#ffc");
        }
      }
    }

    var new_tr = $("<tr></tr>");

    //鼠标移入 变化鼠标样式
    new_tr.css("cursor", "pointer");

    //鼠标移动到行变色
    new_tr.hover(
      function() { //鼠标进入
        changeTableRowColor($(this), row_index, true);
      },
      function() { //鼠标移开
        changeTableRowColor($(this), row_index, false);
      });

    //初始化默认行颜色
    changeTableRowColor(new_tr, row_index, false);

    //数据
    for (var cell_index = 0, size = tableColumnInformationList.length; cell_index < size; cell_index++) {
      new_tr.append(createNewTableCell(row_index, tableColumnInformationList[cell_index][tableColumnValueIndex], data));
    }

    return new_tr;
  }
}
