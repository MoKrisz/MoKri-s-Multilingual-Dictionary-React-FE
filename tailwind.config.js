/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //https://coolors.co/ace1af-4c9482-eee8e8-5f8fbf-725a6a

      colors: {
        "background-primary": "#ACE1AF",
        "background-secondary2": "#5BC0EB",
        "background-secondary2": "#E1CAAC",
        "background-secondary2": "#36695D",
        "background-secondary2": "#53A28F",
        "background-secondary": "#4C9482",
        "background-secondary2": "#458776",
        "text-primary": "#000000",
        "text-secondary": "#F6E8EA",
        "input-background2": "#F4E8E1",
        "input-background2": "#FFCDBC",
        "input-background": "#EEE8E8",
        "button-background2": "#D97A6B",
        "button-background2": "#FF5964",
        "button-background2": "#38618C", //this with white color could look great
        "button-background2": "#406FA0",
        "button-background2": "#4679AF",
        "button-background2": "#7CA3CB",
        "button-background": "#5F8FBF", //This was the one. !!!
        "button-background2": "#351431",
        "button-background2": "#775253", //3. choice
        "button-background2": "#3D348B", //an option
        "button-background2": "#A36D90", //4. choice
        "button-background2": "#CF4D6F", //an option
        "button-background2": "#875C74", //5. choice
        "button-background2": "#916953", //2. choice
        "button-background2": "#6C5A49", //an option
        "button-background2": "#502F4C", //an option
        "button-background": "#7A5C58",
        "button-background-hover2": "#6D99C5", //This was the one !!!
        "button-background-hover": "#8E6B67",
        "button-border": "#345C83",
        "button-text": "#000000",
        "complementary-background3": "#235789", //1. choice
        "complementary-background3": "#EE8434",
        "complementary-background3": "#A62639",
        "complementary-background3": "#967AA1",
        "complementary-background3": "#2C4251",
        "complementary-background3": "#7189FF", //2.choice
        "complementary-background3": "#3454D1",
        "complementary-background3": "#870058", //3. choice
        "complementary-background3": "#C94277",
        "complementary-background3": "#F08A4B",
        "complementary-background3": "#3066BE",
        "complementary-background3": "#ED6A5A",
        "complementary-background3": "#B66D0D",
        "complementary-background3": "#3590F3",
        "complementary-background3": "#94778B", //TOP???
        "complementary-background3": "#725A6A", //TOP??? <--
        "complementary-background3": "#A58D9D", //TOP??? <--
        "complementary-background4": "#D2C1D7", //TOP??? <--
        "complementary-background4": "#D0BF8A", //TOP??? <--
        //"complementary-background": "#CCB48E", //TOP??? <--
        "complementary-background": "#C6AD80", //TOP??? <--
        "complementary-background-hover": "#CCB48E", //TOP??? <--
        "complementary-background2": "#9F7E69", //TOP??? <--
        "complementary-background2-hover": "#A78976", //TOP??? <--
        "complementary-text": "#000000",
      },
    },
  },
  plugins: [],
};
