<template>
    <div class="swiper-tab-wrapper" :class="[slidable ? 'swiper-tab-slidable' : '']">
        <div class="swiper-tab-inner" ref="slot">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
export default {
    name: "SwiperTab",
    data(){
        return {
            bus: new Vue(),
            grandchildren: [],
            animating: false,
            width: 0
        }
    },
    props: {
        slidable: { //是否可滑动
            type: Boolean,
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
        }
    },
    methods: {
        initBus(){ //初始化中间联系的纽带
            let { bus } = this;
            bus.$on("switchTab", this.switchTab.bind(this))
            bus.$on("animated", () => {this.animating = false})
        },
        getGrandchildren(){//获取所有孙子组件
            this.$children.forEach(child => this.grandchildren.push(...child.$children))
        },
        switchTab(index){
            if (index < 0 || index == this.grandchildren.length) return;
            if (this.slidable) {
                if (this.animating) return;
                this.animating = true;
            }
            
            console.log(`----切换到第${index}----`)
            this.$emit("input", index)
        }
        
    },
    created(){
        this.initBus();
    },
    mounted(){
        this.width = this.$el.clientWidth;
        this.getGrandchildren();
        
    }
}
</script>

<style lang="less">
@import "./index.less";
</style>

