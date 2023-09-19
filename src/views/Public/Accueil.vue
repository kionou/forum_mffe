<template>
    <div>
       <div class="banner">

       </div>
       <div class="content">

        <h2>BIENVENUE A e-FEMME</h2>
        <p>
          e-Femme est un forum en ligne dédié à la promotion des valeurs de la femme. 
          Dans un monde où les réseaux sociaux peuvent parfois être le terrain des influences négatives, 
          e-Femme se veut une oasis de positivité et d'inspiration.
        </p>
        <div class="content-card">
          <div class="card">
            <div class="image">
              <img src="@/assets/image/vision.jpg" alt="vision">
            </div>
            <h4>Notre vision</h4>
            <p> Créer un monde en ligne où chaque femme a la possibilité de s'exprimer librement. </p>
          </div>
          <div class="card">
            <div class="image">
              <img src="@/assets/image/mission1.jpg" alt="mission">
            </div>
            <h4>Nos missions</h4>
            <p>
              <!-- Fournir un forum virtuel sécurisé et bienveillant où les femmes peuvent se rassembler pour échanger des idées, 
              promouvoir des valeurs positives, et s'engager dans des discussions constructives -->
              Créer un espace virtuel pour les femmes afin qu'elles partagent des 
              idées positives et s'engagent dans des discussions constructives.
            </p>

          </div> 
         
          <div class="card">
            <div class="image">
              <img src="@/assets/image/goal.svg" alt="valeur">
            </div>
            <h4>Nos valeurs</h4>
            <p>Respect, inclusion, solidarité, égalité, bienveillance, diversité, responsabilité, éducation, intégrité.</p>
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