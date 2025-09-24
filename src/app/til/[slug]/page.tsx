import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import '../til.css'; // 경로를 수정한 CSS 파일을 임포트합니다.

const postsDirectory = path.join(process.cwd(), 'TILFOLDER');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}

async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const title = matterResult.data.title || slug.replace(/_/g, ' ');

  return {
    title,
    date: matterResult.data.date,
    content: matterResult.content,
  };
}

export default async function TILPost({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <article 
        className="prose lg:prose-xl bg-white rounded-lg shadow-md mx-auto p-8"
      >
        <h1 className="!mb-2">{postData.title}</h1>
        {postData.date && <p className="text-gray-500 mt-2 mb-12">{postData.date}</p>}
        
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {postData.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
