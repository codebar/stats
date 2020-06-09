import React from "react";
import { BarChart, ColumnChart, LineChart } from "react-chartkick";
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
import newSignUpsPerYear from "../../data/new_signups.json";
import workshopsPerYear from "../../data/workshops_per_year.json";
import ratingsPerYear from "../../data/ratings_per_year.json";
import averageRatingsPerMonth from "../../data/average_rating.json";

type Data = {
  coach_count: number;
  student_count: number;
  chapter_count: number;
  workshop_count: number;
  monthlies_count: number;
  events_count: number;
  percentage_returning: number;
  student_to_coach_conversion: number;
  busiest_month: number;
  average_rating: number;
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

const newSignUpsPerYearChart = [
  {
    name: "Students",
    data: newSignUpsPerYear.map(({ studentcount, year }) => [
      year.toString(),
      studentcount,
    ]),
  },
  {
    name: "Coaches",
    data: newSignUpsPerYear.map(({ coachcount, year }) => [
      year.toString(),
      coachcount,
    ]),
  },
];

const ratingSet = (_data: any, rating: number) => ({
  name: rating,
  data: ratingsPerYear
    .filter((c) => c.rating === rating)
    .map(({ year, count }) => [year, count]),
});

const ratingsPerYearChart = [
  ratingSet(ratingsPerYear, 1),
  ratingSet(ratingsPerYear, 2),
  ratingSet(ratingsPerYear, 3),
  ratingSet(ratingsPerYear, 4),
  ratingSet(ratingsPerYear, 5),
];

const averageRatingChart = [
  {
    name: "Average rating",
    data: averageRatingsPerMonth.map(({ month, year, avg }) => [
      new Date(year, month),
      avg,
    ]),
  },
];

const workshopsPerYearChart = [
  {
    name: "Workshops per year",
    data: workshopsPerYear.map(({ count, year }) => [year.toString(), count]),
  },
];

const attendedPerYearTable: string[][] = attendedPerYear
  .slice(0)
  .map((item, i) => {
    const previousYear = attendedPerYear[i - 1] || {};

    const currentYearAttending = item.coaches + item.students;
    const previousYearAttending = previousYear.coaches + previousYear.students;
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
  { property: "events_count", title: "Other Events" },
  { property: "percentage_returning", title: "Returning Members %" },
  { property: "student_to_coach_conversion", title: "Students > Coaches %" },
];

const monthMap = new Map([
  [1, "January ❄️"],
  [2, "February 💝"],
  [3, "March 🌼"],
  [4, "April 🐣"],
  [5, "May 🌸"],
  [6, "June 🌞"],
  [7, "July 🍦"],
  [8, "Aug 🦋"],
  [9, "Sept 🍂"],
  [10, "October 🎃"],
  [11, "Nov 🍂"],
  [12, "Dec 🎄"],
]);

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
        <h1>codebar Overview</h1>
        <p className="text-sm font-semibold text-gray-800">
          Last updated:{" "}
          {new Date(lastUpdateAt.last_updated_at).toLocaleDateString()}
        </p>
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

        <h1>Workshops</h1>
        <div className="space-y-12">
          <div className="flex">
            <div className="flex-grow bg-gray-200 px-4 py-2 m-2">
              <ColumnChart
                data={workshopsPerYearChart}
                colors={[colors.blue["600"]]}
              />
            </div>
            <dl className="grid sm:grid-cols-2 gap-6 m-2 text-center items-center">
              <div>
                <dd className="text-3xl font-extrabold leading-none text-blue-500">
                  {countedStats.workshop_count}
                </dd>
                <dt className="mt-2 font-medium text-gray-700 leading-6">
                  All workshops
                </dt>
              </div>
              <div>
                <dd className="text-3xl font-extrabold leading-none text-blue-500">
                  {monthMap.get(countedStats.busiest_month)}
                </dd>
                <dt className="mt-2 font-medium text-gray-700 leading-6">
                  Busiest month
                </dt>
              </div>
              <div>
                <dd className="text-3xl font-extrabold leading-none text-blue-500">
                  {monthMap.get(countedStats.slowest_month)}
                </dd>
                <dt className="mt-2 font-medium text-gray-700 leading-6">
                  Slowest month
                </dt>
              </div>
            </dl>
          </div>

          <h3>Workshop attendances per year</h3>
          <BarChart
            data={attendedPerYearChart}
            stacked
            colors={[colors.blue["500"], colors.pink["600"]]}
          />
          <h3>Workshop growth</h3>
          <Table
            headers={["Year", "Attendances", "Growth %"]}
            rows={attendedPerYearTable}
          />
        </div>
        <h1>Members</h1>
        <h3>New members per year</h3>
        <div className="space-y-12">
          <ColumnChart
            data={newSignUpsPerYearChart}
            stacked
            colors={[colors.blue["500"], colors.pink["600"]]}
          />
        </div>
        <h1>Feedback</h1>
        <div className="space-y-12 mb-12">
          <h3>Ratings per year</h3>
          <BarChart
            data={ratingsPerYearChart}
            stacked
            colors={[
              colors.red["600"],
              colors.orange["600"],
              colors.yellow["600"],
              colors.blue["600"],
              colors.pink["600"],
            ]}
          />
        </div>
        <div className="space-y-12">
          <h3>Average rating</h3>
          <div className="flex">
            <div className="flex-grow bg-gray-200 px-4 py-2 m-2">
              <LineChart
                data={averageRatingChart}
                colors={[colors.pink["600"]]}
              />
            </div>
            <dl className="grid sm:grid-cols-1 gap-6 m-2 text-center items-center">
              <div>
                <dd className="text-3xl font-extrabold leading-none text-blue-500">
                  {countedStats.average_rating.toFixed(1)}
                </dd>
                <dt className="mt-2 font-medium text-gray-700 leading-6">
                  Average rating
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default IndexPage;
