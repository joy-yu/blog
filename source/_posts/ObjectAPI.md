---
title: JavaScript Object API全解析
date: 2017-11-22 20:10:01
tags: JavaScript
categories: JavaScript
description: JavaScript 对象API操作全解析~
toc: true
---


# 对象API

# Object构造器

Object.prototype 本身是一个object。


先把印象笔记里的扔上来。。。
```javascript
Object.getOwnPropertyNames(Object)
["length", "name", "arguments", "caller", "prototype", "assign", "create", "freeze", "isExtensible", "isFrozen", "isSealed", "keys", "preventExtensions", "seal", "defineProperty", "defineProperties", "getPrototypeOf", "setPrototypeOf", "getOwnPropertyDescriptor", "getOwnPropertyNames", "is", "getOwnPropertySymbols", "getOwnPropertyDescriptors", "entries”, “values”, "observe", "unobserve"]

var obj = {a:1,b:2,get c(){return 6;}};
Object.create(obj,{});               // 返回 以obj对象作为原型的新对象，{}内含一组属性与值作为新创建对象的属性，如{foo:{writable:true,configurable:true:value:"hello"}}
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
Object.keys(obj);                                             //返回对象可枚举的自身属性的属性键组成的数组。（for-in多了继承属性）
//以上默认IE9+
Object.getOwnPropertySymbols(obj)               //获取对象自身的所有symbol属性键，返回属性键组成的数组。
Object.observe(obj,function(changes){});         //chrome&opera可用。异步监视一个对象的修改，对象属性被修改时，运行回调函数。changes是数组，属性name是被修改的属性名，object是修改后的对象，type是对象做了何种修改，oldValue是对象修改前的值。
Object.unobserve();                                             //解除observe监听。不能是匿名函数。
Object.assign(target, obj1,obj2...)     //浅拷贝，将所有可枚举属性值从一个/多个源对象复制到目标对象。无法复制访问器属性（get/set），访问器属性最终会变为数据属性。
Object.is(value1, value2);          //返回一个布尔值，表明传入的两个值是否是同一个值。值都是 undefined/null/true/false/相同字符串/相同数字含NaN和±0/指向同一对象。



Object.getOwnPropertyNames(Object.prototype)
["constructor", "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "__defineGetter__", "__lookupGetter__", "__defineSetter__", "__lookupSetter__", "__proto__"]

obj.hasOwnProperty("b");          //判断obj对象的某个自身属性键是否存在。（忽略原型链）
obj.isPrototypeOf(o);                //判断obj对象是否在o的原型链（[[prototype]]）上！！区别于o instanceof obj;判断obj.prototype是否在o的原型链[[prototype]]上。
obj.propertyIsEnumerable("b");   //判断obj对象的自身属性键b是否可枚举。  for...in遍历对象及原型链的可枚举属性
obj.__proto__;                         //指向构造函数的prototype属性，也可以是null。相当于Object.getPrototypeOf(obj);
obj.__defineGetter__(prop,func);              //IE11+，非标准。将一个函数绑定在obj对象指定属性上，当属性被读取时调用函数。还是用get吧~
obj.__lookupGetter__(prop);               //非标准，访问obj对象上指定属性的get属性。还是用Object.getOwnPropertyDescriptor(obj,prop).get吧~;
obj.__defineSetter__(prop,func);obj.__lookupSetter__(prop);     //同上理。
obj.toString();               //返回"[object type]"，type表示对象类型。
obj.valueOf();               //方法返回指定对象的原始值。当遇到一种需要转换成一个原始值情况时候， JavaScript 会自动调用此函数。
```
