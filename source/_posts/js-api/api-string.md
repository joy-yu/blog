---
title: JavaScript String API全解析
tags: JavaScript
categories: JavaScript
toc: true
date: 2017-12-05 23:08:08
description:  JavaScript 字符串API操作全解析~
---

# String API

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
所有方法都**不会影响原字符串**。


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

**示例：**
```javascript
var str = '123'
str.concat('1', [2,3], {})
// "12312,3[object Object]"

str.concat(str1,str2,str3...)
```

**描述：**
- 将若干个参数与原字符串连接合并，形成新字符串并返回。
- 参数为非字符串会转化为字符串。
- 性能不如字符串直接拼接，[性能测试](https://jsperf.com/concat-vs-plus-vs-join)。

**参数：**
- elementN：任意参数。

**返回：** **字符串**


## split

**示例：**
```javascript
var str = 'abcde fg'
str.split()  // ["abcde fg"]
str.split('', 7)  // ["a","b","c","d","e"," ","f"]

str.split(separator, limit)

```

**描述：**
- 使用指定分隔符将字符串分割成数组，返回该数组。
- 不指定 separator 时返回整个字符串组成的数组。
- separator 为空字符串时，字符串转化为字符数组。

**参数：**
- separator：(可选)。分隔符。
- limit：(可选)。限定最终分割成数组的长度。

**返回：** **Array**


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
- 区分大小写。

**参数：**
- value：需要查找的元素。
- index：(可选)。查找的起始位置（含）。

**返回：** **数字**


## includes(ES6)

```javascript
var str = '中文没有影响 China No.1!'
str.includes('China No')  // true
str.includes('china')  // false

str.includes(searchStr, index)
```

**描述：**
- 判断字符串 str 中是否包含另一字符串 searchStr。
- 区分大小写。

**参数：**
- searchStr：要搜索的字符串。
- index：(可选)。从此索引位置处开始寻找（含）。

**返回：** **布尔值**


## startsWith(ES6)

```javascript
var str = '中文没有影响 China No.1!'
str.startsWith('中文')  // true

str.startsWith(searchStr, index)
```

**描述：**
- 判断字符串 str 是否是以给定的字符串 searchStr 开头的。

**参数：**
- searchStr：要搜索的字符串。
- index：(可选)。从此索引位置处开始寻找（含）。

**返回：** **布尔值**


## endsWith(ES6)

```javascript
var str = '中文没有影响 China No.1!'
str.endsWith('中文')  // true

str.endsWith(searchStr, index)
```

**描述：**
- 判断字符串 str 是否是以给定的字符串 searchStr 结尾的。

**参数：**
- searchStr：要搜索的字符串。
- index：(可选)。从此索引位置处开始寻找（含）。

**返回：** **布尔值**


## toLowerCase / toLocaleLowerCase

**示例：**
```javascript
var str = '中文没有影响 China No.1!'

str.toLowerCase()
// "中文没有影响 china no.1!"
str.toLocaleLowerCase()
// "中文没有影响 china no.1!"

str.toLowerCase()
str.toLocaleLowerCase()
```

**描述：**
- 返回字符串的**小写**形式。
- toLocaleLowerCase 大多数情况结果和 toLowerCase 情况相同，toLocaleLowerCase 会针对特定语言环境会进行相应转化。

**参数：**
- 无。

**返回：** **字符串**


## toUpperCase / toLocaleUpperCase

**示例：**
```javascript
var str = '中文没有影响 China No.1!'

str.toUpperCase()
// "中文没有影响 CHINA NO.1!"
str.toLocaleUpperCase()
// "中文没有影响 CHINA NO.1!"

str.toUpperCase()
str.toLocaleUpperCase()
```

**描述：**
- 返回字符串的**大写**形式。
- toLocaleUpperCase 大多数情况结果和 toUpperCase 情况相同，toLocaleUpperCase 会针对特定语言环境会进行相应转化。

**参数：**
- 无。

**返回：** **字符串**


## localeCompare

**示例：**
```javascript
var arr = ['张三','李四','王五']
arr.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'}))

str.localeCompare(compareStr, locales, options)
```

**描述：**
- 返回数字来表示一个字符串 str 是否在给定字符串 compareStr 顺序前、后或相同。
- 前(负数)，后(负数)，相同(0)。
- 虽然不常用，但是怎么看着感觉这玩意水很深呢。。直接看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)吧。

**返回：** **数字**


## normalize

**示例：**
```javascript
var str = '你'
var you = str.normalize()
you  // '你'
you === str  // false

str.normalize(form)
```

**描述：**
- 按照指定的一种 Unicode 正规形式将当前字符串正规化。
- NFC默认、NFD、NFKC、NFKD。

**参数：**
- form：字符串，规范形式。

**返回：** **字符串**


## trim

**示例：**
```javascript
var str = '  \t a b c \n'
str.trim()  // "a b c"
str.replace(/^\s+|\s+$/g, '') // "a b c"

str.trim()
```

**描述：**
- 返回去除字符串的两端空白字符的新字符串。
- 包括：换行、回车、空格、制表等等。

**参数：**
- 无。

**返回：** **字符串**


## replace

**示例：**
``` javascript
var str = 'a1b2c3e'
str.replace(/(\d+)/g, function(){console.log(arguments)})
// ['1', '1', 1, 'a1b2c3e']
// ['2', '2', 3, 'a1b2c3e']
// ['3', '3', 5, 'a1b2c3e']
str.replace(pattern, replacement)
```

**描述：**
- 返回由替换模式 replacement 替换符合匹配的模式 pattern 后的新字符串。
- 如果替换模式为函数，则函数的返回值会作为替换字符串。
- 如果匹配模式是正则表达式，则替换模式可以用$取正则匹配到的子串。

**参数：**
- pattern：(字符串|正则表达式)。需要替换的模式。
- replacement：(字符串|函数)。用于替换的模式。
  - function(match, p1,p2... , offset, string)：
    - match：匹配的子串。
    - pn：正则匹配时第n个括号匹配的字符串。
    - index：匹配到的子串在源字符串中的索引位置。
    - string：原字符串。

**返回：** **字符串**


## match

**示例：**
``` javascript
var str = 'a1b2c3e'
str.match(/\d+/g)  // ['1','2','3']

var str = 'a1b2c3e'
var result = str.match(/\d+/)
console.log(result, result.index, result.input)
// ['1', 1, 'a1b2c3e']


str.match(pattern)
```

**描述：**
- 返回由正则表达式匹配字符串的匹配结果及任何括号捕获组成的数组。
- 正则表达式有g：返回数组，包含所有匹配到的字符串。
- 正则表达式没有g：返回和 RegExp.exec() 相同结果，返回匹配到的字符数组（数组的第0个元素存放的是匹配文本，其余元素存放正则表达式的子表达式匹配的文本），额外有属性input:原字符串、index:匹配结果在原字符串中的索引。
- 参数为空则返回 ['']，匹配不到则返回 null。
- 传入参数是非正则表达式对象会隐式转化为正则表达式：new RegExp(arg)。

**参数：**
- pattern：要匹配的模式，为正则表达式。

**返回：** **数组/null**


## search

str.search(/[0-9]/);                            //返回正则or字符串在字符串首次匹配到的位置索引，没有则为-1
**示例：**
``` javascript
var str = 'a1b2c3e'
str.search(/\d+/g)  // 1

str.search(pattern)
```

**描述：**
- 返回由正则表达式匹配字符串的匹配结果在字符串中的**位置索引**，找不到则返回-1。

**参数：**
- pattern：要匹配的模式，为正则表达式。

**返回：** **数字**


## slice

**示例：**
```javascript
var str = 'abcde'
str.slice(2)  // 'cde'
str.slice(1, 2)  // 'b'
str.slice(-1)  // 'e'

str.slice(startIndex, endIndex)
```

**描述：**
- 提取字符串的从起始位置索引（含）到结束位置索引（不含），返回提取的新字符串。
- 参数可以是负数，从字符串末尾位置开始计算。
- endIndex 省略则直接提取到字符串末尾。

**参数：**
- startIndex：起始位置索引。可负数。
- endIndex：(可选)。结束位置索引。可负数。

**返回：** **字符串**


## substr

**示例：**
```javascript
var str = 'abcde'
str.substr(2)  // 'cde'
str.substr(1, 2)  // 'bc'
str.substr(-1)  // 'e'

str.substr(startIndex, len)
```

**描述：**
- 提取字符串从起始位置索引 startIndex 开始（含），长度为 len 的字符串，返回提取的字符串。
- startIndex 参数可以是负数，从字符串末尾位置开始计算。
- len 省略则直接提取到字符串末尾。

**参数：**
- startIndex：起始位置索引(含)。可负数。
- len：(可选)。提取字符串长度。

**返回：** **字符串**


## substring

**示例：**
```javascript
var str = 'abcde'
str.substr(2)  // 'cde'
str.substr(1, 2)  // 'bc'
str.substr(-1)  // 'e'

str.substr(startIndex, endIndex)
```

**描述：**
- 提取字符串的从起始位置索引（含）到结束位置索引（不含），返回提取的新字符串。
- 参数可以是负数，自动转化为0。
- endIndex 省略则直接提取到字符串末尾。
- 如果 startIndex 大于 endIndex，则执行时实际参数会互换，保持 startIndex < endIndex。

**参数：**
- startIndex：起始位置索引。可负数。
- endIndex：(可选)。结束位置索引。可负数。

**返回：** **字符串**


## toString

**示例：**
```javascript
var str = 'abc'

str.toString()
```

**描述：**
- 返回字符串/字符串对象的字符串形式。

**参数：**
- 无。

**返回：** **字符串**


## valueOf

**示例：**
```javascript
var str = 'abc'

str.valueOf()
```

**描述：**
- 返回字符串/字符串对象的原始值（primitive value）。
- 通常在 JS 内部被调用，而不是在代码里显式调用。

**参数：**
- 无。

**返回：** **字符串**


## repeat(ES6)

**示例：**
```javascript
var str = 'abc'
str.repeat(0) // ''
str.repeat(2) // 'abcabc'

str.repeat(n)
```

**描述：**
- 返回字符串 str 重复 n 次连接起来的新字符串。
- n 为 0 返回空字符串哦。浮点数会转化为整数。负数或其它值会报错。

**参数：**
- n：数字。表示重复次数。

**返回：** **字符串**


## padStart(ES8)

**示例：**
```javascript
var str = 'abc'
str.padStart(5)  // '  abc'
str.padStart(5, 654321)  // '65abc'
str.padStart(5, 1)  // '11abc'

str.padStart(targetLength, padStr)
```

**描述：**
- 以字符串 padStr 从**起始**位置填充字符串 str，直到字符串长度为 targetLength，返回新字符串。
- 不指定填充字符串 padStr 默认为空格'\u0020'。
- padStr 过长会保留有效填充，多余部分被截断。

**参数：**
- targetLength：表示字符串要填充到的目标长度。
- padStr：(可选)。填充的字符串。

**返回：** **字符串**


## padEnd(ES8)

**示例：**
```javascript
var str = 'abc'
str.padEnd(5)  // 'abc  '
str.padEnd(5, 654321)  // 'abc65'
str.padEnd(5, 1)  // 'abc11'

str.padEnd(targetLength, padStr)
```

**描述：**
- 以字符串 padStr 从**末尾**位置填充字符串 str，直到字符串长度为 targetLength，返回新字符串。
- 不指定填充字符串 padStr 默认为空格'\u0020'。
- padStr 过长会保留有效填充，多余部分被截断。

**参数：**
- targetLength：表示字符串要填充到的目标长度。
- padStr：(可选)。填充的字符串。

**返回：** **字符串**
