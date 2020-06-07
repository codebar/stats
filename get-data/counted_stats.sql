WITH coach_count AS (
    SELECT count(members.id) FROM members
    JOIN subscriptions ON subscriptions.member_id = members.id 
    JOIN groups ON groups.id = subscriptions.group_id
    JOIN chapters ON chapters.id = groups.chapter_id
    WHERE groups.name = 'Coaches' AND chapters.active IS TRUE
)

, student_count AS (
    SELECT count(members.id) FROM members
    JOIN subscriptions ON subscriptions.member_id = members.id 
    JOIN groups ON groups.id = subscriptions.group_id
    JOIN chapters ON chapters.id = groups.chapter_id
    WHERE groups.name = 'Students' AND chapters.active IS TRUE
) 

, chapter_count AS (
    SELECT count(chapters.id) FROM chapters
    WHERE chapters.active IS TRUE
)

, workshop_count AS (
    SELECT count(id) FROM workshops
)

, monthlies_count AS (
    SELECT count(id) FROM meetings
)

, events_count AS (
    SELECT count(id) FROM events
)

SELECT
    coach_count.count AS coach_count
    , student_count.count AS student_count
    , chapter_count.count AS chapter_count
    , workshop_count.count AS workshop_count
    , monthlies_count.count AS monthlies_count
    , events_count.count AS events_count
FROM
    coach_count
    , student_count
    , chapter_count
    , workshop_count
    , monthlies_count
    , events_count;
