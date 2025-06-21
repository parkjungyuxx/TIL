import { notFound } from "next/navigation";

export default async function CommentDetail({
  params,
}: {
  params: Promise<{ id: string; commentId: string }>;
}) {
  const random = Math.floor(Math.random() * 2);
  if (random === 1) throw new Error(`random is ${random}`);
  const { id, commentId } = await params;
  if (Number(commentId) > 10) notFound();
  return (
    <>
      <h1>id : {id}</h1>
      <h1>comment id : {commentId}</h1>
    </>
  );
}
