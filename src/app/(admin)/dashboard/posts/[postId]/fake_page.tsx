// import DashPageHeading from "@/ui/DashPageHeading";

// import { getPostById } from "@/services/blogAPI";

// export async function generateMetadata({
//   params: { postId },
// }: {
//   params: { postId: string };
// }) {
//   const { title } = await getPostById(postId);
//   return { title };
// }

// export default async function Page({
//   params: { postId },
// }: {
//   params: { postId: string };
// }) {
//   const post = await getPostById(postId);

//   console.log(post);

//   return (
//     <main className="flex-1 px-3 py-5">
//       <DashPageHeading>Posts #{postId} Edit Dashboard Page</DashPageHeading>
//     </main>
//   );
// }

export default function FakePage() {
  return <div>fake_page</div>;
}
