declare interface BlogDetailProps {
  params: Promise<{
    id: Id<'posts'>;
  }>;
}

declare interface iAppProps {
  roomId: Id<'posts'>;
  userId: string;
}
