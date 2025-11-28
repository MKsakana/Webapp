 // 地図を作るよ
const map = L.map('map', {
  center: [36.3708, 140.4760],
  zoom: 14,
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
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function(feature, layer) {
        const props = feature.properties;
        
        layer.bindPopup(`
          <h4>${props.名前}</h4>
          <p>駐車台数: ${props.台数}</p>
          <p>初心者おすすめ: ${props.初心者おすすめ}</p>
        `);
        
        layer.on('click', function() {
          document.getElementById('parkingModalLabel').textContent = props.名前;
          document.querySelector('#parkingModal .modal-body').innerHTML = `
            <p><strong>駐車台数:</strong> ${props.台数}</p>
            <p><strong>初心者おすすめ:</strong> ${props.初心者おすすめ}</p>
          `;
          $('#parkingModal').modal('show');
        });
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error('GeoJSON読み込みエラー:', error);
    alert('駐車場データの読み込みに失敗しました');
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