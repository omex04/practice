import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { supabase } from '../../lib/supabase';

interface BlogPostEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  initialContent = '',
  onSave,
}) => {
  const [content, setContent] = useState(initialContent);

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleSave = () => {
    onSave(content);
  };

  const handleImageUpload = async (
    blobInfo: any,
    progress: (percent: number) => void
  ): Promise<string> => {
    const file = blobInfo.blob();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blog-images/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from('blog-assets')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from('blog-assets')
        .getPublicUrl(filePath);

      return publicUrl.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-4">
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        initialValue={initialContent}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Inter,Arial,sans-serif; font-size:16px }',
          images_upload_handler: handleImageUpload,
        }}
        onEditorChange={handleEditorChange}
      />
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2B9EB3] hover:bg-[#238999] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B9EB3]"
        >
          Save Content
        </button>
      </div>
    </div>
  );
};

export default BlogPostEditor;