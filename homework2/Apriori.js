class ItemSet {
  constructor(set, support) {
    this.set = set;
    this.support = support;
  }
}

const transactions = new Map();
transactions.set("1", ["a", "c", "d"]);
transactions.set("2", ["b", "c", "e"]);
transactions.set("3", ["a", "b", "c", "e"]);
transactions.set("4", ["b", "e"]);

const itemsAll = ["a", "b", "c", "d", "e"];

console.log(itemsAll);

function Apriori(minSupport, transactions, itemsAll) {
  var itemSetsFrequent = new Array();
  itemsAll.forEach((itemSingle) => {
    var support = 0;
    transactions.forEach((transaction) => {
      if (transaction.includes(itemSingle)) {
        support++;
      }
    });
    if (support >= minSupport) {
      var item = [itemSingle];
      var itemSet = new ItemSet(item, support);
      itemSetsFrequent.push(itemSet);
    }
  });

  while (itemSetsFrequent.length > 1) {
    var itemSet_temp = new Array();
    for (var i = 0; i < itemSetsFrequent.length; i++) {
      for (var j = i + 1; j < itemSetsFrequent.length; j++) {
        var setComplicated = new Array();

        itemSetsFrequent[i].set.forEach((element) => {
          if (itemSetsFrequent[j].set.includes(element)) {
            setComplicated.push(element);
          }
        });
        if (setComplicated.length === itemSetsFrequent[i].set.length - 1) {
          if (setComplicated.length !== 0) {
            var set;
            setComplicated.forEach((element) => {
              var index = itemSetsFrequent[i].set.indexOf(element);
              set = itemSetsFrequent[i].set;
              set.splice(index, 1);
              set = set.concat(itemSetsFrequent[j].set);
            });
          } else {
            set = itemSetsFrequent[i].set.concat(itemSetsFrequent[j].set);
          } //將去重后的字符串放入itemSet_temp中待剪枝
          if (deleteComplicated(itemSet_temp, set)) {
            itemSet_temp.push(set);
          }
        }
      }
    }
    var itemSetsFrequent_temp = new Array();
    itemSet_temp.forEach((item) => {
      var support = 0;
      transactions.forEach((transaction) => {
        var capable_support = true;
        try {
          item.forEach((element) => {
            if (!transaction.includes(element)) {
              capable_support = false;
              throw Error();
            }
          });
        } catch (err) {}
        if (capable_support === true) {
          support++;
        }
      });
      if (support >= minSupport) {
        var itemSet = new ItemSet(item, support);
        itemSetsFrequent_temp.push(itemSet);
      }
    });

    if (itemSetsFrequent_temp.length !== 0) {
      itemSetsFrequent = itemSetsFrequent_temp;
    } else {
      break;
    }
  }
  return itemSetsFrequent;
}

var itemSets = Apriori(2, transactions, itemsAll);
console.log("result");
console.log(itemSets);

function deleteComplicated(itemSet_temp, set) {
  var notComplicated = true;
  if (itemSet_temp.length === 0) {
    return notComplicated;
  }
  try {
    itemSet_temp.forEach((itemSet) => {
      var notComplicated_temp = false;
      try {
        set.forEach((element) => {
          if (!itemSet.includes(element)) {
            notComplicated_temp = true;
            throw Error();
          }
        });
      } catch (err) {}
      if (!notComplicated_temp) {
        notComplicated = false;
        throw Error();
      }
    });
  } catch (err) {}
  return notComplicated;
}
