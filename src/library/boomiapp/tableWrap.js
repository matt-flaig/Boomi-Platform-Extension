const add_table_listener = (table) => {
  // the "on" clause below is a legacy patch to keep the toggle showing
  // if they haven't selected one of the newer options (toggle, always, never)
  if (
    BoomiPlatform.tablewrap_selector == "toggle" ||
    BoomiPlatform.tablewrap_selector == "on"
  ) {
    // Toggle Option On Header Hover
    let head = table.querySelector("thead");
    let wrapped = false;
    let wrapper = null;
    if (!head) return false;

    if (table.closest(".wrapped_text_column_style")) {
      wrapped = true;
      wrapper = table.closest(".wrapped_text_column_style");
      wrapper.classList.add("bph-table-wrapped");
    }

    let over = false;
    head.addEventListener("mouseover", (event) => {
      over = true;
      if (!head.querySelector(".bph-thead-menu")) {
        let menuHTML = `<div class="bph-thead-menu">

                    <a class='toggle_word_wrap'>Toggle Table Line Wrap</a>

                </div>`;
        head.insertAdjacentHTML("beforeend", menuHTML);
        head.querySelector(".bph-thead-menu").style.display = "block";

        head
          .querySelector(".bph-thead-menu .toggle_word_wrap")
          .addEventListener("click", (event) => {
            if (wrapper) wrapper.classList.toggle("wrapped_text_column_style");
            table.classList.toggle("bph-wrap");
            //console.log('Table Wrap State = ' + !table.classList.contains('bph-wrap'));
          });
      } else {
        head.querySelector(".bph-thead-menu").style.display = "block";
      }
    });

    head.addEventListener("mouseout", (event) => {
      over = false;
      setTimeout(() => {
        if (head.querySelector(".bph-thead-menu") && !over) {
          head.querySelector(".bph-thead-menu").style.display = "none";
        }
      }, 100);
    });
  } else if (BoomiPlatform.tablewrap_selector == "always") {
    // Always Wrap Option
    table.classList.add("bph-wrap");
  }
};
