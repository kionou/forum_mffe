<template>
    <div style="padding: 10px ;">
        <div class="Chat">
            <!-- Left Side -->
      <div class="Left-side-chat">
        <div class="LogoSearch">
      <!-- <img src="@/assets/image/goal.svg" alt="" /> -->
      <div class="Search">
          <input type="text" placeholder="#Explore"/>
          <div class="s-icon">
            <i class="bi bi-search"></i>
          </div>
      </div>
    </div>
        <div class="Chat-container">
          <h2>Chats</h2>
          <div class="Chat-list">
            <div v-for="user in UsersOptions" :key="user.id" >
              <div class="follower conversation"   @click="selectUser(user._id)">
        
        <!-- <div class="online-dot"></div> -->
        <img
          :src="baseUrl + '/' + user.image"
          alt="Profile"
          class="followerImage"
          style="width:50px; height:50px ; border-radius: 50%;" 
        />
        <div class="name" style="fontSize: 0.8rem">
          <span style="font-weight: 800;">{{ user.nom }}  {{ user.prenom }}</span>
          <span style="color: #51e200"> Offline</span>
        </div>
         </div>
       <hr style= "width: 85%; border: 0.1px solid #ececec" />
            </div>
          
          </div>
        </div>
      </div>

      <!-- Right Side -->

      <div class="Right-side-chat">
        <div style="width: 20rem; align-self: flex-end; ">
        </div>
            <div className="chat-header">
              <div className="follower">
                
                  <img :src="baseUrl + '/' + selectedUser.image" alt="Profile" style= "width: 50px; height:50px ; border-radius: 50%;" 
                  />
                  <div className="name" style="fontSize: 0.9rem" >
                    <span style="font-weight: 700;" >
                     {{ selectedUser.nom }} {{ selectedUser.prenom }}  
                    </span>
                  </div>
               
              </div>
              <hr style="width: 99%; border: 0.1px solid #ececec;" />
            </div>
            <div className="chat-body" >
             <!-- Messages du user sélectionné -->
              <div v-for="message in selectedUserMessages" :key="message._id" class="message">
                <span>{{ message.message }}</span>
                <span>{{ message.createdAt }}</span>
              </div>
              <!-- Messages du user connecté -->
              <div v-for="message in userConnectedMessages" :key="message._id" class="message own">
                <span>{{ message.message }}</span>
                <span>{{ message.createdAt }}</span>
              </div>
            
            </div>
           
            <div className="chat-sender">
              <input type="text"   class="form-control" placeholder="ecris ton message...." v-model="message">
              <div className="send-button button" @click.prevent="Hamdlemessage" :disabled="message.trim() === ''" >Send</div>
            </div>
         
      
       
      </div>
      </div>
    </div>
    <!-- </div> -->
</template>

<script>
  import { mapGetters } from 'vuex';
  import axios from '@/lib/axiosConfig.js'
  import io from 'socket.io-client';
export default {
    name: 'ForumMffeChatUser',
    computed: {
	  ...mapGetters(['getUser']),
	},

    data() {
        return {
          message:'',
          abonnementID:'',
          UsersOptions:[],
          selectedUser:'',
          selectedUserMessages:[],
          baseUrl: 'http://localhost:5000',
          userConnectedMessages: [], // Tableau pour les messages du user connecté
          socket : io('http://localhost:5000/api/chat/1',{
                      withCredentials: true
})
    
            
        };
    },

 async  mounted() {
      await this.fetchUsersOptions();
	    console.log('Informations de l\'utilisateur abonner :', this.getUser);
     this.socket.emit('nouveau_sujet', 'DataUser' );

        
    },

    methods: {

      async fetchUsersOptions() {
		try {
		  await this.$store.dispatch('fetchUserData');
		  const options = JSON.parse(JSON.stringify(this.$store.getters['getUsersData']));
		  console.log('Options centre:', options.data);
  
		  await this.$store.dispatch('fetchAbonnerData');
		  const abonnements = JSON.parse(JSON.stringify(this.$store.getters['getAbonnerData'])).data;
		  console.log('Options abonner:', abonnements);
		  const statut = this.getUser.user.statut;
		  const utilisateurConnecteId = this.getUser.user.id;
  
		  if (statut === 'I') {
			console.log('Utilisateur est un influenceur');
			// Utilisateur est un influenceur
			this.UsersOptions = options.data.filter(user => {
			  const estAbonne = abonnements.some(abonnement => abonnement.influente_id._id === utilisateurConnecteId && abonnement.lambda_id._id === user._id);
			  console.log('Influenceur est abonné :', estAbonne);
			  return estAbonne;
			});
		  } else if (statut === 'L') {
			console.log('Utilisateur est un lambda');
			this.UsersOptions = options.data.filter(user => {
			  const estAbonne = abonnements.some(abonnement => abonnement.lambda_id._id === utilisateurConnecteId && abonnement.influente_id._id === user._id);
			  return user.statut === 'I' && estAbonne;
			});
		  }
  
		  console.log('Liste d\'utilisateurs filtrée :', this.UsersOptions);
		  this.loading = false;
		} catch (error) {
		  console.error('Erreur lors de la récupération des options des getCentreData:', error.message);
		}
	  },
    selectUser(user) {
      console.log('user', user);
   const selectedUserInfo = this.UsersOptions.find(userInfo => userInfo._id === user);
      if (selectedUserInfo) {
        this.selectedUser = selectedUserInfo;
        this.fetchMessageOptions();
      } else {
        console.error('Aucune information trouvée pour l\'utilisateur sélectionné.');
      }
},

    async fetchMessageOptions() {
  // Obtenez l'id de l'utilisateur sélectionné
  const idSelectedUser = this.selectedUser._id;

  // Obtenez l'id de l'utilisateur connecté
  const idConnect = this.getUser.user.id;

  await this.$store.dispatch('fetchAbonnerData');
  const abonnements = JSON.parse(JSON.stringify(this.$store.getters['getAbonnerData'])).data;

  // Recherchez l'abonnement correspondant aux deux IDs
  const abonnementCorrespondant = abonnements.find(abonnement => {
    return (
      (abonnement.influente_id._id === idSelectedUser && abonnement.lambda_id._id === idConnect) ||
      (abonnement.lambda_id._id === idSelectedUser && abonnement.influente_id._id === idConnect)
    );
  });

  if (abonnementCorrespondant) {
    // L'abonnement correspondant a été trouvé
    // Récupérez l'ID de l'abonnement
    const idAbonnement = abonnementCorrespondant._id;
    this.abonnementID = idAbonnement
    console.log('Abonnement correspondant :', idAbonnement);

    // Maintenant, utilisez l'ID de l'abonnement pour obtenir les messages correspondants
    await this.$store.dispatch('fetchMessageData', idAbonnement);
    const allMessages = JSON.parse(JSON.stringify(this.$store.getters['getMessageData'])).data;
     this.userConnectedMessages = allMessages.filter(message => message.send_id._id === idConnect);
      this.selectedUserMessages = allMessages.filter(message => message.send_id._id === idSelectedUser);
  } else {
    // Aucun abonnement correspondant trouvé
    console.log('Aucun abonnement correspondant trouvé.');
  }
},
async Hamdlemessage(){

console.log('ee',this.message);


  let SendMsg = {
    abonner_id: this.abonnementID ,
    send_id: this.getUser.user.id,
    message:this.message,            
       }
       console.log('datauser', SendMsg);   

       this.socket.emit('nouveau_sujet', SendMsg );
       this.socket.on('message_influenceur', (messageId) => {
        console.log('response socket',messageId);
        this.userConnectedMessages.push(messageId)
        console.log('this.userConnectedMessages', this.userConnectedMessages);
  // Mettre à jour l'état du message dans l'interface utilisateur
  // (par exemple, marquer le message comme approuvé)
});

      //  try {
      // const response = await axios.post('/chat', SendMsg);
  
      // console.log('response.login', response); 
      // if (response.data.statut === "success") {
      //   console.log(response.data);
      //   this.fetchMessageOptions();
       
      //     } else {
      //     return this.error = response.data.alert
          
      //     }
      
      //       } catch (error) {
      //       console.log('error',error);
      //       }  
    },
  },
};
</script>

<style lang="css" scoped>

/* etape  1 */
.Chat {
  position: relative;
  display: grid;
  grid-template-columns: 22% auto;
  gap: 1rem;
  height: 96vh;
}

.Left-side-chat {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.Chat-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.64);
  border-radius: 1rem;
  padding: 1rem;
  height: 90vh;
  min-height: 80vh;
  overflow-y: scroll;
}

.Chat-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.Right-side-chat {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* border: 1px solid red; */
    border-radius: 6px;
    background-color: #fff;
    position: relative;
}
.conversation:hover {
  background: #80808038;
  cursor: pointer;
}

.conversation {
  border-radius: 0.5rem;
  padding: 10px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  align-items: center;
}

.conversation > div {
  position: relative;
}
.conversation .name{
/* border: 1px solid blue; */
display: flex;
flex-direction: column;
width: 100%;
margin-left: 10px;


}

.online-dot {
  background-color: greenyellow;
  border-radius: 50%;
  position: absolute;
  left: 2rem;
  width: 1rem;
  height: 1rem;
}


.chatbox-empty-message {
  display: flex;
  align-self: center;
  justify-content: center;
  font-size: 20px;
  /* border: 1px solid red; */
}


@media screen and (max-width: 768px) {
 .Chat {
    grid-template-columns: 16% auto;
  }
   .follower.conversation>div>.name{
    display: none;
   }
}

/* etape 2 */

/* .LogoSearch {
  display: flex;
  gap: 0.75rem;
} */
.Search {
  display: flex;
  background-color: rgba(40, 52, 62, 0.07);
  border-radius: 10px;
  padding: 5px;
}
.Search>input {
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
}
.s-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(106.23deg, #f99827 0%, #f95f35 100%);
  border-radius: 5px;
  padding: 4px;
  color: white;
}


/* etape 3 */

.ChatBox-container {
    background: rgba(255, 255, 255, 0.64);
    border-radius: 1rem;
    display: grid;
    grid-template-rows: 14vh 60vh 13vh;
    /* border: 1px solid red; */
}

.chat-header {
    padding:0rem 1rem;
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
    border-radius: 6px;
    background-color: #fff;

   
}
.follower{
 border-radius: 0.5rem;
  /* padding: 10px; */
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;

  align-items: center;

}

.chat-header .follower .name{
/* border: 1px solid blue; */
display: flex;
flex-direction: column;
width: 100%;
margin-left: 10px;



}

.chat-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
    overflow-y: scroll;
    /* border: 1px solid blue; */
    height: 65vh;
}

.message {

  background: linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%);
  color: white;
  padding: 0.7rem;
  border-radius: 1rem 1rem 1rem 0;
  max-width: 28rem;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message span:nth-child(2){
    font-size: 0.7rem;
    color: white;
    align-self: end;
}

.own {
  align-self: flex-end;
  border-radius: 1rem 1rem 0 1rem;
  background: linear-gradient(98.63deg, #24e4f0 0%, #358ff9 100%);
}



.chat-sender {
    /* background: linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%); */
    display: flex;
    justify-content: space-between;
    height: 3.5rem;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    border-radius: 1rem;
    align-self: end;
    /* border: 1px solid red; */
    width: 100%;
    position: absolute;
    bottom: 9px;
}
.chat-sender input{
    height: 70%;
    background: var(--blanc);
    border-radius: 3px;
    color: var(--color);
    padding: calc(1.5 * 8px) calc(1 * 8px);
    display: block;
    width: 100%;
    outline: 0;
    min-height: 48px;
    /* border: 1px solid red; */
}
.chat-sender input:focus{
    border-color: var(--vert);
    box-shadow: 0 0 0 3px var(--contrast25);
}
.chat-sender div:nth-of-type(1)
{
    text-decoration: none !important;
    padding: 9px 16px;
    border: none;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 1px 2px rgba(36, 57, 141, .4);
    border-radius: 4px;
    line-height: 1.6;
    font-family: Inter, sans-serif;
    font-weight: 700;
    color: var(--blanc);
    cursor: pointer;
    transition: filter .3s, background .3s, color .3s;
    font-size: .9em;
    filter: brightness(1);
    white-space: nowrap;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .2) 100%) var(--vert);

}




::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background: #888;
}

</style>