const process_to_image = (process) => {
  let nav = process
    .closest(".component_editor_panel")
    .querySelector(".step_pellete");
  let executeCheck = nav.innerText;
  let executeLink = executeCheck.includes("Capture Process Flow");
  if (executeLink != true) {
    let newLink = `<a class="gwt-Anchor svg-anchor others_floats bph-capture-process" data-locator="capture-process-flow"><?xml version="1.0" encoding="UTF-8"?>
    <?xml version="1.0" encoding="UTF-8"?>
    <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width: 40px; height: 40px;">
        <title>Capture Process Flow</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="camera-icon" transform="translate(0.500000, 0.500000)">
                <circle id="Oval" stroke="#CCCCCC" fill="#FFFFFF" fill-rule="nonzero" cx="19.5" cy="19.5" r="19.5"></circle>
                <path d="M18.167,10.5 L20.833,10.5 C21.117,10.5 21.421,10.498 21.703,10.596 C21.948,10.68 22.171,10.818 22.357,11 C22.57,11.208 22.705,11.48 22.831,11.735 L22.863,11.799 L23.213,12.5 L24.58,12.5 C25.115,12.5 25.56,12.5 25.925,12.53 C26.305,12.56 26.661,12.628 26.998,12.8 C27.5155537,13.0636705 27.9363295,13.4844463 28.2,14.002 C28.372,14.339 28.44,14.695 28.47,15.075 C28.5,15.44 28.5,15.885 28.5,16.42 L28.5,22.58 C28.5,23.115 28.5,23.56 28.47,23.925 C28.44,24.305 28.372,24.661 28.2,24.998 C27.9367948,25.5152085 27.5167695,25.9359339 27,26.2 C26.662,26.372 26.306,26.44 25.926,26.47 C25.561,26.5 25.116,26.5 24.581,26.5 L14.42,26.5 C13.885,26.5 13.44,26.5 13.075,26.47 C12.695,26.44 12.339,26.372 12.002,26.2 C11.4847508,25.9368509 11.0640101,25.5168103 10.8,25 C10.628,24.662 10.56,24.306 10.53,23.926 C10.5,23.56 10.5,23.115 10.5,22.58 L10.5,16.42 C10.5,15.885 10.5,15.44 10.53,15.075 C10.56,14.695 10.628,14.339 10.8,14.002 C11.0636705,13.4844463 11.4844463,13.0636705 12.002,12.8 C12.339,12.628 12.695,12.56 13.075,12.53 C13.44,12.5 13.885,12.5 14.42,12.5 L15.786,12.5 L16.137,11.799 C16.1476944,11.7776806 16.1583611,11.7563472 16.169,11.735 C16.295,11.48 16.431,11.208 16.644,11 C16.8290734,10.8186509 17.0521085,10.6806629 17.297,10.596 C17.579,10.498 17.883,10.499 18.167,10.5 Z M17.862,12.005 C17.8364752,12.0060695 17.8110686,12.0090782 17.786,12.014 C17.7515393,12.0260546 17.7201369,12.0455104 17.694,12.071 C17.6783946,12.0912355 17.664354,12.1126308 17.652,12.135 C17.612,12.205 17.562,12.301 17.479,12.47 L16.92,13.585 C16.7930417,13.8393053 16.5332351,13.9999904 16.249,14 L14.449,14 C13.877,14 13.492,14 13.196,14.025 C12.909,14.048 12.772,14.09 12.682,14.136 C12.4464148,14.2559078 12.2549078,14.4474148 12.135,14.683 C12.089,14.773 12.047,14.91 12.024,15.197 C12,15.493 11.999,15.877 11.999,16.45 L11.999,22.55 C11.999,23.122 11.999,23.507 12.024,23.802 C12.047,24.09 12.089,24.227 12.135,24.318 C12.255,24.553 12.446,24.744 12.682,24.864 C12.772,24.91 12.909,24.952 13.196,24.975 C13.492,24.999 13.876,25 14.449,25 L24.549,25 C25.121,25 25.506,25 25.801,24.975 C26.089,24.952 26.226,24.91 26.316,24.864 C26.5514328,24.7443528 26.7429221,24.5532135 26.863,24.318 C26.909,24.227 26.951,24.09 26.974,23.803 C26.998,23.507 26.999,23.123 26.999,22.55 L26.999,16.45 C26.999,15.878 26.999,15.493 26.974,15.197 C26.951,14.91 26.909,14.773 26.863,14.683 C26.7430922,14.4474148 26.5515852,14.2559078 26.316,14.136 C26.226,14.09 26.089,14.048 25.801,14.025 C25.506,14.001 25.121,14 24.549,14 L22.749,14 C22.4651252,13.9996118 22.2057972,13.8389833 22.079,13.585 L21.52,12.47 C21.4654307,12.3567608 21.407742,12.2450515 21.347,12.135 C21.3347081,12.1125934 21.3206644,12.0911934 21.305,12.071 C21.2794436,12.0457545 21.2487468,12.0263132 21.215,12.014 M21.213,12.014 C21.1879296,12.0090895 21.1625239,12.006081 21.137,12.005 C21.0114026,11.9998896 20.8856887,11.9982224 20.76,12 L18.24,12 C18.051,12 17.944,12 17.863,12.005 M19.5,17 C18.1192881,17 17,18.1192881 17,19.5 C17,20.8807119 18.1192881,22 19.5,22 C20.8807119,22 22,20.8807119 22,19.5 C22,18.1192881 20.8807119,17 19.5,17 Z M15.5,19.5 C15.5,17.290861 17.290861,15.5 19.5,15.5 C21.709139,15.5 23.5,17.290861 23.5,19.5 C23.5,21.709139 21.709139,23.5 19.5,23.5 C17.290861,23.5 15.5,21.709139 15.5,19.5 L15.5,19.5 Z" id="Shape" fill="#8C8C8C"></path>
            </g>
        </g>
    </svg></a>`;
    nav.insertAdjacentHTML("beforeend", newLink);

    nav
      .querySelector(".bph-capture-process")
      .addEventListener("click", (event) => {
        let alert_html = `<div class="BoomiPlatformOverlay center_panel" id="popup_on_popup_content" role="dialog" aria-modal="true"
            style="left: 663px; top: 379px; visibility: visible; position: absolute; overflow: visible;">
            <div class="popupContent bph-load-done">
                <div class="modal modal_top">
                    <div class="modal_contents">
                        <div class="margin_popup_contents" style="width: 550px;">
                            <div class="form_header" style="">
                                <div class="form_title no_required">
                                    <div class="form_title_top"> <img class="no_display form_header_image">
                                        <h2 class="form_title_label">Process Image Capture</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="qm-c-alert qm-c-alert--none" style="max-height: 600px; overflow: auto;"><span
                                    class="qm-c-alert__icon"></span>
                                <div class="qm-c-alert__text">
                                    
                                    <p>This will capture an image of your full process canvas and export to a file.</p>
                                    <br>
                                    <div>
                                        <label>
                                            <input type="checkbox" class="transparent" style="vertical-align: middle;"/>Use Transparent Background
                                        </label>
                                        <select class="uiscale gwt-ListBox" style="padding-left: 10px; margin-left: 10px;">
                                            <option value="1.0" selected>1x (normal size)</option>
                                            <option value="1.5">1.5x</option>
                                            <option value="2.0">2x</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" class="expandNotes" style="vertical-align: middle;"/>Expand Notes
                                        </label>
                                    </div>
                                </div>                     </div>
                        </div>
                    </div>
                    <div class="button_set">
                        <div class="button_spinner_panel no_display"> <i
                                class="font_icon icon-spinner before-animate-spin spinner"></i> </div><button type="button"
                            class="gwt-Button qm-button--primary-action action_button" title="Run Capture Process">Capture Process Flow</button>
                            <button type="button" class="gwt-Button"  data-locator="link-cancel"; onclick="javascript:document.querySelector('.BoomiPlatformOverlay').remove();">Cancel</button>
                    </div>
                </div>
            </div>
        </div>`;

        let overlay = document.querySelector(".BoomiPlatformOverlay");
        if (overlay) overlay.remove();
        document
          .getElementsByTagName("body")[0]
          .insertAdjacentHTML("beforeend", alert_html);

        document
          .querySelector(".BoomiPlatformOverlay button.action_button")
          .addEventListener("click", (event) => {
            let transparency = document.querySelector(
              ".BoomiPlatformOverlay .transparent",
            ).checked;
            let uiscale =
              document.querySelector(".BoomiPlatformOverlay .uiscale").value ||
              "1.0";
            let expandNotes = document.querySelector(
              ".BoomiPlatformOverlay .expandNotes",
            ).checked;

            document.querySelector(".BoomiPlatformOverlay").remove();

            let process_org = Object.assign({}, process.style);
            let title = process
              .closest(".gwt-TabLayoutPanelContent")
              .querySelector(".component_header .name_label").title;

            document.getElementsByTagName("body")[0].style.marginTop =
              "99999px";
            process.style.position = "fixed";
            process.style.overflow = "auto";
            process.style.zIndex = "99999";
            process.style.top = "0";
            process.style.left = "0";
            process.style.transformOrigin = "0 0";
            process.style.transform = `scale(${uiscale})`;
            if (transparency) {
              process.style.backgroundColor = "";
              process.style.backgroundImage = "none";
            } else {
              process.style.backgroundColor = "white";
            }

            if (expandNotes) {
              window.noteExpandInterval = setInterval(function () {
                if (
                  document.getElementsByTagName("body")[0].style.marginTop ==
                  "99999px"
                ) {
                  // expand all note dialogs
                  [...document.querySelectorAll(".note-preview")].forEach(
                    (div) => {
                      div.parentNode.parentNode.style.setProperty(
                        "display",
                        "",
                        "important",
                      );
                    },
                  );
                }
              }, 50);
            }

            [
              ...document.querySelectorAll(".BoomiPlatformEndpointMenu"),
            ].forEach((stopper) => {
              stopper.style.visibility = "hidden";
            });

            setTimeout(() => {
              let rect = process.getBoundingClientRect();
              let body = document.getElementsByTagName("body")[0];
              let canvas = document.createElement("canvas");
              canvas.style.display = "none";
              canvas.width = rect.width;
              canvas.height = rect.height;
              body.appendChild(canvas);

              rasterizeHTML.drawDocument(document, canvas).then(() => {
                let output_html = `<a href="${canvas.toDataURL()}" download="${title}.png" id="output-process-image" target="_blank"></a>`;

                body.insertAdjacentHTML("beforeend", output_html);

                setTimeout(() => {
                  document.getElementsByTagName("body")[0].style.marginTop = "";
                  process.style.position = process_org.position;
                  process.style.overflow = process_org.overflow;
                  process.style.zIndex = process_org.zIndex;
                  process.style.top = process_org.top;
                  process.style.left = process_org.left;
                  process.style.transformOrigin = process_org.transformOrigin;
                  process.style.transform = process_org.transform;
                  process.style.backgroundColor = process_org.backgroundColor;
                  process.style.backgroundImage = process_org.backgroundImage;

                  [
                    ...document.querySelectorAll(".BoomiPlatformEndpointMenu"),
                  ].forEach((stopper) => {
                    stopper.style.visibility = "visible";
                  });

                  if (window.noteExpandInterval) {
                    // clear note expander timer
                    clearInterval(window.noteExpandInterval);

                    //hide all note dialogs
                    [...document.querySelectorAll(".note-preview")].forEach(
                      (div) => {
                        div.parentNode.parentNode.style.setProperty(
                          "display",
                          "none",
                        );
                      },
                    );
                  }

                  document.getElementById("output-process-image").click();
                  document.getElementById("output-process-image").remove();

                  canvas.remove();
                }, 100);
              });
            }, 200);
          });
      });
  }
};
