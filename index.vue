<template>
    <div class="swiper-tab-wrapper"
        :class="[(slidable || animate) ? 'swiper-tab-animate' : '', wrapperCls]">
        <div class="swiper-tab-inner" ref="slot">
            <slot></slot>
            <div v-if="closeBtnText" :class="closeBtnCls">
                <a @click="$emit('close')">{{closeBtnText}}</a>
            <div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import is from "./util";

export default {
    name: "SwiperTab",
    data(){
        return {
            bus: new Vue(),
            grandchildren: [],
            animating: false,
            width: 0,
            slideToIndex: 0,
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
            default: 0.5
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
        }
    },
    watch: {
        value(newVal){
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
            this.$el.style.opacity = 1;
            this.width = this.$el.clientWidth;
            this.slideToIndex = this.value;
            this.$children.forEach(child => this.grandchildren.push(...child.$children));
        },
        initEvent(){
            this.$el.addEventListener("webkitTransitionEnd", (e) => {
                if(e.target !== this.$el) return;
                if (this.show) {
                    console.log("open")
                    this.$emit("afterOpen");
                } else {
                    console.log("close")
                    this.$el.style.display = "none";
                    this.$emit("afterClose")
                }
            })
        },
        initBus(){ //初始化中间联系的纽带
            let { bus } = this;
            bus.$on("switchTab", this.switchTab.bind(this));
            bus.$on("animated", () => {this.animating = false});
            bus.$on("slideToIndex", (index) => {
                if(this.slideToIndex != index) this.slideToIndex = index;
            });
        },
        switchTab(index){
            if (index < 0 || index == this.grandchildren.length) return;
            if (this.slidable) {
                if (this.animating) return;
                this.animating = true;
            }
            
            console.log(`----切换到第${index}----`)
            this.$emit("input", index)
        },
       
        
    },
    created(){
        this.initBus();
    },
    mounted(){
        this.$nextTick(() => {
            this.initProcess();
        })
        this.initEvent();
    }
}
</script>

<style lang="less">
@import "./index.less";
</style>

