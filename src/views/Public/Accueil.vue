<template>
    <div>
       <div class="banner">

       </div>
       <div class="content">

        <h2>description.titre</h2>
        <p>description.corps</p>
        <div class="content-card">
          <div class="card">
            <div class="image">
              <img src="@/assets/image/vision.jpg" alt="vision">
            </div>
            <h4>description.vision_titre</h4>
            <p>description.vision_corps </p>
          </div>
          <div class="card">
            <div class="image">
              <img src="@/assets/image/mission1.jpg" alt="mission">
            </div>
            <h4>description.mission_titre</h4>
            <p>description.mission_corps</p>

          </div> 
         
          <div class="card">
            <div class="image">
              <img src="@/assets/image/goal.svg" alt="valeur">
            </div>
            <h4>description.valeur_titre</h4>
            <p>description.valeur_corps</p>
          </div>
        </div>
      </div>
    </div>
    
</template>

<script>
export default {
    name: 'ForumMffeAccueil',

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
.banner{
width: 100%;
height: 60vh;
object-fit: cover;
filter: brightness(45%);
background-image: url('@/assets/image/about-2.jpg')  ;
background-repeat: no-repeat;
background-size: cover;
}

.content{
margin: 0 auto;
max-width: var(--max-width);
height: auto;
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 30px;
    color: var(--text-color);

}

.content h2{
  text-align: center;
    padding: 20px;
    font-weight: bold;
    font-size: 30px;
    line-height: 36px;
    text-transform: uppercase;
    color: var(--titre-color);
}
 .content p{
  padding-bottom: 5px;
  text-align: center;

}
 .content .content-card{
width: 100%;
height: auto;
display: flex;
justify-content: space-around;
text-align: justify;
margin-top: 10px;


}

 .content .content-card .card{
  width: 30%;
  height: 99%;
  margin: 0 10px;
      display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding:10px;
    border-radius: var(--raduis);
    box-shadow: var(--box-shadow);

}
.card h4{
  padding: 10px 0;

}
 .content .content-card .card .image{
  width: 90px;
  height: 90px;

}
 .content .content-card .card .image img{
  width: 100%;
  height: 100%;
}
@media (max-width: 768px) {
   .content .content-card{

flex-direction: column;
align-items: center;


}
 .content .content-card .card{

width: 100%;
max-width: 290px;
margin:  10px;


  }

}


</style>