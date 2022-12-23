"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var currentConnectedGamepad = -1
var keyZones = [
    //Use this to control the key mapping:
                //A (0): 
                [81],
                //B (1):
                [83],
                //Select (2):
                [-7],
                //Start (3):
                [10],
                //Right (4):
                [39],
                //Left (5):
                [37],
                //Up (6):
                [38],
                //Down (7):
                [40],
                //R (8):
                [90],
                //L (9):
                [65]
];

var gamePadKeyMap = {
    0: 0,
    1: 1,
    2: 8,
    3: 9,
    4: 15,
    5: 14,
    6: 12,
    7: 13,
    8: 5,
    9: 4
}

function keyDown(e) {
    var keyCode = e.keyCode | 0;
    for (var keyMapIndex = 0; (keyMapIndex | 0) < 10; keyMapIndex = ((keyMapIndex | 0) + 1) | 0) {
        var keysMapped = keyZones[keyMapIndex | 0];
        var keysTotal = keysMapped.length | 0;
        for (var matchingIndex = 0; (matchingIndex | 0) < (keysTotal | 0); matchingIndex = ((matchingIndex | 0) + 1) | 0) {
            if ((keysMapped[matchingIndex | 0] | 0) == (keyCode | 0) && currentConnectedGamepad == -1) {
                Iodine.keyDown(keyMapIndex | 0); //Sike
                if (e.preventDefault) {
                    e.preventDefault();
                }
            }
        }
    }
}

function keyUp(keyCode) {
    keyCode = keyCode | 0;
    for (var keyMapIndex = 0; (keyMapIndex | 0) < 10; keyMapIndex = ((keyMapIndex | 0) + 1) | 0) {
        var keysMapped = keyZones[keyMapIndex | 0];
        var keysTotal = keysMapped.length | 0;
        for (var matchingIndex = 0; (matchingIndex | 0) < (keysTotal | 0); matchingIndex = ((matchingIndex | 0) + 1) | 0) {
            if ((keysMapped[matchingIndex | 0] | 0) == (keyCode | 0) && currentConnectedGamepad == -1) {
                Iodine.keyUp(keyMapIndex | 0);
            }
        }
    }
}

function keyUpPreprocess(e) {
    var keyCode = e.keyCode | 0;
    switch (keyCode | 0) {
        case 68:
            lowerVolume();
            break;
        case 82:
            raiseVolume();
            break;
        case 51:
            Iodine.incrementSpeed(0.10);
            break;
        case 52:
            Iodine.incrementSpeed(-0.10);
            break;
        default:
            //Control keys / other
            keyUp(keyCode);
    }
}

function processGamepadInput() {
    if (currentConnectedGamepad < 0) {
        return
        
    }
    var gamepad = navigator.getGamepads()[currentConnectedGamepad]
    if (!gamepad) {
        console.log('Gamepad disconnected.')
        currentConnectedGamepad = -1
        return
    }
    for (var i = 0; i <= 9; i++) {
        Iodine.keyUp(i)
    }
    for (var i = 0; i <= 9; i++) {
        if (gamepad.buttons[gamePadKeyMap[i]].pressed) {
            console.log(gamePadKeyMap[i])
            Iodine.keyDown(i)
        }
    }
    if (gamepad.axes[0] < -0.5) {
        Iodine.keyDown(5)
    }
    if (gamepad.axes[0] > 0.5) {
        Iodine.keyDown(4)
    }
    if (gamepad.axes[1] < -0.5) {
        Iodine.keyDown(6)
    }
    if (gamepad.axes[1] > 0.5) {
        Iodine.keyDown(7)
    }
}

window.addEventListener("gamepadconnected", function (e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    console.log('Gamepad connected.')
    currentConnectedGamepad = e.gamepad.index
    setInterval(processGamepadInput, 50);
});