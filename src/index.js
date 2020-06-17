const playername = onload();
const endpoint = "http://127.0.0.1:8080";
let interval;
let socket;
let communication;
const keysDown = {
  37: false,
  38: false,
  39: false,
  40: false,
};

function main() {
  socket = new Connection(endpoint).client();
  communication = new Communication(socket);

  let players = {};
  let renderStack = [];

  communication.name({
    name: playername,
  });

  let scorecard = document.getElementById("scoreboard");
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  background(ctx, "#eee");

  socket.on("initilizePlayer", function (player) {
    console.log(`player initilized: `, player);
    players[player.id] = player;
    renderPlayers(ctx, renderStack, players);
  });

  socket.on("gameStateChange", async function (player) {
    scorecard.innerHTML = '';
    removeDisconnectedPlayers(players, player);
    for (var i in player) {
      const currentPlayer = player[i];
      players[i] = currentPlayer;
      scorecard.innerHTML += `<li>${currentPlayer.name}'s kills: ${currentPlayer.kills}</li><br />`;
    }

    // console.log(`${JSON.stringify(players)}`);
    render(ctx, "#eee", renderStack);
  });

  socket.on("knifeCreated", function (knife) {
    console.log("render knife");
    renderKnife(ctx, renderStack, knife);
  });

  socket.on('knifeCollision', function () {
    console.log('knife collision');
      if (renderStack.length > 1) {
        renderStack.pop();
      }
  });

  socket.on('disconnect', function (id) {
    delete players[id];
  });

  const animate = function () {
    requestAnimationFrame(animate);
  };


  addEventListener("keydown", keyDownHandelr);

  addEventListener("keyup", keyUpHandler);

}

function onload() {
  return prompt("what is your name", "");
}

function Connection(url) {
  this.endpoint = url;

  Connection.prototype.client = function () {
    return io();
  };
}

function Communication(socket) {
  this.socket = socket;

  Communication.prototype.name = function (name) {
    this.socket.emit("name", name);
  };

  Communication.prototype.sendInput = function (keys) {
    this.socket.emit("keyInput", keys);
  };
}

function background(context, color) {
  const img = new Image();
  img.src = "./views/background.png";
  // console.log(`rendering background image`);
  context.imageSmoothingEnabled = false;
  var pat = context.createPattern(img, "repeat");
  context.rect(1, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = pat;
  context.fill();
}

function render(context, color, stack) {
  background(context, color);
  for (var i = 0; i < stack.length; i++) {
    stack[i]();
  }
}

function renderPlayers(context, stack, players) {
  stack.push(function () {
    for (var i in players) {
      context.font = "20px Arial";
      context.fillStyle = "white";
      context.fillText(players[i].name, players[i].x - 5, players[i].y - 5);
      context.beginPath();
      const img = new Image();
      img.src = players[i].image;
      // console.log(img.src);
      context.drawImage(img, players[i].x, players[i].y, 80, 80);
      context.fill();
    }
  });
}

function renderKnife(context, stack, knife) {
  stack.push(function () {
    context.fillStyle = "0000FF";
    const img = new Image();
    img.src = knife.icon;
    context.drawImage(img, knife.x, knife.y);
    context.fill();
  });
}

function keyUpHandler(key) {
  if (
    key.keyCode == 38 ||
    key.keyCode == 40 ||
    key.keyCode == 37 ||
    key.keyCode == 39
  ) {
    keysDown[key.keyCode] = false;
    communication.sendInput(keysDown);
  }
}

function keyDownHandelr(key) {
  if (
    key.keyCode == 38 ||
    key.keyCode == 40 ||
    key.keyCode == 37 ||
    key.keyCode == 39
  ) {
    if (keysDown[key.keyCode] != true) {
      keysDown[key.keyCode] = true;
      communication.sendInput(keysDown);
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeDisconnectedPlayers(playersA, playersB) {
  const keysA = Object.keys(playersA).sort();
  const keysB = Object.keys(playersB).sort();
  for (var i = 0; i < keysA.length; i++) {
    if (!keysB.includes(keysA[i])) {
      delete playersA[keysA[i]];
    }
  }
}
