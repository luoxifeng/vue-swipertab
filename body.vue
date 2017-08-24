<template>
    <div class="swiper-tab-body" :style="bodyStyle" ref="body" 
        @touchstart="onSlideSatrt" 
        @touchmove="onSlideMove" 
        @touchend="onSlideEnd">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "SwiperTabBody",
    data(){
        return {
            startTime: 0,
            // slowOn: false,//降速标记
            startX: 0,
            startY: 0,
            tempX: 0,
            tempY: 0,
            // direction: 1,//滑动方向1向左，-1向右
        }
    },
    props: {

    },
    computed: {
        childrenCount(){
            return this.$children.length;
        },
        direction(){
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
        index(){
            return this.$parent.value;
        },
        distance(){
            return this.$parent.distance;
        },
        translateX(){
            return `translateX(-${this.index*this.width}px)`;
        },
        transition(){
            return `transform ${this.speed}ms ease-in-out`
        },
        isCanNotSwitch(){
            return [
                [this.index == 0 , this.direction == -1].every(t => t),
                [this.index == this.childrenCount - 1 , this.direction == 1].every(t => t)
            ].some(t => t);
        },
        bodyStyle(){
            let style = {},
                parent = this.$parent,
                count = this.$children.length || 1;
            if (parent.slidable) {
                style["width"] = `${this.width*count}px`;
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
        tempX(newVal, oldVal){

        }
    },
    methods: {
        addEventListener(){//动画结束事件监听
            this.$el.addEventListener("webkitTransitionEnd", () => {
                console.log("----动画结束----")
                this.$parent.bus.$emit("animated");
            })
        },
        onSlideSatrt(e){
            if (!this.slidable) return;
            if (this.animating) return;
            this.startTime = e.timeStamp;
            console.log("---滑动开始---")
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
            let offset = touch.clientX - this.tempX;//水平偏移量
            this.tempX = touch.clientX;
            if(this.isCanNotSwitch) slow = 0.5;//到边界的时候，减速
            /translateX\((.+?)px\)/.test(this.$el.style.transform);
            style.transform = `translateX(${+RegExp.$1 + offset*slow}px)`;
            style.transition = '';
        },
        onSlideEnd(e){
            if (!this.slidable) return;
            if (this.animating) return;
            console.log("---滑动结束---")
            let switchTag = false;//默认不滑动
            let style = this.$el.style;
            let touch = e.changedTouches[0];
            let offsetX = touch.clientX - this.startX;
            let offsetY = touch.clientY - this.startY;
            if (Math.abs(offsetY) > Math.abs(offsetX)) return;//竖直方向
            if (this.isCanNotSwitch) {
                switchTag = false;
            } else if (Math.abs(offsetX/this.width) >= this.distance) {//水平滑动超过一定位置
                switchTag = true;
            } else if (Math.abs(offsetX/(e.timeStamp - this.startTime)) > this.minSpeed){//速度很快
                switchTag = true;
            }
            
            style.transition = this.transition;
            if (switchTag) {
                this.bus.$emit("switchTab", this.index + this.direction)
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

