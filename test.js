const a = [
  {
    name: "strange<name",
    description: "strange<description",
    detail: "strange<detail",
    title: "strange<title",
  },
  {
    name: "strange<name",
    description: "strange<description",
    detail: "strange<detail",
    title: "strange<title",
  },
];

const result = a
  .map(
    (it) => it.name + "|" + it.description + "|" + it.title + "|" + it.detail
  )
  .join("#");

const allTiles = result.split("#");
const finale = allTiles.map((it) => it.split("|"));
console.log(finale);
