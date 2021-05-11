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
		IF field_sel = 'preview_url' AND new_value_text IS NOT NULL THEN
			UPDATE Album SET preview_url = new_value_text WHERE id = cond_key_text;
			INSERT INTO Binnacle(author, table_affected, action, record_date) VALUES(author_user, table_sel, 'Actualización de preview_url de album.', DEFAULT);
			RAISE NOTICE 'Preview URL de album actualizada exitosamente.';
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
END;
$$;