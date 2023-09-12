<template>
    <div
      class="card"  >
      <div class="content">
        <div class="texte">
          <div class="total">
            <span>02</span>
        </div>
        <div class="name">
            Utilisateurs
        </div>
        </div>   
        <div class="icon">
          <i class='bx bxs-user'></i>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    name: "OverlyCard",
    data() {
      return {
      
      
      };
    },
    mounted() {
   
    },
   
  };
  </script>
  
  <style scoped>
  .card {
    position: relative;
    width: 215px;
    height: 120px;
    cursor: pointer;
    /* border: 1px solid red; */
    border-radius: 5px;
    padding: 10px;
    margin-right: 15px;
    background-color: #1abc9c;
    color: var(--blanc);
  }

  .card .content {
   display: flex;
   height: 100%;
    width: 100%;
    flex-direction: row;
    /* font-size: 20px; */
   
    justify-content: space-around;
    align-items: center;
  }
  .content .texte{
    height: 100%;
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    z-index: 10;
  
  }
  .content .icon{
    display: block;
    padding-top: 26px;
    width: 80px;
    right: 40px;
    bottom: 9px;
  }
  .content .icon i{
    color: rgba(0,0,0,.05);
    font-size: 85px;
    line-height: 65px;
  
  }


  </style>
  