export default function SocialShare({ url, title }) {
  return (
    <div className="flex gap-4 mt-4">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        اشتراک در توییتر
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        اشتراک در لینکدین
      </a>
    </div>
  );
}