import axios from "axios";

export default {
  // namespaced: 하나의 store에서 모듈화하여 사용할 수 있음을 명시적으로 나타냄
  namespaced: true,
  state: {
    position: {
      lat: 37.566536,
      lon: 126.977966,
    },
    cityName: "Seoul",
    currentWeather: {
      // MainView.vue
      temp: 0,
      humidity: 0,
      windSpeed: 0,
      feelsLike: 0,
      // SubView.vue
      sunrise: 0,
      sunset: 0,
      visibility: 0,
    },
    hourlyWeather: [],
    images: [],
  },
  getters: {

  },
  mutations: {
    SET_LATLON(state, payload) {
      state.position.lat = payload.Ma;
      state.position.lon = payload.La;
    },
    SET_CITYNAME(state, payload) {
      state.cityName = payload;
    },
    SET_CURRENT_WEATHER(state, payload) {
      state.currentWeather.temp = Math.round(payload.temp); // 현재온도
      state.currentWeather.humidity = payload.humidity; // 습도
      state.currentWeather.windSpeed = payload.wind_speed; // 풍속
      state.currentWeather.feelsLike = Math.round(payload.feels_like); // 체감온도
      state.currentWeather.sunrise = payload.sunrise; // 일출시간
      state.currentWeather.sunset = payload.sunset; // 일몰시간
      state.currentWeather.visibility = payload.visibility; // 가시거리
  },
    SET_TIMELY_WEATHER(state, payload) {
      state.hourlyWeather = payload;
    },
    SET_IMAGEPATH(state, payload) {
      state.images = payload;
    }
  },
  actions: {
    async FETCH_OPENWEATHER_API(context) {
      const API_KEY = "813cc1b7cc8c4d85aa57ef2a0ca293c9";
      const INITIAL_LAT = 37.566536;
      const INITIAL_LON = 126.977966;

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${INITIAL_LAT}&lon=${INITIAL_LON}&appid=${API_KEY}&units=metric`);

          const images = [];
          for (let i = 0; i < 48; i++) {
              const weatherIcon = response.data.hourly[i].weather[0].icon;
              images[i] = `public/images/${weatherIcon}.png`;
          }

          context.commit('SET_IMAGEPATH', images);
          context.commit('SET_CURRENT_WEATHER', response.data.current); // 조회하는 현재시간에 대한 날씨데이터
          context.commit('SET_TIMELY_WEATHER', response.data.hourly); // 시간대별 날씨데이터
      } catch (e) {
        console.log(e);
      }
    }
  }
}