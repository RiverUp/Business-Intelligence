const MarrigeSituation = {
  SINGLE: "single",
  MARRIED: "married",
  DIVORCED: "divorced",
};

Object.freeze(MarrigeSituation);

class Partition {
  constructor(first) {
    this.first = first;
    this.GiniIndex = null;
  }
}

class Node {
  constructor(mark) {
    this.children = new Array();
    this.mark = mark;
  }
}
// class Data{
//     constructor(id,loanDefaulter,hasHouse,marrigeSituation,yearlyIncome){
//         this.id=id;
//         this.loanDefaulter=loanDefaulter;
//         this.hasHouse=hasHouse;
//         this.marrigeSituation=marrigeSituation;
//         this.yearlyIncome=yearlyIncome;
//     }
// }
const prototypeData = {
  id: 0,
  hasHouse: false,
  marrigeSituation: MarrigeSituation.SINGLE,
  yearlyIncome: 1,
  loanDefaulter: false,
};
function InitData() {
  const data1 = {
    id: 1,
    loanDefaulter: false,
    hasHouse: true,
    marrigeSituation: MarrigeSituation.SINGLE,
    yearlyIncome: 125,
  };
  const data2 = {
    id: 2,
    loanDefaulter: false,
    hasHouse: false,
    marrigeSituation: MarrigeSituation.MARRIED,
    yearlyIncome: 100,
  };
  const data3 = {
    id: 3,
    loanDefaulter: false,
    hasHouse: false,
    marrigeSituation: MarrigeSituation.SINGLE,
    yearlyIncome: 70,
  };
  const data4 = {
    id: 4,
    loanDefaulter: false,
    hasHouse: true,
    marrigeSituation: MarrigeSituation.MARRIED,
    yearlyIncome: 120,
  };
  const data5 = {
    id: 5,
    loanDefaulter: true,
    hasHouse: false,
    marrigeSituation: MarrigeSituation.DIVORCED,
    yearlyIncome: 95,
  };
  const data6 = {
    id: 6,
    loanDefaulter: false,
    hasHouse: false,
    marrigeSituation: MarrigeSituation.DIVORCED,
    yearlyIncome: 125,
  };
  const data7 = {
    id: 7,
    loanDefaulter: false,
    hasHouse: true,
    marrigeSituation: MarrigeSituation.DIVORCED,
    yearlyIncome: 220,
  };
  const data8 = {
    id: 8,
    loanDefaulter: true,
    hasHouse: false,
    marrigeSituation: MarrigeSituation.SINGLE,
    yearlyIncome: 85,
  };
  const data9 = {
    id: 9,
    loanDefaulter: false,
    hasHouse: false,
    marrigeSituation: MarrigeSituation.MARRIED,
    yearlyIncome: 125,
  };
  const data10 = {
    id: 10,
    loanDefaulter: true,
    hasHouse: false,
    marrigeSituation: MarrigeSituation.SINGLE,
    yearlyIncome: 90,
  };

  const DataArray = new Array();
  DataArray.push(data1);
  DataArray.push(data2);
  DataArray.push(data3);
  DataArray.push(data4);
  DataArray.push(data5);
  DataArray.push(data6);
  DataArray.push(data7);
  DataArray.push(data8);
  DataArray.push(data9);
  DataArray.push(data10);

  return DataArray;
}
const TestDataArray = InitData();
function GiniPartitionofMarrigeSituation(TestDataArrayofNode) {
  var partitions = new Array();
  for (var attribute in MarrigeSituation) {
    var partition = new Partition(attribute);
    partitions.push(partition);
  }
  var division = TestDataArrayofNode.length;
  var numIsDefaulter = 0;
  TestDataArrayofNode.forEach((data) => {
    if (data.loanDefaulter === true) {
      numIsDefaulter++;
    }
  });
  partitions.forEach((partition) => {
    var numContainFirst = 0;
    var numFirstIsDefaulter = 0;
    TestDataArrayofNode.forEach((data) => {
      if (data.MarrigeSituation === partition.first) {
        numContainFirst++;
        if (data.loanDefaulter === true) {
          numFirstIsDefaulter++;
        }
      }
    });
    var giniN1 =
      1 -
      Math.pow(numFirstIsDefaulter / numContainFirst, 2) -
      Math.pow(1 - numFirstIsDefaulter / numContainFirst, 2);
    var numOfSecond = division - numContainFirst;
    var numSecondIsDefaulter = numIsDefaulter - numFirstIsDefaulter;
    var giniN2 =
      1 -
      Math.pow(numSecondIsDefaulter / numOfSecond, 2) -
      Math.pow(1 - numSecondIsDefaulter / numOfSecond, 2);
    var gini =
      (numContainFirst / division) * giniN1 + (numOfSecond / division) * giniN2;
    partition.GiniIndex = gini;
  });

  partitions.sort((a, b) => {
    return a.GiniIndex - b.GiniIndex;
  });

  return partitions[0];
}

function GiniPartitionofYearlyIncome(TestDataArrayofNode) {
  var partitions = new Array();
  TestDataArrayofNode.sort((a, b) => {
    return b.yearlyIncome - a.yearlyIncome;
  });
  var division = TestDataArrayofNode.length;
  var numIsDefaulter = 0;
  TestDataArrayofNode.forEach((data) => {
    if (data.loanDefaulter === true) {
      numIsDefaulter++;
    }
  });
  var values = new Array();
  TestDataArrayofNode.forEach((data) => {
    values.push(data.yearlyIncome);
  });
  values.forEach((i) => {
    var partition = new Partition(i);
    var numBEFirst = 0;
    var numFirstIsDefaulter = 0;
    TestDataArrayofNode.forEach((data) => {
      if (data.yearlyIncome <= i) {
        numBEFirst++;
        if (data.loanDefaulter === true) {
          numFirstIsDefaulter++;
        }
      }
    });

    var giniN1 =
      1 -
      Math.pow(numFirstIsDefaulter / numBEFirst, 2) -
      Math.pow(1 - numFirstIsDefaulter / numBEFirst, 2);
    var numGFirst = division - numBEFirst;
    var numGFirstIsDefaulter = numIsDefaulter - numFirstIsDefaulter;
    var giniN2 =
      1 -
      Math.pow(numGFirstIsDefaulter / numGFirst, 2) -
      Math.pow(1 - numGFirstIsDefaulter / numGFirst, 2);
    var gini =
      (numBEFirst / division) * giniN1 + (numGFirst / division) * giniN2;
    partition.GiniIndex = gini;

    partitions.push(partition);
  });

  partitions.sort((a, b) => {
    return a.GiniIndex - b.GiniIndex;
  });
  return partitions[0];
}
class Attribute {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}
var attributes = new Array();
attributes.push(new Attribute("binary", "hasHouse"));
attributes.push(new Attribute("ordinal", "marrigeSituation"));
attributes.push(new Attribute("successive", "yearlyIncome"));
function GenerateDecisionTree(TestDataArrayofNode, className, attributes) {
  var node;
  
  if (attributes.length === 0) {
    node = new Node(JudgeMajority(TestDataArrayofNode, className));
    return node;
  }
  var attribute = attributes.shift();
  if (
    TestDataArrayofNode.every((data) => {
      data[className] === true;
    })
  ) {
    return (node = new Node(className));
  }
  if (
    TestDataArrayofNode.every((data) => {
      data[className] === false;
    })
  ) {
    return (node = new Node("Not" + className));
  }

  switch (attribute.type) {
    case "binary":
      node = new Node(attribute.value);
      var datas = new Array();
      var anotherDatas = new Array();
      TestDataArrayofNode.forEach((data) => {
        if (data[attribute.value] === true) {
          datas.push(data);
        } else {
          anotherDatas.push(data);
        }
      });
      if (anotherDatas.length === 0) {
        var child = new Node(JudgeMajority(TestDataArrayofNode, className));
        node.children.push(child);
      } else {
        var attributesForChild = attributes;
        var child = GenerateDecisionTree(
          anotherDatas,
          className,
          attributesForChild
        );
        node.children.push(child);
      }
      if (datas.length === 0) {
        var child = new Node(JudgeMajority(TestDataArrayofNode, className));
        node.children.push(child);
      } else {
        var attributesForChild = attributes;
        var child = GenerateDecisionTree(datas, className, attributesForChild);
        node.children.push(child);
      }
      break;
    case "ordinal":
      node = new Node(attribute.value);
      var datas = new Array();
      var anotherDatas = new Array();
      var partition = GiniPartitionofMarrigeSituation(TestDataArrayofNode);
      TestDataArrayofNode.forEach((data) => {
        if (data[attribute.value] === partition.first) {
          datas.push(data);
        } else {
          anotherDatas.push(data);
        }
      });
      if (anotherDatas.length === 0) {
        var child = new Node(JudgeMajority(TestDataArrayofNode, className));
        node.children.push(child);
      } else {
        var attributesForChild = attributes;
        var child = GenerateDecisionTree(
          anotherDatas,
          className,
          attributesForChild
        );
        node.children.push(child);
      }
      if (datas.length === 0) {
        var child = new Node(JudgeMajority(TestDataArrayofNode, className));
        node.children.push(child);
      } else {
        var attributesForChild = attributes;
        var child = GenerateDecisionTree(datas, className, attributesForChild);
        node.children.push(child);
      }
      break;
    case "successive":
      node = new Node(attribute.value);
      var datas = new Array();
      var anotherDatas = new Array();
      var partition = GiniPartitionofYearlyIncome(TestDataArrayofNode);
      TestDataArrayofNode.forEach((data) => {
        if (data[attribute.value] === partition.first) {
          datas.push(data);
        } else {
          anotherDatas.push(data);
        }
      });
      if (anotherDatas.length === 0) {
        var child = new Node(JudgeMajority(TestDataArrayofNode, className));
        node.children.push(child);
      } else {
        var attributesForChild = attributes;
        var child = GenerateDecisionTree(
          anotherDatas,
          className,
          attributesForChild
        );
        node.children.push(child);
      }
      if (datas.length === 0) {
        var child = new Node(JudgeMajority(TestDataArrayofNode, className));
        node.children.push(child);
      } else {
        var attributesForChild = attributes;
        var child = GenerateDecisionTree(datas, className, attributesForChild);
        node.children.push(child);
      }
      break;
    default:
      break;
  }
  return node;
}

function JudgeMajority(TestDataArrayofNode, className) {
  var num = 0;
  TestDataArrayofNode.forEach((data) => {
    if (data[className] === true) {
      num++;
    }
  });
  if (num >= TestDataArrayofNode.length / 2) {
    return className;
  } else {
    return "Not" + className;
  }
}

var node = GenerateDecisionTree(TestDataArray, "loanDefaulter", attributes);
console.log(node);
