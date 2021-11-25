<center>
<h1>腾讯前端仿网易云开发日志</h1>
</center>

---------

<center>
赵桀
</center>

#### 11.22 ####

##### 结果 #####
* 完成了react+ts的项目初始化，删除不必要文件。
* 添加了axios，react-router-dom，axios，mobx，less等三方库以及相关配置。
* 初步移植之前写的网易云音乐首页。

##### 问题及解决 #####
* yarn eject报错，进行一次git add以及commit后能成功暴露配置。
* less-loader默认安装版本过高，会报错，降级安装。
* react-router进行了一次大版本更新，switch废用，改为routes，route里边的component改为element，NavLink的activeClassName不再生效，改用isActive来设置类名。

#### 11.23 ####

##### 结果 #####
* 简陋地完成了js向ts的转换，很多类型用的是any。
* 完成了404页面、

##### 问题及解决 #####
* 将项目整体由js改为ts时，之前设置的路径别名不起作用，于是在tsconfig的compilerOptions字段里设置paths。
* ts引入图片会报错，新建一个images.d.ts文件，声明图片类型，并在tsconfig的includes字段里引用该文件。
* axios的返回值类型不知道怎么定义，全弄成any了。
* antd的Carousel组件的auto属性报错，因为升级，这个属性名被改为autoplay了。
* useRef绑定ref时，那个类型也不知道是啥，全改成any了。
* Route中的exact属性报错，不是很清楚怎么回事，删掉好像也没出现问题，好像默认就是精确匹配了。
* JSX中的img标签的url属性不起作用，用模块的方式引入图片。

#### 11.24 ####

##### 结果 #####
* 做完了歌曲详情页。
* 优化了之前重构的ts代码。

##### 问题及解决 #####
* JSX里style设置不了伪元素，所以还是用span元素来代替。
* 伪元素好像没有伪类，不用就好。
* 字符串里的换行符在浏览器里不能被正常显示，用正则匹配筛选变成数组。

#### 11.25 ####

##### 结果 #####
* 评论功能做完
* 完成了Pagination的重新封装

##### 问题及解决 #####
* Antd的Pagination的样式难以更改，硬改了