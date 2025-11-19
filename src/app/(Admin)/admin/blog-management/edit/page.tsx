import EditBlogComponent from "@/components/admin/blog/edit-blog";
import { Suspense } from "react";

export default function EditBlog() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBlogComponent />;
    </Suspense>
  );
}
