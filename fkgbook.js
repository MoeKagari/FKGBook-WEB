var FKGBook = {
  "data": {
    "chara": [],
    "allChara":[],
    "icon": {},
    "newChara": [],
    "version": ""
  },
  "table": {
    "option": {},
    "table": {}
  },
  "detail": {},
  "footer": {}
}

var extraTotalHeight = style =>
  parseInt(style.css("marginTop")) + parseInt(style.css("marginBottom")) +
  parseInt(style.css("borderTop")) + parseInt(style.css("borderBottom")) +
  parseInt(style.css("paddingTop")) + parseInt(style.css("paddingBottom"));

window.onload = function() {
  FKGBook.table.init();
  FKGBook.detail.init();
  FKGBook.footer.init();
}

FKGBook.footer.init = function() {
  var footer = $("footer");
  footer.append(FKGBook.data.version);
  footer.append("&nbsp;&nbsp;&nbsp;by&nbsp;&nbsp;&nbsp;");
  footer.append(
    "<a class='github' target='_blank' href='" +
    "https://github.com/MoeKagari/fkgbook" +
    "'>Github-MoeKagari</a>"
  );
}
