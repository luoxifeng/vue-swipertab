<template>
    <div class="swiper-tab-wrapper"
        :class="[(slidable || animateType) ? 'swiper-tab-animate' : '', wrapperCls]">
        <div class="swiper-tab-inner" ref="slot">
            <slot></slot>
            <div class="swiper-tab-oper">
                <div v-if="indicator" class="swiper-tab-indicator swiper-tab-oper-item">
                    <div v-if="indicator" class="swiper-tab-indicator-inner">
                        <a v-for="(text, ind) in indicatorText" :key="ind"
                            class="swiper-tab-indicator-item"
                            :class="indicatorClass(ind)"
                            :style="indicatorStyle"
                            @click="clickSwitchTab(ind)">{{text}}</a>
                    </div>
                </div>
                <div v-if="closeBtnText" :class="closeBtnCls" class="swiper-tab-oper-item">
                    <a @click="$emit('close')">{{closeBtnText}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { is, EventEmitter } from "../util";

export default {
    name: "SwiperTab",
    data(){
        return {
            bus: new EventEmitter(),
            header: {},
            body: {},
            headerSons:[],
            bodySons: [],
            grandson: [],
            animating: false,
            width: 0,
            slideToIndex: 0,
            indicatorText: [],
            prevActive: 0
        }
    },
    props: {
        wrapperCls: {
            type: String,
            default: ""
        },
        show: {
            type: Boolean,
            default: true
        },
        slidable: { //是否可滑动
            type: Boolean,
            default: false
        },
        synctab: {//tab切是否跟随内容滑动实时同步active
            type: Boolean,
            default: true
        },
        animate: { //是否启动动画
            type: [Boolean, String],
            default: false
        },
        value: { //当前选中的
            type: Number,
            default: 0
        },
        speed: {
            type: [String, Number],
            default: 300
        },
        distance: {
            type: [String, Number],
            default: 0.5,
            validator(val){
                return val > 0 && val < 1;
            }
        },
        closebtn: {
            type: [Boolean, String],
            default: false
        },
        cursor: {
            type: [Boolean, String],
            default: false
        },
        synccursor: {
            type: Boolean,
            default: true
        },
        indicator: {
            type: [Boolean, Array],
            default: false,
        },
        indicatorClick: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        closeBtnText(){
            let text = "";
            if(is.str(this.closebtn) && this.closebtn.trim()) {
                text = this.closebtn.trim();
            } else if(is.bool(this.closebtn) && !this.closebtn) {
            } else {
                text = "×";
            }
            return text;
        },
        closeBtnCls(){
            let cls = 'swiper-tab-close-btn ';
            if (is.bool(this.closebtn) || (is.str(this.closebtn) && !this.closebtn.trim())) {
                cls += "swiper-tab-close-btn-circle"
            } else {
                cls += "swiper-tab-close-btn-default"
            }
            return cls;
        },
        animateType(){
            let { animate } = this;
            let res = "ease-in-out";
            if (animate === false) {
                res = "";
            } else if (is.str(animate)){
                res = animate.trim() || res;
            }
            return res;
        },
        syncActive(){
            return  this.synctab ? this.slideToIndex : this.value;
        },
        indicatorStyle(){
            let style = {};
            if (this.animateType) {
                style["transition"] = `width ${this.speed}ms ${this.animateType}`;
            }
            return style;
        },
        
    },
    watch: {
        value(newVal, oldVal){
            this.prevActive = oldVal;
            this.slideToIndex = newVal;
        },
        show(newVal, oldVal){
            let { style } = this.$el;
            if(!this.animateType) {
                return style.display = newVal ? "block" : "none";
            }
            if(newVal) {
                style.display = "";
                this.$nextTick(() => {
                    style.opacity = 1;
                })
            } else {
                style.opacity = 0;
            }
            style["transition"] = `opacity ${this.speed}ms ${this.animateType}`
        }
    },
    methods: {
        initProcess(){
            this.prevActive = this.value;
            this.$el.style.opacity = 1;
            this.width = this.$el.clientWidth;
            this.slideToIndex = this.value;
            this.indicatorText = is.arr(this.indicator) ? this.indicator : Array.from({length: this.headerSons.length}).map(t => "");
        },
        initEvent(){
            this.$el.addEventListener("webkitTransitionEnd", (e) => {
                if(e.target !== this.$el) return;
                if (this.show) {
                    this.$emit("afterOpen");
                } else {
                    this.$el.style.display = "none";
                    this.$emit("afterClose")
                }
            })
        },
        initBus(){ //初始化中间联系的纽带
            let { bus } = this;
            bus.$on("switchTab", this.switchTab.bind(this));
            bus.$on("animated", () => {
                this.animating = false
                this.$emit("afterSwitch", {
                    curr: this.value,
                    prev: this.prevActive
                })
            });
            bus.$on("slideToIndex", (index) => {
                if(this.slideToIndex != index) {
                    this.$emit("beyondDistance", {
                        curr: this.value,
                        next: index
                    });
                    this.slideToIndex = index;
                }
                    
            });
        },
        switchTab(index){
            if (index < 0 || index == this.grandson.length) return;
            if (this.slidable) {
                if (this.animating) return;
                this.animating = true;
            }
            this.$emit("beforeSwitch", {
                curr: this.value,
                next: index
            })
            this.$emit("input", index)
        },
        initValidator(){//验证组件嵌套或者使用不正确的地方报错提示
            //验证组件内部必须有且只能有一个header,以及body
            let headers = this.$children.filter(t => t.$options.name === "SwiperTabHeader");
            let bodys = this.$children.filter(t => t.$options.name === "SwiperTabBody");
            if (headers.length != 1 || bodys.length != 1) 
                throw new Error(`the SwiperTab must have and only one SwiperTabHeader or SwiperTabBody as child`);

            this.header = headers[0];
            this.body = bodys[0];
            this.headerSons = this.header.$children;
            this.bodySons = this.body.$children;
            this.grandson = [...this.headerSons, ...this.bodySons];

            //验证item的个数必须是偶数
            if (this.grandson.length%2)
                throw new Error("the count of component SwiperTabItem must be a even");

            //验证header下面的item个数必须和body下面的item个数一致
            if (this.headerSons.length != this.bodySons.length)
                throw new Error("the count of component SwiperTabItem which belong to SwiperTabHeader ," +
                    "must be equal the count of component SwiperTabItem which belong to SwiperTabBody")

            //验证指示区域的个数是否等于tab的个数
            if (Array.isArray(this.indicator) && this.indicator.length != this.headerSons.length)
                throw new Error("the count of indicator must be equal the count of tab")

        },
        clickSwitchTab(index){
            if (!this.indicatorClick) return;
            if (this.value == index) return;
            this.bus.$emit("switchTab", index);
        },
        indicatorClass(index){
            let clses = [];
            clses.push(`swiper-tab-indicator-item-${is.arr(this.indicator) ? 'other' : 'default'}`);
            clses.push(index === this.syncActive ? 'swiper-tab-indicator-active' : '' );
            return clses;
        }
    },
    created(){
        this.initBus();
    },
    mounted(){
        this.initEvent();
        this.$nextTick(() => {
            this.initValidator();
            this.initProcess();
        })
        
    }
}
</script>

<style lang="less">
@import "./index.less";
</style>

