# Weather Forecast

Stay informed about temperature variations, precipitation chances, wind conditions, and more, all at your fingertips for any location you desire, whether it's your current position or a destination on your radar along with a comprehensive 5-day forecast.

URL: [Weather Forecast](https://clever-lokum-e1d7a4.netlify.app/)

# Install

This project uses [node](https://nodejs.org/en) and [npm](https://www.npmjs.com/). You can go check them out if you don't have them locally installed.


# Getting Started

1. Clone the repository using the below command or download the zip folder:
```bash
git clone git@github.com:Sarthak014/weather-forecast.git
```

2. Navigate to the project directory:
```bash
cd weather-forecast
```

3. Install dependencies:
```bash
npm install
```

4. Create an `env.const.js` file under "/src/constants/" and `export` the following key variables:
```bash
API_KEY=<string>
BASE_URL=<string> #Openweather API url i.e. "https://api.openweathermap.org/data"
BASE_IMG_URL="http://openweathermap.org/img/wn/"
```

5. After successfully installation, Run the application using the below command:
```bash
npm run dev
```

