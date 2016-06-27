function KMean(datapoints, centroids) {
  this.data = datapoints;
  this.centroids = centroids;

  this.cluster = function () {
    var self = this;

    function getDistancesForCluster(centroid, d) {
      return {c: centroid, distance: self._distance(d, centroid)};
    }

    function getMinCentroid(d) {
      return self.centroids.map(function (c) {
        return getDistancesForCluster(c, d);
      }).sort(function (cdA, cdB) {
        return cdA.distance - cdB.distance;
      })[0].c;
    }

    self.data = self.data.map(function(d) {
      d.cluster = getMinCentroid(d);
      return d;
    });
  };

  this.update = function() {
    return this.centroids.map(function (centroid) {
      var newCords = this._calculateMean(centroid);
      var hasUpdated = newCords[0] != centroid.x || newCords[1] != centroid.y;

      centroid.x = newCords[0];
      centroid.y = newCords[1];
      return hasUpdated;
    }, this).some(function(updated) {
      return updated;
    });
  };

  this._calculateMean = function(centroid) {
    var cluster = this.data.filter(function (d) {
      return d.cluster == centroid
    }, this);

    if(!cluster.length) {
      return [0,0];
    }

    var total = cluster.reduce(function(result, d) {
      return [ result[0] + d.x, result[1] + d.y];
    }, [0,0]);

    return [total[0] /cluster.length, total[1] / cluster.length];
  };

  this._distance  = function(point_a, point_b) {
    var minToMax = [point_b.x, point_a.x].sort();
    var minToMaxY = [point_b.y, point_a.y].sort();
    return ( Math.pow(minToMax[0] - minToMax[1], 2) + Math.pow(minToMaxY[0] - minToMaxY[1], 2))
  };
}
