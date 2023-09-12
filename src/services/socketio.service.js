// import { io } from 'socket.io-client';

// class SocketioService {
//   socket;
//   constructor() {}

//   setupSocketConnection() {
//     this.socket = io('http://localhost:5000');
//   }
// }

// export default new SocketioService();

import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection(socketEndpoint) {
    this.socket = io(socketEndpoint);
  }
}

export default new SocketioService();
