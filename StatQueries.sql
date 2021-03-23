
--Query para obtener álbumes más recientes de la ultima semana
SELECT name
FROM Album
WHERE EXTRACT(MONTH FROM launch_date) = EXTRACT(MONTH FROM CURRENT_DATE)
AND EXTRACT(DAY FROM launch_date) >= (EXTRACT(DAY FROM CURRENT_DATE) - 7)


--Query para artistas con popularidad creciente en los ultimos 3 meses


--Query para cantidad de nuevas subscripciones mensuales durante los ultimos 6 meses
SELECT COUNT(*) AS subscripciones_por_mes
FROM Subscription S1
WHERE EXTRACT(MONTH FROM S1.start_date) = EXTRACT(MONTH FROM CURRENT_DATE)
OR EXTRACT(MONTH FROM S1.start_date) = (EXTRACT(MONTH FROM CURRENT_DATE) - 1)
OR EXTRACT(MONTH FROM S1.start_date) = (EXTRACT(MONTH FROM CURRENT_DATE) - 2)
OR EXTRACT(MONTH FROM S1.start_date) = (EXTRACT(MONTH FROM CURRENT_DATE) - 3)
OR EXTRACT(MONTH FROM S1.start_date) = (EXTRACT(MONTH FROM CURRENT_DATE) - 4)
OR EXTRACT(MONTH FROM S1.start_date) = (EXTRACT(MONTH FROM CURRENT_DATE) - 5)
OR EXTRACT(MONTH FROM S1.start_date) = (EXTRACT(MONTH FROM CURRENT_DATE) - 6)

--Query para artistas con mayor produccion musical
SELECT A1.artistic_name, COUNT(*) AS canciones_por_artista
FROM song_artist S1 JOIN Artist A1
ON S1.artist_id = A1.id
GROUP BY S1.artistic_name
ORDER BY canciones_por_artista DESC
LIMIT 10

--Query para generos más populares
SELECT G1.name, COUNT(*) AS rep_por_genero
FROM Song_Genre S1 JOIN Genre G1
ON S1.genre_id = G1.id
GROUP BY S1.genre_id, G1.name
ORDER BY rep_por_genero DESC
LIMIT 10

--Query para usuarios más activos en la plataforma

SELECT A1.username, COUNT(*) AS rep_por_usuario
FROM Account A1 JOIN Reproduction R1
ON A1.username = R1.username
GROUP BY A1.username
ORDER BY rep_por_usuario DESC
LIMIT 10


