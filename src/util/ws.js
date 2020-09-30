import Constant from "./Constant";
import ReusableWebSocket from "./ReusableWebSocket";

const ws = new ReusableWebSocket(Constant.Url.SERVER);

export default ws;
