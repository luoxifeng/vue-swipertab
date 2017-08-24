<template>
    <div>
        <swiper-tab slidable :distance="0.5" :show="show" @close="dd" animate closebtn v-model="activeIndex">
            <swiper-tab-header>
                <swiper-tab-item>
                    11
                </swiper-tab-item>
                <swiper-tab-item>
                    22
                </swiper-tab-item>
                <swiper-tab-item>
                    33
                </swiper-tab-item>
                <swiper-tab-item>
                    44
                </swiper-tab-item>
            </swiper-tab-header>
            <swiper-tab-body>
                <swiper-tab-item>
                    11111
                </swiper-tab-item>
                <swiper-tab-item>
                    222222
                </swiper-tab-item>
                <swiper-tab-item>
                    333333
                </swiper-tab-item>
                <swiper-tab-item>
                    444444
                </swiper-tab-item>
            </swiper-tab-body> 
        </swiper-tab>
        
        <div @click="dd">dsgffdhgfdjhgfjfh</div>
     
    </div>
</template>

<script>
import {SwiperTab, SwiperTabHeader, SwiperTabBody, SwiperTabItem} from "./index.js";


export default {
    data(){
        return {
            activeIndex: 0,
            show: true
        }
    },
    props: {
        
    },
    methods: {
        dd(){
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

