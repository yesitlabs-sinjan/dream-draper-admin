import { RxCross1 } from "react-icons/rx";

const SearchBox = ({ search, setSearch }) => {
  return (
    <div className="search-align">
      <img src="./images/search.svg" className="magnify" />
      <input
        type="text"
        placeholder="Search User Name"
        className="search-content"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <span
          className="clear-btn"
          onClick={() => setSearch('')}
        >
          <RxCross1 color="#949494" size={15} strokeWidth={1.2} />
        </span>
      )}
    </div>
  )
}

export default SearchBox