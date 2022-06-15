# asgard

Asgard is a front-end service for our workshop-managing web application.

## Tech stack

- Vite
- React
- Typescript
- CSS Modules

## How to run

 - clone this repository: ```git clone https://github.com/folkvangrn/asgard.git```
 - execute ```docker-compose up```
 - done!

## User configuration

User can adjust the URL on which the backend is present by changing ```REACT_APP_BACKEND_URL``` environment variable in ```docekr-compose.yml``` file. 

Please note that for building your own docker image nginx.conf file is vital, as it contains settings for nginx server that publishes production version of our React app.

## Development setup
### Prerequisites

- [`npm`](https://www.npmjs.com/): >= 8.1.2
- [`node`](https://nodejs.org/en/): >= 16.13.2

### Usage

#### Install dependencies

To install all dependencies, run this command:

```bash
npm install
```

#### Launch the app locally

To run and develop application locally, run the following command:

```
npm run dev
```

### Build the production-ready application

To serve a production-ready website, run the following command:

```
npm run build
```

To check how production version looks like, run this command:

```
npm run preview
```

### Useful VS Code extensions:

- ESLint
- Prettier
- CSS Modules