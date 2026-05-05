import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any | null | undefined>(undefined);
  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("slug", slug!).maybeSingle().then(({ data }) => setPost(data ?? null));
  }, [slug]);

  if (post === undefined) return <div className="container-tight py-32 text-center text-muted-foreground">Loading…</div>;
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="py-12">
      <div className="container-tight max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground mb-6">
          <Link to="/blog"><ArrowLeft className="h-4 w-4 mr-1" /> All posts</Link>
        </Button>
        {post.cover_url && <img src={post.cover_url} alt={post.title} className="w-full aspect-video object-cover rounded-2xl border border-border mb-8" />}
        <h1 className="font-display text-4xl font-bold leading-tight">{post.title}</h1>
        <p className="text-sm text-muted-foreground mt-2">{new Date(post.created_at).toLocaleDateString()}</p>
        <div className="prose prose-invert mt-8 max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed">
          {post.body}
        </div>
      </div>
    </article>
  );
};
export default BlogPost;
