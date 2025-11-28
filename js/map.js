 // 地図を作るよ
const map = L.map('map', {
  center: [36.3708, 140.4760],
  zoom: 17,
  minZoom: 13,  // 修正
  maxZoom: 18,
  maxBounds: [
    [36.34, 140.45],
    [36.40, 140.50]
  ],
  maxBoundsViscosity: 0
});

// OpenStreetMapのタイルを読み込み
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  noWrap: true,
  bounds: [
    [36.25, 140.35],
    [36.45, 140.60]
  ]
}).addTo(map);

// 水戸駅マーカー
var marker = L.marker([36.3708, 140.4760]).addTo(map);
marker.bindPopup('水戸駅');
marker.on('click', function() {
  document.getElementById('parkingModalLabel').textContent = "水戸駅";
  document.querySelector('#parkingModal .modal-body').innerHTML = `
    <p>水戸駅の情報</p>
  `;
  $('#parkingModal').modal('show');
});

// GeoJSON読み込み
fetch('geo_test.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  });


// マーカークリックでモーダルを開く
marker.on('click', function() {
  document.getElementById('parkingModalLabel').textContent = "テスト駐車場";
  document.querySelector('#parkingModal .modal-body').innerHTML = `
    <p>この辺に詳細</p>
<p>ここに駐車場情報を表示します。ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</p>
  `;
  
  // Bootstrapのモーダルを開く
  $('#parkingModal').modal('show');
});