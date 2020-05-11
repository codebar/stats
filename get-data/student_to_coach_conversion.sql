/* Get all workshop attendances */
WITH attendances AS (
	SELECT workshop_invitations.*
	FROM workshop_invitations 
	    JOIN workshops ON workshop_invitations.workshop_id = workshops.id
	WHERE 
	    workshops.date_and_time is not null
	    AND workshop_invitations.attending = 't'
)

/* Find the member ids of those that have attended a workshop as a student */
, student_ids AS (
	SELECT member_id
	FROM attendances 
	WHERE 
	    attendances.role = 'Student'
	GROUP BY member_id
)

/* Find the member ids of those that have attended a workshop as a coach */
, coach_ids AS (
	SELECT member_id
	FROM attendances 
	WHERE 
	    attendances.role = 'Coach'
	GROUP BY member_id
)

/* Count the members that have attending as a student but NOT a coach */
, student_only_members_count AS (
	SELECT count(id) 
	FROM members
	WHERE id IN (SELECT * FROM student_ids)
	AND id NOT IN (SELECT * FROM coach_ids)
)

/* Count the members that have attending as a student AND a coach */
, coach_and_student_members_count AS (
	SELECT count(id) 
	FROM members
	WHERE id IN (SELECT * FROM student_ids)
	AND id IN (SELECT * FROM coach_ids)
)

SELECT 
	student_only_members_count.count AS student_only_members_count 
	, coach_and_student_members_count.count AS coach_and_student_members_count 
	, (coach_and_student_members_count.count::DECIMAL / student_only_members_count.count::DECIMAL) * 100.0 AS student_to_coach_conversion
FROM student_only_members_count, coach_and_student_members_count;

