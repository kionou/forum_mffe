export const getImage = (path) => {
    try{
    console.log('eee',`@/assets/${path}`);
      return require('../src/assets/' + path)
    } catch (e){
      // return require('@/assets/images/')
    }
  }


  