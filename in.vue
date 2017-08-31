<template>
    <div>
        <swiper-tab 
            slidable
            animate
            :distance="0.5" 
            :show="show" 
            @close="close" 
            closebtn
            cursor
            wrapperCls="kkk"
            :indicator="indicator"
            indicatorClick
            v-model="activeIndex">
            <swiper-tab-header>
                <swiper-tab-item>
                    tab1
                </swiper-tab-item>
                <swiper-tab-item>
                    tab2
                </swiper-tab-item>
                <swiper-tab-item>
                    tab3
                </swiper-tab-item>
                <swiper-tab-item>
                    tab4
                </swiper-tab-item>
            </swiper-tab-header>
            <swiper-tab-body>
                <swiper-tab-item>
                    tab1内容
                </swiper-tab-item>
                <swiper-tab-item>
                    tab2内容
                </swiper-tab-item>
                <swiper-tab-item>
                    tab3内容
                </swiper-tab-item>
                <swiper-tab-item>
                    tab4内容
                </swiper-tab-item>
            </swiper-tab-body> 
        </swiper-tab>
        
        <div @click="close">open</div>
     
    </div>
</template>

<script>
import {SwiperTab, SwiperTabHeader, SwiperTabBody, SwiperTabItem} from "./index.js";


export default {
    data(){
        return {
            activeIndex: 1,
            show: true,
            indicator:[1,2,3,4]
        }
    },
    props: {
        
    },
    methods: {
        close(){
            this.show = !this.show;
        }
    },
    components: {
        SwiperTab,
        SwiperTabHeader,
        SwiperTabBody,
        SwiperTabItem,
    }
}
</script>

