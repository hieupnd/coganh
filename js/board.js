window.posArray = [];
var team = 'team2';

function getPosition(a) {
    var getValue = document.getElementById(a);
    let pos = [];
    var leftPos = getValue.offsetLeft;
    var topPos = getValue.offsetTop;
    pos.push(leftPos);
    pos.push(topPos);
    return pos;

}

function getDistance(a, b) {
    var xA = getPosition(a)[1];
    var yA = -getPosition(a)[0];
    var xB = getPosition(b)[1];
    var yB = -getPosition(b)[0];
    return Math.sqrt((xA - xB) * (xA - xB) + (yA - yB) * (yA - yB));
}


function drawLine(a, b, line, z) {
    var lineWidth = getDistance(a, b);
    var sin = Math.abs(getPosition(a)[1] - getPosition(b)[1]) / lineWidth;
    var coor = Math.asin(sin) * 180 / Math.PI;
    document.getElementById(line).style.width = lineWidth + 'px';
    if (getPosition(a)[0] < getPosition(b)[0]) {
        document.getElementById(line).style.transform = 'rotate(' + coor + 'deg)';
        document.getElementById('line17').style.transform = 'rotate(' + -coor + 'deg)';
        document.getElementById(line).style.top = getPosition(a)[1] + 'px';
        document.getElementById(line).style.left = getPosition(a)[0] + 'px';


        document.getElementById(line).style.zIndex = z;
    } else if (getPosition(a)[0] != getPosition(b)[0]) {
        document.getElementById(line).style.transform = 'rotate(' + -coor + 'deg)';
        document.getElementById(line).style.top = getPosition(b)[1] + 'px';
        document.getElementById(line).style.zIndex = z;
    } else {
        document.getElementById(line).style.transform = 'rotate(' + -coor + 'deg)';

        document.getElementById(line).style.top = getPosition(b)[1] + 'px';
        document.getElementById(line).style.left = getPosition(a)[0] + 'px';
        document.getElementById(line).style.zIndex = z;
    }
}
drawLine('00', '04', 'line1', 1);
drawLine('10', '14', 'line2', 1);
drawLine('20', '24', 'line3', 1);
drawLine('30', '34', 'line4', 1);
drawLine('40', '44', 'line5', 1);

drawLine('00', '40', 'line6', 2);
drawLine('01', '41', 'line7', 2);
drawLine('02', '42', 'line8', 2);
drawLine('03', '43', 'line9', 2);
drawLine('04', '44', 'line10', 2);

drawLine('00', '44', 'line11', 3);
drawLine('02', '24', 'line13', 3);
drawLine('20', '42', 'line14', 3);

drawLine('04', '40', 'line15', 3);
drawLine('02', '20', 'line16', 3);
drawLine('42', '24', 'line17', 3);

function setPos(idC, idPos) {

    var pos = getPosition(idPos);
    document.getElementById(idC).style.top = pos[1] + "px";
    document.getElementById(idC).style.left = pos[0] + "px";

    posArray.push(document.getElementById(idPos).getAttribute("value"));
}

setPos('p00', '00');
setPos('p01', '01');
setPos('p02', '02');
setPos('p03', '03');
setPos('p04', '04');
setPos('p10', '10');
setPos('p14', '14');
setPos('p24', '24');
setPos('p40', '40');
setPos('p41', '41');
setPos('p42', '42');
setPos('p43', '43');
setPos('p44', '44');
setPos('p20', '20');
setPos('p30', '30');
setPos('p34', '34');
posArray.forEach(element => {
    console.log(element);
});

var selected = '';

function move(idC, idPos) {
    delete posArray[document.getElementById(idC).getAttribute("value")];

    document.getElementById(idC).setAttribute("value", document.getElementById(idPos).getAttribute("value"));

    setPos(idC, idPos);
    document.getElementById(idC).style.border = 'none';
    selected = '';
    team = document.getElementById(idC).classList.item(1);
    playRule(idC);
    console.log("New value:" + document.getElementById(idC).getAttribute("value"));
}

function selectChess(idC) {
    var chess = document.getElementById(idC);
    if (chess.classList.contains(team)) {
        console.log('not your turn');

    } else {
        if (selected != '') {
            console.log("select " + selected);
            document.getElementById(selected).style.border = 'none';
        }
        chess.style.border = '5px solid yellow';
        var value = chess.getAttribute("id");
        selected = value;
        console.log(selected);

    }
}

function selectPos(idPos) {
    posArray.forEach(element => {
        if (document.getElementById(idPos).getAttribute("value") == element) {
            console.log(element);
            return;

        }
    });
    if (selected == '') {
        return;
    } else {
        if (checkValidMove(selected, idPos)) {
            move(selected, document.getElementById(idPos).getAttribute("value"));
        } else {
            console.log("not valid");
        }

    }
}

function checkValidMove(idC, idPos) {
    var val = parseInt(document.getElementById(idC).getAttribute('value'));
    var sChess = [];
    sChess.push(01, 03, 10, 12, 14, 21, 23, 30, 32, 34, 41, 43);
    var checkSpe = true;
    for (i = 0; i < sChess.length; i++) {
        if (val == sChess[i]) {
            checkSpe = false;
        }
    }
    var validMove = [];
    if (checkSpe) {
        validMove.push(val - 11, val - 10, val - 9, val - 1, val + 1, val + 9, val + 10, val + 11);
    } else {
        validMove.push(val - 10, val + 10, val - 1, val + 1);
    }
    var checkPos = parseInt(document.getElementById(idPos).getAttribute('value'));
    for (i = 0; i < validMove.length; i++) {
        if (checkPos == validMove[i]) {
            return true;
        }
    }
    return false;
}

function playRule(idC) {
    var val = parseInt(document.getElementById(idC).getAttribute('value'));
    var sChess = [];
    sChess.push(01, 03, 10, 12, 14, 21, 23, 30, 32, 34, 41, 43);
    var checkSpe = true;
    for (i = 0; i < sChess.length; i++) {
        if (val == sChess[i]) {
            checkSpe = false;
        }
    }
    if (checkSpe) {
        //1
        var check11 = getIdByValue(val - 11);
        var check12 = getIdByValue(val + 11);
        if (typeof check11 !== 'undefined' && typeof check12 != 'undefined') {
            if (check11.classList.item(1) == check12.classList.item(1)) {
                check11.classList.remove(check11.classList.item(1));
                check11.classList.add(team);

                check12.classList.remove(check12.classList.item(1));
                check12.classList.add(team);
            }
        }
        //2
        var check21 = getIdByValue(val - 9);
        var check22 = getIdByValue(val + 9);
        if (typeof check21 != 'undefined' && typeof check22 != 'undefined') {
            if (check21.classList.item(1) == check22.classList.item(1)) {
                check21.classList.remove(check21.classList.item(1));
                check21.classList.add(team);

                check22.classList.remove(check22.classList.item(1));
                check22.classList.add(team);
            }
        }
        //3
        var check31 = getIdByValue(val - 1);
        var check32 = getIdByValue(val + 1);
        if (typeof check31 != 'undefined' && typeof check32 != 'undefined') {
            if (check31.classList.item(1) == check32.classList.item(1)) {
                check31.classList.remove(check31.classList.item(1));
                check31.classList.add(team);

                check32.classList.remove(check32.classList.item(1));
                check32.classList.add(team);
            }
        }
        //4
        var check41 = getIdByValue(val - 10);
        var check42 = getIdByValue(val + 10);
        if (typeof check41 != 'undefined' && typeof check42 != 'undefined') {
            if (check41.classList.item(1) == check42.classList.item(1)) {
                check41.classList.remove(check41.classList.item(1));
                check41.classList.add(team);

                check42.classList.remove(check42.classList.item(1));
                check42.classList.add(team);
            }
        }
    } else {
        //1
        var check11 = getIdByValue(val - 1);
        var check12 = getIdByValue(val + 1);
        if (typeof check11 != 'undefined' && typeof check12 != 'undefined') {
            if (check11.classList.item(1) == check12.classList.item(1)) {
                check11.classList.remove(check11.classList.item(1));
                check11.classList.add(team);

                check12.classList.remove(check12.classList.item(1));
                check12.classList.add(team);
            }
        }
        //2
        var check21 = getIdByValue(val - 10);
        var check22 = getIdByValue(val + 10);
        if (typeof check21 != 'undefined' && typeof check22 != 'undefined') {
            if (check21.classList.item(1) == check22.classList.item(1)) {
                check21.classList.remove(check21.classList.item(1));
                check21.classList.add(team);

                check22.classList.remove(check22.classList.item(1));
                check22.classList.add(team);
            }
        }
    }
}

function getIdByValue(value) {

    var allInputs = document.getElementsByTagName("div");
    var results = [];
    for (var x = 0; x < allInputs.length; x++) {
        if (allInputs[x].getAttribute('value') == value)
            results.push(allInputs[x]);
    }
    console.log(results[0]);
    return results[0];
}
console.log(getIdByValue('00').classList.item(1));