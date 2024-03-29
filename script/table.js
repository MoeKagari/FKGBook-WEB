FKGBook.table.tableColumnInfoArray = [{
    "name": "No",
    "getValue": data => "",
    "width": "60px",
    "style": {
        "text-align": "center"
    },
    "isTableRowNumber": true
}, {
    "name": "",
    "getValue": data => FKGBook.data.getCharaIconByCharaId(data.id),
    "width": "70px",
    "style": {
        "text-align": "center"
    }
}, {
    "name": "id",
    "getValue": data => data.id,
    "width": "80px",
    "style": {
        "text-align": "center"
    }
}, {
    "name": "花名",
    "getValue": data => data.name,
    "width": null
}, {
    "name": "国家",
    "getValue": data => data.country,
    "width": "200px"
}, {
    "name": "稀有度",
    "getValue": data => FKGBook.data.getRarityString(data.rarity),
    "width": "150px"
}, {
    "name": "属性",
    "getValue": data => data.attackAttribute,
    "width": "50px",
    "style": {
        "text-align": "center"
    }
}, {
    "name": "移动力",
    "getValue": data => data.move,
    "width": "58px",
    "style": {
        "text-align": "center"
    }
}, {
    "name": "HP",
    "getValue": data => data.hp[0],
    "width": "58px"
}, {
    "name": "攻击力",
    "getValue": data => data.attack[0],
    "width": "58px"
}, {
    "name": "防御力",
    "getValue": data => data.defense[0],
    "width": "58px"
}, {
    "name": "总合力",
    "getValue": data => data.power[0],
    "width": "58px"
}, {
    "name": "状态",
    "getValue": data => data.state,
    "width": "150px"
}, {
    "name": "版本",
    "getValue": data => data.version,
    "width": "150px",
    "style": {
        "text-align": "center"
    }
}, {
    "name": "",
    "getValue": data => FKGBook.data.getWikiUrlByCharaName(data.name),
    "width": "80px",
    "style": {
        "text-align": "center"
    },
    "notHaveClickEvent": true
}]

FKGBook.table.init = function() {
    FKGBook.table.option.init();
    FKGBook.table.table.init();
}

FKGBook.table.refresh = function() {
    console.time("table.refresh");
    var filter = FKGBook.table.option.getFilter();
    var visibleIndex = 0;
    FKGBook.tool.delayLoad(document.getElementsByClassName("chara"), 400, function(tbody_tr) {
        var visible = filter(tbody_tr);
        FKGBook.table.refreshTableRow($(tbody_tr), visible, visibleIndex);
        if (visible) {
            visibleIndex++;
        }
    }, 100, 0);
    console.timeEnd("table.refresh");
}

FKGBook.table.refreshTableRow = function(chara, visible, visibleIndex) {
    if (visible) {
        chara.css("display", "table-row");
        chara.attr("visibleIndex", visibleIndex);
        FKGBook.table.refreshTableRowBackground(chara, false);
        chara.children(".tableRowNumber").html(visibleIndex + 1);
    } else {
        chara.css("display", "none");
    }
}

FKGBook.table.refreshTableRowBackground = function(chara, hover) {
    chara.css("background-color", FKGBook.table.table.backgroundColor[
        //鼠标移入时行颜色
        hover ? "hover" :
        //鼠标移出时行颜色,奇偶行不同颜色
        (chara.attr("visibleIndex") % 2 == 0 ? "even" : "odd")
    ]);
}
