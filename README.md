# Store WebAPI

This project is a simple API for handling stock and purchase operations for products. The API supports adding stock, retrieving product information, and purchasing items with duplicate request detection and handling.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the API](#running-the-api)
- [Testing the API](#testing-the-api)
- [Endpoints](#endpoints)

## Requirements

To run this project, you need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [Newman](https://www.npmjs.com/package/newman) (for running the Postman collection tests)
- [Store-WebAPI Postman Collection]

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/store-webapi.git
    ```

2. Navigate to the project directory:

    ```bash
    cd store-webapi
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Testing the API

1. Installing newman

   ```bash
   npm install -g newman

2. Running the test in the terminal

   ```bash
   newman run ./Store-Webapi.postman_collection.json
