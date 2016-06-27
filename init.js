function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function genData(xmin, xmax, ymin, ymax) {
  var data = [];
  var i = 0;

  while(i < 50) {
    data[i] = {
      x: getRandomArbitrary(xmin, xmax),
      y: getRandomArbitrary(ymin, ymax),
      color: 'red'
    };

    i++;
  }
  return data;
}

$(document).ready(

  function() {
    var data = genData(0, 100, 0, 100) // group A
      .concat(genData(150, 200, 0, 50)) // group B
      .concat(genData(200, 250, 200, 250)) // group C
      .concat(genData(0, 300, 0, 300)), // noise
      centroids = [
        {x: getRandomArbitrary(0, 300), y: getRandomArbitrary(0, 300), color: 'green'},
        {x: getRandomArbitrary(0, 300), y: getRandomArbitrary(0, 300), color: 'blue'},
        {x: getRandomArbitrary(0, 300), y: getRandomArbitrary(0, 300), color: 'orange'}
      ],
      graph = new Graph(data),
      kmean = new KMean(data, centroids),
      centroidConfig = {'r': 5, 'class': 'centroid'};

    graph.createAxis([0, 500], [0, 500]);
    graph.drawDots(kmean.data);
    graph.drawDots(kmean.centroids, centroidConfig);
    graph.drawLines(kmean.data);

    var refreshIntervalId = setInterval(function() {
      kmean.cluster();

      if(! kmean.update()) {
        clearInterval(refreshIntervalId);
      }

      graph.drawDots(kmean.data);
      graph.drawDots(kmean.centroids, centroidConfig);
      graph.drawLines(kmean.data);
    }, 500);
  });
