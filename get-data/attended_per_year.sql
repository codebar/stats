SELECT 
count(workshop_invitations.id)
, extract(year FROM workshops.date_and_time) as year
FROM workshop_invitations 
    JOIN workshops ON workshop_invitations.workshop_id = workshops.id
    JOIN chapters ON workshops.chapter_id = chapters.id 
WHERE 
    (workshop_invitations.role = 'Student' AND workshops.date_and_time is not null)
    AND workshop_invitations.attending = 't' 
GROUP BY extract(year FROM workshops.date_and_time)  
ORDER BY extract(year FROM workshops.date_and_time);
