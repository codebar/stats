SELECT extract(year FROM feedbacks.created_at) as year
, feedbacks.rating
, count(feedbacks.id)
FROM feedbacks
GROUP BY extract(year FROM feedbacks.created_at), feedbacks.rating
ORDER BY extract(year FROM feedbacks.created_at), feedbacks.rating
