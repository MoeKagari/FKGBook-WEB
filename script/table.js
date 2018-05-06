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

FKGBook.table.refresh = function(first_refresh) {
    console.time("table.refresh");
    var filter = FKGBook.table.option.getFilter();
    var visibleIndex = 0;
    FKGBook.tool.delayLoad(
        document.getElementsByClassName("chara"), 50,
        function(chara) {
            if (filter(chara)) {
                chara.dataset.row_index = visibleIndex;
                FKGBook.table.refreshOneRow($(chara), visibleIndex);
                visibleIndex++;
            } else {
                chara.style.display = "none";
            }
        }, 50, 0
    );
    console.timeEnd("table.refresh");
}

FKGBook.table.refreshOneRow = function(tbody_tr, row_index) {
    tbody_tr.css("display", "table-row");
    tbody_tr.css("background-color", FKGBook.table.table.tableRowBackgroundColor[row_index % 2 == 0 ? "even" : "odd"]);
    tbody_tr.children(".tableRowNumber").html(row_index + 1);
}
