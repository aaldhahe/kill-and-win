const playername = onload();
const endpoint = "http://127.0.0.1:8080";
let interval;
let socket;
const keysDown = {
    37: false,
    38: false,
    39: false,
    40: false
};

function init() {

    socket = new Connection(endpoint).client();
    const communication = new Communication(socket);

    let players = {};
    let renderStack = [];

    communication.name({
        name: playername
    });

    let scorecard = document.getElementById('scoreboard');
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    clear(ctx, '#eee');

    socket.on('initilizePlayer', function (player) {
        console.log(`player initilized: `, player);
        players[player.id] = player;
        // animate();
        renderPlayer(ctx, renderStack, players);
    });

    socket.on('gameStateChange', async function(player) {
        scorecard.innerHTML = `<li>${player.name} kills: ${player.kills}</li>`;
        players[player.id] = player;
        console.log(players);
        await render(ctx, '#eee', renderStack);
    });

    const animate = function () {
        requestAnimationFrame(animate);
    };

    addEventListener("keydown", keyDownHandelr);

    addEventListener("keyup", keyUpHandler);

    // Render this player to UI
    // console.log(`render player in ui`, players);
    // renderPlayer(ctx, renderStack, players);

}

function onload() {
    return prompt("what is your name", "");
}

function Connection(url) {
    this.endpoint = url;

    Connection.prototype.client = function () {
        return io(this.endpoint);
    }
}


function Communication(socket) {
    this.socket = socket;

    Communication.prototype.name = function (name) {
        this.socket.emit('name', name);
    }
}

// function render (stack) {
//     clear(ctx,"#eee");
//     for (var i = 0; i < stack.length; i++) {
//         stack[i]();
//     }
// }

async function clear(context, color) {
    // const tmp = context.fillStyle;
    // const startShape = {
    //     exists: true,
    //     x: Math.floor((Math.random() * 500) + 1),
    //     y: Math.floor((Math.random() * 500) + 1)
    // };
    const img = new Image();
    img.src = './views/background.png';
    // img.addEventListener('load', function () {
    //     // const pat = context.createPattern(img,'repeat');
    //     // context.rect(1, 0, context.canvas.width, context.canvas.height);
    //     // context.fillStyle = pat;
    //     console.log(`rendering background image`);
    //     context.drawImage(img, 0, 0, img.width, img.height,
    //         0, 0, context.canvas.width, context.canvas.height);
    //     context.fill();
    // }, false);
    console.log(`rendering background image`)
    context.imageSmoothingEnabled = false;
    var pat = context.createPattern(img,"repeat");
    context.rect(1, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = pat;
    context.fill();
}

async function render(context, color, stack) {
    await clear(context, color);
    console.log(`rendering player`);
    stack[0]();
}

function renderPlayer(context, stack, players) {
    stack.push( function () {
        for (var i in players) {
            context.font = "20px Arial";
            context.fillStyle = "white";
            context.fillText(players[i].name, players[i].x - 5, players[i].y - 5);
            context.beginPath();
            // context.fillStyle = players[i].color;
            // context.arc(players[i].x, players[i].y, 40, 0, 2 * Math.PI);
            const img = new Image();
            img.src = players[i].image;
            console.log(img.src);
            img.onload = function() {
                context.drawImage(img, players[i].x, players[i].y, 80 , 80);
                context.fill();
            }
        }
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
        socket.emit('keyInput', keysDown);
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
            socket.emit('keyInput', keysDown);
        }
    }
}

function sleep(ms) {
    return new Promise( resolve => setTimeout(resolve, ms));
}





