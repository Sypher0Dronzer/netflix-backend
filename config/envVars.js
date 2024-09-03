import dotenv from "dotenv";

dotenv.config();


export const ENV_VARS = {
	MONGO_URI: process.env.MONGO_URI,
	MONGO_LOCALDB: process.env.MONGO_LOCALDB,
	PORT: process.env.PORT || 5000,
	TMDB_API_KEY: process.env.TMDB_API_KEY,
	SESSION_SECRET:process.env.SESSION_SECRET,
	TMDB_API_KEY:process.env.TMDB_API_KEY,
	NODE_ENV: process.env.NODE_ENV,

};