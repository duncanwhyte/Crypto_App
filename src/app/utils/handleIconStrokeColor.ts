export default function handleIconStrokeColor(
  pathName: string,
  activeTheme: string | undefined
) {
  if (pathName === "/" || pathName === "/convertor") {
    if (activeTheme === "dark") {
      return "#353570";
    }
    if (activeTheme === "light") {
      return "#FFFFFF";
    }
  }
}
