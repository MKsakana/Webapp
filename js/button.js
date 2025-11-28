// ボタン
let filtersVisible = false;

document.getElementById('option-btn').addEventListener('click', () => {
  const filters = document.querySelectorAll('.filter-btn');
  filtersVisible = !filtersVisible;

  filters.forEach(btn => {
    if (filtersVisible) {
      btn.style.display = 'block';
      btn.disabled = false;
    } else {
      btn.style.display = 'none';
      btn.disabled = true;
    }
  });
});

// 現在地ボタン機能
document.getElementById('locate-btn').addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('位置情報が取得できません（対応していないブラウザです）');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      map.setView([lat, lon], 16); // 現在地にズーム
      L.marker([lat, lon]).addTo(map).bindPopup('現在地').openPopup();
    },
    (error) => {
      alert('位置情報が取得できませんでした：' + error.message);
    }
  );
});