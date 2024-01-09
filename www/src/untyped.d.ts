declare module "chart.js";
declare module "react-chartkick";
declare module "tailwindcss/defaultTheme";

declare module "*.png";
declare module "*.jpg";

declare module "*.svg" {
  const content: string;
  export default content;
}
