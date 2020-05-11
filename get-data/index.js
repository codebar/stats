require("dotenv").config();
const path = require("path");
const fsPromises = require("fs").promises;
const postgres = require("postgres");

const sql = postgres(process.env.DB_URL, {
  ssl: { rejectUnauthorized: false },
});

// Helper for running queries from `.sql` files
const run_query = (path_to_sql_file) =>
  sql.file(path.join(__dirname, path_to_sql_file), []);

async function main() {
  try {
    /**
     * Count all-time numbers for the coaches, students, chapters, workshops and monthlies
     * @type {
     *  coach_count: int,
     *  student_count: int,
     *  chapter_count: int,
     *  workshop_count: int,
     *  monthlies_count: int
     * }
     */
    const [counted_stats] = await run_query("./counted_stats.sql");

    await fsPromises.writeFile(
      "counted_stats.json",
      JSON.stringify(counted_stats, null, 2)
    );

    console.log("counted_stats.json saved!");

    /**
     * Find the number students that attended workshops per year
     * @type Array<{ count: int, year: int }>
     */
    const attended_per_year = await run_query("./attended_per_year.sql");

    await fsPromises.writeFile(
      "attended_per_year.json",
      JSON.stringify(attended_per_year, null, 2)
    );

    console.log("attended_per_year.json saved!");

    /**
     * Find the number and percentage of returning members (includes both coaches and students)
     * @type {
     *  returning_members_count: int,
     *  attending_members_count: int,
     *  percentage_returning: float
     * }
     */
    const [returning_members] = await run_query("./returning_members.sql");

    await fsPromises.writeFile(
      "returning_members.json",
      JSON.stringify(returning_members, null, 2)
    );

    console.log("returning_members.json saved!");

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

    await fsPromises.writeFile(
      "student_to_coach_conversion.json",
      JSON.stringify(student_to_coach_conversion, null, 2)
    );

    console.log("student_to_coach_conversion.json saved!");

    process.exit(0);
  } catch (e) {
    console.error("Error running script:", e.message);
    process.exit(1);
  }
}

main();
