<template>
    <div id="pageDashboard">
        <v-container grid-list-xl fluid>
            <v-flex lg4 sm12 xs12>
                <profile-card name="Jean-Christophe Ambert" img="/static/people/man/m1.jpg">
                </profile-card>
            </v-flex>    
        </v-container>
    </div>
</template>

<script>
import ProfileCard from '@/components/widgets/card/ProfileCard.vue'
export default {
    components:{
        'profile-card':ProfileCard
    }
}
</script>


