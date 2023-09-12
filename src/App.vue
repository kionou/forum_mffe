<template>

  <RouterView />
</template>

<script >
 import AOS from "aos/dist/aos"
export default {
  name: 'App',
  created() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  },
  watch: {
    $route(to,) {
      const name = to.name.toLowerCase()
      const title = name === 'formation'
        ? `${name} (${to.href.split('/')[2].toLowerCase()})`
        : name
      document.title = `forum - ${title}`

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  mounted() {
    // this.$store.dispatch('fetchDataFromAPI')
    // this.$store.dispatch('fetchCountries')

   
  },
}



</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');

:root{
    --blanc: #fff;
    --bg: #f7fafb;
    --titre-color:#121c42;
    --text-color:#12315a;
    --bleu:#4879ef;
    --noir: #000;
    --vert:#6fae4d;
    --orange:#ff6604;
    --jaune:#fd0;
    --bggris1:#293949;
    --bggris2:#2e4051;
    --gris1:#8f939e;
    --gris2:#797979;
    --red:#ff0000;
    --titre: 35px;
    --paragraphe: 18px;
    --raduis:6px;
    --max-width: 1140px;
    --box-shadow:  0 2px 4px #d8e1e8;
    --shadow-small: 0 1px 2px rgba(36,57,141,.4);
   --shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
 
  }

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
      
}
body , html{

background-color: var(--bg);
font-family: 'Open Sans', sans-serif; 
font-size: 14px;

}
body p{
  font-size: var(--paragraphe);
}

</style>
