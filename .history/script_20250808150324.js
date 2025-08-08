(function () {
    const progressBar = document.querySelector('.progress-bar');
    const fill = progressBar.querySelector('.progress-fill');
    const steps = Array.from(progressBar.querySelectorAll('.progress-steps li'));

    /**
     * Set progress by percent (0..100)
     * @param {number} percent
     */
    function setProgressPercent(percent) {
        const pct = Math.max(0, Math.min(100, Math.round(percent)));
        // set CSS var for transform scale (0..1)
        const scale = pct / 100;
        fill.style.setProperty('--progress-scale', scale);
        // update aria
        progressBar.setAttribute('aria-valuenow', String(pct));
        // update step classes (mark steps that are <= current percent)
        updateStepStatesByPercent(pct);
    }

    /**
     * Set progress by step index (1..N)
     * Maps step positions evenly across 0..100%.
     * Optionally provide minPercent to ensure first step is not 0 (e.g. 5).
     * @param {number} currentStep - 1-based index
     * @param {number} totalSteps
     * @param {number} [minPercent=0] optional minimum percent for step 1
     */
    function setProgressByStep(currentStep, totalSteps, minPercent = 0) {
        const step = Math.max(1, Math.min(totalSteps, Math.floor(currentStep)));
        const stepsCount = Math.max(1, totalSteps);
        // Map 1..N to minPercent..100 linearly (positions across the range)
        const t = (step - 1) / Math.max(1, (stepsCount - 1));
        const percent = Math.round(minPercent + t * (100 - minPercent));
        setProgressPercent(percent);
        // set active classes: mark steps with index < currentStep as active, and current as active too
        steps.forEach((li, i) => {
            if (i < step) li.classList.add('is-active'); else li.classList.remove('is-active');
        });
    }

    /**
     * Update step states based on percent
     * This marks a step active when the progress reaches or passes that step's position.
     */
    function updateStepStatesByPercent(percent) {
        const total = steps.length;
        steps.forEach((li, i) => {
            // compute this step's position (0..100)
            const stepPos = (i / Math.max(1, total - 1)) * 100;
            if (percent >= stepPos - 0.5) { // small tolerance
                li.classList.add('is-active');
            } else {
                li.classList.remove('is-active');
            }
        });
    }

    // Expose to window for your app to call after user answers a question:
    window.progressUI = {
        setProgressPercent,
        setProgressByStep
    };

    // Optional: initialize to first step
    // If you prefer page 1 to display some minimal non-zero progress set minPercent > 0
    // Example: setProgressByStep(1, steps.length, 5);
    setProgressByStep(1, steps.length, 0);
})();