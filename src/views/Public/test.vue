<template>
  <head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
  <div class="container">
    <div class="cardre">
      
        <div class="image">
          <img src="https://unsplash.it/200/200">
        </div>

      <ul class="sci">
        <li style="--i:1">
          <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
        </li>
        <li style="--i:2">
          <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
        </li>
        <li style="--i:3">
          <a href="#"><i class="fa fa-github" aria-hidden="true"></i></a>
        </li>
    </ul>
    </div>




    <div class="card">
      <div class="content">
        <div class="img"><img src="https://unsplash.it/200/201"></div>
        <div class="cardContent">
          <h3>Someone Else<br><span>Grafic Designer</span></h3>
        </div>
      </div>
      <ul class="sci">
        <li style="--i:1">
          <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
        </li>
        <li style="--i:2">
          <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
        </li>
        <li style="--i:3">
          <a href="#"><i class="fa fa-github" aria-hidden="true"></i></a>
        </li>
    </ul>
    </div>
  </div>
</body>
</template>

<script>
export default {
  name: 'ForumMffeTest',

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
@keyframes colorful {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  outline: none;
  appearance: none;
  border-style: none;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1em;
}
.cardre {
  position: relative;
  width: 300px;
  height: 250px;
  margin: 1em;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  backdrop-filter: blur(40px);
  border: solid 1px yellow;
  background-clip: padding-box;
}

.cardre .image {
  /* position: relative; */
  width: 100%;
  height: 150px;


}
.cardre  .img img {
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.cardre .sci {
  position: absolute;
  bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.cardre .sci li {
  margin: 0 10px;
  opacity: 0;
  transition: 0.5s;
  transition-delay: calc(0.1s * var(--i));
}
.cardre .sci li a {
  font-size: 24px;
}
.cardre:hover .sci li {
  opacity: 1;
}

</style>