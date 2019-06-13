let ctx = canvas.getContext('2d');

let lastPoint = {x: undefined, y: undefined};
let draw = false;
let eraserEnable = false;

function resize() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

listenToUser();
resize();
window.onresize = function () {
    resize();
}


function listenToUser() {

    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (e) {
            lastPoint = {x: e.touches[0].clientX, y: e.touches[0].clientY};
            draw = true;
        }
        canvas.ontouchmove = function (e) {

            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            if (eraserEnable) {

                ctx.clearRect(x, y, 30, 30)
            } else {
                if (!draw) return;
                createLine(x, y);
                lastPoint = {x: x, y: y};
            }
        }
        canvas.ontouchend = function (e) {
            draw = false
        }
    } else {
        canvas.onmousemove = function (e) {
            let x = e.clientX;
            let y = e.clientY;
            if (eraserEnable) {

                ctx.clearRect(x, y, 30, 30)
            } else {
                if (!draw) return;
                createLine(x, y);
                lastPoint = {x: x, y: y};
            }


        }
        canvas.onmousedown = function (e) {
            let x = e.clientX;
            let y = e.clientY;
            lastPoint = {x: x, y: y};
            draw = true;

        }
        canvas.onmouseup = function (e) {

            draw = false
        }
    }
    eraser.onclick = function () {
        eraserEnable = !eraserEnable;
    }

    function createLine(x, y) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle = '#fff';
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineWidth = 10;
        ctx.lineTo(x, y);
        ctx.stroke();

    }
}
