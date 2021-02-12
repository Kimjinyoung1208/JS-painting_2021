// var: 코드량이 많아지면 파악하기 힘들고 값이 바뀔 우려가 있음
// let, const: var을 보완하기 위해 ES6 이후 추가된 변수 선언 방식
// let은 변수 재선언 불가 but 변수 재할당 가능
// const는 변수 재선언 불가 and 변수 재할당 불가

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// canvas는 context를 갖고있는 HTML 요소 & 그 요소 안에서 픽셀을 다룸

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// canvas를 css요소적인 사이즈 말고도 element 요소로서의 사이즈도 정해줘야함
// pixel을 다루는 윈도우가 얼마나 큰지 canvas에게 알려주기 위해 값 지정

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 우리가 그릴 선들이 모두 이 색을 가짐(default값 지정)
ctx.lineWidth = 2.5; // 그 선의 너비 = controls_range = 브러쉬 굵기
ctx.fillStyle = INITIAL_COLOR;
// ctx.fillStyle = "green";
// ctx.fillRect(50, 20, 100, 40); // x좌표, y좌표, 가로크기, 세로크기

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        console.log("creating path in", x, y);
        ctx.beginPath(); // 기존의 패스를 제거하고 완전히 비어 있는 새로운 패스를 준비
        ctx.moveTo(x, y); // 현재 좌표만 이동하며 선을 긋지는 않음, 선의 시작 좌표만 지정
    } else {
        console.log("creating line in", x, y);
        ctx.lineTo(x, y); // 현재 좌표에서 인수로 전달받은 좌표까지 선을 그음, 선을 그은 후 현재 좌표를 끝으로 이동시키므로 lineTo를 계속해서 호출하면 선을 이어서 그릴 수 있음
        ctx.stroke(); // 패스의 외곽선 그림
    }
} // clientX,Y: 전체 윈도우 내에서의 좌표값 & offsetX,Y: 캔버스 위에서의 좌표값

// function onMouseDown(event) {
//     painting = true;
// }

// function onMouseUp(event) {
//     stopPainting();
// }

// function onMouseLeave(event) {
//     stopPainting();
// }

function handleColorClick(event) {
    const color = event.target.style.backgroundColor; // .style은 event target의 css 속성 가져오는 것
    ctx.strokeStyle = color; // strokeStyle override
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        // ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault(); // 우클릭 방지
}

function handleSaveClick() {
    const image = canvas.toDataURL(); // default값이 png, image/jpeg로 변환? 가능
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🌹]";
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM); // 우클릭 이벤트
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick)) // object로부터 배열을 만듦 -> 그 array 안에서 Foreach로 color를 가질 수 있음
// 여기서 color은 아무 이름으로 지어도 됨, array 안에 있는 각각의 아이템을 대표하는 것

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}