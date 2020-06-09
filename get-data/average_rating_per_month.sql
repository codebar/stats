SELECT extract(month FROM feedbacks.created_at) as month,
extract(year FROM feedbacks.created_at) as year
, avg(feedbacks.rating)
FROM feedbacks
GROUP BY extract(month FROM feedbacks.created_at), extract(year FROM feedbacks.created_at)
ORDER BY extract(year FROM feedbacks.created_at), extract(month FROM feedbacks.created_at)
