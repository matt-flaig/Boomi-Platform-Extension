// documentViewer.js
// -----------------
// Inyecta un toggle en el modal de Document Viewer y, al activarlo, renderiza
// los datos BD en una tabla; al desactivarlo, restaura el textarea original.

(function(){
  console.log('⚙️ documentViewer.js cargado');

  let dbViewEnabled = false;
  let originalRaw = null; // Store the raw text just before showing the table
  let savedStyles = {};   // Store original textarea styles

  // 1) Detecta si un raw corresponde a BD (delimitadores '|#|' y '|@|')
  const isDbDoc = raw => raw && raw.includes('|#|') && raw.includes('|@|'); // Added null check for safety

  // 2) Parsea raw y construye tabla
  function renderDbTable(raw, container) {
    // 1) Quita envoltorios DBSTART…DBEND
    let body = raw;
    if (/^DBSTART\|/.test(body)) {
      body = body
        .replace(/^DBSTART\|[\s\S]*?\|@?\|/, '')
        .replace(/\|@?\|DBEND\|[\s\S]*$/, '');
    }
  
    // 2) Elimina la cabecera BEGIN…OUT_START sobrante
    //    (p. ej. "BEGIN|2|@|OUT_START|3|@|")
    body = body.replace(/^BEGIN\|\d+\|@\|OUT_START\|\d+\|@\|/, '');
  
    // 3) Divide en segmentos con "|#|" y filtra vacíos/OUT_END/END
    const segments = body
      .split('|#|')
      .map(s => s.trim())
      .filter(s => s && !/^OUT_END/.test(s) && !/^END/.test(s));
  
    // 4) Convierte cada segmento en array de campos usando "|^|"
    const rows = segments.map(seg => seg.split('|^|'));
  
    if (!rows.length) {
      container.innerHTML = '<p style="padding:10px;color:#888;">No hay datos.</p>';
      return;
    }
  
    // 5) Calcula máximo de columnas y normaliza
    const colCount = Math.max(...rows.map(r => r.length));
    rows.forEach(r => { while (r.length < colCount) r.push(''); });
  
    // 6) Cabeceras genéricas
    const headers = Array.from({ length: colCount }, (_, i) => `Column${i+1}`);
  
    // 7) Wrapper scrollable
    container.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.style.overflowX = 'auto';
    wrap.style.overflowY = 'auto';
    wrap.style.maxHeight = '300px';
    wrap.style.maxWidth  = '100%';
    wrap.style.border    = '1px solid #ddd';
  
    // 8) Construye tabla
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width          = 'max-content';
    table.style.minWidth       = '100%';
  
    // Cabecera
    const thead = table.appendChild(document.createElement('thead'));
    const htr   = thead.appendChild(document.createElement('tr'));
    headers.forEach(h => {
      const th = htr.appendChild(document.createElement('th'));
      th.innerText        = h;
      th.style.padding    = '6px';
      th.style.border     = '1px solid #ccc';
      th.style.background = '#f0f0f0';
      th.style.whiteSpace = 'nowrap';
    });
  
    // Cuerpo
    const tbody = table.appendChild(document.createElement('tbody'));
    rows.forEach((row, idx) => {
      const tr = tbody.appendChild(document.createElement('tr'));
      row.forEach(cell => {
        const td = tr.appendChild(document.createElement('td'));
        td.innerText        = cell;
        td.style.padding    = '4px';
        td.style.border     = '1px solid #eee';
        td.style.whiteSpace = 'nowrap';
      });
      if (idx % 2) tr.style.background = '#fafafa';
    });
  
    wrap.appendChild(table);
    container.appendChild(wrap);
  }
  

  // 3) Crea o recupera el textarea original para restaurar
  function restoreTextarea(container) {
    // Limpia container
    container.innerHTML = '';
    // Crea nuevo textarea
    const ta = document.createElement('textarea');
    ta.className = 'gwt-TextArea'; // Use the original class
    // Apply saved styles (ensure they were captured)
    ta.style.width = savedStyles.width || '100%'; // Provide defaults
    ta.style.height = savedStyles.height || '300px'; // Provide defaults
    ta.readOnly = true; // Match original Boomi behavior (usually read-only)
    ta.value = originalRaw || ''; // Use the captured raw value
    container.appendChild(ta);
    console.log('   • textarea restaurado');
  }

  // 4) Obtiene el textarea visible y sus estilos
  function findVisibleTextarea(modal) {
    // Find the textarea that is currently visible (part of the DOM layout)
    const ta = Array.from(modal.querySelectorAll('textarea.gwt-TextArea'))
                    .find(el => el.offsetParent !== null);
    if (ta) {
        // Capture styles *every time* we find it, in case they change
        savedStyles = {
            width: ta.style.width || ta.offsetWidth + 'px', // Capture computed if style not set
            height: ta.style.height || ta.offsetHeight + 'px' // Capture computed if style not set
        };
        // console.log('   • Textarea found, styles captured:', savedStyles);
    }
    return ta;
  }

  // 5) Inserta el botón toggle (una sola vez por modal)
  function injectToggle(modal) {
    // Check if the toggle already exists for this specific modal instance
    if (modal.querySelector('#dbViewToggle')) {
        // console.log('   • Toggle already exists for this modal.');
        return; // Already injected for this modal
    }
    // Mark the modal to prevent re-injection attempts by the observer
    // Note: This simple property might not persist if the modal element is replaced entirely.
    // A more robust check might involve querying for the button ID again.
    // modal._hasToggle = true; // Original check - might be less reliable if modal DOM changes significantly
    console.log('– injectToggle');

    const titleBar = modal.querySelector('.form_header .form_title_top');
    if (!titleBar) {
        console.warn('   ⚠️ Title bar not found for toggle injection.');
        return;
    }

    const btn = document.createElement('button');
    btn.id = 'dbViewToggle';
    // Set initial state based on dbViewEnabled (useful if state persists somehow)
    btn.innerText = `DB View: ${dbViewEnabled ? 'ON' : 'OFF'}`;
    btn.style.marginLeft = '10px';
    btn.style.padding = '2px 6px';
    btn.style.cursor = 'pointer';
    btn.style.border = '1px solid #ccc';
    btn.style.background = '#eee';
    btn.title = 'Toggle between raw text and formatted DB table view';

    btn.addEventListener('click', ()=> {
      // Find the specific modal and container related to *this* button click
      const currentModal = btn.closest('#popup_on_popup_content_DocumentDialogContents');
      if (!currentModal) {
          console.error('   ❌ Could not find parent modal for toggle button.');
          return;
      }
      const container = currentModal.querySelector('.documentViewer');
      if (!container) {
          console.error('   ❌ Could not find .documentViewer container in modal.');
          return;
      }

      // Toggle the state *before* acting on it
      dbViewEnabled = !dbViewEnabled;
      console.log('   • dbViewEnabled toggled to =', dbViewEnabled);

      if (dbViewEnabled) {
        // --- Turning ON ---
        const currentTextArea = findVisibleTextarea(currentModal);
        if (currentTextArea) {
          // *** Crucial Fix: Capture the *current* value just before replacing ***
          originalRaw = currentTextArea.value;
          console.log('   • originalRaw captured before rendering table.');

          if (isDbDoc(originalRaw)) {
            renderDbTable(originalRaw, container);
          } else {
            // Optional: Provide feedback if it's not a DB doc
            console.log('   • Document is not in DB format. Keeping raw view.');
            // If not DB format, toggle back off immediately? Or just leave raw view?
            // For now, let's toggle back off as the view didn't change to table
            dbViewEnabled = false; // Revert state as we didn't switch to table
            alert("The document content doesn't appear to be in the expected DB format (|#|, |@|).");
          }
        } else {
          console.warn('   ⚠️ Textarea not found when trying to turn ON DB View.');
          // If no textarea, we can't proceed, so revert state
          dbViewEnabled = false; // Revert state
        }
      } else {
        // --- Turning OFF ---
        // Restore should use the 'originalRaw' captured when turning ON
        restoreTextarea(container);
      }

      // Update button text *after* logic is complete
      btn.innerText = `DB View: ${dbViewEnabled ? 'ON' : 'OFF'}`;
      btn.style.background = dbViewEnabled ? '#d4edda' : '#eee'; // Visual feedback
    });

    titleBar.appendChild(btn);
    console.log('   • Toggle inyectado');
  }

  // 6) Observador para detectar modal y textarea
  const observer = new MutationObserver((mutationsList, observer) => {
      // Optimization: Check only added nodes for the modal ID
      for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              for (const node of mutation.addedNodes) {
                  // Check if the added node itself is the modal or contains it
                  if (node.nodeType === Node.ELEMENT_NODE) {
                      let modal = null;
                      if (node.id === 'popup_on_popup_content_DocumentDialogContents') {
                          modal = node;
                      } else if (node.querySelector) { // Check if querySelector is available
                          modal = node.querySelector('#popup_on_popup_content_DocumentDialogContents');
                      }

                      if (modal) {
                          console.log('   • Modal detected by observer:', modal.id);
                          // Use requestAnimationFrame to ensure modal is fully rendered
                          requestAnimationFrame(() => {
                              injectToggle(modal);
                              // Initial setup if needed (e.g., if dbViewEnabled was persisted)
                              // Generally, let the user click the toggle first.
                              // The original observer logic here might cause issues if the
                              // textarea isn't ready immediately.
                              // --- Original Observer Logic (potentially problematic) ---
                              // const ta = findVisibleTextarea(modal); // Use updated function name
                              // if (dbViewEnabled && ta) {
                              //     const container = modal.querySelector('.documentViewer');
                              //     if (container && isDbDoc(ta.value)) {
                              //         originalRaw = ta.value; // Capture before render
                              //         renderDbTable(ta.value, container);
                              //     }
                              // }
                              // --- End Original ---
                          });
                          // Optimization: If we found the modal, maybe we don't need to check other added nodes in this mutation batch?
                          // return; // Or break outer loop if only one modal expected at a time
                      }
                  }
              }
          }
      }

      // Fallback: Original broader check (less efficient)
      // const modal = document.querySelector('#popup_on_popup_content_DocumentDialogContents');
      // if (!modal) return;
      // injectToggle(modal);
      // // ... rest of original observer logic ...
  });


  console.log('   • Starting MutationObserver');
  observer.observe(document.body, { childList: true, subtree: true });

})();
