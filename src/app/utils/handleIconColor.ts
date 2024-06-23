export default function handleIconColor(pathName: string) {
  if (pathName === "/" || pathName === "/convertor") {
    if (activeTheme === "dark") {
      return "#FFFFFF";
    }
    if (activeTheme === "light") {
      return "#353570";
    }
  }
}
