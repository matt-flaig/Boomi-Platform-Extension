const add_canvas_listener = (canvas) => {

    if (BoomiPlatform.canvas_grid == 'off') {
        let xpanel = document.getElementsByClassName("canvas_grid_process_editor");

        for (var index = 0; index < xpanel.length; index++) {
            xpanel[index].classList.add('hide_canvas_grid')
        }

    }
}