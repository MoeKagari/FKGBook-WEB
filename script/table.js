FKGBook.table.createNewTableCell = function(row_index, value_fun, data) {
    var new_td = $("<td style='height:50px'></td>");
    if (value_fun === null) {
        new_td.html(row_index + 1);
    } else {
        new_td.html(value_fun(data));
    }
    return new_td;
};

FKGBook.table.changeTableRowColor = function(tableRow, row_index, hover) {
    if (hover) {
        //鼠标移入时行颜色
        tableRow.css("background-color", "#99ccff20");
    } else {
        //鼠标移出时行颜色,奇偶行不同颜色
        if (row_index % 2 == 0) {
            tableRow.css("background-color", "#99999920");
        } else {
            tableRow.css("background-color", "#cccccc20");
        }
    }
};

FKGBook.table.createNewTableRow = function(row_index, data) {
    var new_tr = $("<tr></tr>");
    new_tr.css("cursor", "pointer"); //鼠标移入 变化鼠标样式

    //点击table行时,变更左方 角色信息
    new_tr.bind("click", function() {
        var json = data;

        var image_id = json["id"];
        if (json["oeb"] == 3 && json["kariBloom"]) {
            image_id = image_id - 300000 + 1;
        }
        $("#stand_s").attr("src", "stand_s/" + image_id + ".png");

        var skill = json['skill'];
        $("#skill").val(skill[0] + "\r\n" + skill[1]);

        var ability = json["ability"];
        for (var index = 0; index < ability.length; index++) {
            $("#ability" + index).val(ability[index][1]);
        }
    });

    //初始化默认行颜色
    FKGBook.table.changeTableRowColor(new_tr, row_index, false);

    //鼠标移动到行变色
    new_tr.hover(
        function() { //鼠标进入
            FKGBook.table.changeTableRowColor($(this), row_index, true);
        },
        function() { //鼠标移开
            FKGBook.table.changeTableRowColor($(this), row_index, false);
        }
    );

    //添加数据
    for (var cell_index = 0, size = FKGBook.tableColumnInformationList.length; cell_index < size; cell_index++) {
        new_tr.append(FKGBook.table.createNewTableCell(row_index, FKGBook.tableColumnInformationList[cell_index][1], data));
    }

    return new_tr;
};

//添加数据
FKGBook.table.loadData = function() {
    $.getJSON("masterdata.json?" + currentTimeStamp, function(json) {
        //暂时未用
        var version = json.version;

        var masterdata = json.masterdata.filter(function(data) {
            //根据筛选条件 过滤 数据
            return FKGBook.option.oeb.filter(data) &&
                FKGBook.option.rarity.filter(data) &&
                FKGBook.option.attackAttribute.filter(data) &&
                FKGBook.option.country.filter(data) &&
                FKGBook.option.skillType.filter(data);
        }).sort(function(a, b) {
            //按照图鉴编号排序,相等则按照oeb排序
            var result = b["bid"] - a["bid"];
            if (result == 0) {
                result = a["oeb"] - b["oeb"];
            }
            return result;
        });

        //清空,并添加新数据
        $("#tbody").html("");
        for (var row_index = 0, size = masterdata.length; row_index < size; row_index++) {
            $("#tbody").append(FKGBook.table.createNewTableRow(row_index, masterdata[row_index]));
        }
    });
};
