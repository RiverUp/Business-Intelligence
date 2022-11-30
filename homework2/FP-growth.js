const transactions = new Map();
transactions.set("1", ["a", "c", "d"]);
transactions.set("2", ["b", "c", "e"]);
transactions.set("3", ["a", "b", "c", "e"]);
transactions.set("4", ["b", "e"]);

const itemsAll = ["a", "b", "c", "d", "e"];

class Tree_Node {
  constructor(setId, parentNode, support) {
    this.setId = setId;
    this.parentNode = parentNode;
    this.support = support;
    this.childNodes = new Array();
    this.sameSetNode = null;
  }
}

class SingleSetInfo {
  constructor(setId, support) {
    this.setId = setId;
    this.support = support;
    this.sameSetNode = null;
  }
}

function FP_Growth(minSupport, transactions, itemsAll) {
  var singleSetInfoArray = new Array();
  itemsAll.forEach((itemSingle) => {
    var support = 0;
    transactions.forEach((transaction) => {
      if (transaction.includes(itemSingle)) {
        support++;
      }
    });
    if (support >= minSupport) {
      var itemInfo = new SingleSetInfo(itemSingle, support);
      singleSetInfoArray.push(itemInfo);
      singleSetInfoArray.sort((a, b) => {
        return b.support - a.support;
      });
    }
  });
  //对事务集中的项集按照支持度排序
  transactions.forEach((transaction) => {
    transaction.forEach((item, indexOfTrans) => {
      var index = singleSetInfoArray.findIndex((element) => {
        return element.setId === item;
      });
      if (index === -1) {
        transaction.splice(indexOfTrans, 1);
      }
    });
    transaction.sort((a, b) => {
      //   console.log(
      //     singleSetInfoArray.findIndex((element) => {
      //       return element.setId === "b";
      //     })
      //   );
      var b_index = singleSetInfoArray.findIndex((element) => {
        return element.setId === b;
      });
      var a_index = singleSetInfoArray.findIndex((element) => {
        return element.setId === a;
      });
      return a_index - b_index;
    });
  });
  //构建树
  var nullHead = new Tree_Node(null, null, null);

  transactions.forEach((transaction) => {
    var last_node = nullHead;
    transaction.forEach((item) => {
      var node = last_node.childNodes.find((element) => {
        return element.setId === item;
      });
      if (node === undefined) {
        node = new Tree_Node(item, last_node, 1);
        last_node.childNodes.push(node);
        var setInfo = singleSetInfoArray.find((element) => {
          return element.setId === node.setId;
        });
        while (setInfo.sameSetNode !== null) {
          setInfo = setInfo.sameSetNode;
        }
        setInfo.sameSetNode = node;
      } else {
        node.support++;
      }
      last_node = node;
    });
  });

  singleSetInfoArray.reverse();
  var itemSetsFrequentArray = new Array();
  singleSetInfoArray.forEach((item) => {
    var itemSetsFrequent = new Array();
    item = item.sameSetNode;
    while (item !== null) {
      var itemNode = itemSetsFrequent.find((element) => {
        return element.setId === item.setId;
      });
      if (itemNode === undefined) {
        var itemNode = {
          setId: item.setId,
          support: item.support,
        };
        itemSetsFrequent.push(itemNode);
      } else {
        itemNode.support += item.support;
      }

      var item_init = item;
      var item_init_support = item.support;
      while (item.parentNode !== nullHead) {
        var itemNode = itemSetsFrequent.find((element) => {
          return element.setId === item.parentNode.setId;
        });
        if (itemNode === undefined) {
          itemNode = {
            setId: item.parentNode.setId,
            support: item_init_support,
          };
          itemSetsFrequent.push(itemNode);
        } else {
          itemNode.support += item_init_support;
        }

        item = item.parentNode;
      }
      item = item_init.sameSetNode;
    }

    itemSetsFrequent.sort((a, b) => {
      return b.support - a.support;
    });
    var index = itemSetsFrequent.findIndex((element) => {
      return element.support < minSupport;
    });
    if (index !== -1) {
      itemSetsFrequent.splice(index);
    }
    itemSetsFrequentArray.push(itemSetsFrequent);
  });

  itemSetsFrequentArray.sort((a, b) => {
    return b.length - a.length;
  });
  var result = new Array();
  var maxLength = itemSetsFrequentArray[0].length;
  itemSetsFrequentArray.forEach((itemSetsFrequent) => {
    if (itemSetsFrequent.length === maxLength) {
      result.push(itemSetsFrequent);
    }
  });
  console.log(result);
}

FP_Growth(2, transactions, itemsAll);
