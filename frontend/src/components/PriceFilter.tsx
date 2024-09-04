type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h1 className="text-md font-semibold mb-2">Max Price</h1>
      <select
        className="border border-slate-400 rounded w-full p-2 shadow-lg cursor-pointer"
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value={""}>Select Max Price</option>
        {[100, 200, 300, 400, 500].map((price) => (
          <option value={price}>${price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
