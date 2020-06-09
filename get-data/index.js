require("dotenv").config();
const path = require("path");
const fsPromises = require("fs").promises;
const postgres = require("postgres");

const sql = postgres(process.env.DB_URL, {
  ssl: { rejectUnauthorized: false },
  max: 1,
});

// Helper for running queries from `.sql` files
const run_query = (path_to_sql_file) =>
  sql.file(path.join(__dirname, path_to_sql_file), []);

const saveData = async (fileName, data) => {
  await fsPromises.writeFile(
    path.join(__dirname, `../www/data/${fileName}`),
    JSON.stringify(data, null, 2)
  );

  console.log("Saved", fileName);
};

async function main() {
  try {
    /**
     * Count all-time numbers for the coaches, students, chapters, workshops and monthlies
     * @type {
     *  coach_count: int,
     *  student_count: int,
     *  chapter_count: int,
     *  workshop_count: int,
     *  monthlies_count: int,
     *  events_count: int,
     *  busiest_month: int
     *  slowest_month: int
     * }
     */
    const [counted_stats] = await run_query("./counted_stats.sql");

    await saveData("counted_stats.json", counted_stats);

    /**
     * Find the number of coaches and students that attended workshops per year
     * @type Array<{ students: int, coaches: int, year: int }>
     */
    const attended_per_year = await run_query("./attended_per_year.sql");

    await saveData("attended_per_year.json", attended_per_year);

    /**
     * Find the number of workshops per year
     * @type Array<{ count: int, year: int }>
     */
    const workshops_per_year = await run_query("./workshops_per_year.sql");

    await saveData("workshops_per_year.json", workshops_per_year);

    /**
     * Find the number and percentage of returning members (includes both coaches and students)
     * @type {
     *  returning_members_count: int,
     *  attending_members_count: int,
     *  percentage_returning: float
     * }
     */
    const [returning_members] = await run_query("./returning_members.sql");

    await saveData("returning_members.json", returning_members);

    /**
     * Find the number and percentage of members that have converted from students to coaches
     * @type {
     *  student_only_members_count: int,
     *  coach_and_student_members_count: int,
     *  student_to_coach_conversion: float
     * }
     */
    const [student_to_coach_conversion] = await run_query(
      "./student_to_coach_conversion.sql"
    );

    await saveData(
      "student_to_coach_conversion.json",
      student_to_coach_conversion
    );

    /**
     * Find the number of new sign ups per year
     * @type Array<{ student_count: int, coach_count: int, year: int }>
     */
    const new_signups_per_year = await run_query("./new_signups.sql");

    await saveData("new_signups.json", new_signups_per_year);

    /**
     * Display feedback, sepraterd per rating and year
     * @type Array<{ year: int, rating: int, count: int }>
     */
    const ratings_per_year = await run_query("./ratings_per_year.sql");

    await saveData("ratings_per_year.json", ratings_per_year);

    /**
     * Average rating per month
     * @type Array<{ month: int, year: int, avg: int }>
     */
    const average_rating_per_month = await run_query("./average_rating_per_month.sql");

    await saveData("average_rating_per_month.json", average_rating_per_month);

    await saveData("last_updated_at.json", { last_updated_at: new Date() });

    process.exit(0);
  } catch (e) {
    console.error("Error running script:", e.message);
    process.exit(1);
  }
}

main();
