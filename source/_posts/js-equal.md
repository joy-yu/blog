---
title: JavaScript “相等” 的二三事
tags: JavaScript
categories: JavaScript
toc: true
date: 2017-12-19 16:16:44
description: JavaScript “相等” 的二三事。除了众所周知的 "==" 和 "==="，你知道 [].indexOf、[].includes、Object.is 的匹配规则是什么样的呢？这里我带大家结合官方规范进行相关整理讲解。
---

# 相等不相等？

先来随便举几个🌰吧~
``` javascript
'0' == true          //?
[1] == [1]           //?
[1] == 1             //?
null == false        //?
null == undefined    //?
NaN === NaN          //?
+0 === -0            //?
Object.is([], [])    //?
Object.is(-0, +0)    //?
Object.is(NaN, NaN)  //?

var arr = [NaN, 0, +0]
arr.indexOf(-0)      //?
arr.indexOf(NaN)     //?
arr.includes(-0)     //?
arr.includes(NaN)    //?
```
可能 **±0**、**NaN** 会纠结一点，还是比较基础的，也许很多人一眼扫过去便知道答案了，网上也已经有了很多相关的经验总结。我在这里结合官方规范进行了整理，希望能带给你不一样的认识。



# 预备知识

## ECMAScript Language Types
[传送门][1]。根据最新规范，EcmaScript 一共有7种语言类型：
- **Undefined**
- **Null**
- **Number**
- **String**
- **Boolean**
- **Symbol**
- **Object**

我们经常把 **Object 类型**称为 **引用数据类型**，**其它5种**则为**基本数据类型**。（Symbol怎么说..？


## ToNumber
[传送门][2]。任意 **EcmaScript 类型**转化为 **Number 类型**：

类型       | 结果
----------|------|
Undefined | NaN  |
Null      | +0   |
Boolean   | true **->** 1，false **->** +0  |
Number    | 不转变 |
String    | 空字符串 **->** +0，有效的数字 **->** 十进制数字，其它 **->** NaN  |
Object    | 先ToPrimitive(hint Number)，再ToNumber |
Symbol    | 抛错，TypeError 错误|


## ToPrimitive
[传送门][3]。内部方法，主要功能是将**引用数据类型**转化为**基本数据类型**。

 - 根据内部标记 `hint` 的不同有不同的调用顺序。
 - `hint`有三种：**default**、**number**、**string**。**default** 默认遵照 **number** 规则。
 - **default/number**：先 valueOf，后 toString。一般转化规则皆如此。
 - **string**：先 toString，后 valueOf。如Date对象方法、String()转化等。
 - 如果 toString/valueOf 中某一方法返回类型不为对象类型，则直接返回该值，不会继续调用后面方法。如果两者都返回对象类型，会抛 TypeError 错误。


## -0、+0、0 的疑惑

**明明日常没什么卵用，为什么会有±0？**
 - 其实遵从`IEEE754`标准的编程语言都有±0的概念，`IEEE754`标准的64位浮点数，是以`1+11+53`形式的`符号位+阶数位+尾数位`表示。
 - 符号位、阶数位、尾数位都是0，那便是`+0`，也就是常规的数字`0`。
 - 符号位为1，阶数位、尾数位都是0，那便是 `-0`。
 - `IEEE754`还规定了`NaN`、`无穷`及其它的相应规范，有兴趣可自行查找相关资料。

## PS
这部分其实是后加的，你会发现每个知识点都是紧密相连的，构成了一个庞大的知识网络，限于篇幅我不会详细介绍，但我会尽量贴出规范出处，大家可自行研究。

# SameValueNonNumber 内部方法
[SameValueNonNumber][4] 方法接收两个参数 x 和 y ，其中 x 和 y 都不是 Number 类型，该方法返回 **true** 或 **false**。

## 主要规则
 1. 断言：x 不是 Number 类型。
 2. 断言：x 和 y 是 相同类型。
 3. 如果 x 是 Undefined 类型，返回 **true** 。
 4. 如果 x 是 Null 类型，返回 **true** 。
 5. 如果 x 是 String 类型：
    - 如果 x 和 y 长度相同且相应编码单元相同，返回 **true** 。
    - 否则返回 **false** 。
 6. 如果 x 是 Boolean 类型：
    - 如果 x 和 y 都是true 或者 都是false，返回 **true** 。
    - 否则返回 **false** 。
 7. 如果 x 是 Symbol 类型：
    - 如果 x 和 y 都是相同 Symbol 值，返回 **true** 。
    - 否则返回 **false** 。
 8. 如果 x 和 y 指向同一对象，返回 **true** 。否则返回 **false** 。

## 小结
**相同类型比较规则（除Number类型）**
1. 都是 undefined，**相等**。
2. 都是 null，**相等**。
3. String 类型中，都是相同字符串，**相等**。
4. Boolean 类型中，都是 true 或者 都是 false，**相等**。
5. Symbol 类型中，都是相同 Symbol 值，**相等**。
6. Object 类型中，引用同一对象，**相等**。

## 使用
**哪些 JavaScript 公开方法采用了 SameValueNonNumber 比较呢？**
1. 公开方法木有
2. 接着看下去你就会知道，撇开数值类型比较，`SameValueNonNumber` 是 `SameValue`、`SameValueZero`、 `===` 的公共方法。


# SameValueZero 内部方法
[SameValueZero][5] 方法接收两个参数 x 和 y ，其中 x 和 y 是 EcmaScript 任意类型值，该方法返回 **true** 或 **false**。

## 主要规则
 1. 如果 x 和 y 的类型不同，返回 **false** 。
 2. 如果 x 是 Number 类型：
    - 如果 x 和 y 都是 NaN ，返回 **true** 。
    - 如果 x 是 -0 ，y 是 +0 ，返回 **true** 。
    - 如果 x 是 +0 ，y 是 -0 ，返回 **true** 。
    - 如果 x 和 y 数值相等，返回 **true** 。
    - 返回 **false** 。
 3. 返回 SameValueNonNumber(x, y) 方法的返回值。


## 小结
1. 不同类型**不相等**。
2. Number 类型中：±0 **相等**。NaN 和 NaN **相等**。其它相同数值**相等**。
3. `SameValueNonNumber` 比较：
    - 都是 undefined，**相等**。
    - 都是 null，**相等**。
    - String 类型中，都是相同字符串，**相等**。
    - Boolean 类型中，都是 true 或者 都是 false，**相等**。
    - Symbol 类型中，都是相同 Symbol 值，**相等**。
    - Object 类型中，引用同一对象，**相等**。

## 使用
**哪些 JavaScript 公开方法采用了 SameValueNonNumber 比较呢？**
1. Array.prototype.includes
2. Map.prototype.delete
3. Map.prototype.has
4. Map.prototype.set
5. Set.prototype.delete
6. Set.prototype.has
7. Set.prototype.add
8. ArrayBuffer 和 DataView 部分方法



# SameValue 内部方法
[SameValue][6] 方法接收两个参数 x 和 y ，其中 x 和 y 是 EcmaScript 中任意类型值，该方法返回 **true** 或 **false**。

## 主要规则
 1. 如果 x 和 y 的类型不同，返回 **false** 。
 2. 如果 x 是 Number 类型：
    - 如果 x 和 y 都是 NaN ，返回 **true** 。
    - 如果 x 是 -0 ，y 是 +0 ，返回 **false** 。
    - 如果 x 是 +0 ，y 是 -0 ，返回 **false** 。
    - 如果 x 和 y 数值相等，返回 **true** 。
    - 返回 **false** 。
 3. 返回 SameValueNonNumber(x, y) 方法的返回值。

## 小结
1. 不同类型**不相等**。
2. Number 类型中：±0 **不相等**。NaN 和 NaN **相等**。其它相同数值**相等**。
3. `SameValueNonNumber` 比较：
    - 都是 undefined，**相等**。
    - 都是 null，**相等**。
    - String 类型中，都是相同字符串，**相等**。
    - Boolean 类型中，都是 true 或者 都是 false，**相等**。
    - Symbol 类型中，都是相同 Symbol 值，**相等**。
    - Object 类型中，引用同一对象，**相等**。

## 使用
**哪些 JavaScript 公开方法采用了 SameValueNonNumber 比较呢？**
1. Object.is
2. 在[最新的 ES 规范][7] 中，你会发现许多其它内部方法和公开方法都应用了 `SameValue` 比较方法，其中大部分也没有涉及数值比较。
3. 至于为什么是 `SameValue` 方法，而不是 `SameValueZero`或`===`。其实我也不知道。。。我个人倾向于认为：SameValue 方法原本在 ES5 规范中便存在了，最新的规范是为了保持规范一致而继续沿用。


# === 严格相等运算
[Strict Equality Comparison][8]，x === y，返回 **true** 或者 **false**。

## 主要规则
 1. 如果 x 和 y 的类型不同，返回 **false** 。
 2. 如果 x 是 Number 类型：
    - 如果 x 是 NaN ，返回 **false** 。
    - 如果 y 是 NaN ，返回 **false** 。
    - 如果 x 和 y 数值相等，返回 **true** 。
    - 如果 x 是 -0 ，y 是 +0 ，返回 **true** 。
    - 如果 x 是 +0 ，y 是 -0 ，返回 **true** 。
    - 返回 **false** 。
 3. 返回 SameValueNonNumber(x, y) 方法的返回值。

## 小结
1. 不同类型**不相等**。
2. Number 类型中：±0 **相等**。NaN 和 NaN **不相等**。其它相同数值**相等**。
3. SameValueNonNumber比较：
    - 都是 undefined，**相等**。
    - 都是 null，**相等**。
    - String 类型中，都是相同字符串，**相等**。
    - Boolean 类型中，都是 true 或者 都是 false，**相等**。
    - Symbol 类型中，都是相同 Symbol 值，**相等**。
    - Object 类型中，引用同一对象，**相等**。

## 使用
**哪些 JavaScript 公开方法采用了 === 比较呢？**
1. === 严格相等运算
2. 左右两边是相同类型的 == 相等运算
3. switch语句中的case
4. Array.prototype.indexOf
5. Array.prototype.lastIndexOf


# == 相等运算
[Abstract Equality Comparison][9]，x == y，返回 **true** 或者 **false**。

## 主要规则
 1. 如果 x 和 y 的类型相同：
   - 返回严格相等运算结果 x === y 。
 2. 如果 x 是 null ，y 是 undefined ，返回 **true** 。
 3. 如果 x 是 undefined ，y 是 null ，返回 **true** 。
 4. 如果 x 是 Number 类型 ，y 是 String 类型，返回 x == ToNumber(y) 运算结果。
 5. 如果 x 是 String 类型 ，y 是 Number 类型，返回 ToNumber(x) == y 运算结果。
 6. 如果 x 是 Boolean 类型 ，返回 ToNumber(x) == y 运算结果。
 7. 如果 y 是 Boolean 类型 ，返回 x == ToNumber(y) 运算结果。
 8. 如果 x 是 Number、String、Symbol 中任意一个类型 ，y 是 Object 类型，返回 x == ToPrimitive(y) 运算结果。
 9. 如果 y 是 Number、String、Symbol 中任意一个类型 ，x 是 Object 类型，返回 ToPrimitive(x) == y 运算结果。
 10. 返回 **false** 。

## 小结
1. 相同类型：遵循 === 严格相等比较规则。
2. null == undefined，**相等**。
3. 不同类型：
    - 基本数据类型转换为 Number 类型再 == 比较。
    - 引用数据类型执行内部 ToPrimitive方法后再 == 比较。

## 使用
**哪些 JavaScript 公开方法采用了 == 比较呢？**
1.  只有这只 == 相等运算


# 相等不相等
开头的答案。如果对结果感到好奇，不妨对着上面的过程比对~
``` javascript
'0' == true         // false
[1] == [1]          // false
[1] == 1            // true
null == false       // false
null == undefined   // true
NaN === NaN         // false
+0 === -0           // true
Object.is([], [])   // false
Object.is(-0, +0)   // false。见SameValue
Object.is(NaN, NaN) // true。见SameValue

var arr = [NaN, 0, +0]
arr.indexOf(-0)     // 1。见===
arr.indexOf(NaN)    // -1。见===
arr.includes(-0)    // true。见SameValueZero
arr.includes(NaN)   // true。见SameValueZero
```

# 总结

1. `SameValueZero`、`SameValue`、`===`这仨完全差不多嘛！
    - 相同点：
        - 不同类型即不相等。
        - 相同类型遵从`SameValueNonNumber`规则。
    - 不同点：对`±0`、`NaN` 的判断上各有不同。
2. 以 **Array.prototype.includes** 为代表的`SameValueZero`
   - ±0 **相等**
   - NaN 和 NaN **相等**
3. 以 **Object.is** 为代表的`SameValue`
   - ±0 **不相等**
   - NaN 和 NaN **相等**
4. 以 **===**、**Array.prototype.indexOf** 为代表的`===`
   - ±0 **相等**
   - NaN 和 NaN **不相等**

5. `==`
   - 相同类型采用`===`严格比较。
   - 不同类型会隐式转换：
       - 基本数据类型转换为 Number 类型再 == 比较。
       - 引用数据类型执行 ToPrimitive 转换后再 == 比较。
       - undefined/null 特例。


  [1]: http://www.ecma-international.org/ecma-262/#sec-ecmascript-language-types
  [2]: http://www.ecma-international.org/ecma-262/#sec-tonumber
  [3]: http://www.ecma-international.org/ecma-262/#sec-toprimitive
  [4]: http://www.ecma-international.org/ecma-262/#sec-samevaluenonnumber
  [5]: http://www.ecma-international.org/ecma-262/#sec-samevaluezero
  [6]: http://www.ecma-international.org/ecma-262/#sec-samevalue
  [7]: http://www.ecma-international.org/ecma-262/
  [8]: http://www.ecma-international.org/ecma-262/#sec-strict-equality-comparison
  [9]: http://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison
