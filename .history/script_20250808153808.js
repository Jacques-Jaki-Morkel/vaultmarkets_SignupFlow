(function () {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) {
    console.warn('No .progress-bar found on page.');
    return;
  }

  // Ensure runtime fill element exists (inserted at runtime only)
  let runtimeFill = progressBar.querySelector('.progress-fill-runtime');
  if (!runtimeFill) {
    runtimeFill = document.createElement('div');
    runtimeFill.className = 'progress-fill-runtime';
    // insert as first child so it sits behind the steps but inside .progress-bar
    progressBar.insertBefore(runtimeFill, progressBar.firstChild);

    // Inject styles for the runtime fill (matches the CSS track in your stylesheet)
    const style = document.createElement('style');
    style.id = 'progress-fill-runtime-style';
    style.textContent = `
      .progress-fill-runtime{
        position: absolute;
        left: 18px;
        right: 18px;
        height: 8px;
        top: 50%;
        transform: translateY(-50%) scaleX(0);
        transform-origin: left center;
        transition: transform 360ms cubic-bezier(.22,.9,.3,1);
        background: var(--progress-color, #c6922f);
        border-radius: 999px;
        z-index: 1;
        pointer-events: none;
        will-change: transform;
      }
    `;
    document.head.appendChild(style);
  }

  const steps = Array.from(progressBar.querySelectorAll('.progress-steps li'));

  // Helper: update steps' .is-completed based on percent
  function updateStepsByPercent(percent) {
    const trackRect = progressBar.getBoundingClientRect();
    const leftInset = parseFloat(getComputedStyle(progressBar).paddingLeft) || 18;
    const rightInset = parseFloat(getComputedStyle(progressBar).paddingRight) || 18;
    const trackLeft = trackRect.left + leftInset;
    const trackRight = trackRect.right - rightInset;
    const trackWidth = Math.max(1, trackRight - trackLeft);

    steps.forEach((li) => {
      const marker = li.querySelector('div');
      if (!marker) return;
      const markerRect = marker.getBoundingClientRect();
      const centerX = markerRect.left + markerRect.width / 2;
      const checkpointPercent = ((centerX - trackLeft) / trackWidth) * 100;
      if (percent + 0.5 >= checkpointPercent) li.classList.add('is-completed');
      else li.classList.remove('is-completed');
    });
  }

  // Robust setter: 0..100 (numbers or numeric strings)
  function setProgressPercent(percent) {
    const pct = Math.max(0, Math.min(100, Number(percent) || 0));
    // animate runtime fill (use scaleX 0..1)
    const scale = pct / 100;
    runtimeFill.style.transform = `translateY(-50%) scaleX(${scale})`;
    // also set CSS var in case other bits read it
    progressBar.style.setProperty('--progress-scale', String(scale));
    // set aria for accessibility
    progressBar.setAttribute('aria-valuenow', String(pct));
    // update completed step states
    updateStepsByPercent(pct);
  }

  // Convenience: map currentStep (1..N) to percent (with optional minPercent)
  function setProgressByStep(currentStep, totalSteps, minPercent = 0) {
    const step = Math.max(1, Math.min(totalSteps, Number(currentStep) || 1));
    const stepsCount = Math.max(1, Number(totalSteps) || 1);
    const t = (step - 1) / Math.max(1, (stepsCount - 1));
    const percent = Math.round(minPercent + t * (100 - minPercent));
    setProgressPercent(percent);
  }

  // Replace / expose on window.progressBehindUI
  window.progressBehindUI = window.progressBehindUI || {};
  window.progressBehindUI.setProgressPercent = setProgressPercent;
  window.progressBehindUI.setProgressByStep = setProgressByStep;

  // Initialize from current aria (if present) or default to 0
  const initial = Number(progressBar.getAttribute('aria-valuenow')) || 0;
  setProgressPercent(initial);

  // Recompute checkpoints on resize so completion thresholds stay correct
  window.addEventListener('resize', () => {
    const cur = Number(progressBar.getAttribute('aria-valuenow')) || 0;
    updateStepsByPercent(cur);
  });

  // Done: now calling window.progressBehindUI.setProgressPercent(87) will
  // animate the visible bar and toggle .is-completed on steps.
})();
