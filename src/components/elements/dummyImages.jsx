function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const assets = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

export const content = [
  {
    id: "1",
    url: `${assets["dummy1.jpg"]}`,
    title: "Breakfast",
  },
  {
    id: "2",
    url: `${assets["dummy2.jpg"]}`,
    title: "Burgers",
  },
  {
    id: "3",
    url: `${assets["dummy3.jpg"]}`,
    title: "Camera",
  },
  {
    id: "4",
    url: `${assets["dummy4.jpeg"]}`,
    title: "Camera1",
  },
  {
    id: "5",
    url: `${assets["dummy5.jpeg"]}`,
    title: "Camera2",
  },
  {
    id: "6",
    url: `${assets["dummy6.jpeg"]}`,
    title: "Camera3",
  },
  {
    id: "7",
    url: `${assets["dummy4.jpeg"]}`,
    title: "Camera4",
  },
  {
    id: "8",
    url: `${assets["dummy5.jpeg"]}`,
    title: "Camera5",
  },
  {
    id: "9",
    url: `${assets["dummy6.jpeg"]}`,
    title: "Camera6",
  },
];
