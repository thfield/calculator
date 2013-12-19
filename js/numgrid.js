$(document).ready(function () {
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