FKGBook.data.getCharaIconByCharaId = id => {
  var img = "<img src='data:image/png;base64," +
    FKGBook.data.icon["chara" + id] +
    "' style='display:block;padding:0px;margin:3px auto;'></img>";
  return img;
}

FKGBook.data.getWikiUrlByCharaName = charaName => {
  var url = "http://xn--eckq7fg8cygsa1a1je.xn--wiki-4i9hs14f.com/index.php\?" + charaName;
  return "<a class='wiki' target='_blank' href='" + url + "'>WIKI</a>";
}

FKGBook.data.getRarityString = rarity => {
  return "★★★★★★★★★★".substr(0, rarity);
}
