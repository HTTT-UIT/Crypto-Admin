type User = {
  id: string;
  uid: string;
  type: string;
  name: string;
  userName: string;
  profileImageUrl: string;
  dob: string;
};

type TagBlog = {
  id: string;
  title: string;
};

type Blog = {
  id: number;
  header: string;
  content: string;
  authorName: string;
  authorId: string;
  authorImageUrl: string;
  totalFollower: number;
  tags: TagBlog[];
  deleted: boolean;
  imageUrl: string;
  createdAt: Date;
  lastUpdatedAt: Date;
};

type CommentData = {
  id: string;
  content: string;
  commentTime: string;
  userId: string;
  username: string;
  profileImageUrl: string;
  createdAt: string;
  createdBy: string;
};

type ReportData = {
  id: string;
  reason: string;
  content: string;
  status: string;
  blogReport: {
    id: 20;
    header: string;
  };
  userReport: {
    id: string;
    name: string;
  };
  createdAt: Date;
  createdBy: string;
};
