


<template>
    <div class="swiper-tab-item" 
        :class="[index == syncActive ? 'swiper-tab-item-active' : '']"
        :style="itemStyle"
        @mouseover="switchTab('hover')"
        @click="switchTab('click')"
        >
        <div class="swiper-tab-item-mask" :style="maskStyle" ></div>
        <div class="swiper-tab-item-inner" 
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { is } from "../util";

export default {
    name: "SwiperTabItem",
    data(){
        return {
            bus: {},
            grandpa: {},//祖先
            index: 0,
            parentName: "",
            startX: 0,
            startY: 0,
            direction: ""
        }
    },
    props: {
        
    },
    computed: {
        currActive(){
            return this.$parent.currActive;
        },
        syncActive(){
            return  this.$parent.syncActive;
        },
        animateType(){
            return this.$parent.animateType;
        },
        speed(){
            return this.$parent.speed;
        },
        hoverSwitch(){
            return this.$parent.hoverSwitch;
        },
        maskStyle(){
            let style = {};
             if (this.animateType) {
                style["transition"] = `opacity ${this.speed}ms ${this.animateType}`;
            }
            return style;
        },
        itemStyle(){
            let style = {};
             if (this.animateType) {
                style["transition"] = `color ${this.speed}ms ${this.animateType}`;
            }
            return style;
        }
    },
    watch: {
       
    },
    created(){
        if (!this.varifyContainer()) return;
        this.buildRelation();
        this.setItemIndex()
    },
    methods: { 
        varifyContainer(){//验证外部容器
            if(["SwiperTabHeader", "SwiperTabBody"].includes(this.$parent.$options.name)) {
                return true;
            }
            throw new Error("the component SwiperTabItem must have a component SwiperTabHeader or SwiperTabBody as container");
        },
        buildRelation(){
            let parent = this.$parent;
            this.parentName = parent.$options.name;
            let { bus } = this.grandpa = parent.$parent;
            this.bus = bus;
        },
        setItemIndex(){
            this.index = this.$parent.$children.length - 1;
        },
        switchTab(type){
            if (this.parentName === "SwiperTabBody") return;
            if (this.hoverSwitch && type != "hover") return;
            if (!this.hoverSwitch && type == "hover") return;
            if (this.index == this.currActive) return;
            this.bus.$emit("switchTab", this.index);
        },
        touchstart(event){
            if (this.parentName === "SwiperTabHeader") return;
            let touch = event.touches[0] || event;
            let target = event.currentTarget;
            this.startX = touch.clientX;
            this.startY = touch.clientY;
            this.tempX = touch.clientX;
            this.tempY = touch.clientY;
            this.maxScroll = target.scrollHeight - target.clientHeight;
        },
        touchmove(event){
            if (this.parentName === "SwiperTabHeader") return;
            let touch = event.touches[0] || event;
            if (!this.direction) {
                if(Math.abs(touch.clientX - this.startX) > Math.abs(touch.clientY - this.startY)) {
                    this.$parent.itemDirection = this.direction = "horizontal";
                } else {
                    this.$parent.itemDirection = this.direction = "vertical";
                }
            }
            // alert(this.direction)
            //水平方向
            if (this.direction == "horizontal") {
                event.preventDefault();
                return;
            }
           
            //垂直方向
            let target = event.currentTarget
            let offsetY = touch.clientY - this.tempY;
            this.tempY = touch.clientY
            event.stopPropagation();
            if (offsetY > 0 && target.scrollTop == 0) {//上边缘
                event.preventDefault()
            } else if (offsetY < 0 && (target.scrollTop + 1 >= this.maxScroll)){//下边缘
                event.preventDefault()
            }
        },
        touchend(){
            if (this.parentName === "SwiperTabHeader") return;
            this.direction = "";
        },
    },
    mounted(){
    }
}
</script>


