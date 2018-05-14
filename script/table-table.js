FKGBook.table.table.init = function() {
    //订制 列的样式
    var head_colgroup = $("#head_colgroup");
    var body_colgroup = $("#body_colgroup");
    FKGBook.table.tableColumnInfoArray.forEach(function(tableColumnInfo) {
        var new_col = $("<col/>");
        new_col.css("width", tableColumnInfo.width);
        head_colgroup.append(new_col.clone());
        body_colgroup.append(new_col);
    });

    //添加 列头
    var thead_tr = $("#thead tr");
    thead_tr.css("background-color", FKGBook.table.table.backgroundColor.header);
    FKGBook.table.tableColumnInfoArray.forEach(function(tableColumnInfo) {
        var new_th = $("<th>" + tableColumnInfo.name + "</th>");
        new_th.css(tableColumnInfo.style ? tableColumnInfo.style : {});
        thead_tr.append(new_th);
    });

    //计算并设定 div_body_table高度 ,否则没有滚动条
    var reheightTable = function() {
        var div_option = $("#div_option");
        var div_table = $("#div_table");
        var div_body_table_height = $("#container_table").height() -
            (div_option.height() + FKGBook.tool.extraTotalHeight(div_option)) -
            FKGBook.tool.extraTotalHeight(div_table) - $("#div_head_table").height();
        $("#div_body_table").css("height", div_body_table_height + "px");
    }
    reheightTable();
    $(window).resize(reheightTable);

    //向 table 添加数据
    var tbody = $("#tbody");
    var visibleIndex = 0;
    FKGBook.tool.delayLoad(FKGBook.data.chara, 50, function(data_dump, index) {
        var visible = data_dump.currentCharaData.mostLevel;

        var chara = FKGBook.table.table.createNewTableRow(index, data_dump);
        FKGBook.table.refreshTableRow(chara, visible, visibleIndex);
        tbody.append(chara);

        if (visible) {
            visibleIndex++;
        }
    }, 50, 100);
}

//创建一行数据
FKGBook.table.table.createNewTableRow = function(index, data_dump) {
    var currentCharaData = data_dump.currentCharaData;
    var charaGroupData = data_dump.charaGroupData;

    var new_tr = document.createElement("tr");
    //添加 data
    new_tr.dataset.isEventChara = currentCharaData.isEventChara;
    new_tr.dataset.notHaveBloom = currentCharaData.notHaveBloom;
    new_tr.dataset.mostLevel = currentCharaData.mostLevel;
    new_tr.dataset.oeb = currentCharaData.oeb;
    new_tr.dataset.kariBloom = currentCharaData.kariBloom;
    new_tr.dataset.bloomChara = currentCharaData.bloomChara;
    new_tr.dataset.rarity = currentCharaData.rarity;
    new_tr.dataset.attackAttribute = currentCharaData.attackAttribute;
    new_tr.dataset.country = currentCharaData.country;
    for (var abilityIndex = 1; abilityIndex <= 4; abilityIndex++) {
        new_tr.dataset["ability" + abilityIndex] = currentCharaData.ability[abilityIndex - 1].type;
    }

    new_tr = $(new_tr); //转为 jquery 对象
    new_tr.addClass("chara");
    new_tr.attr("id", "chara" + currentCharaData.id);

    //鼠标移动到行变色
    new_tr.hover(
        function() { //鼠标进入
            FKGBook.table.refreshTableRowBackground($(this), true);
        },
        function() { //鼠标移开
            FKGBook.table.refreshTableRowBackground($(this), false);
        }
    );

    //添加数据
    FKGBook.table.tableColumnInfoArray.forEach(function(tableColumnInfo) {
        var new_td = $("<td>" + tableColumnInfo.getValue(currentCharaData) + "</td>");
        new_td.css(tableColumnInfo.style ? tableColumnInfo.style : {});

        if (tableColumnInfo.isTableRowNumber) {
            new_td.addClass("tableRowNumber");
        }

        //点击table行时,显示 detail
        if (!tableColumnInfo.notHaveClickEvent) {
            new_td.css("cursor", "pointer"); //更换默认鼠标样式
            new_td.click(() => FKGBook.detail.showVersion(currentCharaData, charaGroupData));
        }

        new_tr.append(new_td);
    });

    return new_tr;
}
