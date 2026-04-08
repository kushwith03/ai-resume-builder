export const performanceTracker = {
  metrics: {
    renderTimes: [],
    inputLatencies: [],
    startTime: null
  },

  startMeasure() {
    this.metrics.startTime = performance.now();
  },

  endMeasure(componentName) {
    if (!this.metrics.startTime) return 0;
    const duration = performance.now() - this.metrics.startTime;
    this.metrics.renderTimes.push({ componentName, duration });
    this.metrics.startTime = null;
    return duration.toFixed(2);
  },

  trackInputLatency(startTime) {
    if (!startTime) return;
    const latency = performance.now() - startTime;
    this.metrics.inputLatencies.push(latency);
  },

  getAverageMetrics() {
    const avgRender = this.metrics.renderTimes.length 
      ? this.metrics.renderTimes.reduce((a, b) => a + b.duration, 0) / this.metrics.renderTimes.length
      : 0;
    
    const avgLatency = this.metrics.inputLatencies.length
      ? this.metrics.inputLatencies.reduce((a, b) => a + b, 0) / this.metrics.inputLatencies.length
      : 0;
    
    return {
      avgRenderTime: avgRender.toFixed(2),
      avgInputLatency: avgLatency.toFixed(2),
      smoothnessScore: avgLatency < 16 ? "60 FPS" : "Variable"
    };
  }
};
