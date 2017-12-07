---
title: JavaScript String API全解析
tags: JavaScript
categories: JavaScript
toc: true
date: 2017-12-05 23:08:08
description:  JavaScript 字符串API操作全解析~
---

# 字符串API

# String 构造函数方法

## fromCharCode

**示例：**
```javascript
String.fromCharCode(65)  // 'A'

String.fromCharCode(97,98,99)
// 'abc'

String.fromCharCode(97,98,99)
// 'abc'

String.fromCharCode(63492)
// ""

String.fromCharCode(194564)
// ""

String.fromCharCode(a,b,c,d...)
```

**描述：**
- 使用若干 Unicode 数值对应的字符组成字符串，返回该字符串。
- fromCharCode 方法不能单独获取在高代码点位上的字符，即无法正确获得16比特以上的单个字符，如4字节字符。
- 如处理4字节字符编码可使用 [fromCodePoint](#fromCodePoint) 方法。

**参数：**
- elementN，任意个数字，表示为Unicode值。

**返回：** **字符串**


<a id="fromCodePoint"></a>
## fromCodePoint(ES6)

**示例：**
```javascript
String.fromCodePoint(194564)
// "你"
// 不是你好的`你`哦~

String.fromCodePoint(a,b,c,d...)
```

**描述：**
- 使用若干 Unicode 数值对应的字符组成字符串，返回该字符串。
- 支持4字节字符。

**参数：**
- elementN，任意数字，表示为Unicode值。

**返回：** **字符串**


## raw(ES6)

**示例：**
```javascript
String.raw `Hi\tyou!`
// "Hi\tyou!"

var name = 'you'
console.log(`Hi\t${name}!`)
// "Hi	you!"

String.raw({raw: 'Hi\tyou!'}, 0, 1, 2)
// "H0i1	2you!"
// 等价于`H${0}i${1}\t${2}you!`

String.raw(callSite, a,b,c,d...)
String.raw`templateString`
```

**描述：**
- 返回模板字符串的原始字面量值，不会转义。如有多个替换参数，则替换参数会分别插入插槽。
- 插槽：原始字面量相邻下标元素之间为插槽。
- raw 方法作为函数调用时，与ES6的tag标签模板基本相同。

**参数：**
- callSite：模板字符串的调用点对象。
- elementN：(可选)，任意个替换参数。
- templateString：模板字符串。

**返回：** **字符串**


# String.prototype 方法
bold、anchor、big 等等已废弃的HTML相关方法不再介绍。
所有方法都不会影响原字符串。
```
str.trim();                                           //IE9+，不改变原来字符串，去除两边空格。。
str.match(/[0-9]/g);                           //返回由正则or字符串匹配的结果组成的数组，参数为空则['']，匹配不到则null。
str.search(/[0-9]/);                            //返回正则or字符串在字符串首次匹配到的位置索引，没有则为-1
str.replace(/[0-9]/,str/function(match,p1..,offset,str) );      //不改变原来字符串，第1个参数为要被替代的，第2个参数为替代的字符串or函数。函数时，match为匹配的子串，p1为正则匹配时第1个括号匹配的字符串，offset为匹配到的子串在源字符串中的偏移量，str为被匹配的字符串。
str.substring(start,end);                    //不改变原来字符串，start起始位置，end结束位置（不含）
str.substr(start,len);                          //不改变原来字符串，start起始位置，len提取字符串长度。start可负。
str.slice(start,end);                           //不改变原来字符串，start起始位置，end结束位置（不含）。可皆为负值。
str.split("",len);                                   //字符串按第1个参数分割为数组，第2个参数为分割长度。
str.localeCompare(a,locales,opt)          //比较str是否在a前，是-1(<0)，否1(>0)，同0
str.toString();                                 //...
str.valueOf();                                  //...
其它兼容性略。
str.includes(str,pos)                         //字符串是否包含在另一个字符串中，返回布尔值。
str.repeat(count);                             //返回字符串重复count次组成的字符串。
str.startswith(b,pos)                    //str字符串是不是以参数b开头的，pos为搜索起始位置，返回布尔值。
str.endswith(b, pos)
str.normalize(form)                       //NFC默认,NFD,NFKC,NFKD。按指定Unicode正规形式将字符串正规化。
str.padStart(len, padStr)             //字符串str首部填充padStr直至长度为len，默认填充空格，不改变原字符串。
```

## charAt

**示例：**
```javascript
var str = '123'
str.charAt()  // '1'
str.charAt(2)  // '3'
str.charAt(233)  // ''

str.charAt(index)  // 等价 str[index]
```

**描述：**
- 返回字符串中指定位置索引的字符。
- 不能正确返回4字节字符的字符串。
- index超出范围返回空字符串。

**参数：**
- index：位置索引，非数字默认为0。

**返回：** **字符串**


## charCodeAt

**示例：**
```javascript
var str = '123'
str.charCodeAt()  // 49
str.charCodeAt(2)  // 51
str.charCodeAt(233)  // NaN

var a='你'
a.charCodeAt(0)  // 55422
String.fromCharCode(55422)  // "�"

str.charCodeAt(index)
```

**描述：**
- 返回字符串中指定位置索引处字符的 Unicode 编码值，0-65535。
- 不能正确返回4字节字符的 Unicode 编码值，可使用 [codePointAt](#codePointAt) 方法。
- index超出范围返回 NaN。

**参数：**
- index：位置索引，非数字默认为0。

**返回：** **数字**


<a id="#codePointAt"></a>
## codePointAt(ES6)

**示例：**
```javascript
var str = '123'
str.codePointAt()  // 49
str.codePointAt(2)  // 51
str.codePointAt(233)  // NaN

var a='你'
a.codePointAt(0)  // 194564

str.codePointAt(index)
```

**描述：**
- 返回字符串中指定位置索引处编码单元对应的 Unicode 编码值。
- 可正确处理4字节字符。
- index超出范围返回 undefined。

**参数：**
- index：位置索引，非数字默认为0。

**返回：** **数字**


## concat
将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回
**示例：**
```javascript
var str = '123'
str.concat('1', [2,3], {})
// "12312,3[object Object]"

str.concat(str1,str2,str3...)
```

**描述：**
- 将多个参数与原字符串连接合并，形成新字符串并返回。
- 参数为非字符串会转化为字符串。
- 性能不如字符串直接拼接，[性能测试](https://jsperf.com/concat-vs-plus-vs-join)。

**参数：**
- elementN：任意参数。

**返回：** **字符串**



## indexOf / lastIndexOf

**示例：**
```javascript
var str = 'abcdefg2[object Object]'
str.indexOf(2)  // 7
str.indexOf({})  // 8
str.indexOf('a', 1)  // -1
str.lastIndexOf('c')  // 20

str.indexOf(value, index)
str.lastIndexOf(value, index)
```

**描述：**
- 查找参数 value 在数组中首次出现的位置，index 为查找的起始位置（含）。返回**参数在数组中首次出现的下标位置**。
- 字符串中找不到给定参数则返回 -1。
- value 会被转化为字符串。index 小于0则默认为0，大于等于字符串长度时，若value为空字符串则返回字符串长度，否则返回-1。
- indexOf 顺序查找，lastIndexOf 倒序查找。
**参数：**
- value：需要查找的元素。
- index：(可选)。查找的起始位置（含）。

**返回：** **Number**


## valueOf
## toString
## includes
## localeCompare
## match
## normalize
## repeat
## replace
## search
## slice
## split
## substring
## substr
## startsWith
## endsWith
## toLowerCase / toLocaleLowerCase
##
## toUpperCase
## toLocaleUpperCase
str.toLowerCase();                                //不改变原来字符串，小写
str.toUpperCase();                               //不改变原来字符串，大写
## trim
## trimLeft
## trimRight
## padStart
## padEnd
