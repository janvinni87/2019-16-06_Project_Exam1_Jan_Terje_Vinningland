function showISS() {
  var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'midhruvjaink, Tarun Prabhat, Tushar Sharma'
  }).addTo(map);

  $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
    var issIcon = L.divIcon({
      className: 'iss-icon',
      iconSize: [7, 7]
    });

    L.marker([data.iss_position.latitude, data.iss_position.longitude], {
      icon: issIcon
    }).addTo(map);

    if (ft) {
      map.panTo([data.iss_position.latitude, data.iss_position.longitude]);
      ft = false;
    }
  });

  setTimeout("showISS()", 5000);
}

function showTimeline() {

  $.getJSON('https://api.spacexdata.com/v3/launches/upcoming', function(data) {

    if (!data) {
      return;
    }

    data.forEach(function(element) {

      var ts = new Date(element.launch_date_utc);
      var node = document.createElement('div');
      node.className = 'entry';
      var textnode = document.createElement('div');
      textnode.className = 'title';
      textnode.innerHTML = element.mission_name + ' <span>' + ts.toDateString() + '</span>';

      var content = document.createElement('div');
      content.className = 'body';
      content.innerHTML = '<p>' + element.launch_site.site_name_long;
      textnode.appendChild(content);

      node.appendChild(textnode);
      document.getElementById('launches').appendChild(node);
    });

  });
}

if (document.getElementById('map')) {
  var map = L.map('map');
  var ft = true;
  map.setView([0, 0], 3);
  showISS();
}

if (document.getElementById('launches')) {
  showTimeline();
}
