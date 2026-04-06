var copySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
</svg>`;

var checkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>`;

document.arrive('[data-locator="link-download-original-document"]', { existing: true }, function (downloadBtn) {
  var dialog =
    downloadBtn.closest('[role="dialog"]') ||
    document.getElementById('popup_on_popup_content_DocumentDialogContents') ||
    document.body;

  if (dialog.querySelector('#bph-copy-document-btn')) return;

  var formHeader = dialog.querySelector('.form_header');
  if (!formHeader) return;

  var copyBtn = document.createElement('button');
  copyBtn.id = 'bph-copy-document-btn';
  copyBtn.type = 'button';
  copyBtn.innerHTML = copySvg;
  copyBtn.style.cssText = [
    'position: absolute',
    'bottom: 8px',
    'right: 8px',
    'background: none',
    'border: none',
    'padding: 4px 6px',
    'cursor: pointer',
    'color: inherit',
    'opacity: 0.6',
    'display: flex',
    'align-items: center',
    'gap: 4px',
    'font-size: 12px',
  ].join(';');

  var tooltip = document.createElement('div');
  tooltip.textContent = 'Copy raw content';
  tooltip.style.cssText = [
    'position: absolute',
    'bottom: calc(100% + 6px)',
    'right: 0',
    'background: rgba(0,0,0,0.75)',
    'color: #fff',
    'font-size: 11px',
    'white-space: nowrap',
    'padding: 3px 7px',
    'border-radius: 3px',
    'pointer-events: none',
    'opacity: 0',
    'transition: opacity 0.15s',
  ].join(';');
  copyBtn.appendChild(tooltip);

  copyBtn.addEventListener('mouseenter', function () {
    copyBtn.style.opacity = '1';
    tooltip.style.opacity = '1';
  });
  copyBtn.addEventListener('mouseleave', function () {
    copyBtn.style.opacity = '0.6';
    tooltip.style.opacity = '0';
  });

  copyBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();

    var textareas = Array.from(dialog.querySelectorAll('.documentViewer textarea.gwt-TextArea'));
    var content = textareas.map(function (t) { return t.value || t.textContent; }).find(function (c) { return c.length > 0; }) || '';
    if (!content) return;

    function onCopied() {
      copyBtn.innerHTML = checkSvg + '<span>Copied</span>';
      copyBtn.style.opacity = '1';
      setTimeout(function () {
        copyBtn.innerHTML = copySvg;
        copyBtn.style.opacity = '0.6';
      }, 1500);
    }

    navigator.clipboard.writeText(content).then(onCopied).catch(function () {
      var ta = document.createElement('textarea');
      ta.value = content;
      ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      onCopied();
    });
  });

  formHeader.style.position = 'relative';
  formHeader.appendChild(copyBtn);
});
