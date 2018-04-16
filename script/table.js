FKGBook.table.tableColumnInfoArray = [ //
  {
    "name": "No",
    "getValue": (data, row_index) => row_index + 1,
    "width": "60px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    },
    "isTableRowNumber": true
  },
  {
    "name": "",
    "getValue": data => FKGBook.data.getCharaIconByCharaId(data.id),
    "width": "70px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    }
  },
  {
    "name": "id",
    "getValue": data => data.id,
    "width": "80px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    }
  },
  {
    "name": "花名",
    "getValue": data => data.name,
    "width": null,
    "style": {}
  },
  {
    "name": "国家",
    "getValue": data => data.country,
    "width": "200px",
    "style": {}
  },
  {
    "name": "稀有度",
    "getValue": data => data.rarity + " " + FKGBook.data.getRarityString(data.rarity),
    "width": "150px",
    "style": {}
  },
  {
    "name": "属性",
    "getValue": data => data.attackAttribute,
    "width": "50px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    }
  },
  {
    "name": "移动力",
    "getValue": data => data.move,
    "width": "58px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    }
  },
  {
    "name": "HP",
    "getValue": data => data.hp[0],
    "width": "58px",
    "style": {}
  },
  {
    "name": "攻击力",
    "getValue": data => data.attack[0],
    "width": "58px",
    "style": {}
  },
  {
    "name": "防御力",
    "getValue": data => data.defense[0],
    "width": "58px",
    "style": {}
  },
  {
    "name": "综合力",
    "getValue": data => data.power[0],
    "width": "58px",
    "style": {}
  },
  {
    "name": "状态",
    "getValue": data => data.state,
    "width": "150px",
    "style": {}
  },
  {
    "name": "版本",
    "getValue": data => data.version,
    "width": "150px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    }
  },
  {
    "name": "wiki",
    "getValue": data => FKGBook.data.getWikiUrlByCharaName(data.name),
    "width": "80px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    },
    "notHaveClickEvent": true
  }
]

FKGBook.table.init = function() {
  FKGBook.table.option.init();
  FKGBook.table.table.init();
  FKGBook.table.refresh()
}

FKGBook.table.refresh = function() {
  for (chara of $(".chara")) {
    chara = $(chara);
    chara.css("display", FKGBook.table.option.filter(chara) ? "table-row" : "none");
  }

  FKGBook.table.refreshTableRowBackgroundColor();
  FKGBook.table.refreshTableRowNumber();
}

FKGBook.table.refreshTableRowBackgroundColor = function() {
  $(".chara:visible:odd").css("background-color", FKGBook.table.table.tableRowBackgroundColor.odd);
  $(".chara:visible:even").css("background-color", FKGBook.table.table.tableRowBackgroundColor.even);
}

FKGBook.table.refreshTableRowNumber = function() {
  var row_index = 1;
  for (td_tableRowNumber of $(".chara:visible .tableRowNumber")) {
    $(td_tableRowNumber).html(row_index);
    row_index++;
  }
}

FKGBook.table.show = function(data) {}

FKGBook.table.hide = function() {}
