FKGBook.table.table.init = function() {
    //订制 列的样式
    var head_colgroup = $("#head_colgroup");
    var body_colgroup = $("#body_colgroup");
    for (tableColumnInfo of FKGBook.table.tableColumnInfoArray) {
        var new_col = $("<col />");
        new_col.css("width", tableColumnInfo.width);
        head_colgroup.append(new_col.clone());
        body_colgroup.append(new_col);
    }

    //添加 列头
    var thead_tr = $("#thead tr");
    thead_tr.css("background-color", FKGBook.table.table.tableRowBackgroundColor.header);
    for (tableColumnInfo of FKGBook.table.tableColumnInfoArray) {
        var new_th = $("<th>" + tableColumnInfo.name + "</th>");
        new_th.css(tableColumnInfo.style);
        thead_tr.append(new_th);
    }

    //向 table 添加数据
    var tbody = $("#tbody");
    for (var row_index = 0, length = FKGBook.data.allChara.length; row_index < length; row_index++) {
        tbody.append(FKGBook.table.table.createNewTableRow(row_index, FKGBook.data.allChara[row_index]));
    }

    //计算并设定 div_body_table高度 ,否则没有滚动条
    FKGBook.table.table.reheightTable();
    $(window).resize(FKGBook.table.table.reheightTable);
}

//改变 table body height
FKGBook.table.table.reheightTable = function() {
    var div_option = $("#div_option");
    var div_table = $("#div_table");

    var div_table_height = $("#container_table").height() -
        (div_option.height() + FKGBook.tool.extraTotalHeight(div_option)) -
        FKGBook.tool.extraTotalHeight(div_table);
    div_table.css("height", div_table_height + "px");

    var div_body_table_height = div_table_height - $("#div_head_table").height();
    $("#div_body_table").css("height", div_body_table_height + "px");
}

//table background color
FKGBook.table.table.tableRowBackgroundColor = {
    "header": "#09294a88", //列头
    "hover": "#99ccff28", //行 - 鼠标移入
    //行index从0开始
    "odd": "#99999910", //奇数行
    "even": "#99999908" //偶数行
}

//创建一行数据
FKGBook.table.table.createNewTableRow = function(row_index, data_dump) {
    var data = data_dump.currentCharaData;

    var new_tr = document.createElement("tr");
    //添加 data
    new_tr.dataset.isEventChara = data.isEventChara;
    new_tr.dataset.notHaveBloom = data.notHaveBloom;
    new_tr.dataset.mostLevel = data.mostLevel;
    new_tr.dataset.oeb = data.oeb;
    new_tr.dataset.kariBloom = data.kariBloom;
    new_tr.dataset.bloomChara = data.bloomChara;
    new_tr.dataset.rarity = data.rarity;
    new_tr.dataset.attackAttribute = data.attackAttribute;
    new_tr.dataset.country = data.country;
    for (var index = 1; index <= 4; index++) {
        new_tr.dataset["ability" + index] = data.ability[index - 1].type;
    }

    new_tr = $(new_tr); //转为 jquery 对象
    new_tr.addClass("chara");
    new_tr.attr("id", "chara" + data.id);

    //改变行 background color
    var changeTableRowColor = function(tbody_tr, hover) {
        tbody_tr.style.backgroundColor = FKGBook.table.table.tableRowBackgroundColor[
            hover ? "hover" : //鼠标移入时行颜色
            (parseInt(tbody_tr.dataset.row_index) % 2 == 0 ? "even" : "odd") //鼠标移出时行颜色,奇偶行不同颜色
        ];
    }
    //鼠标移动到行变色
    new_tr.hover(
        function() { //鼠标进入
            changeTableRowColor(this, true);
        },
        function() { //鼠标移开
            changeTableRowColor(this, false);
        }
    );

    //添加数据
    for (tableColumnInfo of FKGBook.table.tableColumnInfoArray) {
        var new_td = $("<td>" + tableColumnInfo.getValue(data, row_index) + "</td>");
        new_td.css(tableColumnInfo.style);

        if (tableColumnInfo.isTableRowNumber) {
            new_td.addClass("tableRowNumber");
        }

        //点击table行时,显示 detail
        if (!tableColumnInfo.notHaveClickEvent) {
            new_td.css("cursor", "pointer"); //更换默认鼠标样式
            new_td.bind("click", () => FKGBook.detail.show(data_dump.currentCharaData, data_dump.charaGroupData));
        }

        new_tr.append(new_td);
    }

    return new_tr;
}
