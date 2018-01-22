//html document 加载完毕之后执行
$(document).ready(function() {
    //网页上方
    $("#option").prepend(addFilterPart($("<div></div>"))); //四种筛选条件
    $("#option").prepend(addOebPart($("<div></div>")));
    $("#option").prepend(addFavorPart($("<div></div>")));

    //添加列头
    for (var index = 0, length = tableColumnInformationList.length; index < length; index++) {
        var new_th = $("<th></th>");
        $("#thead tr").append(new_th);

        var name = tableColumnInformationList[index][tableColumnNameIndex];
        if (name == "icon") {
            new_th.css("width", "50px");
        } else {
            new_th.html(name);
        }
    }

    //添加数据
    loadData();

    function reheightTable() {
        function marginTotalHeight(style) {
            return parseInt(style.css("marginTop")) + parseInt(style.css("marginBottom"));
        }

        function borderTotalHeight(style) {
            return parseInt(style.css("borderTop")) + parseInt(style.css("borderBottom"));
        }

        function paddingTotalHeight(style) {
            return parseInt(style.css("paddingTop")) + parseInt(style.css("paddingBottom"));
        }

        function extraTotalHeight(style) {
            return marginTotalHeight(style) + borderTotalHeight(style) + paddingTotalHeight(style);
        }

        var center = $("#center");
        var option = $("#option");
        var table_div = $("#table_div");

        var table_height = center.height() - option.height() - marginTotalHeight(option) - marginTotalHeight(table_div);
        $("#table_div").css("height", table_height + "px");
    }
    reheightTable();
    $(window).resize(reheightTable);
});

//添加数据
function loadData() {
    $.getJSON("masterdata.json?"+currentTimeStamp, function(json) {
        var version = json.version;

        //根据筛选条件 过滤 数据
        var masterdata = json.masterdata.filter(function(data) {
            return oebFilter(data) && rarityFilter(data) && attackAttributeFilter(data) && countryFilter(data) && skillTypeFilter(data);
        });
        masterdata = masterdata.sort(function(a, b) {
            var result = b["bid"] - a["bid"];
            if (result == 0) {
                result = a["oeb"] - b["oeb"];
            }
            return result;
        });

        //清空,并添加新数据
        $("#tbody").html("");
        for (var row_index = 0, size = masterdata.length; row_index < size; row_index++) {
            $("#tbody").append(createNewTableRow(row_index, masterdata[row_index]));
        }
    });

    function createNewTableCell(row_index, value_fun, data) {
        var new_td = $("<td style='height:50px'></td>");
        if (value_fun === null) {
            new_td.html(row_index + 1);
        } else {
            new_td.html(value_fun(data));
        }
        return new_td;
    }

    function changeTableRowColor(tableRow, row_index, hover) {
        if (hover) {
            //鼠标移入时行颜色
            tableRow.css("background-color", "#99ccff");
        } else {
            //奇偶行不同颜色,
            if (row_index % 2 == 0) {
                tableRow.css("background-color", "#999999");
            } else {
                tableRow.css("background-color", "#cccccc");
            }
        }
    }

    function createNewTableRow(row_index, data) {
        var new_tr = $("<tr></tr>");

        new_tr.bind("click", function() {
            var json = data;

            var image_id = json["id"];
            if (json["oeb"] == 3 && json["kariBloom"]) {
                image_id = image_id - 300000 + 1;
            }
            $("#stand_s").attr("src", "stand_s/" + image_id + ".png?"+currentTimeStamp);

            var skill = json['skill'];
            $("#skill").val(skill[0] + "\r\n" + skill[1]);

            var ability = json["ability"];
            for (var index = 0; index < ability.length; index++) {
                $("#ability" + index).val(ability[index][1]);
            }
        });

        new_tr.css("cursor", "pointer"); //鼠标移入 变化鼠标样式
        changeTableRowColor(new_tr, row_index, false); //初始化默认行颜色

        //鼠标移动到行变色
        new_tr.hover(
            function() { //鼠标进入
                changeTableRowColor($(this), row_index, true);
            },
            function() { //鼠标移开
                changeTableRowColor($(this), row_index, false);
            });

        //数据
        for (var cell_index = 0, size = tableColumnInformationList.length; cell_index < size; cell_index++) {
            new_tr.append(createNewTableCell(row_index, tableColumnInformationList[cell_index][tableColumnValueIndex], data));
        }

        return new_tr;
    }
}
