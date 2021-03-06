let myCanvas, myCtx;
let anzahl = 1000;

const boxes = [];

// FUNKTIONEN
const domMapping = () => {
    myCanvas = document.querySelector('#myCanvas');
    myCtx = myCanvas.getContext('2d');

}
const resize = () => {
    myCanvas.width = 800;
    myCanvas.height = 800;
}

const createNumber = (min, max) => ~~(Math.random() * (max - min + 1) + min);

const createColor = () => `hsl(${createNumber(0, 360)},50%,60%)`;

const render = () => {

    // Canvas leeren
    myCtx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    myCtx.lineWidth = 1;
    myCtx.strokeStyle = 'hsla(0,0%,0%,.7)';
    myCtx.lineJoin = 'bevel';

    // Kästen zeichnen
    for (let box of boxes) {

        // Zuweisen der Füllfarbe
        // Canvas versteht jedes Farbsystem, das auch CSS versteht
        myCtx.fillStyle = box.color;

        myCtx.translate(box.posX, box.posY);
        myCtx.rotate(box.angle);


        myCtx.fillRect(
            - (box.size / 2),
            - (box.size / 2),
            box.size,
            box.size
        );

        myCtx.strokeRect(
            - (box.size / 2),
            - (box.size / 2),
            box.size,
            box.size
        );

        // Koordinatenkreuz zurücksetzen
        myCtx.setTransform(1, 0, 0, 1, 0, 0);

        // Kasten bewegen
        box.posX += box.speedX;
        box.posY += box.speedY;
        box.angle += box.speedAngle;

        // Wenn eine Kante berührt wird, soll das Vorzeichen umgedreht werden
        if (box.posX > myCanvas.width || box.posX < 0) box.speedX *= -1;
        if (box.posY > myCanvas.height || box.posY < 0) box.speedY *= -1;
    }


}

const createBoxes = () => {
    // Datensammlung mit der gewünschten Anzahl an Objekten füllen
    for (let i = 0; i < anzahl; i++) {
        let size = createNumber(30, 50);
        boxes.push({
            posX: createNumber(0, myCanvas.width - size),
            posY: createNumber(0, myCanvas.height - size),
            // Wenn der Attributname derselbe ist wie der Variablenname, aus der der Wert gelesen wird, genügt es, den Begriff nur einmal zu schreiben
            size,
            color: createColor(),

            // Eine Nachkommastelle gewünscht, daher durch 10 teilen
            speedX: createNumber(-50, 50) / 10,
            speedY: createNumber(-50, 50) / 10,
            angle: createNumber(0, 360) / 180 * Math.PI,
            speedAngle: createNumber(-2, 2) / 10,
        })
    }
}

const init = () => {
    domMapping();
    createBoxes();
    resize();
    setInterval(render, 30);

}