let main = document.getElementById("main");
for (let i = 0; i < 1000; i++) {
    let ladybug = document.createElement("div");
    ladybug.classList.add("box");
    ladybug.style.width = Math.floor(Math.random() * 11 + 10) + "px"; // Random đường kính từ 10 đến 20px
    ladybug.style.height = ladybug.style.width;
    ladybug.style.backgroundColor = "transparent";
    let x = Math.random() * (window.innerWidth - parseInt(ladybug.style.width));
    let y = Math.random() * (window.innerHeight - parseInt(ladybug.style.height));
    ladybug.style.left = x + "px";
    ladybug.style.top = y + "px";
    main.appendChild(ladybug);
}

let boxes = document.querySelectorAll(".box");
let frameCount = 0;
let lastTime = performance.now();
let fpsDisplay = document.getElementById("fps");

function moveObject(box, angle) {
    let x = parseFloat(box.style.left);
    let y = parseFloat(box.style.top);
    let speed = 10; // Pixels per second

    function animate(timestamp) {
        let elapsed = timestamp ? timestamp - lastTimestamp : 0;
        let dx = Math.cos(angle) * speed * (elapsed / 1000); // Delta x
        let dy = Math.sin(angle) * speed * (elapsed / 1000); // Delta y
        x += dx;
        y += dy;

        if (x >= window.innerWidth || x <= 0) {
            angle = Math.PI - angle; // Reverse direction when hitting window edges (horizontal)
        }
        if (y >= window.innerHeight || y <= 0) {
            angle = -angle; // Reverse direction when hitting window edges (vertical)
        }

        box.style.left = x + "px";
        box.style.top = y + "px";
        lastTimestamp = timestamp;
        requestAnimationFrame(animate);

        // Tính FPS
        frameCount++;
        let currentTime = performance.now();
        let elapsedTime = currentTime - lastTime;
        if (elapsedTime > 1000) {
            let fps = Math.round((frameCount * 1000) / elapsedTime);
            fpsDisplay.textContent = "FPS: " + fps;
            frameCount = 0;
            lastTime = currentTime;
        }
    }

    let lastTimestamp = null;
    requestAnimationFrame(animate);
}

for (let i = 0; i < boxes.length; i++) {
    let angle = Math.random() * Math.PI * 2; // Random hướng chạy
    moveObject(boxes[i], angle);
}
