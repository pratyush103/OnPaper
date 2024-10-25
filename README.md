# OnPaper

#### Introduction
OnPaper is a Tauri-based cross-platform paper trading application. The frontend is built using Tauri and integrates various backend technologies to provide a seamless trading experience. Users can simulate trading activities and manage their portfolios using real-time market data and advanced search capabilities.

#### Features
- Cross-platform desktop application using Tauri+React in Vite
- User authentication and role-based access control with Firebase Authentication
- Real-time data storage using Firebase Realtime Database
- Middleware microservices using a .NET web API (details at [Paper-Trading](https://github.com/siddhantsnaik/Paper-Trading))
- Typesense search for fast querying of stock records
- Market data integration via ICICI direct breeze API and TradingView

#### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

#### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pratyush103/OnPaper.git
   cd OnPaper
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Build the Application**
   ```bash
   npm run build
   ```

#### Configuration
- **Firebase Configuration**: Update the Firebase configuration in your environment settings.
- **API Keys and Credentials**: Ensure that all necessary API keys (Firebase, ICICI direct breeze API, Typesense) are correctly set up.

#### Usage

- **Starting the Application**
   ```bash
   npm run tauri
   ```

- **Accessing Features**
  - **Authentication**: Sign up or log in using Firebase Authentication.
  - **Trading**: Simulate trades and manage your portfolio.
  - **Search**: Use Typesense-powered search to find stocks quickly.

#### Contributing
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

#### License
This project is licensed under the MIT License.

Feel free to add more details or sections as necessary. If you have any questions or need further customization, please let me know!


