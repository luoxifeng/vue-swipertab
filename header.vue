<template>
    <div class="swiper-tab-header">
        <slot></slot>
    </div>
</template>

<script>
const preCls = "swiper-tab";

export default {
    name: "SwiperTabHeader",
    data(){
        return {

        }
    },
    props: {

    },
    computed: {
        index(){
            return this.$parent.value;
        }
    },
    methods: {
        setTabActive(index){ //设置tab的active
            this.$children[index].active = true;
        }
    },
    mounted(){
        this.setTabActive(this.$parent.value);
        
    }
}
</script>

