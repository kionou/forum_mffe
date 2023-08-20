<template>
    <div>
        <Navbar />
        <div class="app">
        <RouterView />
        </div>
        
            <Footer />
      
    </div>
</template>

<script>
import Navbar from '../../components/loyout/navbar.vue';
import Footer from '../../components/loyout/footer.vue';
export default {
    name: 'ForumMffeLoyout',
    components:{Navbar ,  Footer},

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

.app{

background-color: var(--bg);
font-family: 'Open Sans', sans-serif; 
font-size: 14px;


}

</style>