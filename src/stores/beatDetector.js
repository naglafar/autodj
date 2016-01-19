// lifted from https://github.com/JMPerez/beats-audio-api/blob/gh-pages/script.js - thank you JMPerez :)

const getPeaksAtThreshold = (data, threshold) => {
  var peaksArray = [];
  var length = data.length;
  for (var i = 0; i < length;) {
    if (data[i] > threshold) {
      peaksArray.push(i);
      // Skip forward ~ 1/4s to get past this peak.
      i += 10000;
    }
    i++;
  }
  return peaksArray;
};

// Function used to return a histogram of peak intervals
const countIntervalsBetweenNearbyPeaks = (peaks) => {
  var intervalCounts = [];
  peaks.forEach(function(peak, index) {
    for (var i = 0; i < 10; i++) {
      var interval = peaks[index + i] - peak;
      var foundInterval = intervalCounts.some(function(intervalCount) { // eslint-disable-line no-loop-func
        if (intervalCount.interval === interval) {
          return intervalCount.count++;
        }
      });
      if (!foundInterval) {
        intervalCounts.push({
          interval: interval,
          count: 1
        });
      }
    }
  });
  return intervalCounts;
};

// Function used to return a histogram of tempo candidates.
const groupNeighborsByTempo = (intervalCounts, sampleRate) => {
  var tempoCounts = [];
  intervalCounts.forEach(function(intervalCount) {
    if (intervalCount.interval !== 0) {
      // Convert an interval to tempo
      var theoreticalTempo = 60 / (intervalCount.interval / sampleRate);

      // Adjust the tempo to fit within the 90-180 BPM range
      while (theoreticalTempo < 90) {
        theoreticalTempo *= 2;
      }
      while (theoreticalTempo > 180) {
        theoreticalTempo /= 2;
      }

      theoreticalTempo = Math.round(theoreticalTempo);
      var foundTempo = tempoCounts.some(function(tempoCount) {
        if (tempoCount.tempo === theoreticalTempo) {
          tempoCount.count += intervalCount.count;
          return tempoCount.count;
        }
      });
      if (!foundTempo) {
        tempoCounts.push({
          tempo: theoreticalTempo,
          count: intervalCount.count
        });
      }
    }
  });
  return tempoCounts;
};

module.exports = {
  getPeaksAtThreshold: getPeaksAtThreshold,
  countIntervalsBetweenNearbyPeaks: countIntervalsBetweenNearbyPeaks,
  groupNeighborsByTempo: groupNeighborsByTempo
};
