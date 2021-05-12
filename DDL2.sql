--
--EDITAR/AGREGAR TABLAS
--

--Se inserta el nuevo campo de active a la tabla Album
ALTER TABLE Album
ADD active BOOLEAN NOT NULL DEFAULT TRUE;

--Se inserta el nuevo campo de active a la tabla Account
ALTER TABLE Account
ADD active BOOLEAN NOT NULL DEFAULT TRUE;

--Se inserta el nuevo campo de active a la tabla Artist
ALTER TABLE Artist
ADD active BOOLEAN NOT NULL DEFAULT TRUE;

--Query para crear la tabla de monitores
CREATE TABLE Monitor(
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(20) NOT NULL,
	monitor_type VARCHAR(20) NOT NULL,
	CONSTRAINT FK_username FOREIGN KEY (username) REFERENCES Account(username)
);

--Query para crear la tabla de bitacora
CREATE TABLE Binnacle(
	id SERIAL PRIMARY KEY NOT NULL,
	author VARCHAR(20) NOT NULL,
	table_affected VARCHAR(20) NOT NULL,
	action TEXT NOT NULL,
	record_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK_username FOREIGN KEY (author) REFERENCES Account(username)
);

--
--
--

--
--FUNCIONES
--

--Se crea una funcion para el trigger a la bitacora de un INSERT a cualquier tabla entre Account, Album, Song, Artist y Playlist
CREATE OR REPLACE PROCEDURE BIN_CONTROL_INS(author_user VARCHAR(20), table_sel VARCHAR(20), val_one TEXT DEFAULT NULL, val_two TEXT DEFAULT NULL, val_three TEXT DEFAULT NULL,
val_four TEXT DEFAULT NULL, val_five TEXT DEFAULT NULL, val_bool BOOLEAN DEFAULT NULL, val_int INTEGER DEFAULT NULL) 
LANGUAGE 'plpgsql' AS
$$
BEGIN
	IF table_sel = 'Account' AND val_one IS NOT NULL AND val_two IS NOT NULL AND val_three IS NOT NULL AND val_four IS NOT NULL AND val_five IS NOT NULL AND val_bool IS NOT NULL THEN
		INSERT INTO Account VALUES(val_one, val_two, val_three, val_four, val_five, val_bool);
		INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Creación de cuenta.', DEFAULT);
		RAISE NOTICE 'Cuenta creada exitosamente.';
	END IF;
	IF table_sel = 'Album' AND val_one IS NOT NULL AND val_two IS NOT NULL AND val_three IS NOT NULL AND val_bool IS NOT NULL THEN
		INSERT INTO Album VALUES(val_one, val_two, val_three, DEFAULT, val_bool);
		INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Creación de álbum.', DEFAULT);
		RAISE NOTICE 'Cuenta creada exitosamente.';
	END IF;
	IF table_sel = 'Artist' AND val_one IS NOT NULL AND val_two IS NOT NULL AND val_three IS NOT NULL THEN
		INSERT INTO Artist VALUES(val_one, val_two, val_three);
		INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Creación de artista.', DEFAULT);
		RAISE NOTICE 'Artista creado exitosamente.';
	END IF;
	IF table_sel = 'Song' AND val_one IS NOT NULL AND val_two IS NOT NULL AND val_int IS NOT NULL AND val_bool IS NOT NULL AND val_three IS NOT NULL AND val_four IS NOT NULL THEN
		INSERT INTO Song VALUES(val_one, val_two, val_int, val_bool, val_three, val_four);
		INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Creación de canción.', DEFAULT);
		RAISE NOTICE 'Canción creada exitosamente.';
	END IF;
	IF table_sel = 'Playlist' AND val_one IS NOT NULL AND val_two IS NOT NULL AND val_three IS NOT NULL THEN
		INSERT INTO Playlist(name, description, date_creation, username) VALUES(val_one, val_two, DEFAULT, val_three);
		INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Creación de playlist.', DEFAULT);
		RAISE NOTICE 'Playlist creada exitosamente.';
	END IF;
	IF table_sel = 'Subscription' AND val_one IS NOT NULL THEN
		INSERT INTO Subscription(start_date, renewal_date, username) VALUES(DEFAULT, CURRENT_DATE + (INTERVAL '1 MONTH'), val_one);
		INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Creación de subscripción.', DEFAULT);
		RAISE NOTICE 'Subscripción creada exitosamente.';
	END IF;
END;
$$;

--Se crea una funcion para el trigger a la bitacora de un UPDATE a cualquier tabla entre Account, Album, Song, Artist y Playlist
CREATE OR REPLACE PROCEDURE BIN_CONTROL_UPD(cond_key_text TEXT DEFAULT NULL, cond_key_int INTEGER DEFAULT NULL, author_user VARCHAR(20) DEFAULT NULL, 
table_sel VARCHAR(20) DEFAULT NULL, field_sel VARCHAR(20) DEFAULT NULL, new_value_text TEXT DEFAULT NULL, new_value_bool BOOLEAN DEFAULT NULL)
LANGUAGE 'plpgsql' AS
$$
BEGIN
	IF table_sel = 'Account' THEN
		IF field_sel = 'password' AND new_value_text IS NOT NULL THEN
			UPDATE Account SET password = new_value_text WHERE username = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de contraseña.', DEFAULT);
			RAISE NOTICE 'Contraseña actualizada exitosamente.';
		END IF;
		IF field_sel = 'first_name' AND new_value_text IS NOT NULL THEN
			UPDATE Account SET first_name = new_value_text WHERE username = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de primer nombre.', DEFAULT);
			RAISE NOTICE 'Primer nombre actualizado exitosamente.';
		END IF;
		IF field_sel = 'last_name' AND new_value_text IS NOT NULL THEN
			UPDATE Account SET last_name = new_value_text WHERE username = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de apellido.', DEFAULT);
			RAISE NOTICE 'Apellido actualizado exitosamente.';
		END IF;
		IF field_sel = 'email' AND new_value_text IS NOT NULL THEN
			UPDATE Account SET email = new_value_text WHERE username = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de email.', DEFAULT);
			RAISE NOTICE 'Email actualizado exitosamente.';
		END IF;
		IF field_sel = 'active' AND new_value_bool IS NOT NULL THEN
			UPDATE Account SET active = new_value_bool WHERE username = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de estado de cuenta.', DEFAULT);
			RAISE NOTICE 'Estado de cuenta actualizado exitosamente.';
		END IF;
	END IF;
	IF table_sel = 'Album' THEN
		IF field_sel = 'name' AND new_value_text IS NOT NULL THEN
			UPDATE Album SET name = new_value_text WHERE id = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de nombre de album.', DEFAULT);
			RAISE NOTICE 'Nombre de album actualizado exitosamente.';
		END IF;
		IF field_sel = 'active' AND new_value_bool IS NOT NULL THEN
			UPDATE Album SET active = new_value_bool WHERE id = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de estado de album.', DEFAULT);
			RAISE NOTICE 'Estado de album actualizado exitosamente.';
		END IF;
	END IF;
	IF table_sel = 'Artist' THEN
		IF field_sel = 'artistic_name' AND new_value_text IS NOT NULL THEN
			UPDATE Artist SET artistic_name = new_value_text WHERE id = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de nombre artístico.', DEFAULT);
			RAISE NOTICE 'Nombre artístico actualizado exitosamente.';
		END IF;
		IF field_sel = 'active' AND new_value_bool IS NOT NULL THEN
			UPDATE Artist SET active = new_value_bool WHERE id = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de estado de artista.', DEFAULT);
			RAISE NOTICE 'Se actualizó el estado del artista exitosamente.';
		END IF;
	END IF;
	IF table_sel = 'Song' THEN
		IF field_sel = 'name' AND new_value_text IS NOT NULL THEN
			UPDATE Song SET name = new_value_text WHERE id = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de nombre de canción.', DEFAULT);
			RAISE NOTICE 'Nombre de canción actualizado exitosamente.';
		END IF;
		IF field_sel = 'active' AND new_value_bool IS NOT NULL THEN
			UPDATE Song SET active = new_value_bool WHERE id = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de estado de canción.', DEFAULT);
			RAISE NOTICE 'Estado de canción actualizado exitosamente.';
		END IF;
	END IF;
	IF table_sel = 'Playlist' THEN
		IF field_sel = 'name' AND new_value_text IS NOT NULL THEN
			UPDATE Playlist SET name = new_value_text WHERE id = cond_key_int;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de nombre de playlist.', DEFAULT);
			RAISE NOTICE 'Nombre de playlist actualizado exitosamente.';
		END IF;
		IF field_sel = 'description' AND new_value_text IS NOT NULL THEN
			UPDATE Playlist SET description = new_value_text WHERE id = cond_key_int;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de descripción de playlist.', DEFAULT);
			RAISE NOTICE 'Descripción de playlist actualizada exitosamente.';
		END IF;
	END IF;
END;
$$;

--Se crea un prodcedimiento registrar cuando se haga un DELETE a cualquier tabla entre Suscription, Manager, Monitor
CREATE OR REPLACE PROCEDURE BIN_CONTROL_DEL(cond_key_text TEXT DEFAULT NULL, cond_key_int INTEGER DEFAULT NULL, author_user VARCHAR(20) DEFAULT NULL,
table_sel VARCHAR(20) DEFAULT NULL)
LANGUAGE 'plpgsql' AS
$$
BEGIN
	IF table_sel = 'Subscription' AND cond_key_text IS NOT NULL AND author_user IS NOT NULL THEN 
		DELETE FROM Subscription WHERE username = cond_key_text;
		INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Eliminación de subscripción.', DEFAULT);
		RAISE NOTICE 'Subscripción de usuario eliminada exitosamente.';
	END IF;
	IF table_sel = 'Manager' AND cond_key_text IS NOT NULL AND author_user IS NOT NULL THEN
		DELETE FROM Manager WHERE username = cond_key_text;
		INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Eliminación de manager.', DEFAULT);
		RAISE NOTICE 'Administrador destituido exitosamente.';
	END IF;
	IF table_sel = 'Monitor' AND cond_key_text IS NOT NULL AND author_user IS NOT NULL THEN
		DELETE FROM Monitor WHERE username = cond_key_text;
		INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Eliminación de monitor.', DEFAULT);
		RAISE NOTICE 'Monitor destituido exitosamente.';
	END IF;
END;
$$;

--Funcion para desactivar albumes de un artista cada vez que se desactive
CREATE OR REPLACE FUNCTION DEACTIVATE_ARTIST()
RETURNS TRIGGER AS
$$
BEGIN
	UPDATE Album
	SET active = NEW.active
	WHERE id IN (SELECT album_id FROM Album_Artist WHERE artist_id = NEW.id);
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

--Se crea el trigger para desactivar albumes de un artista cuando este se desactiva
CREATE TRIGGER artistAlbumDeactivate
AFTER UPDATE OF active ON Artist
FOR EACH ROW
EXECUTE PROCEDURE DEACTIVATE_ARTIST();

--Funcion para desactivar canciones de un album cuando este se desactiva
CREATE OR REPLACE FUNCTION DEACTIVATE_ALBUM()
RETURNS TRIGGER AS
$$
BEGIN
	UPDATE Song
	SET active = NEW.active
	WHERE album_id = NEW.id;
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

--Se crea el trigger para desactivar las canciones de un album cuando este se desactiva
CREATE TRIGGER albumSongDeactivate
AFTER UPDATE OF active ON Album
FOR EACH ROW
EXECUTE PROCEDURE DEACTIVATE_ALBUM();

--Funcion para borrar subscripciones vendidas (en un trigger cuando se crea una nueva suscripción)
CREATE OR REPLACE FUNCTION SUB_UPD()
RETURNS TRIGGER AS
$$
BEGIN
	DELETE FROM Subscription WHERE renewal_date <= CURRENT_DATE;
	INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(NEW.username, 'Subscription', 'Eliminación de subscripciones caducadas.', DEFAULT);
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

--Se crea el trigger para actualizar las subscripciones cada vez que se hace una nueva subscripcion
CREATE TRIGGER subUPD
AFTER INSERT ON Subscription
FOR EACH ROW
EXECUTE PROCEDURE SUB_UPD();

--VIEWS-

--Obtiene por cada semana, las ventas de la plataforma (como compañía) dadas por comisión de las reproducciones y suscripciones.
CREATE VIEW sales_per_week AS
SELECT week, SUM(sales) AS sales FROM (
SELECT * FROM
(SELECT DATE_TRUNC('week', rep_date) AS week, (COUNT(*) * 0.006) AS sales FROM reproduction GROUP BY week) A
UNION
SELECT * FROM
(SELECT DATE_TRUNC('week', start_date) AS week, (COUNT(*) * 3) AS sales FROM subscription GROUP BY week) B
) X GROUP BY week ORDER BY week DESC;


--Obtiene las ventas por artista como comision por reproducciones, agrupado por fecha.
CREATE VIEW artist_sales_per_date AS
SELECT * FROM Artist A INNER JOIN
(SELECT SA.artist_id, R.rep_date, (COUNT(R.id) * 0.003) AS sales FROM Reproduction R
INNER JOIN Song_Artist SA ON R.song_id = SA.song_id
GROUP BY SA.artist_id, R.rep_date) B ON A.id = B.artist_id;

--Obtiene las ventas totales por reproducción de cada genero agrupadas por fecha
CREATE VIEW genre_sales_per_date AS
SELECT G.id, G.name, R.rep_date AS date, (COUNT(R.id) * 0.009) AS sales 
FROM Reproduction R INNER JOIN Song_Genre SG ON R.song_id = SG.song_id
INNER JOIN Genre G ON SG.genre_id = G.id
GROUP BY G.id, G.name, R.rep_date;

--Obtiene las canciones y sus reproducciones totales
CREATE VIEW song_reproduction_count_by_artist AS
SELECT A.id AS artist_id, S.id, S.name, S.duration_ms, S.active,
S.album_id, ALB.name AS album, ALB.preview_url AS cover, COUNT(R.id)
FROM Reproduction R INNER JOIN Song S ON R.song_id = S.id
INNER JOIN Song_Artist SA ON S.id = SA.song_id
INNER JOIN Artist A ON SA.artist_id = A.id
INNER JOIN Album ALB ON S.album_id = ALB.id
GROUP BY A.id, S.id, S.name, S.duration_ms, S.active, S.preview_url, S.album_id, ALB.name, cover;