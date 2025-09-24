import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import './til.css'; // 새로 만든 CSS 파일을 임포트합니다.

// TIL 게시물 타입을 정의합니다.
interface Post {
  slug: string;
  title: string;
  date?: string;
}

// TIL 폴더의 절대 경로를 가져옵니다.
const postsDirectory = path.join(process.cwd(), 'TILFOLDER');

// 모든 TIL 게시물을 가져오는 함수입니다.
function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const title = matterResult.data.title || slug.replace(/_/g, ' ');

    return {
      slug,
      title,
      date: matterResult.data.date,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return 0;
  });
}

export default function TILHome() {
  const allPosts = getSortedPostsData();

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="w-full max-w-4xl bg-gray-200 text-white rounded-lg shadow-md mx-auto p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-12 text-center">Today I Learned</h1>
        <ul className="list-none p-0">
          {allPosts.map(({ slug, title, date }) => (
            <li key={slug} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0">
              <Link href={`/til/${slug}`} className="no-underline group">
                <h2 className="text-2xl font-semibold mb-1 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {title}
                </h2>
              </Link>
              {date && <p className="text-sm text-gray-500 mt-1">{date}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
