// ── Boomi GPT compare trigger (build page) ────────────────────────────────────

function _bph_openBoomiGPT(prompt) {
  localStorage.setItem('bph_gpt_prompt', prompt);
  window.open('https://platform.boomi.com/BoomiAI.html#/chat', '_blank');
}

document.arrive('[data-locator="link-description"]', { existing: true }, function (descLink) {
  var linksDiv = descLink.closest('.links');
  if (!linksDiv || linksDiv.querySelector('.bph-gpt-link')) return;

  var link = document.createElement('a');
  link.className = 'gwt-Anchor svg-anchor bph-gpt-link';
  link.href = 'javascript:;';
  link.title = 'Compare in Boomi GPT';
  link.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="width:24px;height:24px;"><title>Compare in Boomi GPT</title><path d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z" stroke="#8C8C8C" stroke-width="1.5" stroke-linejoin="round"/></svg>';

  link.addEventListener('click', function (e) {
    e.preventDefault();
    var popup = linksDiv.closest('.gwt-HistoryPopup');
    var prompt = popup && popup._bph_gpt_prompt;
    if (prompt) _bph_openBoomiGPT(prompt);
  });

  var monitorLink = linksDiv.querySelector('.bph-monitor-link');
  (monitorLink || descLink).insertAdjacentElement('afterend', link);
});

// ── Revision History: checkbox selection for compare ─────────────────────────

document.arrive('.gwt-HistoryPopup', { existing: true }, function (popup) {
  if (popup.querySelector('.bph-rev-checkbox')) return;

  var dataRows = popup.querySelectorAll('.dataTable tbody tr');
  if (!dataRows.length) return;

  // Add checkbox inside each revision cell, after the revision number
  dataRows.forEach(function (row) {
    var revCell = row.querySelector('td:first-child');
    if (!revCell) return;
    var revNum = revCell.textContent.trim();
    if (!/^\d+$/.test(revNum)) return;

    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'bph-rev-checkbox';
    cb.dataset.rev = revNum;
    cb.style.cssText = 'cursor:pointer;margin-left:6px;vertical-align:middle;';

    cb.addEventListener('change', function () {
      _bph_updateRevSelection(popup);
    });

    revCell.appendChild(cb);
  });

  // Wire up the existing Boomi GPT link
  var gptLink = popup.querySelector('.boomiGptPanel label a, .boomiGptPanel a');
  if (gptLink) {
    popup._bph_gpt_link_original_html = gptLink.innerHTML;
    gptLink.href = 'javascript:;';
    gptLink.addEventListener('click', function (e) {
      e.preventDefault();
      var prompt = popup._bph_gpt_prompt;
      if (prompt) _bph_openBoomiGPT(prompt);
    });

    // Wrap " using" text node in the parent label so we can hide it
    var label = gptLink.closest('label') || gptLink.parentElement;
    if (label) {
      var walker = document.createTreeWalker(label, NodeFilter.SHOW_TEXT);
      var node;
      while ((node = walker.nextNode())) {
        var idx = node.textContent.search(/ using/i);
        if (idx !== -1) {
          var afterNode = node.splitText(idx);
          var endIdx = afterNode.textContent.search(/[^ using]/i);
          if (endIdx > 0) afterNode.splitText(endIdx);
          var span = document.createElement('span');
          span.className = 'bph-gpt-using';
          afterNode.parentNode.insertBefore(span, afterNode);
          span.appendChild(afterNode);
          popup._bph_gpt_using_original = span.textContent;
          break;
        }
      }
    }
  }
});

function _bph_updateRevSelection(popup) {
  var checked = Array.from(popup.querySelectorAll('.bph-rev-checkbox:checked'));

  // Enforce max 2
  if (checked.length > 2) {
    checked[0].checked = false;
    checked = checked.slice(1);
  }

  var gptLink = popup.querySelector('.boomiGptPanel label a, .boomiGptPanel a');
  if (!gptLink) return;

  if (checked.length === 2) {
    var compIdEl = document.querySelector('[data-locator="formrow-component-id"]');
    var compId = compIdEl ? compIdEl.textContent.trim() : '';
    var revs = checked.map(function (cb) { return cb.dataset.rev; }).sort(function (a, b) { return Number(a) - Number(b); });
    var prompt = 'compare ' + compId + ' version ' + revs[0] + ' and ' + revs[1];
    popup._bph_gpt_prompt = prompt;
    gptLink.style.opacity = '1';
    gptLink.style.pointerEvents = '';
    gptLink.textContent = 'Compare v' + revs[0] + ' and v' + revs[1] + ' \u2192';
    var usingSpan = gptLink.closest('label, .boomiGptPanel') && (gptLink.closest('label') || gptLink.parentElement).querySelector('.bph-gpt-using');
    if (usingSpan) usingSpan.textContent = ': ';
  } else {
    popup._bph_gpt_prompt = null;
    gptLink.style.opacity = '';
    gptLink.style.pointerEvents = '';
    gptLink.innerHTML = popup._bph_gpt_link_original_html || gptLink.innerHTML;
    var usingSpan = gptLink.closest('label, .boomiGptPanel') && (gptLink.closest('label') || gptLink.parentElement).querySelector('.bph-gpt-using');
    if (usingSpan) usingSpan.textContent = popup._bph_gpt_using_original || usingSpan.textContent;
  }
}

// ── Boomi GPT page: auto-inject prompt from localStorage ─────────────────────

if (window.location.pathname.indexOf('BoomiAI') !== -1) {
  var _bph_gpt_prompt = localStorage.getItem('bph_gpt_prompt');
  if (_bph_gpt_prompt) {
    localStorage.removeItem('bph_gpt_prompt');

    var _bph_gpt_attempts = 0;
    function _bph_tryInject() {
      _bph_gpt_attempts++;
      if (_bph_gpt_attempts > 40) { console.log('[BPH] gave up'); return; }

      var ta = document.querySelector('textarea[placeholder="How can I help you?"]');
      if (!ta) { setTimeout(_bph_tryInject, 500); return; }

      // Use native setter to update React-controlled textarea
      var nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      nativeSetter.call(ta, _bph_gpt_prompt);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('[BPH] injected, value:', ta.value);

      setTimeout(function () {
        var sendBtn = document.querySelector('button[data-testid="boomi-gpt-chat-send-button"]');
        console.log('[BPH] sendBtn:', !!sendBtn);
        if (sendBtn) sendBtn.click();
      }, 500);
    }
    setTimeout(_bph_tryInject, 2000);
  }
}
