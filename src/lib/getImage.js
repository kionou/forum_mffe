export const getImage = (path) => {
    try{
    console.log('eee',`http://localhost:5000/${path}`);
      return require('http://localhost:5000/' + path)
    } catch (e){
      // return require('@/assets/images/')
    }
  }


  