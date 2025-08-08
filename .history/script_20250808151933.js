(function () {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;

  const steps = Array.from(progressBar.querySelectorAll('.progress-steps li'));
  const computedStyle = getComputedStyle(progressBar);
  const leftInset = parseFloat(computedStyle.paddingLeft) || 18; // same as CSS left/right gap
  const rightInset = parseFloat(computedStyle.paddingRight) || 18;

  /**
   * Set progress by percent (0..100).
   * - updates the ::before fill transform
   * - toggles .is-completed on steps when the fill passes the step center checkpoint
   *
   * @param {number} percent 0..100
   */
  function setProgressPercent(percent) {
    const pct = Math.max(0, Math.min(100, Number(percent) || 0));
    // update fill using the pseudo-element's transform via inline CSS variable on .progress-bar
    // We'll set an inline CSS transform by toggling a style property on the element that the pseudo-element uses.
    // Because pseudo-elements can't be directly styled via JS, use a CSS variable consumed by the transform.
    progressBar.style.setProperty('--progress-scale', (pct / 100).toString());

    // Set the pseudo-element transform using a small helper rule if not already present:
    // (We add one-time style tag to map --progress-scale -> transform on ::before)
    ensureProgressStyle();

    // Update aria
    progressBar.setAttribute('aria-valuenow', String(pct));

    // Update step completion by comparing the step's center position to the filled width
    updateStepsByPercent(pct);
  }

  /**
   * Compute each step's checkpoint percent (center position relative to track left/right)
   * and set .is-completed when percent >= checkpoint.
   */
  function updateStepsByPercent(percent) {
    const trackRect = progressBar.getBoundingClientRect();
    // track start/end within the element. Use the same left/right insets as the pseudo elements (18px).
    const trackLeft = trackRect.left + leftInset;
    const trackRight = trackRect.right - rightInset;
    const trackWidth = Math.max(1, trackRight - trackLeft);

    steps.forEach((li) => {
      const marker = li.querySelector('div');
      const markerRect = marker.getBoundingClientRect();
      // center X of marker
      const centerX = markerRect.left + markerRect.width / 2;
      const checkpointPercent = ((centerX - trackLeft) / trackWidth) * 100;
      // small tolerance to avoid flicker
      if (percent + 0.5 >= checkpointPercent) {
        li.classList.add('is-completed');
      } else {
        li.classList.remove('is-completed');
      }
    });
  }

  /* One-time style injection: maps --progress-scale to ::before transform */
  let _progressStyleInjected = false;
  function ensureProgressStyle() {
    if (_progressStyleInjected) return;
    _progressStyleInjected = true;
    const style = document.createElement('style');
    style.textContent = `
      .progress-bar::before {
        transform: translateY(-50%) scaleX(var(--progress-scale, 0));
      }
    `;
    document.head.appendChild(style);
  }

  // public API
  window.progressBehindUI = {
    setProgressPercent,
    // convenience: pass (currentPage, totalPages, minPercentOptional)
    setProgressByStep(currentPage, totalPages, minPercent = 0) {
      const cp = Math.max(1, Math.min(totalPages, Number(currentPage) || 1));
      const t = (cp - 1) / Math.max(1, (totalPages - 1));
      const percent = Math.round(minPercent + t * (100 - minPercent));
      setProgressPercent(percent);
    }
  };

  // initialize: set scale variable so pseudo-element has initial transform
  progressBar.style.setProperty('--progress-scale', '0');
  ensureProgressStyle();

  // optional: recalc on resize to keep checkpoints accurate
  window.addEventListener('resize', () => {
    const cur = Number(progressBar.getAttribute('aria-valuenow')) || 0;
    updateStepsByPercent(cur);
  });
})();
