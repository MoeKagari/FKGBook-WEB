FKGBook.table.tableColumnInfoArray = [{
    "name": "No",
    "getValue": (data, row_index) => row_index + 1,
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
    "width": null,
    "style": {}
}, {
    "name": "国家",
    "getValue": data => data.country,
    "width": "200px",
    "style": {}
}, {
    "name": "稀有度",
    "getValue": data => FKGBook.data.getRarityString(data.rarity),
    "width": "150px",
    "style": {}
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
    "width": "58px",
    "style": {}
}, {
    "name": "攻击力",
    "getValue": data => data.attack[0],
    "width": "58px",
    "style": {}
}, {
    "name": "防御力",
    "getValue": data => data.defense[0],
    "width": "58px",
    "style": {}
}, {
    "name": "总合力",
    "getValue": data => data.power[0],
    "width": "58px",
    "style": {}
}, {
    "name": "状态",
    "getValue": data => data.state,
    "width": "150px",
    "style": {}
}, {
    "name": "版本",
    "getValue": data => data.version,
    "width": "150px",
    "style": {
        "text-align": "center"
    }
}, {
    "name": "wiki",
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
    FKGBook.table.refresh(true);
}

FKGBook.table.refresh = function(first_refresh) {
    var filter = FKGBook.table.option.getFilter();
    var visibleIndex = 0;
    for (chara of document.getElementsByClassName("chara")) {
        if (first_refresh || filter(chara)) {
            chara.style.display = "table-row";
            chara.style.backgroundColor = FKGBook.table.table.tableRowBackgroundColor[
                visibleIndex % 2 == 0 ? "even" : "odd"
            ];
            chara.dataset.row_index = visibleIndex;

            $(chara).children(".tableRowNumber").html(visibleIndex + 1);

            visibleIndex++;
        } else {
            chara.style.display = "none";
        }
    }
}
