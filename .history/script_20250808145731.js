// progressValue is 0..100
function setProgress(el, progressValue) {
  const scale = Math.max(0, Math.min(1, progressValue / 100));
  el.style.setProperty('--progress-scale', scale);
}
const bar = document.querySelector('.progress .progress__fill');
setProgress(bar, 80); // 87% -> scale 0.87
