const { WebSocketServer } = require("ws");
const chokidar = require("chokidar");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "posts");

const wss = new WebSocketServer({ port: 3001 });
const watchCallbacks = [];

chokidar.watch(POSTS_DIR).on("all", (event) => {
	if (event === "change") {
		watchCallbacks.forEach((cb) => cb());
	}
});

wss.on("connection", function connection(ws) {
	ws.on("error", console.error);

	watchCallbacks.push(onChange);
	ws.on("close", function close() {
		const index = watchCallbacks.findIndex(onChange);
		watchCallbacks.splice(index, 1);
	});

	function onChange() {
		ws.send("refresh");
	}
});
