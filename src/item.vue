


<template>
    <div class="swiper-tab-item" 
        :class="[index == syncActive ? 'swiper-tab-item-active' : '']"
        :style="itemStyle"
        @click="clickSwitchTab">
        <div class="swiper-tab-item-mask" :style="maskStyle" ></div>
        <div class="swiper-tab-item-inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import is from "../util";

export default {
    name: "SwiperTabItem",
    data(){
        return {
            bus: {},
            grandpa: {},//祖先
            index: 0,
            parentName: ""
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
        clickSwitchTab(){
            if (this.parentName === "SwiperTabBody") return;
            if (this.index == this.currActive) return;
            this.bus.$emit("switchTab", this.index);
        }
    },
    mounted(){
    }
}
</script>


