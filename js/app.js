// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(document).ready(function () {
    var activeString = '';
    var activeNum;
    var l = [$('#line0'), $('#line1'), $('#line2'), $('#line3')];
    var a = $('#lineA');
    var stack = [];
    var answer;

    //test output function
    function testOutput(str) {
        $('#testing').text(str);
    };
    $(document).on('click', '#posneg', function () {
        testOutput('str:' + activeString + ' num:' + activeNum + ' s:' + stack[0] + ' ' + stack [1] + ' ' + stack[2] + ' ' + stack[3]);
    });

    // when number button is clicked, pass data-val to function takeIn()
    $(document).on('click', '.number', function () {
        x = $(this).data('val');
        takeIn(x);
    });

    // function appends numStr to the active operand string
    function takeIn(numStr) {
        activeString += numStr.toString();
        displayActiv();
    };

    function strToNum() {
        if (activeString !== ''){
            activeNum = Number(activeString);
        };
    };

    // click on enter button
    $(document).on('click', '#enter', function () {
        if (activeString === ''){
            activeNum = stack[0];            
        } else {
        strToNum();
        }
        stack.unshift(activeNum);
        displayStack();
        clearActive();
    });

    function displayActiv() {
        a.text(activeString);
    };

    function displayStack() {
        for (var i = 0; i < 4; i += 1) {
            l[i].text('');
            l[i].text(stack[i]);
        };
    };

    // click backspace button
    $(document).on('click', '#bksp', function () {
        if (activeString === '') {
            stack.shift();
            displayStack();
        } else {
            last = activeString.length - 1;
            activeString = activeString.substring(0, last);
            displayActiv();
        };
    });

    // clear active
    function clearActive() {
        activeString = '';
        activeNum = undefined;
        displayActiv();
    };

    // click clear button
    $(document).on('click', '#clear', function () {
        stack.length = 0;
        displayStack();
        clearActive();
    });

    // TODO change y to unshift only if activeNum exists
    function opPress(opCase) {
        strToNum();
        if (!isNaN(activeNum)) {
            stack.unshift(activeNum);
        };
        if ( typeof stack[1] == 'undefined') {
            return;
        } else{
            y = stack.shift();
            x = stack.shift();
            switch (opCase) {
            case "a":
                answer = x + y;
                break;
            case "s":
                answer = x - y;
                break;
            case "m":
                answer = x * y;
                break;
            case "d":
                answer = x / y;
                break;
            }
            clearActive();
            stack.unshift(answer);
            displayStack();
        };
    };

    // addition click
    $(document).on('click', '#add', function () {
        opPress('a');
    });

    // subtraction click
    $(document).on('click', '#subtract', function () {
        opPress('s');
    });

    // multiplication click
    $(document).on('click', '#multiply', function () {
        opPress('m');
    });

    // division click
    $(document).on('click', '#divide', function () {
        opPress('d');
    });

});