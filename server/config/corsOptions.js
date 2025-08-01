// config/corsOptions.js

const allowedOrigins = [
  'http://localhost:5173', // Add your frontend dev URL
  // Add more allowed origins if needed
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman) or those in whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(' Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200, // For legacy browser support
};

export default corsOptions;
