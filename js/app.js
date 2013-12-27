$(document).ready(function () {
    var activeString = '';
    var activeNum;
    var l = [$('#line0'), $('#line1'), $('#line2'), $('#line3')];
    var a = $('#lineA');
    var stack = [];
    var answer;

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

    var ordered = false;

    function order() {
        $('li[data-val="8"]').insertAfter('li[data-val="9"]');
        $('li[data-val="7"]').insertAfter('li[data-val="8"]');
        $('li[data-val="6"]').insertAfter('li[data-val="7"]');
        $('li[data-val="5"]').insertAfter('li[data-val="6"]');
        $('li[data-val="4"]').insertAfter('li[data-val="5"]');
        $('li[data-val="3"]').insertAfter('li[data-val="4"]');
        $('li[data-val="2"]').insertAfter('li[data-val="3"]');
        $('li[data-val="1"]').insertAfter('li[data-val="2"]');
        $('li[data-val="0"]').insertAfter('li[data-val="1"]');
        $('li[data-val="."]').insertAfter('li[data-val="0"]');
        $('ul.tmp').remove();
        ordered = false;
    };

    function reorder() {
        $('li[data-val="9"]').insertAfter('li[data-val="8"]');
        $('li[data-val="7"]').insertBefore('li[data-val="8"]');

        $('li[data-val="6"]').insertAfter('li[data-val="5"]');
        $('li[data-val="4"]').insertBefore('li[data-val="5"]');

        $('li[data-val="3"]').insertAfter('li[data-val="2"]');
        $('li[data-val="1"]').insertBefore('li[data-val="2"]');
        ordered = true;
    };

    // http://stackoverflow.com/questions/3225346/javascript-to-turn-an-unordered-list-into-multiple-columns
    function rearrange() {
        var size = 3,
            $nums = $("#numberpad"),
            $lis = $nums.children().filter(':gt(' + (size - 1) + ')'),
            loop = Math.ceil($lis.length / size),
            i = 0;

        for (; i < loop; i = i + 1) {
            $nums = $("<ul />").attr('class', 'buttongroup nums tmp').append($lis.slice(i * size, (i * size) + 4)).insertAfter($nums);
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
        if (ordered === false) {
            reorder();
            rearrange();
        }
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

    $('div[data-rel="stylesheets/style.css"]').click(function () {
        order();
        return false;
    });

    // change button characters to words
    function wordify() {
        $('li[data-val="9"]').text('nine');
        $('li[data-val="8"]').text('eight');
        $('li[data-val="7"]').text('seven');
        $('li[data-val="6"]').text('six');
        $('li[data-val="5"]').text('five');
        $('li[data-val="4"]').text('four');
        $('li[data-val="3"]').text('three');
        $('li[data-val="2"]').text('two');
        $('li[data-val="1"]').text('one');
        $('li[data-val="0"]').text('zero');
        $('li[data-val="."]').text('point');
        $('#enter').text('enter');
        $('#clear').text('clear');
        $('#bksp').text('backspace');
        $('#add').text('plus');
        $('#subtract').text('minus');
        $('#multiply').text('times');
        $('#divide').text('divided by');
        $('.word').addClass('worded');
    };

    function unwordify() {
        $('li[data-val="9"]').text('9');
        $('li[data-val="8"]').text('8');
        $('li[data-val="7"]').text('7');
        $('li[data-val="6"]').text('6');
        $('li[data-val="5"]').text('5');
        $('li[data-val="4"]').text('4');
        $('li[data-val="3"]').text('3');
        $('li[data-val="2"]').text('2');
        $('li[data-val="1"]').text('1');
        $('li[data-val="0"]').text('0');
        $('li[data-val="."]').text('.');
        $('#enter').text('↵');
        $('#bksp').text('←');
        $('#clear').text('C');
        $('#add').text('+');
        $('#subtract').text('-');
        $('#multiply').text('×');
        $('#divide').text('÷');
         $('.word').removeClass('worded');
    };

   
    //from http://stackoverflow.com/questions/3854678/how-to-bind-the-toggle-event-to-a-element
var counter = 1;
$('.word').on("click", function() {
    counter++ % 2 ? 
        (wordify() ) :                            
        (unwordify() );                         
});
});