---
title: JavaScript Array API全解析
date: 2017-11-07 15:42:22
tags: JavaScript
description: JavaScript 数组API操作全解析~
toc: true
---


# 数组API

# Array构造器

Array.prototype 本身是一个数组。

创建数组的两种方法：
```javascript
// Array构造器
var arr1 = Array(8)  // 相当于new Array(8)，创建一个长度为8的数组
// 对象字面量，推荐
var arr2 = []
```

当直接调用Array构造函数，内部会判断调用[[Call]]方法还是[[Construct]]方法，统一进行[[Construct]]方法调用。大致实现如下：
```javascript
function Array (...args) {
  // 不是new调用，返回数组实例
  if(new.target !== Array) return new Array(...args)
}
```

Array构造器根据参数不同会有不同处理：
```javascript
// 参数长度为0，返回空数组
var arr1 = new Array()    // []

// 参数长度大于1，传入参数按顺序依次成为数组项的值，返回该新数组
var arr2 = new Array('a','b',233)    // ['a','b',233]

// 参数长度为1，且参数不是数值，返回只包含该参数的数组
var arr3 = new Array('666')    // ['666']

// 参数长度为1，且参数是整数值，返回长度为n的数组（浮点数报错）
var arr4 = new Array(4)    // [undefined x 4]
```

# Array.isArray

**示例：**
```javascript
Array.isArray([])    // true
Array.isArray({0:'a',length:1})    // false
Object.prototype.toString.call([])    // '[object Array]'
```

**描述：**
- 判断一个变量是否数组类型。

**参数：**
- element，任意一个参数。

**返回：** **Boolean**


# ES6新增的构造函数方法

## Array.of(ES6)

**示例：**
```javascript
Array.of(4)    // [2]
Array.of(1,2,3,4,5)    // [1,2,3,4,5]
```

**描述：**
- 避免了Array构造器因为参数不同而返回不同结果的特性。始终返回由参数组成的新数组。

**参数：**
- elementN，任意参数。

**返回：** **Array**


## Array.from(ES6)

**示例：**
```javascript
var arr = [1,2,3]
Array.from(arr)    // [1,2,3]
Array.from(document.all)
// 等价于 Array.from(arrayLike).map(fn,this)
Array.from(arrayLike,fn,this)
```

**描述：**
- 从一个 **类似数组** 或 **可迭代对象** 创建一个新的数组实例。

**参数：**
- arrayLike： **类似数组** 或 **可迭代对象**。
- fn：可选。生成的数组会经过该函数处理后返回。类似于[map方法](#map)。
- this：可选。指定执行fn函数时的this值。（当然fn是箭头函数则并没有什么卵用）

**返回：** **Array**



# 方法

可通过 Object.getOwnPropertyNames(Array.prototype)获取所有数组方法。


## 改变自身值

### push

**示例：**
```javascript
var arr = []
arr.push(1, 2, 3)   // 3
arr   // [1, 2, 3]
arr.push(1, 2, 3)   // 6
arr   // [1, 2, 3, 1, 2, 3]
```

**描述：**
- 将参数依次添加至数组最后，返回添加后新数组的**长度**。
- 没有参数数组不会发生改变。

**参数：**
- elementN，任意参数。

**返回：** **Number，新数组的长度**


---
### pop

**示例：**
```javascript
var arr = [4, {a:1}, 6]
arr.pop()   // 6
arr   // [4, {a:1}]
arr.pop()   // {a:1}
arr   // [4]
```

**描述：**
- 移除数组的最后一个元素，返回所**移除的元素**。

**参数：**
- 无。

**返回：** **数组的最后一个元素**


---
### unshift

**示例：**
```javascript
var arr = [1, 2, 3]
arr.unshift(7, 8, 9)   // 6
arr   // [7, 8, 9, 1, 2, 3]
arr.unshift([0])   // 7
arr   // [[0], 7, 8, 9, 1, 2, 3]
```

**描述：**
- 将参数依次添加至数组最前，返回添加后新数组的**长度**。
- 没有参数数组不会发生改变。

**参数：**
- elementN，任意参数。

**返回：** **Number，新数组的长度**


---
### shift

**示例：**
```javascript
var arr = [4, {a:1}, 6]
arr.shift()   // 4
arr   // [{a:1}, 6]
arr.shift()   // {a:1}
arr   // [6]
```

**描述：**
- 移除数组的第一个元素，返回所**移除的元素**。

**参数：**
- 无。

**返回：** **数组的第一个元素**


---
### reverse

**示例：**
```javascript
var arr = [1, 2, 3]
arr.reverse()   // [3, 2, 1]
```

**描述：**
- 将数组倒序，返回倒序后的**新数组**。

**参数：**
- 无。

**返回：** **Array，倒序后的新数组**


---
### splice

**示例：**
```javascript
var arr = [1, 2]
arr.splice(0, 1, 'add1', 'add2')    // [1]
arr    // ['add1', 'add2', 2]
arr.splice(1, 0, [6, 5], [9, 8])    // []
arr    // ['add1', [6, 5], [9, 8], 'add2', 2]
```

**描述：**
- 从数组的 startIndex 位置(包含)开始，删除 deleteNumber 个数组元素，并依次添加提供的 elementN 任意个插入元素。返回**删除的元素组成的数组**。
- 未删除元素则返回空数组。

**参数：**
- startIndex：起始下标。
- deleteNumber：删除元素个数。
- elementN：任意个插入的元素。

**返回：** **Array，删除的元素组成的数组**


---
### sort

**示例：**
```javascript
var arr = [3, 111, 4, 1, 5, 9, 2, 6, -10, -1]
arr.sort()    // [ -1, -10, 1, 111, 2, 3, 4, 5, 6, 9 ]

var arr = [3, 111, 4, 1, 5, 9, 2, 6, -10, -1]
arr.sort((a, b) => a-b) // [ -10, -1, 1, 2, 3, 4, 5, 6, 9, 111 ]
```

**描述：**
- 数组排序，按参数指定的函数返回值排序。返回值小于0：递增排序；返回值大于0：递减排序；返回值等于0：不变。返回排序后的**新数组**。
- 无参数时，默认按元素第一个字符ascii码顺序排序。

**参数：**
- fn：排序函数，函数的返回值决定了排序顺序。
    - fn的参数：argA, argB。排序函数正在比较的两个参数。

**返回：** **Array，排序后的新数组**


---
### fill(ES6)

**示例：**
```javascript
var arr = [1, 2, 3, 4, 5]
arr.fill([1, 2, 3], 1, 2)    // [1, [1,2,3], 3, 4, 5]
arr.fill()  // [undefined x 5]
```

**描述：**
- 以 value 参数填充数组 startIndex 位置到 endIndex 位置（不含）之间的元素。返回填充后的**新数组**。
- 无参数时，默认把所有数组元素填充为 undefined。

**参数：**
- value：填充元素。
- startIndex：可选，起始下标。
- endIndex：可选，终止下标（不含）。

**返回：** **Array，填充后的新数组**


---
### copyWithin(ES6)

**示例：**
```javascript
var arr = [1, 2, 3, 4, 5]
arr.copyWithin(0, -3, -1)    // [3, 4, 3, 4, 5]

var arr = [1, 2, 3, 4, 5]
arr.copyWithin(4)    // [1, 2, 3, 4, 1]
```

**描述：**
- 浅复制数组 startIndex 位置到 endIndex 位置（不含）之间的元素到 targetIndex 位置，返回新数组。
- 数组长度不会变。
- 省略 endIndex 参数，默认从startIndex到最后；省略startIndex和endIndex默认从数组起始到最后。
- 无参数时不变，返回原数组。

**参数：**
- targetIndex：填充位置。
- startIndex：可选，起始下标。
- endIndex：可选，终止下标（不含）。


**返回：** **Array，复制后的新数组**


## 不改变自身值

### concat

**示例：**
```javascript
var arr = [1,2]
arr.concat([4,5],7,[[1,2],{b:2}])   // [1,2,4,5,6,7,[1,2],{b:2}]
```

**描述：**
- 将操作数组与参数依次浅拷贝合并为一个新数组，返回该**新数组**。
- Array.prototype.concat.length === 1

**参数：**
- elementN，任意个参数

**返回：** **Array**

---
### indexOf

**示例：**
```javascript
var arr = [1,2,3,3,2,1]
arr.indexOf(1,2)    // 5
arr.indexOf(3,-3)    // 3
```

**描述：**
- 顺序查找参数 value 在数组中的位置，index 为查找的起始位置（含）。返回**参数在数组中的下标位置**，若数组中找不到该参数则返回-1。
- 数组元素本身不存在，则始终匹配不到，返回-1。
- [=== 严格相等匹配](#http://www.ecma-international.org/ecma-262/#sec-strict-equality-comparison)。

**参数：**
- value，需要查找的元素。
- index，可选，查找的起始位置。

**返回：** **Number**

---
### lastIndexOf

**示例：**
```javascript
var arr = [1,2,3,3,2,1]
arr.lastIndexOf(1)    // 5
arr.lastIndexOf(3,-4)    // 2
```

**描述：**
- 倒序查找，其它同indexOf。

**参数：**
- value，需要查找的元素。
- index，可选，查找的起始位置。

**返回：** **Number**

---
### join

**示例：**
```javascript
var arr = [1,2,3,'',undefined,{},[4,5,6]]
arr.join('-')    // "1-2-3---[object Object]-4,5,6"
```

**描述：**
- 数组元素以 str 为连接符连接成一个字符串，默认连接符为','。返回该**新字符串**。
- 对于每个数组元素，会将它们toString()转换为字符串。
- 如果数组元素是undefined/null，则该元素转化为空字符串。
- 如果是空数组，则返回空字符串。

**参数：**
- str，连接符。

**返回：** **String**

---
### slice

**示例：**
```javascript
var arr = [1,2,3]
arr.slice(1)    // [2,3]
arr.slice(0,2)    // [1,2]
```

**描述：**
- 将数组 startIndex 位置到 endIndex 位置（不含）的元素浅拷贝为另一数组，返回该**数组**。
- endIndex省略或长度大于数组长度，slice 会一直提取到数组的末尾。

**参数：**
- startIndex：起始下标。
- endIndex：结束下标。

**返回：** **Array**

---
### toString

**示例：**
```javascript
var arr = [1111,2222,3333]
arr.toString()    // "1111,2222,3333"
```

**描述：**
- 数组字符串化，等同于arr.join(',')。

**参数：**
- 无。

**返回：** **String**

---
### toLocaleString

**示例：**
```javascript
var arr = [1111,2222,3333]
arr.toLocaleString()    // "1,111,2,222,3,333"
```

**描述：**
- 数组字符串化，基本等同于arr.join(',')。
- 然而对于每个数组元素，会将它们toLocaleString()转换为字符串。
- 对于特定的语言环境会有特定的返回形式。

**参数：**
- 无。

**返回：** **String**

---
### includes(ES7)

**示例：**
```javascript
var arr = [1,2,3,{b:2},NaN,-0]
arr.includes(2)   // true
arr.includes(3,4)    // false
arr.includes({b:2})    // false
arr.includes(NaN)    // true
arr.includes(0)    // true
```

**描述：**
- 从数组的起始位置（含） startIndex 开始查找 value ，返回布尔值。
- 比较算法为[SameValueZero](#http://www.ecma-international.org/ecma-262/7.0/#sec-samevaluezero)。

**参数：**
- value：需要查找的元素。
- startIndex：可选，可负，查找的起始位置（含）。

**返回：** **Boolean**


## 遍历方法

### forEach

**示例：**
```javascript
var arr = [1,2,3,{b:2},undefined,,23]
arr.forEach(function(v, i, a) {console.log(v+1,i)}, this)
// 2 0
// 3 1
// 4 2
// [object Object]1 3
// NaN 4
// 24 6
```

**描述：**
- 依顺序对数组的每一个**有效元素**，执行一次参数提供的函数fn。
- 无效元素：delete 方法删除的数组元素；未初始化的数组元素；
- forEach 遍历的范围在第一次调用 fn 前就会确定（数组长度）。调用forEach 后数组中的多余的添加项不会被 fn 访问到。
- 无法中止或者跳出 forEach 循环，除非抛异常。

**参数：**
- fn：数组元素执行的函数。
    - fn 的参数：v 为当前处理的数组元素值，i 为当前处理的数组元素索引，a 为当前处理的数组。
- this：可选，执行 fn时指定的 this 值。

**返回：** **undefined**

---
### map

**示例：**
```javascript
var arr = [1,2,3,{b:2},undefined,,23]
arr.map(function(v, i, a) {return v+1}, this)    // [2, 3, 4, "[object Object]1", NaN, empty × 1, 24]
```

**描述：**
- 依顺序对数组的每一个**有效元素**，执行一次参数提供的函数 fn，返回**新数组**，新数组的每一个元素都是目标数组元素执行 fn 函数的返回值。
- map 遍历的范围在第一次调用 fn 前就会确定（数组长度）。调用map方法 后数组中的多余的添加项不会被 fn 访问到。

**参数：**
- fn：数组元素执行的函数。
    - fn 的参数：v 为当前处理的数组元素值，i 为当前处理的数组元素索引，a 为当前处理的数组。
- this：可选，执行 fn 时指定的 this 值。

**返回：** **Array**


---
### filter

**示例：**
```javascript
var arr = [1,2,3,{b:2},undefined,,23]
arr.filter(function(v, i, a) {return v>1}, this)    // [2, 3, 23]
```

**描述：**
- filter 方法依次为数组中的每一个**有效元素**调用一次 fn 函数，返回**新数组**，新数组的每一个元素都是目标数组元素调用一次 fn 函数并返回true 或等价于 true 的数组元素。
- filter 遍历的范围在第一次调用 fn 前就会确定（数组长度）。调用filter方法 后数组中的多余的添加项不会被 fn 访问到。

**参数：**
- fn：数组元素执行的函数。
    - fn 的参数：v 为当前处理的数组元素值，i 为当前处理的数组元素索引，a 为当前处理的数组。
- this：可选，执行 fn 时指定的 this 值。

**返回：** **Array**


---
### every

**示例：**
```javascript
var arr = [1,2,3,{b:2},undefined,,23]
arr.every(function(v, i, a) {return v>1}, this)   // false
```

**描述：**
- every 方法依次为数组中的每一个**有效元素**调用一次 fn 函数，若每一个 fn 函数都返回true 或等价于 true，则返回 true，否则返回 false。
- every 遍历的范围在第一次调用 fn 前就会确定（数组长度）。调用every方法 后数组中的多余的添加项不会被 fn 访问到。

**参数：**
- fn：数组元素执行的函数。
    - fn 的参数：v 为当前处理的数组元素值，i 为当前处理的数组元素索引，a 为当前处理的数组。
- this：可选，执行 fn 时指定的 this 值。

**返回：** **Boolean**


---
### some

**示例：**
```javascript
var arr = [1,2,3,{b:2},undefined,,23]
arr.some(function(v, i, a) {return v>1}, this)    // true
```

**描述：**
- every 方法依次为数组中的每一个**有效元素**调用一次 fn 函数，若有一个 fn 函数返回true 或等价于 true，则返回 true，若所以数组元素的 fn 返回 false，则返回 false。
- some 遍历的范围在第一次调用 fn 前就会确定（数组长度）。调用some方法 后数组中的多余的添加项不会被 fn 访问到。

**参数：**
- fn：数组元素执行的函数。
    - fn 的参数：v 为当前处理的数组元素值，i 为当前处理的数组元素索引，a 为当前处理的数组。
- this：可选，执行 fn 时指定的 this 值。

**返回：** **Boolean**

---
### find

**示例：**
```javascript
function isBigEnough(v) {
  return v >= 15;
}
[12, 5, 8, 130, 44].find(isBigEnough);    // 130
```

**描述：**
- find 方法依次为数组中的每一个元素调用一次 fn 函数，若fn 返回值为 true 或等价于 true，则该方法立即返回该元素， 若 fn 始终返回 false，则方法返回 undefined。
- 包含无效元素。

**参数：**
- fn：数组元素执行的函数。
    - fn 的参数：v 为当前处理的数组元素值，i 为当前处理的数组元素索引，a 为当前处理的数组。
- this：可选，执行 fn 时指定的 this 值。

**返回：** **任意**


---
### findIndex

**示例：**
```javascript
function isBigEnough(v) {
  return v >= 15;
}
[12, 5, 8, 130, 44].findIndex(isBigEnough);    // 3
```

**描述：**
- findIndex 方法依次为数组中的每一个元素调用一次 fn 函数，若fn 返回值为 true 或等价于 true，则该方法立即返回该元素的索引， 若 fn 始终返回 false，则方法返回 -1。
- 包含无效元素。

**参数：**
- fn：数组元素执行的函数。
    - fn 的参数：v 为当前处理的数组元素值，i 为当前处理的数组元素索引，a 为当前处理的数组。
- this：可选，执行 fn 时指定的 this 值。

**返回：** **Number**


---
### reduce

**示例：**
```javascript
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(iter, v, i) {
    console.log(iter, v, i)
    return iter.concat(v);
}, []);
// [], [0,1], 0
// [0,1], [2,3], 1
// [0,1,2,3], [4,5], 2
// flattened: [0, 1, 2, 3, 4, 5]

var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(iter, v, i) {
    console.log(iter, v, i)
    return iter.concat(v);
});
// [0,1], [2,3], 1
// [0,1,2,3], [4,5], 2
// flattened: [0, 1, 2, 3, 4, 5]
```

**描述：**
- reduce 方法依次为数组中的每一个**有效元素**调用一次 fn 函数，函数返回值作为累加值传递给 下一个元素的fn，返回最后一个fn 的返回值。
- 如果没有提供初始值initValue，则将使用数组第1个元素作为第一次调用fn的iter值，数组第2个元素的索引作为第一次调用fn的i。
- 若提供了初始值 initValue，则将使用 initValue 作为第一次调用fn的iter值，数组第1个元素的索引作为第一次调用fn的i。

**参数：**
- fn：数组元素执行的函数。
    - fn的参数：iter，上一次调用 fn 时返回的累积值；v，正在处理的数组元素；i，正在处理的数组索引；a，调用 reduce 方法的数组；
- initValue：可选，用作第一次调用 fn 的参数 iter 的值。

**返回：** **任意**


---
### reduceRight

**示例：**
```javascript
var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(iter, v, i) {
    console.log(iter, v, i)
    return iter.concat(v);
}, []);
// [], [4,5], 2
// [4,5], [2,3], 1
// [4,5,2,3], [0,1], 0
// flattened: [4, 5, 2, 3, 0, 1]

var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(iter, v, i) {
    console.log(iter, v, i)
    return iter.concat(v);
});
// [4,5], [2,3], 1
// [4,5,2,3], [0,1], 0
// flattened: [4, 5, 2, 3, 0, 1]
```

**描述：**
- 基本同 reduce 方法，不同之处是依倒序对数组使用 reduce 方法。
- 如果没有提供初始值initValue，则将使用数组倒数第1个元素作为第一次调用fn的iter值，数组倒数第2个元素的索引作为第一次调用fn的i。
- 若提供了初始值 initValue，则将使用 initValue 作为第一次调用fn的iter值，数组倒数第1个元素的索引作为第一次调用fn的i。

**参数：**
- fn：数组元素执行的函数。
    - fn的参数：iter，上一次调用 fn 时返回的累积值；v，正在处理的数组元素；i，正在处理的数组索引；a，调用 reduce 方法的数组；
- initValue：可选，用作第一次调用 fn 的参数 iter 的值。

**返回：** **任意**


---
### keys(ES6)

**示例：**
```javascript
var arr = ["a", "b", , "c"];
var iterator = arr.keys();
var arr2 = [...iterator]    // arr2: [0,1,2,3]

```

**描述：**
- 返回一个Array迭代器，包含每个数组元素的键。
- 包含无效元素。

**参数：**
- 无。

**返回：** **Array Iterator**


---
### entries(ES6)

**示例：**
```javascript
var arr = ["a", "b", , "c"];
var iterator = arr.entries();
var arr2 = [...iterator]    // arr2: [[0,"a"], [1"b"], [2,undefined], [3,"c"]]

```

**描述：**
- 返回一个Array迭代器，包含每个数组元素的[键, 值]。
- 包含无效元素。

**参数：**
- 无。

**返回：** **Array Iterator**


---
### values(ES6)

**示例：**
```javascript
var arr = ["a", "b", , "c"];
var iterator = arr.values();
var arr2 = [...iterator]    // arr2: ["a","b",undefined,"c"]

```

**描述：**
- 返回一个Array迭代器，包含每个数组元素的值。
- 包含无效元素。

**参数：**
- 无。

**返回：** **Array Iterator**


---
### Symbol.iterator(ES6)

**示例：**
```javascript
var arr = ["a", "b", , "c"];
var iterator = arr[Symbol.iterator]();
var arr2 = [...iterator]    // arr2: ["a","b",undefined,"c"]

```

**描述：**
- 返回默认的Array迭代器，同 values 方法。

**参数：**
- 无。

**返回：** **Array Iterator**

