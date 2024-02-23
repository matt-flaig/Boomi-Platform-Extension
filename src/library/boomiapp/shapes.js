const add_endpoint_listener = (endpoint) => {
  if (BoomiPlatform.endpoint_flash == "testing") {
    endpoint.classList.add("bph-endpoint-flash-testonly");
  } else if (BoomiPlatform.endpoint_flash != "off") {
    endpoint.classList.add("bph-endpoint-flash");
  }

  let endpointmenu_html = `
    <div class="BoomiPlatformEndpointMenu" tabindex="0" style="z-index: 5;position: absolute;left: -130%;top: -230%; width: max-content;" aria-hidden="true">
        <div>
            <div class="hover-menu-hidden-hotspot">
                <div class="hover-menu">
                    <ul class="menu-options">
                        <li><div class="gwt-Label gwt-ClickableLabel bph-stop">Stop</div></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;

  endpoint.insertAdjacentHTML("beforeend", endpointmenu_html);

  endpoint
    .querySelector(".bph-stop")
    .addEventListener("mousedown", function (e) {
      let first = [
        ...endpoint
          .closest(".component_editor_panel")
          .querySelectorAll(".base_shape_container"),
      ].find(
        (shape) =>
          shape.querySelector(".gwt-Label").innerText.toLowerCase() == "stop",
      );

      if (!first) return false;

      let rect = endpoint.getBoundingClientRect();

      var down = new MouseEvent("mousedown");
      var up = new MouseEvent("mouseup", {
        clientX: rect.left + 15,
        clientY: rect.top - 15,
      });

      first.dispatchEvent(down);
      document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

      setTimeout(() => {
        endpoint.dispatchEvent(down);

        var up = new MouseEvent("mouseup", {
          clientX: rect.left + 25,
          clientY: rect.top + 5,
        });
        document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

        setTimeout(() => {
          let sidepanel = [
            ...document.querySelectorAll(".shape_side_panel .form_title_label"),
          ].find((el) => el.innerText == "Stop Shape");
          sidepanel = sidepanel.closest(".shape_side_panel");

          document.querySelector(".glass_standard").style.display = "none";
          sidepanel.closest(".anchor_side_panel").style.display = "none";

          let okbutton = sidepanel.querySelector(
            'button[data-locator="button-ok"]',
          );
          okbutton.click();
        }, 0);
      }, 0);
    });
};

const add_shape_listener = (shape) => {
  if (BoomiPlatform.path_trace_highlight == "off") return false;
  let rect = shape.getBoundingClientRect();
  if (
    !([24, 32, 34].includes(rect.width) && [24, 32, 34].includes(rect.height))
  )
    return false;

  let iconTitle = shape.querySelector(".gwt-Image:not([title])");
  let iconTitle2 = shape.querySelector('.gwt-Image[title="Note"]');
  if (iconTitle || iconTitle2) return false;
  let timer = null;

  setTimeout(() => {
    shape.addEventListener("mouseover", function (e) {
      timer = setTimeout(() => {
        // don't show line trace animation if multiple shapes are selected in a box to be moved
        if (
          document.getElementsByClassName("processShapeBoundingBox") &&
          document.getElementsByClassName("processShapeBoundingBox")[0].style
            .display !== "none"
        ) {
          return;
        }

        [
          ...document.querySelectorAll(`.gwt-connectors-path-connected`),
        ].forEach((line) => {
          line.classList.add("BoomiPlatform-linetrace");
        });

        var down = new MouseEvent("mousedown");

        var move = new MouseEvent("mousemove", {
          clientX: 5,
          clientY: 0,
        });

        var up = new MouseEvent("mouseup", {
          clientX: 0,
          clientY: 0,
        });

        shape.closest(".dragdrop-draggable").dispatchEvent(down);
        shape.closest(".dragdrop-draggable").dispatchEvent(move);
        document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

        setTimeout(() => {
          [
            ...document.querySelectorAll(
              `.gwt-connectors-path-connected:not(.BoomiPlatform-linetrace)`,
            ),
          ].forEach((line) => {
            line.parentNode.classList.add("BoomiPlatform-lineparent");

            line.classList.add(
              BoomiPlatform.path_trace_highlight == "solid"
                ? "BoomiPlatform-linetrace-active-solid"
                : "BoomiPlatform-linetrace-active-dash",
            );
          });
        }, 0);
      }, 750);
    });

    shape.addEventListener("mouseout", function (e) {
      clearTimeout(timer);

      [...document.querySelectorAll(`.gwt-connectors-path-connected`)].forEach(
        (line) => {
          line.classList.remove("BoomiPlatform-linetrace");
          line.parentNode.classList.remove("BoomiPlatform-lineparent");
          line.classList.remove("BoomiPlatform-linetrace-active");
          line.classList.remove("BoomiPlatform-linetrace-active-dash");
        },
      );
    });

    shape.addEventListener("mousedown", function (e) {
      clearTimeout(timer);

      [...document.querySelectorAll(`.gwt-connectors-path-connected`)].forEach(
        (line) => {
          line.classList.remove("BoomiPlatform-linetrace");
          line.parentNode.classList.remove("BoomiPlatform-lineparent");
          line.classList.remove("BoomiPlatform-linetrace-active");
          line.classList.remove("BoomiPlatform-linetrace-active-dash");
        },
      );
    });
  }, 250);
};

const add_path_listener = (path) => {
  if (BoomiPlatform.path_trace_highlight == "off") return false;
  let timer = null;

  setTimeout(() => {
    path.addEventListener("mouseover", function (e) {
      timer = setTimeout(() => {
        // don't show line trace animation if multiple shapes are selected in a box to be moved
        if (
          document.getElementsByClassName("processShapeBoundingBox") &&
          document.getElementsByClassName("processShapeBoundingBox")[0].style
            .display !== "none"
        ) {
          return;
        }

        [
          ...document.querySelectorAll(`.gwt-connectors-path-connected`),
        ].forEach((line) => {
          line.classList.add("BoomiPlatform-linetrace");
        });

        e.target.parentNode
          .querySelector(".gwt-connectors-path-connected")
          .classList.add(
            BoomiPlatform.path_trace_highlight == "solid"
              ? "BoomiPlatform-linetrace-active-solid"
              : "BoomiPlatform-linetrace-active-dash",
          );
      }, 750);
    });

    path.addEventListener("mouseout", function (e) {
      clearTimeout(timer);

      [...document.querySelectorAll(`.gwt-connectors-path-connected`)].forEach(
        (line) => {
          line.classList.remove("BoomiPlatform-linetrace");
          line.parentNode.classList.remove("BoomiPlatform-lineparent");
          line.classList.remove("BoomiPlatform-linetrace-active");
          line.classList.remove("BoomiPlatform-linetrace-active-dash");
        },
      );
    });

    path.addEventListener("mousedown", function (e) {
      clearTimeout(timer);

      [...document.querySelectorAll(`.gwt-connectors-path-connected`)].forEach(
        (line) => {
          line.classList.remove("BoomiPlatform-linetrace");
          line.parentNode.classList.remove("BoomiPlatform-lineparent");
          line.classList.remove("BoomiPlatform-linetrace-active");
          line.classList.remove("BoomiPlatform-linetrace-active-dash");
        },
      );
    });
  }, 250);
};
