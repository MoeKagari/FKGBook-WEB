FKGBook.table.tableColumnInfoArray = [ //
  {
    "name": "No",
    "getValue": (data, row_index) => row_index + 1,
    "width": "60px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    }
  },
  {
    "name": "",
    "getValue": data => {
      var img = "<img src='data:image/png;base64," +
        FKGBook.data.icon["chara" + data.id] +
        "' style='display:block;padding:0px;margin:3px auto;'></img>";
      return img;
    },
    "width": "70px",
    "style": {
      "padding": "0px"
    }
  },
  {
    "name": "id",
    "getValue": data => data.id,
    "width": "100px",
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
    "width": "170px",
    "style": {}
  },
  {
    "name": "稀有度",
    "getValue": data => "★★★★★★★★★★".substr(0, data.rarity),
    "width": "100px",
    "style": {}
  },
  {
    "name": "属性",
    "getValue": data => data.attackAttribute,
    "width": "100px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    }
  },
  {
    "name": "移动力",
    "getValue": data => data.move,
    "width": "80px",
    "style": {}
  },
  {
    "name": "HP",
    "getValue": data => data.hp[0],
    "width": "80px",
    "style": {}
  },
  {
    "name": "攻击力",
    "getValue": data => data.attack[0],
    "width": "80px",
    "style": {}
  },
  {
    "name": "防御力",
    "getValue": data => data.defense[0],
    "width": "80px",
    "style": {}
  },
  {
    "name": "综合力",
    "getValue": data => data.power[0],
    "width": "80px",
    "style": {}
  },
  {
    "name": "状态",
    "getValue": data => data.state,
    "width": "100px",
    "style": {}
  },
  {
    "name": "版本",
    "getValue": data => data.version,
    "width": "180px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    }
  },
  {
    "name": "",
    "getValue": data => {
      var url = "http://xn--eckq7fg8cygsa1a1je.xn--wiki-4i9hs14f.com/index.php\?" + data.name;
      return "<a class='wiki' target='_blank' href='" + url + "'>WIKI</a>";
    },
    "width": "80px",
    "style": {
      "padding": "0px",
      "text-align": "center"
    },
    "notHaveClickEvent": true
  }
];

FKGBook.table.init = function() {
  FKGBook.table.option.init();
  FKGBook.table.table.init();
};

FKGBook.table.show = function(data) {
  //$("#background").after($("#center")); // 交换位置
}

FKGBook.table.hide = function() {
  //$("#center").after($("#background")); // 交换位置
}
