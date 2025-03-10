import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  ws.send('Welcome to the WebSocket server');
});

export function broadcastNotification(excludeUserId: string, message: string) {
  wss.clients.forEach((client: any) => {
    if (client.readyState === client.OPEN && client.userId !== excludeUserId) {
      client.send(message);
    }
  });
}
