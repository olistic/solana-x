import type { Post } from '@/lib/models';
import PostCard from './post-card';

export interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="m-0 flex list-none flex-col p-0">
      {posts.map((post) => (
        <li className="border-b border-solid border-neutral-200" key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
