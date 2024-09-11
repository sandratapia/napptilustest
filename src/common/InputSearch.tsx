import lupaImage from "../assets/images/ic_search.png";
import "../styles/InputSearch.css";

type SearchInputProps = {
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="search-input"
      />
      <button
        onClick={() =>
          handleChange({
            target: { value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        className="search-button"
      >
        <img src={lupaImage} alt="Search" className="search-icon" />
      </button>
    </div>
  );
};
