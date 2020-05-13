import React from "react";
import { BarChart } from "react-chartkick";
import "chart.js";
import { colors } from "tailwindcss/defaultTheme";

import { Table } from "../components/table";
import Layout from "../components/layout";
import SEO from "../components/seo";
import lastUpdateAt from "../../data/last_updated_at.json";
import countedStats from "../../data/counted_stats.json";
import returningMembers from "../../data/returning_members.json";
import studentCoachConversion from "../../data/student_to_coach_conversion.json";
import attendedPerYear from "../../data/attended_per_year.json";

const data = {
  ...countedStats,
  ...returningMembers,
  ...studentCoachConversion,
};

const attendedPerYearChart = [
  {
    name: "Students",
    data: attendedPerYear.map(({ students, year }) => [
      year.toString(),
      students,
    ]),
  },
  {
    name: "Coaches",
    data: attendedPerYear.map(({ coaches, year }) => [
      year.toString(),
      coaches,
    ]),
  },
];
const dataDisplay = [
  { property: "coach_count", title: "Coaches" },
  { property: "student_count", title: "Students" },
  { property: "chapter_count", title: "Chapters" },
  { property: "workshop_count", title: "Workshops" },
  { property: "monthlies_count", title: "Monthlies" },
  { property: "percentage_returning", title: "Returning Members %" },
  { property: "student_to_coach_conversion", title: "Students > Coaches %" },
];

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[
          `gatsby`,
          `tailwind`,
          `react`,
          `tailwindcss`,
          `codebar`,
          `stats`,
        ]}
        title="Home"
      />

      <section>
        <p className="text-sm font-semibold text-gray-800">
          Last updated:{" "}
          {new Date(lastUpdateAt.last_updated_at).toLocaleDateString()}
        </p>
        <h1>Overview</h1>
        <dl className="grid sm:grid-cols-3 gap-6">
          {dataDisplay.map((item) => (
            <div key={item.property}>
              <dd className="text-5xl font-extrabold leading-none text-blue-500">
                {data[item.property].toLocaleString()}
              </dd>
              <dt className="mt-2 text-lg font-medium text-gray-700 leading-6">
                {item.title}
              </dt>
            </div>
          ))}
        </dl>
        <h1>Workshop attendances per year</h1>
        <BarChart
          data={attendedPerYearChart}
          stacked
          colors={[colors.blue["500"], colors.pink["600"]]}
        />
        <Table headers={["", "Attendances", "Growth"]} />
      </section>
    </Layout>
  );
}

export default IndexPage;
