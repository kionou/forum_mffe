<template>
    <div class="container">
        <div class="container-card">
            <Card v-for="card in 4" :key="card.id"/>
        </div>

    </div>
</template>

<script>
import Card from '@/components/Admin/cards.vue';
export default {
    name: 'ViewAccueil',
    components:{
        Card
    },

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>
.container{
/* border: 1px solid red; */
width: 100%;
/* position: absolute; */
top: 0;
/* height: 100vh; */

}
.container-card{
/* border: 1px solid blue; */
  display: flex;
  grid-gap: 8px;
  padding: 10px;
    flex-wrap: wrap;
    justify-content: center;

}

</style>