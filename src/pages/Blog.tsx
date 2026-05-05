import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);
  return (
    <>
      <section className="border-b border-border bg-card/30 py-14">
        <div className="container-tight text-center">
          <Badge variant="outline" className="border-primary/40 text-primary mb-3">
            <BookOpen className="h-3 w-3 mr-1" /> Blog
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Insights & Strategy</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Trading guides, EA tutorials, market commentary and platform updates.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container-tight grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 && <p className="text-muted-foreground col-span-full text-center">No posts yet.</p>}
          {posts.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="group rounded-2xl border border-border bg-gradient-card overflow-hidden hover:border-primary/40 transition-colors">
              {p.cover_url && <div className="aspect-video overflow-hidden"><img src={p.cover_url} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" /></div>}
              <div className="p-5">
                <h2 className="font-display text-lg font-bold leading-snug group-hover:text-primary">{p.title}</h2>
                {p.excerpt && <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{p.excerpt}</p>}
                <p className="text-xs text-muted-foreground mt-3">{new Date(p.created_at).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
export default Blog;
