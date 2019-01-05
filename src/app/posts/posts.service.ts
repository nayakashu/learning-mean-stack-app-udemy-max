import { Subject } from 'rxjs';

import { Post } from './post.model';

export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    // ...this.posts creates a deep copy of original this.posts and it makes the posts array immutable in the component where it's accessed
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
