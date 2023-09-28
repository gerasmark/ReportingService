# Reporting Service 
## Project Overview
Our web application is a comprehensive system designed to manage and retrieve sensor readings of temperature, humidity, and acoustic data. It seamlessly integrates MongoDB for data storage and MongoDB Compass for efficient database management. The backend server is powered by Python with Django, providing robust functionality and a user-friendly API. The frontend is built with Next.js a popular React framework.
## REST API Endpoints
1)Retrieve All Sensor Readings

Endpoint: /sensorReadings/, Get Requet

Description: Access all available sensor readings, providing a comprehensive view of your data.

2)Filtered Data Retrieval

Endpoint: /sensorReadings/, Post Request

Description: Easily filter data based on specific criteria, including sensor type, location, and time, allowing you to retrieve relevant information tailored to your needs.

3)Sensor Metrics

Endpoint: /sensorMetrics/

Description: Obtain vital metrics for your sensor data, including mean value, minimum value, maximum value, range of values, and the top ten recorded values. This feature simplifies data analysis and decision-making.

## Quick Start
To get this project up and running locally on your computer follow the following steps.
1. Clone this repository

2. Set up docker engine
3. Create .env file with DB_USER, DB_PASSWORD and SECRET_KEY for the DjangoAPI
4. Run the following commands
```
docker-compose build
docker-compose up
```
## Usage
Open your web browser and navigate to the frontend at http://localhost:3000.

Explore the sensor readings and metrics by clicking on the /sensorReadings and /sensorMetrics pages.
##BYE

The backend API is available at http://localhost:8000. You can interact with it using API requests.
