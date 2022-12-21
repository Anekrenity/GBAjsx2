"use strict";
/*
 Copyright (C) 2012-2015 Grant Galitz
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
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

function keyDown(e) {
    var keyCode = e.keyCode | 0;
    for (var keyMapIndex = 0; (keyMapIndex | 0) < 10; keyMapIndex = ((keyMapIndex | 0) + 1) | 0) {
        var keysMapped = keyZones[keyMapIndex | 0];
        var keysTotal = keysMapped.length | 0;
        for (var matchingIndex = 0; (matchingIndex | 0) < (keysTotal | 0); matchingIndex = ((matchingIndex | 0) + 1) | 0) {
            if ((keysMapped[matchingIndex | 0] | 0) == (keyCode | 0)) {
                Iodine.keyDown(keyMapIndex | 0);
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
            if ((keysMapped[matchingIndex | 0] | 0) == (keyCode | 0)) {
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

function pressButton(gamepadButton, iodineButton, gp) {
    if (gp.buttons[gamepadButton].pressed) {
        Iodine.keyDown(iodineButton);
    } else {
        Iodine.keyUp(iodineButton);
    }
}

function checkButtonPress() {
    let gamepads = navigator.getGamepads();
  
    if (gamepads.length > 0) {
        let gp = gamepads[0];

        if (gp) {
            //A:
            pressButton(0, 0, gp);
            //B:
            pressButton(1, 1, gp);
            //Select:
            pressButton(8, 2, gp);
            //Start:
            pressButton(9, 3, gp);
            //Right:
            pressButton(15, 4, gp);
            //Left:
            pressButton(14, 5, gp);
            //Up:
            pressButton(12, 6, gp);
            //Down:
            pressButton(13, 7, gp);
            //L:
            pressButton(4, 8, gp);
            //R:
            pressButton(5, 9, gp);

            if (gp && !gp.buttons[15].pressed && !gp.buttons[14].pressed && !gp.buttons[12].pressed && !gp.buttons[13].pressed) {
                let xAxis = gp.axes[0];
                let yAxis = gp.axes[1];
                
                if (xAxis < -0.5) {
                    //Left
                    Iodine.keyDown(5);
                } else if (xAxis > 0.5) {
                    //Right
                    Iodine.keyDown(4);
                } else {
                    Iodine.keyUp(4);
                    Iodine.keyUp(5);
                }
                
                if (yAxis < -0.5) {
                    //Up
                    Iodine.keyDown(6);
                } else if (yAxis > 0.5) {
                    //Down
                    Iodine.keyDown(7);
                } else {
                    Iodine.keyUp(6);
                    Iodine.keyUp(7);
                }
            }
        }
    }
  }
  
setInterval(checkButtonPress, 50);