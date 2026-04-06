// background.js — MV3 service worker

// ── State ─────────────────────────────────────────────────────────────────────

let pendingContext = null;
let pendingFileExt = null;

// ── Receive context + file type from content script on click ──────────────────

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'DOWNLOAD_CONTEXT') {
    pendingContext = msg.context;
    pendingFileExt = msg.fileExt ?? null;
  }
  if (msg.type === 'OPEN_OPTIONS') {
    chrome.runtime.openOptionsPage();
  }
});

// ── Rename on download ────────────────────────────────────────────────────────

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  if (!isBoomiDownloadUrl(downloadItem.url)) {
    suggest();
    return true;
  }

  // Consume context once — cleared so it can't bleed into an unrelated download.
  const context = pendingContext;
  const ext     = pendingFileExt
                  || guessExtensionFromFilename(downloadItem.filename)
                  || 'dat';
  pendingContext = null;
  pendingFileExt = null;

  suggest({ filename: buildFilename(context, ext), conflictAction: 'uniquify' });
  return true;
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function isBoomiDownloadUrl(url) {
  return url.includes('platform.boomi.com') && url.includes('/download/');
}

function buildFilename(context, ext) {
  const parts = [];
  if (context?.processName)   parts.push(sanitize(context.processName));
  if (parts.length === 0)     parts.push('document');
  if (context?.execTimestamp) parts.push(context.execTimestamp);
  return parts.join('_') + '.' + ext;
}

function sanitize(str) {
  return str.replace(/[^a-zA-Z0-9_\-. ]/g, '').trim().replace(/\s+/g, '_');
}

function guessExtensionFromFilename(filename) {
  const match = filename?.match(/\.([a-z0-9]+)$/i);
  return match ? match[1] : null;
}
