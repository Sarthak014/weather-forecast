import { BASE_IMG_URL } from "../constants/env.const";

export const getWeatherIcon = (code) => {
    return `${BASE_IMG_URL}${code}@2x.png`;
};
