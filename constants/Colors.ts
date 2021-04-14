const tintColorLight = "#B59980";
const tintColorDark = "#fff";
const success = "#398045";
const error = "#b54545";
const info = "#60add1";
const baseLigth = "#f2f2f2";
const baseDark = "#636260";

export default {
  light: {
    base: baseLigth,
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    base: baseDark,
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
  info,
  error,
  success,
};
