import { EventEmitter } from "events";

/**
 * Singleton web socket class
 * Modify if any issues occur
 */
export default class ReusableWebSocket extends EventEmitter {
  constructor(url) {
    super();

    this.url = url;
    this.options = null;
    this.ws = null;
    // If authorised allow for reconnection.
    this.attemptReconnect = false;
    this.delay = 0;
  }

  /**
   * Setup and connect to receiving web service
   */
  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }

    // Imports: url, protocol, other (headers etc.).
    this.ws = new WebSocket(this.url, "", this.options);

    // Timeout a little to make sure websocket fully connects.
    setTimeout(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.attemptReconnect = true;
      }
    }, 5);

    this.ws.addEventListener("open", () => this.emit("open"));
    this.ws.addEventListener("message", message => this.emit("message", message));

    this.ws.addEventListener("close", e => {
      this.emit("close", e);

      console.log("Socket is closed");
      // Allow reconnection attempts if client is authorised.
      if (this.attemptReconnect === true) {
        console.log("Socket trying to reconnect");
        setTimeout(() => this.connect(), 3000);
      }
    });

    this.ws.addEventListener("error", err => {
      this.emit("error", err);

      // Server will return an error with 401 Unauthorised to indicate invalid info.
      console.log(err);
      if (err.message?.includes("401 Unauthorised")) {
        console.log("User access token invalid!");
        // ... somehow send user back to login screen or something.
        this.attemptReconnect = false;
      } else {
        // ... somehow indicate this cant reach server.
        console.log("Cannot reach server");
        this.attemptReconnect = true;
      }
    });
  }

  /**
   * Sends data to the receiving web service
   * also converts json to string before sending
   * @param {JSON} data
   */
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      throw new Error("WebSocket not open");
    }
  }

  /**
   * Closes the websocket.
   */
  close() {
    this.ws?.close();
  }

  /**
   * Set headers for the web socket connection
   * @param {string} options - headers which can be used to carry auth info
   */
  setHeaders(options) {
    this.options = options;
  }
}

// Singleton class - don't know a way better than singleton atm


// Example for on event close(): auto Reconnecting web socket.

// console.log('Socket is closed. Trying to reconnect);
//     setTimeout(function() {
//       ws.connect();
//     }, 2000);

// amristar cyclist link: "https://labs2.amristar.com/rws"
// local host link: "ws://10.0.2.2:3000"
