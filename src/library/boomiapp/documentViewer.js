// documentViewer.js
// -----------------
// Adds a “See table” toggle and a “🗖” maximize button in the top right corner
// of the Document Viewer modal. “See table” loads Grid.js to display the raw DB data as a table.
// The “🗖” button maximizes/restores the modal with functional scroll in both states.

(function(){
  console.log('⚙️ documentViewer.js loaded');

  let originalRaw = null, savedStyles = {};

  // 1) Inject updated CSS styles
  const style = document.createElement('style');
  style.textContent = `
    /* Top-right controls container */
    #popup_on_popup_content_DocumentDialogContents .dbview-controls {
      position: absolute;
      top: 8px;
      right: 12px;
      display: flex;
      gap: 8px;
      z-index: 1000;
    }
    .dbview-toggle { display:flex; align-items:center; cursor:pointer; }
    .dbview-toggle input { margin-right:4px; }

    /* Force flex layout on .documentViewer to fill modal space */
    #popup_on_popup_content_DocumentDialogContents .documentViewer {
      display: flex !important;
      flex-direction: column !important;
      padding: 0 !important;
    }
    /* The first inner div should take all available space and be scrollable */
    #popup_on_popup_content_DocumentDialogContents .documentViewer > div {
      flex: 1 1 auto !important;
      overflow: auto !important;
    }
    /* Ensure gridjs itself is scrollable if needed */
    .gridjs-wrapper {
      height: 100% !important;
      width: 100% !important;
      overflow: auto !important;
    }

    /* Modal in maximized mode */
    #popup_on_popup_content_DocumentDialogContents.dbview-maximized {
      width: 90vw !important;
      height: 90vh !important;
      left: 5vw !important;
      top: 5vh !important;
      transition: all 0.3s ease-in-out;
    }
    /* Adjust viewer size when modal is maximized */
    #popup_on_popup_content_DocumentDialogContents.dbview-maximized .documentViewer {
      width: 100% !important;
      height: calc(100% - 40px) !important;
    }
    /* Override inline size styles that Boomi might inject */
    #popup_on_popup_content_DocumentDialogContents .documentViewer.secondary {
      width: 100% !important;
      height: 100% !important;
    }
    #popup_on_popup_content_DocumentDialogContents.dbview-maximized .documentViewer.secondary {
      width: 100% !important;
      height: calc(100% - 40px) !important;
    }
  `;
  document.head.appendChild(style);

  // 2) Load Grid.js (JS + CSS) from CDN
  function loadGridJs() {
    return new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-gridjs]')) {
        const l = document.createElement('link');
        l.dataset.gridjs = '1';
        l.rel = 'stylesheet';
        l.href = 'https://unpkg.com/gridjs/dist/theme/mermaid.min.css';
        document.head.appendChild(l);
      }
      if (window.gridjs) return resolve();
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/gridjs/dist/gridjs.umd.js';
      s.onload  = () => resolve();
      s.onerror = () => reject('Error loading Grid.js');
      document.head.appendChild(s);
    });
  }

  // 3) Render the table using Grid.js
  function renderGrid(headers, rows, container) {
    container.innerHTML = '';
    const mount = document.createElement('div');
    container.appendChild(mount);
    new gridjs.Grid({
      columns: headers,
      data:    rows,
      search:  true,
      sort:    true,
      resizable: true,
      pagination: { enabled: true, limit: 20 }
    }).render(mount);
  }

  // 4) Restore the original textarea view
  function restoreTextarea(container) {
    container.innerHTML = '';
    const ta = document.createElement('textarea');
    ta.className = 'gwt-TextArea';
    ta.style.width  = savedStyles.width  || '620px';
    ta.style.height = savedStyles.height || '442px';
    ta.readOnly     = true;
    ta.value        = originalRaw || '';
    container.appendChild(ta);
  }

  // 5) Find the currently visible textarea and save its dimensions
  function findTextarea(modal) {
    const ta = Array.from(modal.querySelectorAll('textarea.gwt-TextArea'))
                    .find(el => el.offsetParent !== null);
    if (ta) savedStyles = {
      width:  ta.style.width  || `${ta.offsetWidth}px`,
      height: ta.style.height || `${ta.offsetHeight}px`
    };
    return ta;
  }

  // 6) Check if content starts with DBSTART
  function isDb(raw) {
    return raw?.startsWith('DBSTART|');
  }

  // 7) Inject top-right controls (toggle + maximize button)
  function injectControls(modal) {
    if (modal.querySelector('.dbview-controls')) return;

    const ta = findTextarea(modal);
    if (!ta || !isDb(ta.value)) return;

    originalRaw = ta.value;

    const ctrls = document.createElement('div');
    ctrls.className = 'dbview-controls';

    // Toggle: See table
    const lbl = document.createElement('label');
    lbl.className = 'dbview-toggle';
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    lbl.append(chk, document.createTextNode('See table'));
    chk.addEventListener('change', async () => {
      const container = modal.querySelector('.documentViewer');
      if (chk.checked) {
        let body = originalRaw
          .replace(/^DBSTART\|[\s\S]*?\|@?\|/, '')
          .replace(/\|@?\|DBEND\|[\s\S]*$/, '')
          .replace(/^BEGIN\|\d+\|@\|OUT_START\|\d+\|@\|/, '');
        let segs = body.split('|#|').map(s => s.trim())
                       .filter(s => s && !/^OUT_END/.test(s) && !/^END/.test(s));
        if (!originalRaw.includes('|DBEND|') && segs.length) segs.pop();
        const rows = segs.map(s => s.split('|^|'));
        const cols = Math.max(...rows.map(r => r.length));
        rows.forEach(r => { while (r.length < cols) r.push(''); });
        const headers = Array.from({length: cols}, (_, i) => `Column${i + 1}`);
        try {
          await loadGridJs();
          renderGrid(headers, rows, container);
        } catch (e) {
          console.error(e);
          chk.checked = false;
          restoreTextarea(container);
        }
      } else {
        restoreTextarea(modal.querySelector('.documentViewer'));
      }
    });

    // Maximize button
    const max = document.createElement('button');
    max.textContent = '🗖';
    max.title = 'Maximize modal';
    max.style.cursor = 'pointer';
    max.addEventListener('click', () => {
      modal.classList.toggle('dbview-maximized');
    });

    ctrls.append(lbl, max);
    modal.appendChild(ctrls);
  }

  // 8) Polling to detect the appearance of the modal
  setInterval(() => {
    const modal = document.querySelector('#popup_on_popup_content_DocumentDialogContents');
    if (modal) injectControls(modal);
  }, 300);

})();
