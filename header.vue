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
            childWidth: 0
        }
    },
    props: {

    },
    computed: {
        index(){
            return this.$parent.value;
        },
        lineStyle(){
            let style = {};
            style["width"] = `${this.childWidth}px`;
            style["transform"] = `translateX(${this.index*this.childWidth}px)`;
            return style;
        },
        cursor(){
            return is.str(this.$parent) || this.$parent.cursor;
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
        }
    },
    mounted(){
        // this.setTabActive(this.$parent.value);
        this.childWidth = this.$children[0].$el.clientWidth;

        
    }
}
</script>

