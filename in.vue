<template>
    <div>
        <swiper-tab 
            slidable
            animate
            :distance="0.5" 
            :show="show" 
            @close="close" 
            closebtn
            cursor
            wrapperCls="kkk"
            :indicator="indicator"
            indicatorSwitch
            v-model="activeIndex">
            <swiper-tab-header>
                <swiper-tab-item>
                    tab1
                </swiper-tab-item>
                <swiper-tab-item>
                    tab2
                </swiper-tab-item>
                <swiper-tab-item>
                    tab3
                </swiper-tab-item>
                <swiper-tab-item>
                    tab4
                </swiper-tab-item>
            </swiper-tab-header>
            <swiper-tab-body>
                <swiper-tab-item>
                    tab1内容
                </swiper-tab-item>
                <swiper-tab-item>
                   所有网页时间不限所有网页和文件站点内检索
搜索工具百度为您找到相关结果约3,420,000个
JavaScript Switch 语句
JS If...Else JS For switch 语句用于基于不同的条件来执行不同的动作。JavaScript Switch 语句 请使用 switch 语句来选择要执行的多个代码块之一。 语法 ...
www.w3school.com.cn/js...  - 百度快照
为您推荐：switch语句举例js switch case 多个值js while
JS switch 分支语句 - 冬_雪_飘 - 博客园

2016年9月11日 - JS switch 分支语句 描述:根据一个变量的不同取值,来执行不同的代码。 语法结构: switch(变量) { case 值1: 代码1; break; case 值2: 代码2; break; ...
www.cnblogs.com/yd0902...  - 百度快照
JavaScript switch 语句 | 菜鸟教程
JS 实例 JavaScript 实例 JavaScript 对象实例 JavaScript 浏览器对象实例 JavaScript...getDay(); switch (d) { case 0:x="今天是星期日"; break; case 1:x=...
www.runoob.com/js/js.....  - 百度快照
JS的switch的参数可以是字符串吗_百度知道
5个回答 - 提问时间: 2012年05月21日
[专业]答案:可以的,可以为任意类型。区别于c语言的只能使用int。 实例参考:var x="我";switch(x){case "你":alert("你");break;case "我":alert("我");...
zhidao.baidu.com/link?... 
js switch问题	1个回答	2015-09-20
javascript的switch用法	3个回答	2012-07-07
更多知道相关问题>>
js 中的switch表达式使用示例_javascript技巧_脚本之家
2013年9月18日 - switch 这种表达式在很多语言中都有,比如java, C等待, 使用switch比使用if else 来得方便,来得清晰,下面为大家详细介绍下其具体的使用,感兴趣的朋友可...
www.jb51.net/article/4...  - 百度快照
ECMAScript switch 语句
JS 实例和测验JS 实例 JS 对象实例 JS 测验JS 参考手册JavaScript 对象 HTML ...switch 语句是 if 语句的兄弟语句。 开发者可以用 switch 语句为表达式提供一系列...
www.w3school.com.cn/js...  - 百度快照
js中Switch 中default 的用法 - admincscsdn的博客 - CSDN博客
2016年12月18日 - js中Switch 中default 的用法 switch(n) { case 1: 执行代码块 1 break; case 2: 执行代码块 2 break; default: n 与 case 1 和 case 2 不同时执行...
blog.csdn.net/admincsc...  - 百度快照
关于JS的Switch语句理解 - liangwei389 - 博客园
2014年7月10日 - 关于JS的Switch语句理解 switch (fruit) { case "banana": // ... break; case "apple": // ... break; default: // ... } 上面代码根据变量fruit...
www.cnblogs.com/liangw...  - 百度快照
Js Switch语句 - M_xiaoxiao的专栏 - CSDN博客
2016年12月5日 - 这里,switch 语句用于字符串 sColor,声明 case 使用的是变量 BLUE、RED 和 GREEN,这在 ECMAScript 中是完全有效的。 上面的是js switch语句的一般用法...
blog.csdn.net/m_xiaoxi...  - 百度快照
js中使用Switch - 指间的徘徊 - 博客园
2016年9月23日 - js中使用Switch switch(n) { case 1: 执行代码块 1 break; case 2: 执行代码块 2 break; default: n 与 case 1 和 case 2 不同时执行的代码 } 随后...
www.cnblogs.com/farmer...  - 百度快照
相关搜索
js中switch case用法		js switch case后面		js switch case 多个
js switch表达式		js switch case语句		switch js的语法
JS switch语句		javascript switch语句		js switch case
                </swiper-tab-item>
                <swiper-tab-item>
                    tab3内容
                </swiper-tab-item>
                <swiper-tab-item>
                    tab4内容
                </swiper-tab-item>
            </swiper-tab-body> 
        </swiper-tab>
        
        <div @click="close">open</div>
     
    </div>
</template>

<script>
import {SwiperTab, SwiperTabHeader, SwiperTabBody, SwiperTabItem} from "./index.js";


export default {
    data(){
        return {
            activeIndex: 1,
            show: true,
            indicator:[1,2,3,4]
        }
    },
    props: {
        
    },
    methods: {
        close(){
            this.show = !this.show;
        }
    },
    components: {
        SwiperTab,
        SwiperTabHeader,
        SwiperTabBody,
        SwiperTabItem,
    }
}
</script>

<style lang="less">
.swiper-tab-body{
    .swiper-tab-item-inner{
        height: 400px;
        overflow-y: scroll;
    }
}
    
</style>

