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
        testOutput('str:' + activeString + ' num:' + activeNum + ' s:' + stack[0] + ' ' + stack[1] + ' ' + stack[2] + ' ' + stack[3]);
    });

    // when number button is clicked, pass data-val to function takeIn()
    $(document).on('click', '.number', function () {
        x = $(this).data('val');
        takeIn(x);
    });

    // function appends numStr to the active operand string
    function takeIn(numStr) {
        activeString += numStr.toString();
        displayActive();
    };

    // convert the active string to a number
    function strToNum() {
        if (activeString !== '') {
            activeNum = Number(activeString);
        };
    };

    // click on enter button
    $(document).on('click', '#enter', function () {
        if (activeString === '') { // if there is no active input
            activeNum = stack[0]; // copy the first number from the stack        
        } else { // otherwise
            strToNum(); // make the active input part of the stack
        }
        stack.unshift(activeNum);
        displayStack();
        clearActive();
    });

    function displayActive() {
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
            displayActive();
        };
    });

    // clear active input field
    function clearActive() {
        activeString = '';
        activeNum = undefined;
        displayActive();
    };

    // click clear button
    $(document).on('click', '#clear', function () {
        stack.length = 0;
        displayStack();
        clearActive();
    });

    // function for arithmetic with logic
    // to deal with case of empty active input
    function opPress(opCase) {
        strToNum();
        if (typeof stack[0] == 'undefined' || isNaN(activeNum)) {
            return;
        };
        if (!isNaN(activeNum)) {
            stack.unshift(activeNum);
        };
        //        if (typeof stack[1] == 'undefined') {
        //            return;
        //        };
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

    function reorder() {
        $('li[data-val="9"]').insertAfter('li[data-val="8"]');
        $('li[data-val="7"]').insertBefore('li[data-val="8"]');

        $('li[data-val="6"]').insertAfter('li[data-val="5"]');
        $('li[data-val="4"]').insertBefore('li[data-val="5"]');

        $('li[data-val="3"]').insertAfter('li[data-val="2"]');
        $('li[data-val="1"]').insertBefore('li[data-val="2"]');
    };

    // http://stackoverflow.com/questions/3225346/javascript-to-turn-an-unordered-list-into-multiple-columns
    function rearrange() {
        var size = 3,
            $nums = $("#numberpad"),
            $lis = $nums.children().filter(':gt(' + (size - 1) + ')'),
            loop = Math.ceil($lis.length / size),
            i = 0;

        for (; i < loop; i = i + 1) {
            $nums = $("<ul />").attr('class', 'buttongroup nums').append($lis.slice(i * size, (i * size) + 4)).insertAfter($nums);
        }
    };

    function typeOrder() {
        $('#operators').insertBefore('#nums');
    };

    function untype() {
        $('#operators').insertAfter('#nums');
    };

    // http://stackoverflow.com/questions/7846980/how-do-i-switch-my-css-stylesheet-using-jquery
    $(".csspick").click(function () {
        reorder();
        rearrange();
        untype();
        $("link").attr("href", $(this).data('rel'));
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    $('div[data-rel="stylesheets/typewriter.css"]').click(function () {
        typeOrder();
        return false;
    });
});