let currentColor = 0;
let windowMouseMover = false;
let dragObj = null;
const create_note_group = (el) => {
  let noteForm = el.closest(".note-form");

  try {
    if (!noteForm) {
      var node = el.closest(".note-preview").parentElement.parentElement;
      noteForm = [
        ...el
          .closest(".gwt-ProcessPanel")
          .querySelectorAll(":not([data-notegroup]"),
      ]
        .reverse()
        .find((child) => {
          try {
            if (
              parseInt(child.style.top) == parseInt(node.style.top) &&
              parseInt(child.style.left) == parseInt(node.style.left) &&
              child.querySelector(".note-form")
            )
              return true;
          } catch (error) {}
        })
        .querySelector(".note-form");
      node = noteForm.parentElement;
    } else {
      var node = noteForm.parentElement;
    }
  } catch (error) {
    return false;
  }

  let nodeParent = noteForm.closest(".gwt-ProcessPanel");

  let colors = {
    blue: "0  , 100 , 255",
    red: "255, 0   , 50",
    green: "0  , 255 , 100",
    purple: "100, 50  , 200",
    orange: "230, 130 , 30",
  };

  if (!node.hasAttribute("data-notegroup")) {
    noteForm.querySelector(".NoteGroupButton").innerText = "Resize";

    setTimeout(() => {
      let matched_node = [
        ...nodeParent.querySelectorAll(":not([data-notegroup]"),
      ]
        .reverse()
        .find((child) => {
          try {
            if (
              parseInt(child.style.top) == parseInt(node.style.top) &&
              parseInt(child.style.left) == parseInt(node.style.left) &&
              child.querySelector(".note-content")
            )
              return true;
          } catch (error) {}
        });

      let matched_icon = [
        ...nodeParent.querySelectorAll(":not([data-notegroup]"),
      ]
        .reverse()
        .find((child) => {
          try {
            if (
              parseInt(child.style.top) == parseInt(node.style.top) - 15 &&
              parseInt(child.style.left) == parseInt(node.style.left) &&
              child.querySelector(".gwt-Image")
            )
              return true;
          } catch (error) {}
        });

      if (!matched_node || !matched_icon) return false;

      let group_id = [...Array(8)].map((i) => ~~(Math.random() * 10)).join("");

      let color_use = Object.keys(colors)[currentColor];

      let notegroup_html = `
            <div class="BoomiPlatformNoteGroup" data-notegroup="${group_id}" style="position:absolute;z-index:0;top:${matched_icon.style.top};left:${matched_icon.style.left};width:60px;height:40px;background:rgba(${colors[color_use]},0.1);border:1px solid rgba(${colors[color_use]},0.5);border-radius:2px;pointer-events: none;">
                <div class="NoteResize" style="display:none;position:absolute;bottom:0;right:0;width:10px;height:10px;cursor:nwse-resize;background: linear-gradient(-45deg,rgba(0,0,0,0.5) 10%, transparent 10%,transparent 20%, rgba(0,0,0,0.5) 20%,rgba(0,0,0,0.5) 30%, transparent 30%,transparent 40%, rgba(0,0,0,0.5) 40%,rgba(0,0,0,0.5) 50%, transparent 50%);pointer-events: auto;"></div>
            </div>
            `;

      let selectgroup_html = `
            <div tabindex="0" class="gwt-IconButton floatLeft buttonSpacer" role="button" title="Select Group" onclick="select_group(this)">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEVHcEwAU5xCQkIAU5zB5tVZAAAAAnRSTlMA8MsuPyQAAAAySURBVAjXY2CAA61Vq1YwKDAwcGAQPEBCq59rBQMD/wGgQv4PIOIPiPgPIkCaWaCGAABP2Qhg63w3vwAAAABJRU5ErkJggg==" width="16" height="16" class="gwt-Image">
            </div>
            `;

      matched_node.insertAdjacentHTML("afterend", notegroup_html);
      matched_node.setAttribute("data-notegroup", group_id);
      // removed as adding `pre` to notes breaks the text outside the bounds of the note div
      //matched_node.querySelector(".note-content").style.whiteSpace = "pre";
      matched_node.classList.add("note-hover");
      matched_node
        .querySelector(".note-preview-buttons")
        .insertAdjacentHTML("beforeend", selectgroup_html);

      node.setAttribute("data-notegroup", group_id);
      node.classList.add("note-editor");

      matched_icon.style.zIndex = "999";
      matched_icon.setAttribute("data-notegroup", group_id);
      matched_icon.classList.add("note-icon");

      let note_group = document.querySelector(
        `.BoomiPlatformNoteGroup[data-notegroup="${group_id}"]`,
      );

      function rerender_note() {
        let match =
          /\n{0,2}---\n\#BoomiPlatform: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g.exec(
            noteForm.querySelector("textarea").value,
          );

        note_group.style.background = `rgba(${colors[match[3]]},0.1)`;
        note_group.style.border = `1px solid rgba(${colors[match[3]]},0.5)`;
        note_group.style.width = match[1];
        note_group.style.height = match[2];
      }

      if (
        !/\n{0,2}---\n\#BoomiPlatform: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g.test(
          noteForm.querySelector("textarea").value,
        )
      ) {
        noteForm.querySelector("textarea").value +=
          `\n\n---\n#BoomiPlatform: ["60px","40px","${color_use}"]`;
      } else {
        rerender_note();
      }

      matched_icon.addEventListener(
        "mouseup",
        function () {
          note_group.style.top = matched_icon.style.top;
          note_group.style.left = matched_icon.style.left;
        },
        false,
      );

      note_group.querySelector(".NoteResize").addEventListener(
        "mousedown",
        function (e) {
          dragObj = {
            el: note_group,
            x: e.pageX,
            y: e.pageY,
            w: parseInt(note_group.style.width),
            h: parseInt(note_group.style.height),
          };
        },
        false,
      );

      let check_if_note_exists = setInterval(() => {
        if (
          !nodeParent.querySelector(`.note-icon[data-notegroup="${group_id}"]`)
        ) {
          clearInterval(check_if_note_exists);
          nodeParent
            .querySelector(
              `.BoomiPlatformNoteGroup[data-notegroup="${group_id}"]`,
            )
            .remove();
        }
      }, 1000);

      if (!windowMouseMover) {
        windowMouseMover = true;

        window.addEventListener(
          "mouseup",
          function () {
            if (dragObj) {
              let form_to_use = dragObj.el
                .closest(".gwt-ProcessPanel")
                .querySelector(
                  `.note-editor[data-notegroup="${dragObj.el.getAttribute("data-notegroup")}"]`,
                );
              let match =
                /\n{0,2}---\n\#BoomiPlatform: \[.*(\"[a-z]*\")\]/g.exec(
                  form_to_use.querySelector("textarea").value,
                );
              form_to_use.querySelector("textarea").value = form_to_use
                .querySelector("textarea")
                .value.replace(
                  /\n{0,2}---\n\#BoomiPlatform: \[.*\]/g,
                  `\n\n---\n#BoomiPlatform: ["${dragObj.el.style.width}","${dragObj.el.style.height}",${match[1]}]`,
                );

              dragObj.el.querySelector(".NoteResize").style.display = "none";
              form_to_use.style.display = "block";

              dragObj = null;
            }
          },
          false,
        );

        window.addEventListener("mousemove", function (e) {
          let x = e.pageX,
            y = e.pageY;

          if (dragObj == null) return;

          try {
            document.querySelector(".multiSelectPanel").style.cssText =
              "display:none;top:0;left:0:width:0;height:0;";
          } catch (error) {}

          dragObj.el.style.width =
            Math.max(60, dragObj.w + (dragObj.x - x) * -1) + "px";
          dragObj.el.style.height =
            Math.max(40, dragObj.h + (dragObj.y - y) * -1) + "px";
        });
      }

      currentColor++;
      if (currentColor >= Object.values(colors).length) currentColor = 0;

      noteForm
        .querySelector('button[data-locator="button-save"]')
        .addEventListener("mouseup", rerender_note, false);
    }, 10);
  } else {
    setTimeout(() => {
      let note_group = document.querySelector(
        `.BoomiPlatformNoteGroup[data-notegroup="${node.getAttribute("data-notegroup")}"]`,
      );
      note_group.querySelector(".NoteResize").style.display = "block";
      node.style.display = "none";
    }, 10);
  }
};

const render_note_groups = () => {
  let notes_to_render = [...document.querySelectorAll(".note-content")].filter(
    (note) =>
      note.innerText.includes("#BoomiPlatform:") &&
      !note
        .closest(".gwt-ProcessPanel")
        .classList.contains("bph-notes-rendered"),
  );
  if (!notes_to_render.length) return setTimeout(render_note_groups, 250); //wait for nodes to render

  setTimeout(() => {
    notes_to_render.forEach((note) => {
      create_note_group(note);
    });
    notes_to_render[0]
      .closest(".gwt-ProcessPanel")
      .classList.add("bph-notes-rendered");
  }, 10);
};

const select_group = (group) => {
  let node = group.closest("[data-notegroup]");
  let notegroup = group
    .closest(`.gwt-ProcessPanel`)
    .querySelector(
      `.BoomiPlatformNoteGroup[data-notegroup="${node.getAttribute("data-notegroup")}"]`,
    );

  var rect = notegroup.getBoundingClientRect();

  var down = new MouseEvent("mousedown", {
    clientX: rect.x,
    clientY: rect.y,
  });

  var move = new MouseEvent("mousemove", {
    clientX: rect.x + rect.width,
    clientY: rect.y + rect.height,
  });

  var up = new MouseEvent("mouseup", {
    clientX: rect.x + rect.width,
    clientY: rect.y + rect.height,
  });

  notegroup.closest(".gwt-ProcessPanel").dispatchEvent(down);
  notegroup.closest(".gwt-ProcessPanel").dispatchEvent(move);
  notegroup.closest(".gwt-ProcessPanel").dispatchEvent(up);
};
