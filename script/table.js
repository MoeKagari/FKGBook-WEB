FKGBook.table.tableColumnInfoArray = [ //
  {
    "name": "No",
    "getValue": function(data, row_index) {
      return row_index + 1;
    }
  },
  {
    "name": "",
    "getValue": function(data) {
      var query = (data.kariBloom ? ("?" + FKGBook.currentTimeStamp) : "");
      var img = "<img src='icon/" + data.id + ".png" + query + "' style='display:block;padding:2px;'></img>";
      return  img ;
    }
  },
  {
    "name": "id",
    "getValue": function(data) {
      return data.id;
    }
  },
  {
    "name": "花名",
    "getValue": function(data) {
      return data.name;
    }
  },
  {
    "name": "稀有度",
    "getValue": function(data) {
      return "★★★★★★★★★★".substr(0, data.rarity);
    }
  },
  {
    "name": "属性",
    "getValue": function(data) {
      return data.attackAttribute;
    }
  },
  {
    "name": "移动力",
    "getValue": function(data) {
      return data.move;
    }
  },
  {
    "name": "HP",
    "getValue": function(data) {
      return data.hp[0];
    }
  },
  {
    "name": "攻击力",
    "getValue": function(data) {
      return data.attack[0];
    }
  },
  {
    "name": "防御力",
    "getValue": function(data) {
      return data.defense[0];
    }
  },
  {
    "name": "综合力",
    "getValue": function(data) {
      return data.hp[0] + data.attack[0] + data.defense[0];
    }
  },
  {
    "name": "国家",
    "getValue": function(data) {
      return data.country;
    }
  },
  {
    "name": "版本",
    "getValue": function(data) {
      return data.version;
    }
  },
  {
    "name": "状态",
    "getValue": function(data) {
      return data.state;
    }
  }
];

FKGBook.table.init = function() {
  FKGBook.table.option.init();
  FKGBook.table.table.init();
};
