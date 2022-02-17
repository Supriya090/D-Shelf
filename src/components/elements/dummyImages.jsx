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
    coverImageHash: `${assets["dummy1.jpg"]}`,
    title: "Breakfast",
  },
  {
    id: "2",
    coverImageHash: `${assets["dummy2.jpg"]}`,
    title: "Burgers",
  },
  {
    id: "3",
    coverImageHash: `${assets["dummy3.jpg"]}`,
    title: "Camera",
  },
  {
    id: "4",
    coverImageHash: `${assets["dummy4.jpeg"]}`,
    title: "Camera1",
  },
  {
    id: "5",
    coverImageHash: `${assets["dummy5.jpeg"]}`,
    title: "Camera2",
  },
  {
    id: "6",
    coverImageHash: `${assets["dummy6.jpeg"]}`,
    title: "Camera3",
  },
  {
    id: "7",
    coverImageHash: `${assets["dummy4.jpeg"]}`,
    title: "Camera4",
  },
  {
    id: "8",
    coverImageHash: `${assets["dummy5.jpeg"]}`,
    title: "Camera5",
  },
  {
    id: "9",
    coverImageHash: `${assets["dummy6.jpeg"]}`,
    title: "Camera6",
  },
];
