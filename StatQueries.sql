--Query para obtener álbumes más recientes de la ultima semana
SELECT *, (SELECT ARRAY_AGG(ROW_TO_JSON(X)) FROM
    (SELECT artist_id, artistic_name FROM Album_Artist AA INNER JOIN Artist ART
    ON AA.artist_id = ART.id WHERE AA.album_id = A.id) X) AS artists FROM Album A
    WHERE launch_date <= CURRENT_DATE AND launch_date >= (CURRENT_DATE - INTERVAL '1 week');

--Query para artistas con popularidad creciente en los ultimos 3 meses
SELECT * FROM Artist A INNER JOIN
    (SELECT SA.artist_id, COUNT(R.id) AS rep_por_artista FROM Reproduction R
    INNER JOIN Song_Artist SA ON R.song_id = SA.song_id
    GROUP BY SA.artist_id) B ON A.id = B.artist_id ORDER BY rep_por_artista DESC LIMIT 10;

--Query para cantidad de nuevas subscripciones mensuales durante los ultimos 6 meses
SELECT start_date_a_mes, COUNT(*) AS cantidad FROM (
    SELECT DATE_TRUNC('month', start_date) AS start_date_a_mes
    FROM Subscription
    WHERE start_date <= CURRENT_DATE AND start_date >= (CURRENT_DATE - INTERVAL '6 months')) A
    GROUP BY start_date_a_mes ORDER BY start_date_a_mes DESC;

--Query para artistas con mayor produccion musical
SELECT id,artistic_name,canciones_por_artista
    FROM (SELECT artist_id, COUNT(*) AS canciones_por_artista
	FROM song_artist GROUP BY artist_id) X
	INNER JOIN Artist A ON X.artist_id = A.id
	ORDER BY canciones_por_artista DESC LIMIT 10;

--Query para generos más populares
SELECT G.id, G.name, COUNT(R.id) AS rep_por_genero
    FROM Reproduction R INNER JOIN Song_Genre SG ON R.song_id = SG.song_id
	INNER JOIN Genre G ON SG.genre_id = G.id
    GROUP BY G.id, G.name ORDER BY rep_por_genero DESC LIMIT 5;

--Query para usuarios más activos en la plataforma
SELECT X.username, A.first_name, cantidad_reproducciones
    FROM (SELECT username, COUNT(*) AS cantidad_reproducciones FROM Reproduction
    WHERE rep_date >= (CURRENT_DATE - INTERVAL '1 month') GROUP BY username) X
    INNER JOIN Account A ON X.username = A.username
    ORDER BY cantidad_reproducciones DESC LIMIT 10;

