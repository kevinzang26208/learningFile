<template>
    <div>
        <h1>
            我的一小步，人类一大步
        </h1>
        <div class="news-time">{{ getTime }}</div>
        <p class="art-body">
            阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，阿波罗登月计划，
        </p>  
    </div>

</template>

<script>
export default {
    data () {
        return {
            time : ''
        }
    },
    computed : {
        getTime : function () {
            var objDate = new Date();
            return `Year:${objDate.getFullYear()}.Month:${objDate.getMonth()}.Days:${objDate.getDate()}`;

        }
    }
}
</script>
