// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(document).ready(function () {
    var activ = '';
    var z1 = $('#zone1');
    var z2 = $('#zone2');
    var z3 = $('#zone3');
    var stack = [];
    var opCase;
    var answer;

    // when button is clicked, pass data-val for button to a function 
    // {then display variable z1 in zone1 div} make this a function
    $(document).on('click', '.number', function () {
        x = $(this).data('val');
        //Number(x);
        takeIn(x);
    });

    // function appends num to the active operand
    function takeIn(numStr) {
        activ += numStr.toString();
        displayInZone(activ);
    };

    // displays foo in the zone(x) div
    function displayInZone(foo) {
        z1.text(foo);
    };

    // backspace
    $(document).on('click', '#bksp', function () {
        last = activ.length - 1;
        activ = activ.substring(0, last);
        displayInZone(activ);
    });

    // clear
    function clear() {
        activ = '';
        displayInZone(activ);
    };

    // click clear button
    $(document).on('click', '#clear', function () {
        clear();
    });

    // when operator button is pressed, make activ a number, move to end of stack[], display in zone2, clear zone1
    function opPress() {
        foo = Number(activ);
        stack.push(foo);
        z2.text(stack[stack.length - 1]);

    };

    // addition
    $(document).on('click', '#add', function () {
        opPress();
        clear();
        z3.text('+');
        opCase = 'a';
    });

    // subtraction
    $(document).on('click', '#subtract', function () {
        opPress();
        clear();
        z3.text('-');
        opCase = 's';
    });

    // multiplication
    $(document).on('click', '#multiply', function () {
        opPress();
        clear();
        z3.text('×');
        opCase = 'm';
    });

    // division
    $(document).on('click', '#divide', function () {
        opPress();
        clear();
        z3.text('÷');
        opCase = 'd';
    });

    // equals
    $(document).on('click', '#equals', function () {
        x = stack.pop();
        y = Number(activ);
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
        z1.text(answer);
        z2.text('');
        z3.text('');
        activ=answer;
    });
});