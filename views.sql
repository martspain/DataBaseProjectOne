--VIEWS-

CREATE VIEW sales_per_week AS
SELECT week, SUM(sales) AS sales FROM (
SELECT * FROM
(SELECT DATE_TRUNC('week', rep_date) AS week, (COUNT(*) * 0.006) AS sales FROM reproduction GROUP BY week) A
UNION
SELECT * FROM
(SELECT DATE_TRUNC('week', start_date) AS week, (COUNT(*) * 3) AS sales FROM subscription GROUP BY week) B
) X GROUP BY week ORDER BY week DESC;

CREATE VIEW artist_sales_per_date AS
SELECT * FROM Artist A INNER JOIN
(SELECT SA.artist_id, R.rep_date, (COUNT(R.id) * 0.003) AS sales FROM Reproduction R
INNER JOIN Song_Artist SA ON R.song_id = SA.song_id
GROUP BY SA.artist_id, R.rep_date) B ON A.id = B.artist_id;

CREATE VIEW genre_sales_per_date AS
SELECT G.id, G.name, R.rep_date AS date, (COUNT(R.id) * 0.009) AS sales 
FROM Reproduction R INNER JOIN Song_Genre SG ON R.song_id = SG.song_id
INNER JOIN Genre G ON SG.genre_id = G.id
GROUP BY G.id, G.name, R.rep_date;

CREATE VIEW song_reproduction_count_by_artist AS
SELECT A.id AS artist_id, S.id, S.name, S.duration_ms, S.active,
S.album_id, ALB.name AS album, ALB.preview_url AS cover, COUNT(R.id)
FROM Reproduction R INNER JOIN Song S ON R.song_id = S.id
INNER JOIN Song_Artist SA ON S.id = SA.song_id
INNER JOIN Artist A ON SA.artist_id = A.id
INNER JOIN Album ALB ON S.album_id = ALB.id
GROUP BY A.id, S.id, S.name, S.duration_ms, S.active, S.preview_url, S.album_id, ALB.name, cover;
