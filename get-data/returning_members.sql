WITH attending_members AS (
    SELECT count(workshop_invitations.member_id)
        , workshop_invitations.member_id
    FROM workshop_invitations 
    JOIN workshops ON workshops.id = workshop_invitations.workshop_id
    WHERE workshops.date_and_time is not null
        AND workshop_invitations.attending = 't' 
    GROUP BY member_id
)

, returning_members_count AS (
	SELECT count(*) 
	FROM attending_members 
	WHERE count > 1
)

, attending_members_count AS (
	SELECT count(*) 
	FROM attending_members 
)

SELECT 
    returning_members_count.count as returning_members_count
    , attending_members_count.count as attending_members_count
    , (returning_members_count.count::DECIMAL /  attending_members_count.count::DECIMAL) * 100.0 as percentage_returning
FROM 
    returning_members_count
    , attending_members_count;
