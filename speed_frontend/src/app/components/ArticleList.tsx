type Article = {
  id: number;
  name: string;
  author: string;
  year: number;
  volume: number;
  doi: string;
  status: 'Approved' | 'Rejected' | 'Pending';
};

type ArticleListProps = {
  articles: Article[];
};

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Article name</th>
            <th className="py-2 px-4 text-left">Author</th>
            <th className="py-2 px-4 text-left">Year of publication</th>
            <th className="py-2 px-4 text-left">Volume</th>
            <th className="py-2 px-4 text-left">DOI</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b">
              <td className="py-2 px-4">{article.name}</td>
              <td className="py-2 px-4">{article.author}</td>
              <td className="py-2 px-4">{article.year}</td>
              <td className="py-2 px-4">{article.volume}</td>
              <td className="py-2 px-4">{article.doi}</td>
              <td className="py-2 px-4">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  article.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  article.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {article.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}