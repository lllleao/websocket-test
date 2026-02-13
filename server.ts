import WebSocket, { WebSocketServer } from "ws";

interface ExtendedWebSocket extends WebSocket {
  userEmail?: string;
}

const wss = new WebSocketServer({
  port: 8080,
});

wss.on("listening", () => {
  console.log("SERVIDOR RODANDO");
});

wss.on("connection", (ws: ExtendedWebSocket) => {
  console.log("Cliente conectado");

  ws.on("message", (data) => {
    const raw = JSON.parse(data.toString()) as {
      input: string;
      toMessage: string;
      type: string;
      email: string;
    };

    if (raw.type === "register") {
      ws.userEmail = raw.email;
      return;
    }

    if (raw.toMessage) {
      console.log("Mensagem recebida", raw);
      wss.clients.forEach((client) => {
        const c = client as ExtendedWebSocket;

        if (c.readyState === ws.OPEN && c.userEmail === raw.toMessage) {
          console.log("MANDOU");
          c.send(raw.input);
        }
      });
    }
  });
  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});
