 // 地図を作るよ
const map = L.map('map', {
  center: [36.3708, 140.4760],
  zoom: 17,
  minZoom: 14,  // 修正
  maxZoom: 18,
  maxBounds: [
    [36.34, 140.45],
    [36.40, 140.50]
  ],
  maxBoundsViscosity: 0
});

// OpenStreetMapのタイルを読み込み。
// nowrap以降で地図範囲を設定。
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  noWrap: true,
  bounds: [
    [36.25, 140.35],
    [36.45, 140.60]
  ]
}).addTo(map);

// 水戸駅マーカー(サンプル用)
var marker = L.marker([36.3708, 140.4760]).addTo(map);
marker.bindPopup('水戸駅');
marker.on('click', function() {
  document.getElementById('parkingModalLabel').textContent = "水戸駅";
  $('#parkingModal').modal('show');
});

// マーカークリックでモーダルを開く
marker.on('click', function() {
  document.getElementById('parkingModalLabel').textContent = "テスト駐車場";
  document.querySelector('#parkingModal .modal-body').innerHTML = `
    <p>この辺に詳細</p>
<p>ここに駐車場情報を表示します。</p>
  `;
  
  // Bootstrapのモーダルを開く
  $('#parkingModal').modal('show');
});

// GeoJSONファイルを読み込む（GeoJSONファイルはindex.htmlと同じ階層にあります）
fetch('geo_test.geojson')
  .then(res => res.json())
  .then(data => {
     L.geoJSON(data, {
      onEachFeature: function(feature, layer) {
        const props = feature.properties;
		  
		    // 1. ポップアップを設置
        layer.bindPopup(`
          <div class="popup-content">
            <h4>${props.名前}</h4>
           <p>初心者おすすめ: ${props.初心者おす ? props.初心者おす[0] : ""}</p>

          </div>
        `);
		  

        // 2. ポップアップが開いた瞬間に、クリック→モーダルの処理を追加
        layer.on('popupopen', function(e) {
          const popupEl = e.popup._container;

          popupEl.addEventListener('click', function() {
            document.getElementById('parkingModalLabel').textContent = props.名前;
			 //以下にモーダルの内容。表からデータを取得。
            document.querySelector('#parkingModal .modal-body').innerHTML = `
              <p><strong>駐車台数:</strong> ${props.台数}</p>
              <p><strong>初心者おすすめ:</strong> ${props.初心者おす}</p>
			 <p>Memo:<br> ${props.備考}</p>
            `;
            $('#parkingModal').modal('show');
          });
        });
      }
    }).addTo(map);
  });