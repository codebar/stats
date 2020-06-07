WITH coachCount AS (
     SELECT count(DISTINCT subscriptions.member_id)
     , extract(year FROM subscriptions.created_at)  as year
     FROM subscriptions
     JOIN groups ON groups.id = subscriptions.group_id
     WHERE groups.name = 'Coaches'
     GROUP BY extract(year FROM subscriptions.created_at)
     ORDER BY extract(year FROM subscriptions.created_at)
 )

 , studentCount AS (
     SELECT count(DISTINCT subscriptions.member_id)
     , extract(year FROM subscriptions.created_at)  as year
     FROM subscriptions
     JOIN groups ON groups.id = subscriptions.group_id
     WHERE groups.name = 'Students'
     GROUP BY extract(year FROM subscriptions.created_at)
     ORDER BY extract(year FROM subscriptions.created_at)

 )

 SELECT
   coachCount.count AS coachCount,
   studentCount.count AS studentCount,
   coachCount.year AS year
 FROM
     coachCount
 JOIN studentCount ON coachCount.year = studentCount.year
