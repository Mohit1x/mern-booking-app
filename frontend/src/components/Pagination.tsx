export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumber = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {pageNumber.map((number) => (
          <li
            className={`px-4 py-2 ${
              page === number ? "bg-blue-600 text-white" : ""
            }`}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
