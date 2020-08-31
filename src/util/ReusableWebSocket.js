const events = ["open", "close", "message", "error"];

export default class ReusableWebSocket {
  constructor(url, options) {
    this.url = url;
    this.options = options;
    this.ws = null;
  }

  connect() {
    if (this.ws) {
      this.ws.close();
    }

    this.ws = new WebSocket(this.url);
  }

  on(event, fn) {
    if (events.includes(event)) {
      this.ws[`on${event}`] = fn;
    } else {
      throw new Error(`Event '${event}' is not supported.`);
    }
  }
}
