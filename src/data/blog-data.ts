export type TAuther = {
  name: string;
  href: string;
  role: string;
  imageUrl: string;
};

// export type TPost = {
//   id: number;
//   title: string;
//   createdAt: string;
//   description: string;
//   category: {
//     title: string;
//     href: string;
//   };
//   author: TAuther;
// };
export type TPost = {
  id: number;
  likes: number;
  saves: number;
  title: string;
  image: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  description: string;
};

export type TComment = {
  id: number;
  postId: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    imageUrl: string;
  };
};

// export const posts: TPost[] = [
//   {
//     id: 1,
//     title: "Boost your conversion rate",
//     createdAt: "10/27/2024, 7:23:49 AM",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   {
//     id: 2,
//     title: "Boost your conversion rate",
//     createdAt: "10/27/2024, 7:23:49 AM",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   {
//     id: 3,
//     title: "Boost your conversion rate",
//     createdAt: "10/27/2024, 7:23:49 AM",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   {
//     id: 4,
//     title: "Boost your conversion rate",
//     createdAt: "10/27/2024, 7:23:49 AM",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   {
//     id: 5,
//     title: "Boost your conversion rate",
//     createdAt: "10/27/2024, 7:23:49 AM",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
//   {
//     id: 6,
//     title: "Boost your conversion rate",
//     createdAt: "10/27/2024, 7:23:49 AM",
//     description:
//       "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
//     category: { title: "Marketing", href: "#" },
//     author: {
//       name: "Michael Foster",
//       role: "Co-Founder / CTO",
//       href: "#",
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     },
//   },
// ];

// export const comments: TComment[] = [
//   {
//     id: 1,
//     postId: 1,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 1,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user one",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
//   {
//     id: 2,
//     postId: 1,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 2,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user two",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
//   {
//     id: 3,
//     postId: 2,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 3,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user three",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
//   {
//     id: 4,
//     postId: 3,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 1,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user one",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
//   {
//     id: 5,
//     postId: 5,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 2,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user two",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
//   {
//     id: 6,
//     postId: 5,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 3,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user three",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
//   {
//     id: 7,
//     postId: 3,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 1,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user one",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
//   {
//     id: 8,
//     postId: 3,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 2,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user two",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
//   {
//     id: 9,
//     postId: 2,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 3,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user three",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
//   {
//     id: 10,
//     postId: 1,
//     createdAt: "10/27/2024, 7:23:49 AM",
//     user: {
//       id: 3,
//       imageUrl:
//         "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       name: "user three",
//     },
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quia commodi magnam eos enim impedit quo, expedita nam nisi dolore excepturi incidunt voluptas cum libero, reiciendis, esse dolorum ipsa aliquam!",
//   },
// ];
