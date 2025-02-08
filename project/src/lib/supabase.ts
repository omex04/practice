import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const getPublishedPosts = async (page = 1, limit = 6) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_post_categories (
        blog_categories (
          name,
          slug
        )
      )
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .range(from, to);

  if (error) throw error;
  return posts;
};

export const getPostBySlug = async (slug: string) => {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_post_categories (
        blog_categories (
          name,
          slug
        )
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return post;
};

export const createPost = async (post: any) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePost = async (id: string, post: any) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePost = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
};