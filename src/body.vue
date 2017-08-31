<template>
    <div class="swiper-tab-body" :style="bodyStyle" ref="body"
        @touchstart="onSlideSatrt" 
        @touchmove="onSlideMove" 
        @touchend="onSlideEnd">
        <slot></slot>
    </div>
</template>

<script>
import { is } from "../util";

export default {
    name: "SwiperTabBody",
    data(){
        return {
            startTime: 0,
            startX: 0,
            startY: 0,
            tempX: 0,
            tempY: 0,
            moveX: 0
        }
    },
    props: {

    },
    computed: {
        direction(){//滑动方向 1向左，-1向右
            return this.tempX - this.startX > 0 ? -1 : 1;
        },
        animating(){
            return this.$parent.animating;
        },
        speed(){
            return ~~this.$parent.speed;
        },
        width(){
            return this.$parent.width;
        },
        bus(){
            return this.$parent.bus;
        },
        slidable(){
            return this.$parent.slidable;
        },
        currActive(){
            return this.$parent.value;
        },
        syncActive(){
            return this.$parent.syncActive;
        },
        distance(){
            return this.$parent.distance;
        },
        animateType(){
            let res = this.$parent.animateType;
            if (this.slidable) res = res || "ease-in-out";
            return res;
        },
        translateX(){
            return `translateX(-${this.currActive*this.width}px)`;
        },
        transition(){
            return `transform ${this.speed}ms ${this.animateType}`
        },
        isCanNotSwitch(){
            return [
                [this.currActive <= 0 , this.direction == -1].every(t => t),
                [this.currActive >= this.$children.length - 1 , this.direction == 1].every(t => t)
            ].some(t => t);
        },
        bodyStyle(){
            let style = {},
                parent = this.$parent,
                count = this.$children.length || 1;

            style["width"] = `${this.width*count}px`;
            if (this.animateType) {
                style["transform"] = this.translateX;
                style["transition"] = this.transition;
            }
            return style;
        },
        minSpeed(){
            return this.width/1000;
        }
    },
    watch: {
       
    },
    methods: {
        isBeyondDistance(touch){//超过自动滑动距离的时候，tab要变化active
            touch = touch || {clientX: this.tempx};
            return Math.abs(touch.clientX - this.startX) > this.width*this.distance;
        },
        addEventListener(){//动画结束事件监听
            this.$el.addEventListener("webkitTransitionEnd", (e) => {
                e.stopPropagation();
                this.bus.$emit("animated");
            })
        },
        onSlideSatrt(e){
            if (!this.slidable) return;
            if (this.animating) return;
            this.startTime = e.timeStamp;
            let touch = e.targetTouches[0];
            this.tempX = this.startX = touch.clientX;
            this.tempY = this.startY = touch.clientY;
        },
        onSlideMove(e){
            if (!this.slidable) return;
            if (this.animating) return;
            let slow = 1;
            let style = this.$el.style;
            let touch = e.targetTouches[0];
            let offsetX = touch.clientX - this.startX;
            let offsetY = touch.clientY - this.startY;
            if (Math.abs(offsetY) > Math.abs(offsetX)) return;//竖直方向

            //从开始移动到现在移动的距离
            this.moveX = touch.clientX - this.tempX;//水平偏移量
            this.tempX = touch.clientX;
            if (this.isCanNotSwitch) {//到边界的时候，减速
                slow = 0.5;
            } else {
                let next = this.isBeyondDistance(touch) ? this.direction : 0;
                this.bus.$emit("slideToIndex", this.currActive + next)
                this.bus.$emit("slideBody", {
                    status: "move",
                    moveX: touch.clientX - this.startX
                })
            }
            /translateX\((.+?)px\)/.test(this.$el.style.transform);
            style.transform = `translateX(${+RegExp.$1 + this.moveX*slow}px)`;
            style.transition = '';
        },
        onSlideEnd(e){
            if (!this.slidable) return;
            if (this.animating) return;
            this.bus.$emit("slideBody", {
                status: "end",
            })
            let switchTag = false;//默认不滑动
            let style = this.$el.style;
            let touch = e.changedTouches[0];
            let offsetX = touch.clientX - this.startX;
            if (this.isCanNotSwitch) {
                switchTag = false;
            } else if (Math.abs(offsetX/this.width) >= this.distance) {//水平滑动超过一定位置
                switchTag = true;
            } else if (Math.abs(offsetX/(e.timeStamp - this.startTime)) > this.minSpeed){//速度很快
                switchTag = true;
            }
            
            style.transition = this.transition;
            if (switchTag) {
                this.bus.$emit("switchTab", this.currActive + this.direction)
            } else { //不能划过去，需要恢复到原来位置
                style.transform = this.translateX;
            }
        }
    },
    created(){
    },
    mounted(){
        this.addEventListener();
    }
}
</script>

