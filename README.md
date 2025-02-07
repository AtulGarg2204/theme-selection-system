# Theme Selection System

A MERN stack application enabling users to browse website templates based on preferences and vendors to manage their submissions.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/AtulGarg2204/theme-selection-system.git
cd theme-selection-system
```

## Installation

### Prerequisites
- Node.js
- MongoDB
- npm/yarn

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Features

- Dynamic theme filtering by website type and design tone
- Real-time updates without page refresh
- Vendor dashboard with full CRUD operations
- Responsive design with Material UI
- Status tracking for submissions

## API Endpoints

- GET `/api/images/get-approved`: Fetch approved images
- POST `/api/images/add`: Add new image
- PUT `/api/images/update/:id`: Update image
- DELETE `/api/images/delete/:id`: Remove image

## Project Structure
```
theme-selection-system/
├── backend/
│   ├── models/
│   │   └── Image.js
│   ├── routes/
│   │   └── images.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ThemeSelector.js
    │   │   └── VendorDashboard.js
    │   └── App.js
    └── public/
```

## Contact
For questions or feedback, contact Atul Garg:
- GitHub: [@AtulGarg2204](https://github.com/AtulGarg2204)

