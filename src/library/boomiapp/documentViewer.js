// documentViewer.js
// -----------------
// Añade un toggle “DB View” y un botón “🗖” de maximize en el modal de Document Viewer.
// “DB View” carga Grid.js y muestra la tabla; “🗖” amplía/reduce el modal con efecto smooth.

(function(){
  console.log('⚙️ documentViewer.js cargado');

  let dbViewEnabled = false;
  let originalRaw    = null;
  let savedStyles    = {};

  /** Inyecta estilos CSS para maximize y adaptación de la tabla */
  const style = document.createElement('style');
  style.textContent = `
    /* Modal maximizado */
    #popup_on_popup_content_DocumentDialogContents.dbview-maximized {
      width: 90vw !important;
      height: 90vh !important;
      left: 5vw !important;
      top: 5vh !important;
      transition: all 0.3s ease-in-out;
    }
    /* Asegura que el contenido fluya dentro */
    #popup_on_popup_content_DocumentDialogContents.dbview-maximized .documentViewer {
      width: 100% !important;
      height: calc(100% - 80px) !important; /* deja espacio para cabecera/botones */
      overflow: hidden;
    }
    /* Wrapper scrollable ocupa todo el espacio disponible */
    #popup_on_popup_content_DocumentDialogContents .documentViewer > div {
      width: 100% !important;
      height: 100% !important;
    }
    /* Ajuste Grid.js al 100% */
    .gridjs {
      width: 100% !important;
      height: 100% !important;
    }
  `;
  document.head.appendChild(style);

  /** Carga Grid.js (CSS + JS) desde CDN */
  function loadGridJsFromCDN() {
    return new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-gridjs]')) {
        const link = document.createElement('link');
        link.dataset.gridjs = '1';
        link.rel  = 'stylesheet';
        link.href = 'https://unpkg.com/gridjs/dist/theme/mermaid.min.css';
        document.head.appendChild(link);
      }
      if (window.gridjs) return resolve();
      const script = document.createElement('script');
      script.src    = 'https://unpkg.com/gridjs/dist/gridjs.umd.js';
      script.onload  = () => resolve();
      script.onerror = () => reject(new Error('No se pudo cargar Grid.js'));
      document.head.appendChild(script);
    });
  }

  /** Renderiza la tabla con Grid.js */
  function renderWithGrid(headers, dataRows, container) {
    container.innerHTML = '';
    const mount = document.createElement('div');
    container.appendChild(mount);
    new gridjs.Grid({
      columns:    headers,
      data:       dataRows,
      search:     true,
      sort:       true,
      pagination: { enabled: true, limit: 10 },
      style: { table: { 'white-space': 'nowrap' } }
    }).render(mount);
  }

  /** Restaura el textarea original */
  function restoreTextarea(container) {
    container.innerHTML = '';
    const ta = document.createElement('textarea');
    ta.className = 'gwt-TextArea';
    ta.style.width  = savedStyles.width  || '620px';
    ta.style.height = savedStyles.height || '442px';
    ta.readOnly     = true;
    ta.value        = originalRaw || '';
    container.appendChild(ta);
    console.log('   • textarea restaurado');
  }

  /** Encuentra el textarea visible y captura sus estilos */
  function findTextarea(modal) {
    const ta = Array.from(modal.querySelectorAll('textarea.gwt-TextArea'))
                   .find(el => el.offsetParent !== null);
    if (ta) {
      savedStyles = {
        width:  ta.style.width  || ta.offsetWidth + 'px',
        height: ta.style.height || ta.offsetHeight + 'px'
      };
    }
    return ta;
  }

  /** Inyecta los botones DB View y Maximize */
  function injectToggle(modal) {
    // Ya inyectado?
    if (modal.querySelector('#dbViewToggle')) return;
    console.log('– injectToggle');

    // Cabecera del modal
    const titleBar = modal.querySelector('.form_header .form_title_top');
    if (!titleBar) return;

    // --- Botón DB View ---
    const btn = document.createElement('button');
    btn.id         = 'dbViewToggle';
    btn.innerText  = `DB View: ${dbViewEnabled ? 'ON' : 'OFF'}`;
    btn.style.cssText = 'margin-left:8px;padding:2px 6px;cursor:pointer;border:1px solid #ccc;background:#eee;';
    btn.title      = 'Toggle raw ↔ table view';
    btn.addEventListener('click', async () => {
      const container = modal.querySelector('.documentViewer');
      dbViewEnabled = !dbViewEnabled;
      console.log('• dbViewEnabled =', dbViewEnabled);

      if (dbViewEnabled) {
        const ta = findTextarea(modal);
        if (!ta) { dbViewEnabled = false; return; }
        originalRaw = ta.value;
        // Limpieza y split
        let body = originalRaw.replace(/^DBSTART\|[\s\S]*?\|@?\|/, '')
                              .replace(/\|@?\|DBEND\|[\s\S]*$/, '')
                              .replace(/^BEGIN\|\d+\|@\|OUT_START\|\d+\|@\|/, '');
        const segments = body.split('|#|').map(s=>s.trim())
                             .filter(s=>s && !/^OUT_END/.test(s) && !/^END/.test(s));
        const rows = segments.map(seg=>seg.split('|^|'));
        const colCount = Math.max(...rows.map(r=>r.length));
        rows.forEach(r=>{ while(r.length<colCount) r.push(''); });
        const headers = Array.from({length:colCount},(_,i)=>`Column${i+1}`);

        try {
          await loadGridJsFromCDN();
          renderWithGrid(headers, rows, container);
        } catch(err) {
          console.error(err);
          restoreTextarea(container);
          dbViewEnabled = false;
          alert('Error cargando tabla interactiva.');
        }
      } else {
        restoreTextarea(container);
      }

      btn.innerText      = `DB View: ${dbViewEnabled?'ON':'OFF'}`;
      btn.style.background = dbViewEnabled ? '#d4edda' : '#eee';
    });

    // --- Botón Maximize ---
    const maxBtn = document.createElement('button');
    maxBtn.id        = 'dbViewMaximize';
    maxBtn.innerText = '🗖';
    maxBtn.style.cssText = 'margin-left:4px;padding:2px 6px;cursor:pointer;border:1px solid #ccc;background:#eee;';
    maxBtn.title     = 'Maximize modal';
    maxBtn.addEventListener('click', () => {
      modal.classList.toggle('dbview-maximized');
    });

    titleBar.append(btn, maxBtn);
    console.log('   • Toggle & Maximize inyectados');
  }

  /** Observa inserciones para detectar el modal */
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1) {
          let modal = null;
          if (node.id === 'popup_on_popup_content_DocumentDialogContents') {
            modal = node;
          } else if (node.querySelector) {
            modal = node.querySelector('#popup_on_popup_content_DocumentDialogContents');
          }
          if (modal) {
            console.log('• Modal detectado');
            requestAnimationFrame(() => injectToggle(modal));
          }
        }
      }
    }
  });

  console.log('• Iniciando MutationObserver');
  observer.observe(document.body, { childList: true, subtree: true });
})();
