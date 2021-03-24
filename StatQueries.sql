
--Query para obtener álbumes más recientes de la ultima semana
SELECT *
FROM Album
WHERE launch_date <= CURRENT_DATE AND launch_date >= (CURRENT_DATE - INTERVAL '1 week');


--Query para artistas con popularidad creciente en los ultimos 3 meses
SELECT * FROM Reproduction
WHERE rep_date >= (CURRENT_DATE - INTERVAL '3 months')

--Query para cantidad de nuevas subscripciones mensuales durante los ultimos 6 meses
SELECT start_date_a_mes, COUNT(*) AS cantidad FROM (
	SELECT DATE_TRUNC('month', start_date) AS start_date_a_mes
	FROM Subscription
		WHERE start_date <= CURRENT_DATE AND start_date >= (CURRENT_DATE - INTERVAL '6 months')) A
			GROUP BY start_date_a_mes;

--Query para artistas con mayor produccion musical
SELECT id,artistic_name,canciones_por_artista FROM (SELECT artist_id, COUNT(*) AS canciones_por_artista
	FROM song_artist GROUP BY artist_id) X
	INNER JOIN Artist A ON X.artist_id = A.id
		ORDER BY canciones_por_artista DESC LIMIT 10;

--Query para generos más populares
SELECT G1.name, COUNT(*) AS rep_por_genero
FROM Song_Genre S1 JOIN Genre G1
ON S1.genre_id = G1.id
GROUP BY S1.genre_id, G1.name
ORDER BY rep_por_genero DESC
LIMIT 10

--Query para usuarios más activos en la plataforma

SELECT X.username, A.first_name, cantidad_reproducciones
FROM (SELECT username, COUNT(*) AS cantidad_reproducciones FROM Reproduction
	  WHERE rep_date >= (CURRENT_DATE - INTERVAL '1 month') GROUP BY username) X
INNER JOIN Account A ON X.username = A.username
ORDER BY cantidad_reproducciones DESC LIMIT 10

