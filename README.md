
---

# API Contract Tool

This is an **API Contract Tool** project, similar to **Swagger**, built with **React JS**. The tool allows users to interact with various APIs and databases in a simple and efficient way. The app is fully authenticated, with **Google login** functionality, and offers a smooth user experience.

## Key Features

- **Firebase Integration**: The app uses **Firebase** as the database, ensuring real-time updates and secure data storage.
  
- **Login Authentication**: Users can log in to the app using **Google Authentication**, providing a seamless login experience.

- **Main Features on the Homepage**: The homepage highlights the core features, where users can make API requests to different databases.

- **API Requests**: Users can send API requests to various databases and view the responses in two formats:
  - **Tree View**: A hierarchical structure for visualizing the response.
  - **Input Form View**: Displays the response in an editable input form layout.

- **Database & API Management**: 
  - The app allows users to add new databases and APIs dynamically.
  - Users can add APIs using a **drawer** interface, which includes **nested input fields** to facilitate detailed configurations.

## Technologies Used

- **React JS**: The core library for building the user interface.
- **Firebase**: Used for database management and authentication (Google login).
- **Axios**: For making API requests.
- **Redux & Redux Thunk**: To handle state management and asynchronous actions.
- **Mantine UI**: A modern and customizable UI library used for the interface.
- **Fortawesome**: For scalable and customizable icons throughout the app.
- **SCSS**: To style the application with reusable and customizable components.

## Installation & Setup

To run this project locally, follow the steps below:

### 1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/api-contract-tool.git
   ```

### 2. Navigate to the project directory:
   ```bash
   cd api-contract-tool
   ```

### 3. Install dependencies:
   ```bash
   npm install
   ```

### 4. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Google authentication in the Firebase Authentication section.
   - Create a `.env` file and add your Firebase configuration.

### 5. Run the development server:
   ```bash
   npm start
   ```


## Usage

1. **Login**: Log in to the app using your Google account.
2. **Add Databases**: Use the drawer interface to add new databases and APIs.
3. **Make API Requests**: Select a database and send an API request.
4. **View Responses**: Responses can be viewed in either tree format or input form format.
5. **Manage APIs**: Easily manage and add more APIs with nested input fields for detailed configurations.



---

