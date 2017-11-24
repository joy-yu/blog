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

**返回：** **String**


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




## isExtensible

## isFrozen

## isSealed

## preventExtensions

## seal

## freeze


## defineProperty

## defineProperties


## getPrototypeOf

## setPrototypeOf(ES6)

## assign(ES6)

## is(ES6)


## getOwnPropertyDescriptor

## getOwnPropertyNames

## getOwnPropertySymbols(ES6)

## getOwnPropertyDescriptors(ES8)


## entries(ES8)

## values(ES8)


```javascript

var obj = {a:1,b:2,get c(){return 6;}};

Object.preventExtensions(obj);    //对象变得不可扩展，不能添加新的属性。反过来不能再变得可扩展。
Object.seal(obj);                           //被密封的对象只能修改已有属性的值。禁止扩展，并且configurable属性改为false。
Object.freeze(obj);                  //被冻结的对象永远不可变。密封，并且writable改为false。但是！冻结对象中的非冻结对象可以被修改。
Object.isExtensible();              //判断是否可扩展。可扩展：可添加新属性。
Object.isSealed();                    //判断是否密封。密封：不可扩展，不可配置。
Object.isFrozen();                    //判断是否冻结。冻结：所有属性不可配置，不可扩展，数据属性不可写。
Object.defineProperty(obj,"key",{enumerable:true,configurable:true,writable:true,value:"static"});         //属性默认为false。writable不可修改，configurable不可删除，不可重新配置属性描述符（例外：writable由true改为false），enumerable不可枚举。设置get和set时忽略value和writable。
Object.defineProperties(obj,{key1:{writable:true,value:"static1"},key2:{writable:true,value:"static2"}});
Object.getOwnPropertyDescriptor(obj,key);     //IE8+；返回obj对象中key属性的属性描述符。{enumerable:true,configurable:true,writable:true,value:”static”/get(set):..}
Object.getOwnPropertyDescriptors(obj)          //返回obj对象所有属性的属性描述符。
Object.getPrototypeOf(obj);                            //返回对象的[[prototype]]值。（相当于obj.__proto__）
Object.setPrototypeOf(obj,prototype);              //IE11+；设置对象的[[Prototype]]值。
Object.getOwnPropertyNames(obj);                 //返回obj对象自身属性的属性键组成的数组 。（含不可枚举）

//以上默认IE9+
Object.getOwnPropertySymbols(obj)               //获取对象自身的所有symbol属性键，返回属性键组成的数组。

Object.assign(target, obj1,obj2...)     //浅拷贝，将所有可枚举属性值从一个/多个源对象复制到目标对象。无法复制访问器属性（get/set），访问器属性最终会变为数据属性。
Object.is(value1, value2);          //返回一个布尔值，表明传入的两个值是否是同一个值。值都是 undefined/null/true/false/相同字符串/相同数字含NaN和±0/指向同一对象。
