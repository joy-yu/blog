---
title: 《CSS 揭秘》读书笔记
tags: CSS
categories: CSS
toc: true
date: 2018-10-28 00:30:33
description: 《CSS 揭秘》的读书笔记。
---

# 《CSS 揭秘》读书笔记

笔记和思考有一定个人向，如有错误敬请指出，笔记的目录会尽量和书本目录保持一致。

Let's go！

## 关于本书

### 浏览器支持与回退机制

浏览器兼容性查询网站：
[Can I Use](https://caniuse.com)
[WebPlatform.org](http://webplatform.org)
[Mozilla Developer Network](https://developer.mozilla.org)
[维基百科 浏览器引擎 CSS 支持比较](<https://en.wikipedia.org/wiki/Comparison_of_browser_engines_(CSS_support)>)

一些早期浏览器可能需要加上前缀才能支持某些特性。不同浏览器不同的特性支持给开发带来很多麻烦，不过依托 [Autoprefixer](https://github.com/postcss/autoprefixer)，我们现在不需要再担心这些了。

```less
background: -moz-linear-gradient(90deg, #ff0, #f00);
background: -o-linear-gradient(90deg, #ff0, #f00);
background: -webkit-linear-gradient(90deg, #ff0, #f00);
background: linear-gradient(90deg, #ff0, #f00);
```

回退机制：可以确保网站不会在低版本浏览器挂掉，只是看起来没那么炫。

```less
/* 添加实色，取渐变色中间色值 */
background: rgb(255, 128, 0);
background: linear-gradient(90deg, #ff0, #f00);
```

## 引言

### Web 标准：是敌还是友

#### 标准的制定过程

1. 编辑草案（ED）
2. 首个公开草案（FPWD）
3. 工作草案（WD）
4. 候选推荐草案（CR）
5. 提名推荐草案（PR）
6. 正式推荐草案（REC）

### CSS 编码技巧

#### 尽量减少重复代码

- 尽量减少重复代码。
- 代码可维护性的最大要素：**尽量减少改动时要编辑的地方**。
- 当某些值互相依赖时，应该把它们相互关系用代码表达出来。

```less
font-size: 12px;
line-height: 2; /* 24px */
```

- **代码易维护**和**代码量少**有时不可兼得，需自行把控。

```less
border-width: 10px;
border-left-width: 0;
```

- **currentColor**：解析为 color 属性的值。是很多 CSS 属性的初始值（border-color/outline-color/text-shadow/box-shadow）

```less
.currentColor {
  border: 1px solid;
  color: red;
}
```

<div class="currentColor">红色边框！</div>

- **inherit**：继承。可用于任何 CSS 属性中，总是绑定到父元素的计算值（伪元素绑定至宿主元素）。

```less
.callout {
  position: relative;
  width: 100px;
  background: #eee;
  border: 1px solid #aaa;
  padding: 5px;
}
.callout::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 10px;
  padding: 5px;
  background: inherit;
  border: inherit;
  border-right: 0;
  border-bottom: 0;
  transform: translateY(-50%) rotate(45deg);
}
```

<div class="callout">小箭头的样式完美继承</div>

#### 相信你的眼睛，而不是数字

有时精准的尺度看起来不会那么精准，完美垂直居中的设计会感觉并不完全居中。这种视觉上的差距普遍存在，可以针对性调整。（垂直居中略向上偏移、文本容器上下内边距调小）

#### 关于响应式网页设计

**媒体查询**是实现响应式网页的常用方法，但不能滥用，应作为实现弹性布局的最后杀器使用（如不同大小视口下完全改变网站的布局形态）。

要尽最大努力实现**弹性可伸缩的布局，并在媒体查询的各个断点区间内指定相应的尺寸**。媒体查询的断点应根据设计自身来决定，而不是设备。

建议：

- 使用百分比长度取代固定长度，或使用视口单位（vw/vh/vmin/vmax）。
- 大分辨率下设置 max-width，以得到固定宽度。
- 给替换元素（img/video/iframe 等）设置 max-width: 100%。
- 背景图片想铺满容器而不管容器尺寸变化：background-size: cover。
- 行列式布局时，以视口宽度决定列的数量。
- 多列文本指定列宽 column-width 而不是列数，这样小屏幕可以自动显示单列布局。

#### 合理使用简写

老话：减少改动时要编辑的地方，减少重复代码。

展开属性和简写的配合。

// TODO:格式
```less
/* 以 ‘/’ 分隔position和size，是为了避免数值歧义 */
background: url(tr.png) no-repeat top right / 2em 2em, url(bt.png) no-repeat bottom right / 2em 2em,
  url(bl.png) no-repeat bottom left / 2em 2em;

background: url(tr.png) top right, url(bt.png) bottom right, url(bl.png) bottom left;
background-size: 2em 2em;
background-repeat: no-repeat;
```

## 背景与边框

### 半透明边框

background-clip 默认值为 border-box，即背景会被 border 外边沿裁切掉，设置为 padding-box 则从内边距外沿裁切。

```less
.translucent-border {
  border: 10px solid rgba(255, 0, 0, 0.5);
  background: #000;
  color: #fff;
  background-clip: padding-box;
}
```

<div class="translucent-border">半透明边框</div>

### 多重边框

#### box-shadow 方案

- 投影行为不会影响布局。
- 投影不会响应鼠标事件。

```less
/* box-shadow: x-offset y-offset blur spread color inset; */
.multiple-border-shadow {
  background: #9a0;
  box-shadow: 0 0 0 5px #655, 0 0 0 10px #f00, 0 2px 5px 10px rgba(0, 0, 0, 0.6);
}
```

<div class="multiple-border-shadow">box-shadow 多重边框</div>

#### outline 方案

- 只适用两层边框。
- outline 描边不贴合圆角。
- 可以控制描边类型、边距。

```less
.multiple-border-outline {
  background: #9a0;
  border: 5px solid #655;
  outline: 5px solid #f00;
}
```

<div class="multiple-border-outline">outline 双重边框</div>

### 灵活的背景定位

#### background-position 的扩展语法方案

扩展语法允许我们指定背景图片距离任意角的偏移量。(IE9+)

```less
padding: 10px;
background-position: right 10px bottom 10px;
```

#### background-origin 方案

有一种常见情况：背景图片偏移量与容器内边距一致。

background-origin 默认值 padding-box，这样边框才不会遮住图片。background-position 的 left/top 参考 background-origin 属性值而定。

```less
/* background-position 参照 content-box 而定，不用耦合内边距了 */
padding: 10px;
background-origin: content-box;
background-position: right bottom;
```

#### calc() 方案

```less
/* calc函数内部运算符两侧空白符不能少 */
background-position: calc(100% - 20px) calc(100% - 10px);
```

### 边框内圆角

结合 outline 和 box-shadow。

```less
.inner-rounding {
  width: 100px;
  padding: 10px;
  margin: 10px;
  background: #ceb591;
  border-radius: 10px;
  outline: 6px solid #655;
  box-shadow: 0 0 0 5px #655; /* 取圆角半径一半 */
}
```

<div class="inner-rounding">边框内圆角</div>

### 条纹背景

#### 解决方案

普通线性渐变

```less
.linear-gradient {
  width: 150px;
  height: 100px;
  background: linear-gradient(#fb3 20%, #58a 80%);
}
```

<div class="linear-gradient">普通线性渐变</div>

条纹效果

```less
.linear-gradient-cancel {
  width: 150px;
  height: 100px;
  background: linear-gradient(#fb3 50%, #58a 50%); /* 取消渐变效果 */
  background-size: 100% 3em; /* 设置条纹大小 */
  background-repeat: repeat; /* 默认就会重复平铺 */
}
```

<div class="linear-gradient-cancel">条纹效果</div>

条纹效果更好的写法

```less
.repeating-linear-gradient {
  width: 150px;
  height: 100px;
  background: repeating-linear-gradient(90deg, #fb3 0, #fb3 10px, #58a 10px, #58a 20px);
}
```

<div class="repeating-linear-gradient">条纹效果更好的写法</div>

改改角度就能得到斜向条纹

```less
.diagonal-stripe {
  width: 150px;
  height: 100px;
  background: repeating-linear-gradient(60deg, #fb3 0, #fb3 10px, #58a 10px, #58a 20px);
}
```

<div class="diagonal-stripe">斜向条纹</div>


### 复杂的背景图案

#### 网格

<style>
.currentColor {
  border: 1px solid;
  color: red;
}

.callout {
  position: relative;
  width: 100px;
  background: #eee;
  border: 1px solid #aaa;
  padding: 5px;
}
.callout::before {
  content: '';
  position: absolute;
  top: -1px; left: 10px;
  padding: 5px;
  background: inherit;
  border: inherit;
  border-right: 0;
  border-bottom: 0;
  transform: translateY(-50%) rotate(45deg);
}

.translucent-border {
  border: 10px solid rgba(255, 0, 0, .5);
  padding: 10px;
  background: #000;
  color: #fff;
  background-clip: padding-box;
}

.multiple-border-shadow {
  background: #9a0;
  box-shadow: 0 0 0 5px #655,
              0 0 0 10px #f00,
              0 2px 5px 10px rgba(0, 0, 0, .6);
}
.multiple-border-outline {
  background: #9a0;
  border: 5px solid #655;
  outline: 5px solid #f00;
}

.inner-rounding {
  width: 100px;
	padding: 10px;
	margin: 10px;
	background: #ceb591;
  border-radius: 10px;
  outline: 6px solid #655;
	box-shadow: 0 0 0 5px #655;
}

.linear-gradient {
  width: 150px;
  height: 100px;
  background: linear-gradient(#fb3 20%, #58a 80%);
}
.linear-gradient-cancel {
  width: 150px;
  height: 100px;
  background: linear-gradient(#fb3 50%, #58a 50%);
  background-size: 100% 3em;
  background-repeat: repeat;
}
.diagonal-stripe {
  width: 150px;
  height: 100px;
  background: repeating-linear-gradient(60deg, #fb3 0, #fb3 10px, #58a 10px, #58a 20px);
}
</style>
