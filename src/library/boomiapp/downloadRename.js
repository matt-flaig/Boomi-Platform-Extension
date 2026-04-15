// downloadRename.js — intercepts Boomi document download buttons and renames
// the downloaded file to <ProcessName>_<timestamp>.<ext> via the background worker.

const DOWNLOAD_BUTTON_SELECTOR = '[data-locator="link-download-original-document"]';

// ── Type detection from textarea content ──────────────────────────────────────

function detectTypeFromText(raw) {
  const t = raw.trimStart();
  if (t.startsWith('{') || t.startsWith('[')) return 'json';
  if (t.startsWith('<'))                       return 'xml';
  if (t.startsWith('ISA'))                     return 'edi';
  if (t.startsWith('UNA') || t.startsWith('UNB')) return 'edi';
  if (/^[\x20-\x7E]/.test(t))                 return t.includes(',') ? 'csv' : 'txt';
  return null;
}

// ── Execution timestamp from build-page date cells ───────────────────────────

function parseBoomiDate(str) {
  const m = str.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2}):(\d{2}) ([AP]M)$/);
  if (!m) return null;
  let hr = parseInt(m[4]);
  if (m[7] === 'PM' && hr !== 12) hr += 12;
  if (m[7] === 'AM' && hr === 12) hr = 0;
  return new Date(+m[1], +m[2] - 1, +m[3], hr, +m[5], +m[6]);
}

function formatTimestamp(date) {
  if (!date) return null;
  const p = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}${p(date.getMonth()+1)}${p(date.getDate())}_${p(date.getHours())}${p(date.getMinutes())}${p(date.getSeconds())}`;
}

function findReportingPageDate() {
  const timeDt = Array.from(document.querySelectorAll('.property_list dt'))
    .find(dt => dt.textContent.trim() === 'Time:');
  if (!timeDt) return null;
  const text = timeDt.nextElementSibling?.textContent?.trim();
  if (!text) return null;
  const m = text.match(/^(\d{1,2}) ([A-Za-z]{3}) (\d{4}) (\d{2}):(\d{2}):(\d{2})$/);
  if (!m) return null;
  const months = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
  const mo = months[m[2]];
  if (mo === undefined) return null;
  return new Date(+m[3], mo, +m[1], +m[4], +m[5], +m[6]);
}

function findEarliestExecutionDate() {
  const dateRe = /^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2} [AP]M$/;
  const cells = Array.from(document.querySelectorAll('div[__gwt_cell^="cell-gwt-uid-"]'));
  const dates = cells
    .map(el => el.textContent.trim())
    .filter(t => dateRe.test(t))
    .map(parseBoomiDate)
    .filter(Boolean);
  if (dates.length === 0) return null;
  dates.sort((a, b) => a - b);
  return dates[0];
}

// ── Context extraction ────────────────────────────────────────────────────────

function extractDownloadContext(buttonEl) {
  const dialog =
    buttonEl.closest('[role="dialog"]') ||
    document.getElementById('popup_on_popup_content_DocumentDialogContents') ||
    document.body;

  const processLinkEl = Array.from(document.querySelectorAll('[data-locator^="link-process-"]'))
    .find(el => el.textContent.trimStart().startsWith('Process:'));
  const processTitleEl = document.querySelector('.form_title_label:not(.no_display)');
  const processName = processLinkEl?.textContent?.trim().replace(/^Process:\s*/i, '')
    ?? processTitleEl?.textContent?.trim()
    ?? null;

  const allTextareas = Array.from(dialog.querySelectorAll('.documentViewer textarea.gwt-TextArea'));
  const content = allTextareas.map(t => t.value || t.textContent).find(c => c.length > 0) || '';
  const fileExt = content ? detectTypeFromText(content) : null;

  const execTimestamp = formatTimestamp(findEarliestExecutionDate() ?? findReportingPageDate());

  return { processName, fileExt, execTimestamp };
}

// ── Download button hook ───────────────────────────────────────────────────────

function hookDownloadButton(btn) {
  if (btn.dataset.bphDownloadHooked) return;
  btn.dataset.bphDownloadHooked = 'true';
  let passing = false;

  btn.addEventListener('click', async (e) => {
    if (passing) return;

    if (!chrome.runtime?.id) {
      console.warn('[bph] extension context invalidated — reload this tab');
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    const { processName, fileExt, execTimestamp } = extractDownloadContext(btn);
    await chrome.runtime.sendMessage({ type: 'DOWNLOAD_CONTEXT', context: { processName, execTimestamp }, fileExt });

    passing = true;
    btn.click();
    passing = false;
  }, { capture: true });
}

function scanForDownloadButtons() {
  document.querySelectorAll(DOWNLOAD_BUTTON_SELECTOR).forEach(hookDownloadButton);
}

const downloadButtonObserver = new MutationObserver(scanForDownloadButtons);
downloadButtonObserver.observe(document.body, { childList: true, subtree: true });
scanForDownloadButtons();
