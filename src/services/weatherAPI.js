import axios from "axios";

const API_KEY = "d6d4d58f1ae678d6d0f8345c0d5cf008"; // Substitua pela sua chave de API
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherForecast = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
        lang: "pt_br",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar previsão do tempo:", error);
    throw error;
  }
};

export const getCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
        lang: "pt_br",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clima atual:", error);
    throw error;
  }
};
