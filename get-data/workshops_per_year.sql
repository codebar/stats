SELECT count(workshops.id)
, extract(year FROM workshops.date_and_time)  as year
FROM workshops
GROUP BY extract(year FROM workshops.date_and_time)
ORDER BY extract(year FROM workshops.date_and_time)
