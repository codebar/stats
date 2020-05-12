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
    path.join(__dirname, `../www/src/data/${fileName}`),
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
     *  monthlies_count: int
     * }
     */
    const [counted_stats] = await run_query("./counted_stats.sql");

    await saveData("counted_stats.json", counted_stats);

    /**
     * Find the number students that attended workshops per year
     * @type Array<{ count: int, year: string }>
     */
    const attended_per_year = await run_query("./attended_per_year.sql");

    await saveData("attended_per_year.json", attended_per_year);

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

    await saveData("last_updated_at.json", { last_updated_at: new Date() });

    process.exit(0);
  } catch (e) {
    console.error("Error running script:", e.message);
    process.exit(1);
  }
}

main();
