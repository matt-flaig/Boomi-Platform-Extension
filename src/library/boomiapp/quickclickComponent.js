// --------------------------------------------------------------------------------
// Process/Build Panel Events
// --------------------------------------------------------------------------------
document.arrive(".gwt-ProcessPanel", function (panel) {
  // --------------------------------------------------
  // Quick Shapes Remove Popup
  // --------------------------------------------------
  $(panel).on("mousedown", function (e) {
    e.preventDefault();
    $(".bpe-quickshape-popup").each(function () {
      $(this).remove();
    });
  });

  // --------------------------------------------------
  // Quick Shapes on Double Click
  // --------------------------------------------------
  $(panel).on("dblclick", function (e) {
    e.preventDefault();
    // don't open panel if copy_paste_panel is visible, or if in test mode (testModeCover) as it's confusing
    // we check for test mode, by checking if .testModeCover is visible
    // (we have to check through all elements with that class as you could have multiple tabs in test mode)
    if (
      !$(".copy_paste_panel").hasClass("no_display") ||
      !Array.from(document.querySelectorAll(".testModeCover")).every(
        (el) => el.offsetParent === null,
      )
    )
      return;
    $(".bpe-quickshape-popup").each(function () {
      $(this).remove();
    });
    rendorQuickShapePopup(panel, e.offsetX, e.offsetY, e.clientX, e.clientY);
  });
});

// --------------------------------------------------
// Render and append quick shapes to panel
// --------------------------------------------------
function rendorQuickShapePopup(obj, offsetX, offsetY, clientX, clientY) {
  quick_shape_added = { added: false, clientX: 0, clientY: 0 };
  var shapes_array = {};
  var shapes_array_html = "";
  $(".gwt-Label.base_shape_container_label").each(function () {
    shapes_array[this.innerHTML] = $(this)
      .parent()
      .children()
      .find("img")
      .attr("src");
  });

  shapes_array_sorted = Object.keys(shapes_array)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = shapes_array[key];
      return accumulator;
    }, {});

  Object.entries(shapes_array_sorted).forEach((shape) => {
    let div = ` <div tabindex="0" class="category_row_hover_style bpe-quickshape-shape" data-locator="${shape[0]}">
                        <input type="text" tabindex="-1" role="presentation" style="opacity: 0; height: 1px; width: 1px; z-index: -1; overflow: hidden; position: absolute;">
                        <div class="category_row_style">
                            <div class="left_style">
                                <img src="${shape[1]}" class="gwt-Image" title="${shape[0]}" style="width: 20px; height: 20px;">
                            </div>
                            <div class="right_style">
                                <div class="gwt-Label">${shape[0]}</div>
                            </div>
                        </div>
                    </div>`;
    shapes_array_html += div;
  });

  let html = `<div class="category_listbox_chooser_popup new_shape_chooser_popup bpe-quickshape-popup" style="top:${offsetY}px;left:${offsetX}px; overflow: visible; visibility: visible; position: absolute;">
                    <div class="popupContent">
                        <div>
                            <div class="filter_widget">
                                <div class="text_search_box">
                                    <input type="text" class="filter_search_input" id="bpe-quickshape-input" placeholder="What type of shape do you want to create?"> 
                                    <i class="input_icon icon-search"></i>
                                </div> 
                                <i class="font_icon icon-arrows-cw filter_refresh" data-locator="icon-arrows-cw"></i>
                            </div>
                            <div class="gwt-Label empty_label_style no_display">There is no data to display.</div>
                            <div class="component_list">
                                ${shapes_array_html}
                            </div>
                        </div>
                    </div>
                </div>`;

  $(obj).append(html);
  $("#bpe-quickshape-input").focus();

  $("#bpe-quickshape-input").keyup(function (e) {
    var filter = this.value.toLowerCase();

    if (e.key === "Escape") {
      $(".bpe-quickshape-popup").each(function () {
        $(this).remove();
      });
      return;
    } else {
      if (e.key === "Enter") {
        if (filter?.trim()) {
          var option = $(".component_list")
            .find(".bpe-quickshape-shape")
            .not(".no_display")[0];
          if (option !== undefined) {
            var shape = $(this)
              .closest(".component_editor_panel")
              .find(
                `.gwt-Label.base_shape_container_label:contains('${$(option).attr("data-locator")}')`,
              )[0];
            shape.parentElement.parentElement.dispatchEvent(
              new MouseEvent("mousedown"),
            );
            obj.dispatchEvent(
              new MouseEvent("mouseup", { clientX: clientX, clientY: clientY }),
            );
          }
        }
        $(".bpe-quickshape-popup").each(function () {
          $(this).remove();
        });
        return;
      }
    }

    $(".bpe-quickshape-shape").each(function () {
      shape = $(this);
      if (shape.attr("data-locator").toLowerCase().indexOf(filter) > -1) {
        shape.removeClass("no_display");
      } else {
        shape.addClass("no_display");
      }
    });
  });

  $(".bpe-quickshape-shape").on("mousedown", function (e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    var shape = $(this)
      .closest(".component_editor_panel")
      .find(
        `.gwt-Label.base_shape_container_label:contains('${$(this).attr("data-locator")}')`,
      )[0];
    shape.parentElement.parentElement.dispatchEvent(
      new MouseEvent("mousedown"),
    );
    obj.dispatchEvent(
      new MouseEvent("mouseup", { clientX: clientX, clientY: clientY }),
    );
    $(".bpe-quickshape-popup").each(function () {
      $(this).remove();
    });
  });
}
