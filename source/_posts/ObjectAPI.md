---
title: JavaScript Object API全解析
date: 2017-11-22 20:10:01
tags: JavaScript
categories: JavaScript
description: JavaScript 对象API操作全解析~
toc: true
---


# 对象API

这里我们探讨的 `对象` 主要指 Object 构造出来的对象。

--------------------------------------------------------------------------------
# Object构造器

Object.prototype 本身是一个object。

创建对象的两种方法：
```javascript
// Object构造函数
var arr1 = Object()
// 相当于new Object()

// 对象字面量，推荐
var arr2 = {}
```

当直接调用Object构造函数，内部会判断调用[[Call]]方法还是[[Construct]]方法，统一进行[[Construct]]方法调用。大致实现如下：
```javascript
function Object (...args) {
  // 不是new调用，返回数组实例
  if(new.target !== Object) return new Object(...args)
}
```

Object构造器根据参数类型不同会调用不同的构造器进行处理：
```javascript

var obj = new Object(123)  // 等价于 new Number(123)
console.log(obj)  // Number {[[PrimitiveValue]]: 123}

var obj = new Object('I am string')  // 等价于 new String('I am string')
console.log(obj)  // String {[[PrimitiveValue]]: "I am string"}
```

--------------------------------------------------------------------------------
# Object.prototype 的方法


## hasOwnProperty

**示例：**
```javascript
var obj = { value: 233 }
obj.hasOwnProperty('value')  // true

obj.hasOwnProperty(props)
```

**描述：**
- 检测对象自身是否含有指定的属性键。
- 只检查自身的属性键，不含原型链的属性键。

**参数：**
- props：需要检查的属性键。

**返回：** **Boolean**



## propertyIsEnumerable

**示例：**
```javascript
var obj = { value: 233 }
obj.propertyIsEnumerable('value')  // true

obj.propertyIsEnumerable(props)
```

**描述：**
- 判断对象自身的指定属性键是否可枚举。
- 只检查自身的属性键，不含原型链的属性键。

**参数：**
- props：需要检查的属性键。

**返回：** **Boolean**



## isPrototypeOf

**示例：**
```javascript
var obj = {}
Object.prototype.isPrototypeOf(obj)  // true
obj instanceof Object  // true

obj instance of constructorFn
prototypeObj.isPrototypeOf(obj)
```

**描述：**
- 判断 obj 对象的原型链 [[prototype]] 上是否有 prototypeObj。
- 区别于 obj instanceof constructorFn：判断 obj 对象的原型链 [[prototype]] 上是否有 constructorFn.prototype。


**参数：**
- obj：要测试的对象。

**返回：** **Boolean**



## toString

**示例：**
```javascript
var obj = {}
obj.toString()  // "[object Object]"

var arr = []
Object.prototype.toString.call(arr)  // "[object Array]"

obj.toString()
```

**描述：**
- 返回 "[object type]" 字符串，其中 type 表示对象的类型。


**参数：**
- 无。

**返回：** **String**



## valueOf

**示例：**
```javascript
var obj = {}
obj.valueOf() === obj  // true

var num = 123
Object.prototype.valueOf.call(num) // Number {[[PrimitiveValue]]: 123}

obj.valueOf()
```

**描述：**
- 返回对象的原始值。默认情况下，对象的 valueOf 方法返回对象本身。


**参数：**
- 无。

**返回：** **Any**


# Object 构造函数的方法


## create

**示例：**
```javascript
var proto = { b: 233 }
var newObj = Object.create(proto, {
  c: {
    value: 666
  }
})
console.log(newObj)  // {c: 666}
console.log(newObj.b)  // 233

Object.create(proto, obj)
```

**描述：**
- 以 proto 对象作为原型对象来创建一个新对象，obj 参数内含一组 属性 与 属性描述符 作为新创建对象的属性。返回该新创建的对象。


**参数：**
- proto：新创建对象的原型对象。
- obj：(可选)。是一个对象，由 `属性名:属性描述符对象` 为键值对组成。

**返回：** **Object**



## keys

**示例：**
```javascript
var proto = { b: 233 }
var keys = Object.keys(obj)
console.log(keys)  // {c: 666}

Object.keys(obj)
```

**描述：**
- 返回对象`可枚举`的`自身属性`的**属性键组成的数组**。
- for-in 不仅会查找`可枚举`的`自身属性`还会查找该对象所有`原型链上的可枚举属性`。


**参数：**
- obj：执行的目标对象。

**返回：** **Array**



## defineProperty

**示例：**
```javascript
var obj = {}
Object.defineProperty(o, 'a', { value : 1 })
// 等同于
Object.defineProperty(o, 'a', {
  value : 1,
  writable : false,
  configurable : false,
  enumerable : false
})

Object.defineProperty(obj, prop, descriptor)
```

**描述：**
- 在对象 obj 上以属性描述符 descriptor 定义或修改属性 prop，返回操作后的对象（与原对象相同内存地址）。
- 属性描述符 分为 **数据描述符** 和 **存取描述符**。
- 数据描述符：configurable、enumerable、writable、value。
- 存取描述符：configurable、enumerable、get、set。
- configurable：为 true 时，该属性的属性描述符才能改变，该属性才能删除。默认 **false** 。（例外：writable属性可由 true 改为 false ）
- enumerable：为 true 时，该属性才可枚举。默认 **false** 。
- writable：为 true 时，该属性才可被赋值运算符改变。默认 **false** 。
- value：属性对应的值。默认 **undefined** 。
- get：获取属性值时调用该函数。get 函数的返回值为该属性值。默认 **undefined**。
- set：修改属性值时调用该函数。set 函数接受1个参数，该参数为给该属性赋的新值。默认 **undefined**。

**参数：**
- obj：定义属性的目标对象。
- prop：要定义或修改的属性名。
- descriptor：属性描述符。

**返回：** **Object**


## defineProperties

**示例：**
```javascript
var obj = {}
Object.defineProperties(obj, {
  'a': {
    value: 1,
    writable: true
  },
  'b': {
    get: function(){return 233},
    set: function(newValue){this.a = newValue + 1}
  }
})
console.log(obj.a)  // 1
console.log(obj.b)  // 233
obj.b = 666
console.log(obj.a)  // 667

Object.defineProperty(obj, propObj)
```

**描述：**
- 在对象对象上定义或修改属性，返回操作后的对象（与原对象相同内存地址）。
- 属性描述符 分为 **数据描述符** 和 **存取描述符**。
- 数据描述符：configurable、enumerable、writable、value。
- 存取描述符：configurable、enumerable、get、set。
- configurable：为 true 时，该属性的属性描述符才能改变，该属性才能删除。默认 **false** 。（例外：writable属性可由 true 改为 false ）
- enumerable：为 true 时，该属性才可枚举。默认 **false** 。
- writable：为 true 时，该属性才可被赋值运算符改变。默认 **false** 。
- value：属性对应的值。默认 **undefined** 。
- get：获取属性值时调用该函数。get 函数的返回值为该属性值。默认 **undefined**。
- set：修改属性值时调用该函数。set 函数接受1个参数，该参数为给该属性赋的新值。默认 **undefined**。

**参数：**
- obj：定义属性的目标对象。
- propObj：对象，由 属性名 为键名， 属性描述符对象 为键值组成。

**返回：** **Object**


## preventExtensions

**示例：**
```javascript
var obj = { a:1 }

obj.b = 2
console.log(obj)  // {a:1, b:2}

Object.preventExtensions(obj)
obj.c = 3
console.log(obj)  // {a:1, b:2}

Object.preventExtensions(obj)
```

**描述：**
- 使对象变得不可扩展。返回不可扩展后的对象（与原对象相同内存地址）。
- 可扩展：可添加新属性。
- 再次添加新属性会 静默失败 或 抛错(严格模式)。
- preventExtensions、seal、freeze 方法皆可使对象变为不可扩展。


**参数：**
- obj：需要变得不可扩展的对象。

**返回：** **Object**


## isExtensible

**示例：**
```javascript
var obj = {}
Object.isExtensible(obj)  // true

Object.preventExtensions(obj)
Object.isExtensible(obj)  // false

Object.isExtensible(obj)
```

**描述：**
- 判断对象是否可扩展。
- 可扩展：可添加新属性。
- preventExtensions、seal、freeze 方法皆可使对象变为不可扩展。


**参数：**
- obj：被检测的对象。

**返回：** **Boolean**

## seal

**示例：**
```javascript
var obj = { a:1 }

obj.b = 2
console.log(obj)  // {a:1, b:2}

Object.seal(obj)
obj.c = 3
console.log(obj)  // {a:1, b:2}
delete(obj.a)
console.log(obj)  // {a:1, b:2}

Object.seal(obj)
```

**描述：**
- 使对象变得密封。可配置性(configurable)变为 false ，返回密封后的对象（与原对象相同内存地址）。
- 密封：不可添加、不可删除。
- 密封后再次添加新属性或删除已有属性会 静默失败 或 抛错(严格模式)。
- seal、freeze 方法皆可使对象变为密封。


**参数：**
- obj：需要密封的对象。

**返回：** **Object**


## isSealed

**示例：**
```javascript
var obj = {}
Object.isSealed(obj)  // false

Object.seal(obj)
Object.isSealed(obj)  // true

Object.isSealed(obj)
```

**描述：**
- 判断对象是否密封。
- 密封：不可添加、不可删除。
- seal、freeze 方法皆可使对象变为密封。


**参数：**
- obj：被检测的对象。

**返回：** **Boolean**


## freeze

**示例：**
```javascript
var obj = { a:1 }

obj.b = 2
console.log(obj)  // {a:1, b:2}

Object.freeze(obj)
obj.c = 3
console.log(obj)  // {a:1, b:2}
delete(obj.a)
console.log(obj)  // {a:1, b:2}
obj.a = 2333
console.log(obj)  // {a:1, b:2}

Object.freeze(obj)
```

**描述：**
- 使对象冻结。返回冻结后的对象（与原对象相同内存地址）。
- 冻结：不可添加、不可删除、不可修改。
- 冻结后再次添加新属性或删除/修改已有属性会 静默失败 或 抛错(严格模式)。
- 冻结对象中的非冻结对象仍可以被修改。


**参数：**
- obj：需要冻结的对象。

**返回：** **Object**


## isFrozen

**示例：**
```javascript
var obj = {}
Object.isFrozen(obj)  // false

Object.freeze(obj)
Object.isFrozen(obj)  // true

Object.isFrozen(obj)
```

**描述：**
- 判断对象是否冻结。
- 冻结：不可添加、不可删除、不可修改。

**参数：**
- obj：被检测的对象。

**返回：** **Boolean**


## getPrototypeOf

## setPrototypeOf(ES6)

## assign(ES6)

## is(ES6)

**示例：**
```javascript
var obj = { a: 1 }
Object.is(obj, obj)  // true

Object.is([], [])  // false
Object.is(null, null)  // true
Object.is(0, -0)  // false
Object.is(NaN, NaN)  // true

Object.is(value1, value2)
```

**描述：**
- 判断两个值是否是相同的值。
- === 严格相等的判断：±0所有情况视为相等，两个 NaN 视为不等。
- 符合相同的情况：
  - 两个值都是 +0，-0，NaN。
  - 两个值都是 undefined，null，true/false，除开 0 和 NaN 的其它相同数字，相同字符串。
  - 两个值指向同一对象（内存地址相同）。


**参数：**
- value1：需要比较的第一个值。
- value2：需要比较的第二个值。

**返回：** **Boolean**



## getOwnPropertyDescriptor

## getOwnPropertyNames

## getOwnPropertySymbols(ES6)

## getOwnPropertyDescriptors(ES8)


## entries(ES8)

**示例：**
```javascript
var obj = { zz: '1', b: 2, a: 1}
Object.entries(obj)  // [['zz',1], ['b',2], ['a',1]]
```

**描述：**
- 返回对象自身所有可枚举属性的 键值对数组 组成的 数组。

**参数：**
- obj：目标对象。

**返回：** **Array**


## values(ES8)

**示例：**
```javascript
var obj = { zz: '1', b: 2, a: 1}
Object.values(obj)  // ['1', 2, 1]
```

**描述：**
- 返回对象自身所有可枚举属性的值组成的数组。

**参数：**
- obj：目标对象。

**返回：** **Array**


```javascript


Object.getOwnPropertyDescriptor(obj,key);     //IE8+；返回obj对象中key属性的属性描述符。{enumerable:true,configurable:true,writable:true,value:”static”/get(set):..}
Object.getOwnPropertyDescriptors(obj)          //返回obj对象所有属性的属性描述符。
Object.getPrototypeOf(obj);                            //返回对象的[[prototype]]值。（相当于obj.__proto__）
Object.setPrototypeOf(obj,prototype);              //IE11+；设置对象的[[Prototype]]值。
Object.getOwnPropertyNames(obj);                 //返回obj对象自身属性的属性键组成的数组 。（含不可枚举）

//以上默认IE9+
Object.getOwnPropertySymbols(obj)               //获取对象自身的所有symbol属性键，返回属性键组成的数组。

Object.assign(target, obj1,obj2...)     //浅拷贝，将所有可枚举属性值从一个/多个源对象复制到目标对象。无法复制访问器属性（get/set），访问器属性最终会变为数据属性。

```
