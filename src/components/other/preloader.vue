<template>
    <div class="bloc-modale"  v-if="preloaderActive" data-aos="zoom-out">   
    <div class="overlay" ></div>
    <span class="loader"></span>
    </div>
</template>

<script>
export default {
    name: 'DNPMECLPreloader',
    data() {return { preloaderActive: false, };},
mounted() { this.preloaderActive = true;},
methods: {},
};
</script>

<style lang="css" scoped>
body.preloader-active {
  overflow: hidden;
}

.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 10px;
  overflow: hidden;
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.loader {
  width: 100px;
  height:100px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: var(--orange) var(--orange) transparent var(--orange);
  box-sizing: border-box;
  animation: rotation 1.5s linear infinite;
}
.loader::after,.loader::before {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px solid;
  border-color: transparent transparent var(--blanc) var(--blanc);
  width: calc(100px - 15px);
  height: calc(100px - 15px);
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotationBack 0.7s linear infinite;
  transform-origin: center center;
}
.loader::before {
  width: calc(100px - 30px);
  height: calc(100px - 30px);
  border-color: var(--vert) var(--vert) transparent transparent;
  animation: rotation 2s linear infinite;
}    
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>