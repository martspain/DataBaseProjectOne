CREATE TABLE Account (
	username VARCHAR(32) PRIMARY KEY,
	password VARCHAR(32) NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT,
	email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Subscription (
	id SERIAL PRIMARY KEY,
	start_date DATE NOT NULL DEFAULT CURRENT_DATE,
	renewal_date DATE NOT NULL,
	username VARCHAR(32) NOT NULL UNIQUE,
	CONSTRAINT FK_Subscription_Account FOREIGN KEY (username) REFERENCES Account (username)
);

CREATE TABLE Manager (
	id SERIAL PRIMARY KEY,
	username VARCHAR(32) NOT NULL UNIQUE,
	CONSTRAINT FK_Manager_Account FOREIGN KEY (username) REFERENCES Account (username)
);

CREATE TABLE Artist (
	id VARCHAR(50) PRIMARY KEY,
	artistic_name VARCHAR(50) NOT NULL,
	username VARCHAR(32) NOT NULL,
	CONSTRAINT FK_Artist_Account FOREIGN KEY (username) REFERENCES Account (username)
);

CREATE TABLE Album (
	id VARCHAR(50) PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	preview_url TEXT,
	launch_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE Album_Artist (
	album_id VARCHAR(50) NOT NULL,
	artist_id VARCHAR(50) NOT NULL,
	CONSTRAINT FK_Album_Artist_Album FOREIGN KEY (album_id) REFERENCES Album (id),
	CONSTRAINT FK_Album_Artist_Artist FOREIGN KEY (artist_id) REFERENCES Artist (id),
	PRIMARY KEY (album_id, artist_id)
);

CREATE TABLE Song (
	id VARCHAR(50) PRIMARY KEY,
	name TEXT NOT NULL,
	duration_ms INT NOT NULL,
	active BOOLEAN NOT NULL DEFAULT '1',
	preview_url TEXT,
	album_id VARCHAR(50),
	CONSTRAINT FK_Song_Album FOREIGN KEY (album_id) REFERENCES Album (id)
);

CREATE TABLE Genre (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE Song_Genre (
	song_id VARCHAR(50) NOT NULL,
	genre_id INT NOT NULL,
	CONSTRAINT FK_Song_Genre_Song FOREIGN KEY (song_id) REFERENCES Song (id),
	CONSTRAINT FK_Song_Genre_Genre FOREIGN KEY (genre_id) REFERENCES Genre (id),
	PRIMARY KEY (song_id, genre_id)
);

CREATE TABLE Reproduction (
	id SERIAL PRIMARY KEY,
	rep_date DATE NOT NULL DEFAULT CURRENT_DATE,
	song_id VARCHAR(50) NOT NULL,
	username VARCHAR(32) NOT NULL,
	CONSTRAINT FK_Reproduction_Song FOREIGN KEY (song_id) REFERENCES Song (id),
	CONSTRAINT FK_Reproduction_Account FOREIGN KEY (username) REFERENCES Account (username)
);

CREATE TABLE Song_Artist (
	song_id VARCHAR(50) NOT NULL,
	artist_id VARCHAR(50) NOT NULL,
	CONSTRAINT FK_Song_Artist_Song FOREIGN KEY (song_id) REFERENCES Song (id),
	CONSTRAINT FK_Song_Artist_Artist FOREIGN KEY (artist_id) REFERENCES Artist (id),
	PRIMARY KEY (song_id, artist_id)
);

CREATE TABLE Playlist (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT,
	date_creation DATE NOT NULL DEFAULT CURRENT_DATE,
	username VARCHAR(32) NOT NULL,
	CONSTRAINT FK_Playlist_Account FOREIGN KEY (username) REFERENCES Account (username)
);

CREATE TABLE Playlist_Song (
	playlist_id INT NOT NULL,
	song_id VARCHAR(50) NOT NULL,
	CONSTRAINT FK_Playlist_Song_Playlist FOREIGN KEY (playlist_id) REFERENCES Playlist (id),
	CONSTRAINT FK_Playlist_Song_Song FOREIGN KEY (song_id) REFERENCES Song (id),
	PRIMARY KEY (playlist_id, song_id)
);

CREATE TABLE Playlist_Account (
	playlist_id INT NOT NULL,
	username VARCHAR(32) NOT NULL,
	CONSTRAINT FK_Playlist_Account_Playlist FOREIGN KEY (playlist_id) REFERENCES Playlist (id),
	CONSTRAINT FK_Playlist_Account_Account FOREIGN KEY (username) REFERENCES Account (username),
	PRIMARY KEY (playlist_id, username)
);