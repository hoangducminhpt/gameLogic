$(function () {


    //khi kéo vào thùng rác thì xóa
    $('#blocks').droppable({
        accept: ".play-block",
        drop: function (event, ui) {
            ui.draggable.remove();
            arrRun[ui.draggable[0].attributes[0].textContent] = "t";
        }
    });

    // để các item kéo được
    $(".block").draggable({
        // cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        // revert: "invalid", // when not dropped, the item will revert back to its initial position
        // // containment: "document",
        helper: "clone",
        cursor: "move"
    });

    // kéo thả vào when run
    $("#work-space").droppable({
        accept: ".block",

        drop: function (event, ui) {
            arrRun.push(ui.draggable[0].attributes[0].textContent);
            $('#play').append(`<div name="${count}" class="play-block">${ui.draggable[0].innerHTML}</div>`);
            count++;
            $(".play-block").draggable({
                revert: true,
                cursor: "move",
            });
            console.log(arrRun);
        }
    });
});
