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

type Data = {
  coach_count: number;
  student_count: number;
  chapter_count: number;
  workshop_count: number;
  monthlies_count: number;
  percentage_returning: number;
  student_to_coach_conversion: number;
};

const data: Data = {
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

const attendedPerYearTable: string[][] = attendedPerYear
  .slice(0)
  .map((item, i) => {
    const previousYear = attendedPerYear[i - 1] || {};

    const currentYearAttending = item.coaches + item.students;
    const previousYearAttending = previousYear.coaches + previousYear.students;
    console.log({
      previousYearAttending,
      currentYearAttending,
    });
    const percentageChange =
      (currentYearAttending / previousYearAttending) * 100 - 100;
    return [
      item.year,
      item.coaches + item.students,
      (percentageChange || 0).toFixed(2),
    ].map((item) => item.toString());
  });

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
        description="codebar stats"
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
                {data[item.property as keyof Data].toLocaleString()}
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
        <div className="mt-8"></div>
        <Table
          headers={["Year", "Attendances", "Growth"]}
          rows={attendedPerYearTable}
        />
        <div className="mt-8"></div>
      </section>
    </Layout>
  );
}

export default IndexPage;