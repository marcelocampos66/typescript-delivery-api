import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export default (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
) => io.on('connection', async (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
  ) => {
  socket.on('updatefromcustomer', () => {
    io.emit('updateseller');
  })

  socket.on('updatefromseller', () => {
    io.emit('updatecustomer');
  })
})
