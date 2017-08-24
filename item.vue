


<template>
    <div class="swiper-tab-item" 
        :class="[index == $parent.index ? 'swiper-tab-item-active' : '']"
        @click="switchTab">
        <slot></slot>
    </div>
</template>

<script>
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
    watch: {
        active(newVal){
            if (this.$parent.$options.name){

            }
        }
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
            console.error("the component SwiperTabItem must have a component SwiperTabHeader or SwiperTabBody as container");
            return false;
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
        switchTab(){
            if (this.parentName === "SwiperTabBody") return;
            if (this.index == this.$parent.index) return;
            this.bus.$emit("switchTab", this.index);
        }
    },
    mounted(){
        
        //  this.$on("switchTab", ()=> {console.log(222)})
    }
}
</script>


