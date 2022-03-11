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
    coverImageHash: `${assets["dummy1.jpeg"]}`,
    title: "Five Feet Apart",
    author: "Rachael Lippincott",
    avatar: `${assets["rachel.jpeg"]}`,
    authorDescription:
      "Rachael Lippincott is the coauthor of All This Time, #1 New York Times bestseller Five Feet Apart, and She Gets the Girl and the author of The Lucky List. She holds a BA in English writing from the University of Pittsburgh.",
    followers: 200,
  },
  {
    id: "2",
    coverImageHash: `${assets["dummy2.jpg"]}`,
    title: "The Gravity of Us",
    author: "Phil Stamper",
    avatar: `${assets["author1.jpeg"]}`,
    authorDescription:
      "Phil Stamper is the bestselling author of The Gravity of Us and As Far As You'll Take Me. His stories are packed with queer joy, and his characters are often too ambitious for their own good.",
    followers: 150,
  },
  {
    id: "3",
    coverImageHash: `${assets["dummy3.jpeg"]}`,
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    avatar: `${assets["haruki.jpg"]}`,
    authorDescription:
      "Haruki Murakami is a Japanese writer. His novels, essays, and short stories have been bestsellers in Japan as well as internationally, with his work translated into 50 languages and selling millions of copies outside Japan.",
    followers: 500,
  },
  {
    id: "4",
    coverImageHash: `${assets["dummy4.jpeg"]}`,
    title: "Dune",
    author: "Frank Herbert",
    avatar: `${assets["frank.jpg"]}`,
    authorDescription:
      "Franklin Patrick Herbert Jr. was an American science fiction author best known for the 1965 novel Dune and its five sequels. He also wrote short stories and worked as a newspaper journalist, photographer, book reviewer, ecological consultant, and lecturer.",
    followers: 1000,
  },
  {
    id: "5",
    coverImageHash: `${assets["dummy5.jpg"]}`,
    title: "It Started With Goodbye",
    author: "Christina June",
    avatar: `${assets["author2.jpeg"]}`,
    authorDescription:
      "Christina June writes young adult contemporary fiction when she’s not writing college recommendation letters during her day job as a school counselor. She loves the little moments in life that help someone discover who they’re meant to become – whether it’s her students or her characters.",
    followers: 100,
  },
  {
    id: "6",
    coverImageHash: `${assets["dummy6.jpeg"]}`,
    title: "All This Time",
    author: "Mikki Daughtry",
    avatar: `${assets["mikki.jpg"]}`,
    authorDescription:
      "Mikki Daughtry is an American screenwriter and young adult fiction author. She is best known for writing, along with writing partner Tobias Iaconis, the films The Curse of La Llorona, Five Feet Apart and Nightbooks. ",
    followers: 150,
  },
  {
    id: "7",
    coverImageHash: `${assets["dragon.jpg"]}`,
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    avatar: `${assets["author3.jpg"]}`,
    authorDescription:
      'Karl Stig-Erland "Stieg" Larsson was a Swedish journalist and writer. He is best known for writing the Millennium trilogy of crime novels, which were published posthumously, starting in 2005, after the author died suddenly of a heart attack.',
    followers: 650,
  },
];
