# Your Daily Rundown Frontend

Welcome to the frontend repository for YourDailyRundown! This repository contains the source code for the frontend of YourDailyRundown, an email service designed to summarize news articles and deliver them to users. The frontend is built using React and Chakra UI.


Live Demo: https://your-daily-rundown.vercel.app/ <br/>
Backend Link: https://github.com/GiridharRNair/YourDailyRundownBackend 

Example email sent by the backend:
<img src="public/DemoGif.gif" alt="Screenshot">

## Components

### HomePage (pages/HomePage.jsx)
The HomePage component is responsible for user registration. Users can provide their first name, last name, email address, and select their preferences from a list of categories. When submitted, this data is sent to the backend for registration.

### Unsubscribe (pages/Unsubscribe.jsx)
The Unsubscribe component allows users to unsubscribe from YourDailyRundown. Users provide feedback (optional) and confirm their unsubscribe action. The component fetches user information from the backend using a UUID parameter.

### ChangePreferences (pages/ChangePreferences.jsx)
The ChangePreferences component allows users to update their preferences, including their first name, last name, and category selections. Users can modify their preferences after initial registration. The component fetches user information from the backend using a UUID parameter.

### Environment Variables
To run the YourDailyRundown Frontend, you'll need to set the following environment variables:

`VITE_FLASK_BACKEND`=Backend URL <br/>

## Installation and Setup
1. Clone the repository to your local machine and change into the working directory using `cd YourDailyRundown`.
2. Install the required dependencies using `npm install`.
3. Start the development server with `npm run dev`.
4. Access the app in your browser at `http://localhost:5173/`.

## License
This project is licensed under the MIT License.
Feel free to contribute to this project by opening issues or pull requests.