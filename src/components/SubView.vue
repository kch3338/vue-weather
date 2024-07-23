<template>
  <div class="rightContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>{{ currentCity }}</p>
        <p>{{ currentTime }}</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">Forecast</button>
          <button class="airquality">Air Quality</button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="airCondition">
          <p>{{ feeling }}</p>
        </div>
        <div class="detail">
          <div class="title">
            <p>상세 날씨 데이터</p>
          </div>
          <div v-for="(data, index) in subWeatherData" :key="index" class="data">
            <div class="dataName">
              <p></p>
              <p>{{ data.name }}</p>
            </div>
            <div class="dataValue">
              <p>{{ data.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Map />
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>

<script>
import {ref} from "vue";
import Map from "./Map.vue";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs().locale("ko");

export default {
  components: {
    Map
  },
  setup() {
    const currentTime = dayjs().format("YYYY. MM. DD. ddd");
    let currentCity = ref("");
    let feeling = ref("");
    let subWeatherData = ref([]);

    function convertTimestamp(unixDate) {
      const date = new Date(unixDate * 1000);
      const hour = date.getHours().toString();
      return hour.padStart(2, "0") + "시";
    }

    function getFeelsLikeName(feel) {
      if(feel > 30) { return "매우 더움"; }
      if(feel <= 30) { return "더움"; }
      if(feel <= 25) { return "보통"; }
      if(feel <= 20) { return "선선함"; }
      if(feel <= 15) { return "쌀쌀함"; }
      if(feel <= 10) { return "추움"; }
      if(feel <= 0) { return "매우 추움"; }
    }

    const fetchOpenWeatherApi = () => {
      const response = {
        timezone: "Asia/Seoul",
        lat: "37.5665",
        lon: "126.978",
        current: {
          feels_like: 25.97,
          sunrise: 1720037746,
          sunset: 1720090612,
          visibility: 6000,
        },
      }

      const currentData = [
        { name: "일출시간", value: convertTimestamp(response.current.sunrise) },
        { name: "일몰시간", value: convertTimestamp(response.current.sunset) },
        { name: "가시거리", value: response.current.visibility.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "m" }
      ];

      currentCity.value = response.timezone;
      feeling.value = getFeelsLikeName(response.current.feels_like);
      subWeatherData.value = currentData;
    }
    fetchOpenWeatherApi();

    return {
      currentTime,
      currentCity,
      feeling,
      subWeatherData,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main";

.rightContainer {
  // width: 40%;
  // height: 100%;
  width: 324px;
  min-width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#cb0000, #0e1239);
  box-shadow: 5px 5px 10px gray;

  #cityNameBox {
    width: 100%;
    height: 10%;

    .cityName {
      @include c-center;
      width: 100%;
      height: 100%;

      p {
        color: white;
        font-family: 'Poppins', sans-serif;
        line-height: 2.5;
        text-align: center;

        &:first-child {
          width: 241px;
          height: 33px;
          font-size: 1.35rem;
        }
        &:last-child {
          width: 160px;
          height: 19px;
          font-size: 0.9rem;
          font-weight: 100;
        }
      }
    }
  }

  #contentsBox {
    width: 100%;
    height: calc(45% - 16px);
    margin-top: 16px;

    .buttonBox {
      @include center;
      width: 100%;
      height: 20%;

      .buttonBackground {
        width: 224px;
        height: 35px;
        background-color: #370505;
        border-radius: 10px;
        display: flex;

        button {
          width: 112px;
          height: 35px;
          border: 0;
          border-radius: 7.5px;
          outline: 0;
          cursor: pointer;
          &.forecast {
            background-color: transparent;
            color: #a52727;
          }
          &.airquality {
            background: #ff0000;
            color: white;
          }
        }
      }
    }
    .weatherBox {
      width: 100%;
      height: 80%;

      .airCondition {
        @include center;
        width: 100%;
        height: 35%;

        p {
          text-align: center;
          font-size: 2.25rem;
          font-weight: 500;
          font-family: 'GmarketSansBold';
          color: #fff;
        }
      }
      .detail {
        width: 100%;
        height: 65%;

        .title {
          @include center;
          width: 100%;
          height: 25%;
          color: white;

          p {
            font-family: 'LeferiPoint-WhiteObliqueA';
          }
        }
        .data {
          display: flex;
          width: 100%;
          height: 27.5%;
          // background-color: rgb(187, 127, 255);

          .dataName {
            display: flex;
            align-items: center;
            width: 50%;
            height: 100%;
            font-family: 'LeferiPoint-WhiteObliqueA';

            p {
              &:first-child {
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #ffde23;
                margin-left: 50px;
              }
              &:last-child {
                margin-left: 10px;
                color: white;
                font-weight: 300;
                font-size: 0.9rem;
              }
            }
          }
          .dataValue {
            display: flex;
            align-items: center;
            justify-content: right;
            width: 50%;
            height: 100%;
            font-family: 'LeferiPoint-WhiteObliqueA';

            p {
              color: white;
              font-weight: 300;
              margin-right: 50px;

              span {
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }

  nav {
    @include center-sb;
    width: calc(100% - 100px);
    height: 10%;
    padding: 0 50px;

    i {
      color: rgb(255, 255, 255);
      font-size: 1.15rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: #799ed0;
      }
    }
  }
}
</style>