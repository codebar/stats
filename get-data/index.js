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
    console.log("Running counted_stats query");
    /**
     * Query for counting the number of
     *  coaches
     *  students
     *  chapters
     *  workshops
     *  monthlies
     */
    const [counted_stats] = await run_query("./counted_stats.sql");

    await fsPromises.writeFile(
      "counted_stats.json",
      JSON.stringify(counted_stats, null, 2)
    );

    console.log("counted_stats.json saved!");

    console.log("Running attended_per_year query");

    /**
     * Find the number students that attended workshops per year
     */
    const [attended_per_year] = await run_query("./attended_per_year.sql");

    await fsPromises.writeFile(
      "attended_per_year.json",
      JSON.stringify(attended_per_year, null, 2)
    );

    console.log("attended_per_year.json saved!");

    process.exit(0);
  } catch (e) {
    console.error("Error running script:", e.message);
    process.exit(1);
  }
}

main();
