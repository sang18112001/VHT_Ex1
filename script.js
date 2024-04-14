let main = document.getElementById("main");
for (let i = 0; i < 1000; i++) {
    let circle = document.createElement("div");
    circle.classList.add("box");
    circle.style.width = Math.floor(Math.random() * (91) + 10) + "px"; // Random đường kính từ 10 đến 100px
    circle.style.height = circle.style.width;
    circle.style.backgroundColor = "transparent";
    let x = Math.random() * (window.innerWidth - parseInt(circle.style.width));
    let y = Math.random() * (window.innerHeight - parseInt(circle.style.height));
    circle.style.left = x + "px";
    circle.style.top = y + "px";
    main.appendChild(circle);
}

let boxes = document.querySelectorAll(".box");
let frameCount = 0;
let lastTime = performance.now();
let fpsDisplay = document.getElementById("fps");

function moveObject(box, angle) {
    let x = parseFloat(box.style.left);
    let y = parseFloat(box.style.top);
    let speed = 15; // Pixels per second

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
