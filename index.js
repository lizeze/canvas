let ctx = canvas.getContext('2d');

let lastPoint = {x: undefined, y: undefined};
let draw = true;
let eraserEnable = false;
let using = false;

function resize() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

setColors();
listenToUser();
resize();
clickColor();
window.onresize = function () {
    resize();
}

brush.onclick = function () {
    $(this).addClass('active').siblings().removeClass('active');
    draw = true;
    eraserEnable = false;
}
earser.onclick = function () {
    $(this).addClass('active').siblings().removeClass('active');
    draw = false;
    eraserEnable = true;
}


function listenToUser() {

    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (e) {
            lastPoint = {x: e.touches[0].clientX, y: e.touches[0].clientY};
            using = true;
        }
        canvas.ontouchmove = function (e) {

            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            if (!using) return;
            if (eraserEnable) {
                clearRect(x, y);
            } else {
                if (!draw) return;
                createLine(x, y);
                lastPoint = {x: x, y: y};
            }
        }
        canvas.ontouchend = function (e) {
            using = false;
        }
    } else {
        canvas.onmousemove = function (e) {
            let x = e.clientX;
            let y = e.clientY;
            if (!using) return;
            if (eraserEnable) {
                clearRect(x, y)

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
            using = true;

        }
        canvas.onmouseup = function (e) {
            using = false
        }
    }

    function createLine(x, y) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineWidth = 10;
        ctx.lineTo(x, y);
        ctx.stroke();

    }
}

function clearRect(x, y, w, h) {
    ctx.clearRect(x - 5, y - 5, w ? w : 30, h ? h : 30)
}


function setColors() {
    let $colors = document.getElementById('colors')
    let colors = ['#000000', 'red', 'orange', 'yellow', 'blue', 'green', 'gray'];
    for (let i = 0; i < colors.length; i++) {
        let element = colors[i];
        let $li = addColorElement(element, i);
        $colors.append($li);
    }
}

function addColorElement(element, index) {
    let $li = document.createElement('li');
    $li.setAttribute('color', element);
    let $div = document.createElement('div');

    if (index === 0) {
        $div.classList.add('active');
    }
    $div.style.background = element
    $li.append($div);
    return $li;
}


function clickColor() {
    $('#colors li').click(function (e) {

        let color = e.currentTarget.getAttribute('color');
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        $(this).addClass('active').siblings().removeClass('active');
        $('#brush').click()
    })

}

download.onclick = function () {
    let url = canvas.toDataURL();
    let $a = document.createElement('a')
    $a.href = url;
    $a.download = 'aaa'
    $a.target = '_blank'
    document.body.append($a);
    $a.click()

}

clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)


}