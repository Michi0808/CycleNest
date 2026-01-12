import express from 'express';
import cors from 'cors';
import router from './router.js';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SECRET = process.env.SECRET;

const app = express();

const corsConfig = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsConfig));

app.use(express.json());

app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: 'lax',
      httpOnly: true,
      // In production, set secure: true so cookies are only sent over HTTPS
      secure: false,
    },
  })
);

app.use(router);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
