var FKGBook = {
    "option": {},
    "table": {}
};

//html document 加载完毕之后执行
$(document).ready(function() {
    //网页上方
    $("#option").prepend(FKGBook.option.addFilterPart($("<div></div>"))); //四种筛选条件
    $("#option").prepend(FKGBook.option.addOebPart($("<div></div>")));
    $("#option").prepend(FKGBook.option.addFavorPart($("<div></div>")));

    //添加列头
    for (var index = 0, length = FKGBook.tableColumnInformationList.length; index < length; index++) {
        var new_th = $("<th></th>");
        new_th.html(FKGBook.tableColumnInformationList[index][0]);
        $("#thead tr").append(new_th);
    }

    //添加数据
    FKGBook.table.loadData();

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
        table_div.css("height", table_height + "px");
    }
    reheightTable();
    $(window).resize(reheightTable);
});

FKGBook.tableColumnInformationList = [
    ["No", null],
    ["", function(json) {
        var image_id = json["id"];
        if (json["oeb"] == 3 && json["kariBloom"]) {
            image_id = image_id - 300000 + 1;
        }
        return "<img src='icon/" + image_id + ".png'></img>";
    }],
    ["id", function(json) {
        return json["id"];
    }],
    ["花名", function(json) {
        return json["name"];
    }],
    ["稀有度", function(json) {
        return "★★★★★★★★★★".substr(0, json["rarity"]);
    }],
    ["属性", function(json) {
        var attackAttributeNumber = json["attackAttribute"];
        for (var key in FKGBook.option.attackAttribute.enum) {
            if (FKGBook.option.attackAttribute.enum.hasOwnProperty(key)) {
                if (FKGBook.option.attackAttribute.enum[key] == attackAttributeNumber) {
                    return key;
                }
            }
        }
        return "";
    }],
    ["移动力", function(json) {
        return json["move"];
    }],
    ["HP", function(json) {
        return json["hp"][FKGBook.option.favor.value];
    }],
    ["攻击", function(json) {
        return json["attack"][FKGBook.option.favor.value];
    }],
    ["防御", function(json) {
        return json["defense"][FKGBook.option.favor.value];
    }],
    ["综合力", function(json) {
        return json["hp"][FKGBook.option.favor.value] + json["attack"][FKGBook.option.favor.value] + json["defense"][FKGBook.option.favor.value];
    }],
    ["国家", function(json) {
        var countryNumber = json["country"];
        for (var key in FKGBook.option.country.enum) {
            if (FKGBook.option.country.enum.hasOwnProperty(key)) {
                if (FKGBook.option.country.enum[key] == countryNumber) {
                    return key;
                }
            }
        }
        return "";
    }],
    ["版本", function(json) {
        return json["version"];
    }],
    ["图鉴编号", function(json) {
        return json["bid"];
    }],
    ["开花编号", function(json) {
        var bloomNumber = json["bloomNumber"];
        return bloomNumber == 0 ? "" : bloomNumber;
    }]
];
