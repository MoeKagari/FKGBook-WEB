FKGBook.option.attackAttribute = {};
FKGBook.option.attackAttribute.value = 0;
FKGBook.option.attackAttribute.enum = {
     "无": 0,
     "斩": 1,
     "打": 2,
     "突": 3,
     "魔": 4
 };
FKGBook.option.attackAttribute.filter = function(data) {
     return this.value == 0 || this.value == data["attackAttribute"];
 }
