<template>
    <div>
        <swiper-tab slidable v-model="activeIndex">
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
        

     
    </div>
</template>

<script>
import SwiperTab, {SwiperTabHeader, SwiperTabBody, SwiperTabItem} from "./index.js";


export default {
    data(){
        return {
            activeIndex: 0
        }
    },
    props: {
        
    },
    methods: {

    },
    components: {
        SwiperTab,
        SwiperTabHeader,
        SwiperTabBody,
        SwiperTabItem,
    }
}
</script>

