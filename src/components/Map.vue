<template>
  <div id="mapContainer">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import MapPositions from '~/assets/map-positions.json';
export default {
  data() {
    return {

    }
  },
  methods: {
    initMap() {
      const container = this.$refs.map;
      const options = {
        center: new kakao.maps.LatLng(37.544008, 127.053655), // 지도의 중심 좌표
        level: 13, // 지도의 확대 레벨
      };
      const kakaoMap = new kakao.maps.Map(container, options);
      const positions = MapPositions.map((pos) => ({
        latlng: new kakao.maps.LatLng(...pos.latlng),
        cityName: pos.cityName,
      }));

      // 마커 생성
      positions.forEach((pos) => {
        let marker = new kakao.maps.Marker({
          position: pos.latlng, // 마커 위치
        });
        // 마커 표시
        marker.setMap(kakaoMap);

        kakao.maps.event.addListener(marker, "click", () => {
          this.$store.commit('openWeatherApi/SET_CITYNAME', pos.cityName);
          this.$store.commit('openWeatherApi/SET_LATLON', marker.getPosition());
          this.$store.dispatch('openWeatherApi/FETCH_OPENWEATHER_API');
        })
      });
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=8e8686da779ffc8a0512b73a23398837';
      document.head.appendChild(script);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main";

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>