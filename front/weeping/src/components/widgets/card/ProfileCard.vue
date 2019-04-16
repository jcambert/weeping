<template>
    <v-card>
        <v-img v-if="img" :src="img" height="390">
            <profile-card-head :name="name" ></profile-card-head>
        </v-img>
        <profile-card-head v-else :name="name" height="390" v-on:on-left="$emit('onLeft')" v-on:on-edit="$emit('onEdit')" v-on:on-more="$emit('onMore')"></profile-card-head>
    </v-card>
</template>


<script>
import ProfileCardHead from './ProfileCardHead.vue'
export default {
    components:{
        'profile-card-head':ProfileCardHead
    },
    props:{
        img:{
            type:String,
            default:null
        },
        name:{
            type:String,
            required:true
        }
    },
    data: () => ({
        
    }),
    methods: {
        handleClick: (e) => {
        
        }
    },
}
</script>

<style>

</style>
