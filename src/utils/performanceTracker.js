const getNow = () => {
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  }
  return Date.now();
};

export const performanceTracker = {
  metrics: {
    renderTimes: [],
    inputLatencies: [],
    startTime: null
  },

  startMeasure() {
    this.metrics.startTime = getNow();
  },

  endMeasure(componentName) {
    if (this.metrics.startTime === null || this.metrics.startTime === undefined) return 0;
    const duration = getNow() - this.metrics.startTime;
    
    this.metrics.renderTimes.push({ componentName, duration });
    if (this.metrics.renderTimes.length > 50) this.metrics.renderTimes.shift();
    
    this.metrics.startTime = null;
    return Number(duration.toFixed(2));
  },

  trackInputLatency(startTime) {
    if (startTime === null || startTime === undefined) return;
    const latency = getNow() - startTime;
    
    this.metrics.inputLatencies.push(latency);
    if (this.metrics.inputLatencies.length > 50) this.metrics.inputLatencies.shift();
  },

  getAverageMetrics() {
    const avgRender = this.metrics.renderTimes.length 
      ? this.metrics.renderTimes.reduce((a, b) => a + b.duration, 0) / this.metrics.renderTimes.length
      : 0;
    
    const avgLatency = this.metrics.inputLatencies.length
      ? this.metrics.inputLatencies.reduce((a, b) => a + b, 0) / this.metrics.inputLatencies.length
      : 0;
    
    return {
      avgRenderTime: Number(avgRender.toFixed(2)),
      avgInputLatency: Number(avgLatency.toFixed(2)),
      smoothnessScore: avgLatency < 16 ? "60 FPS" : "Variable"
    };
  }
};
