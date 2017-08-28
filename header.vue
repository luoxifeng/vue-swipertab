<template>
    <div class="swiper-tab-header">
        <slot></slot>
        <div class="swiper-tab-line-wrapper" :style="lineStyle" v-if="cursor">
            <div class="swiper-tab-line-inner" :style="getColor('line')">
                <em :style="getColor('arrow')"></em>
            </div>
        </div>
    </div>
</template>

<script>
const preCls = "swiper-tab";
import is from "./util.js";
export default {
    name: "SwiperTabHeader",
    data(){
        return {
            childWidth: 0,
            cursorMoveX: 0,
            slideStatus: "none",
        }
    },
    props: {

    },
    computed: {
        distance(){
            return this.$parent.distance;
        },
        width(){
            return this.$parent.width;
        },
        bus(){
            return this.$parent.bus;
        },
        index(){
            return this.$parent.value;
        },
        cursor(){
            return is.str(this.$parent.cursor) || this.$parent.cursor;
        },
        synccursor(){
            return this.$parent.synccursor;
        },
        speed(){
            return this.$parent.speed;
        },
        animateType(){
            return this.$parent.animateType;
        },
        lineStyle(){
            let style = {"width": `${this.childWidth}px`};
            let moveX = this.synccursor ? this.cursorMoveX : 0;
            if (this.slideStatus === "end") {
                moveX = 0;
                if(this.animateType) {
                    style["transition"] = `transform ${this.speed}ms ${this.animateType}`;
                }
            }
            style["transform"] = `translateX(${this.index*this.childWidth + moveX}px)`;
            return style;
        },

    },
    watch: {
        index(){
            this.cursorMoveX = 0;
        }
    },
    methods: {
        setTabActive(index){ //设置tab的active
            this.$children[index].active = true;
        },
        getColor (type) {
            let { cursor } = this.$parent;
            let style = {};
            if(is.str(cursor) && cursor.trim()) {
                style[type == "line" ? "background" : "border-bottom-color"] = cursor.trim()
            }
            return style;
        },
        initBus(){
            this.bus.$on("slideBody", playload => {
                if((this.slideStatus = playload.status) === "move") {
                    this.cursorMoveX = -playload.moveX*this.childWidth/this.width;
                    this.slideStatus = playload.status;
                }
            })
        }
    },
    mounted(){
        this.initBus();
        this.childWidth = this.$children[0].$el.clientWidth;
        
    }
}
</script>

