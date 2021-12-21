import { useForm } from '../../hooks/useForm';

export const SearchScreen = () => {
  const [formValues, handleInputChange] = useForm({
    searchText: '',
  });

  const { searchText } = formValues;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchText);
  };

  return (
    <>
      <h1>Search Screen</h1>
      <br />
      <div className="row">
        <div className="col-5">
          <h4>Form</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="btn btn-outline-primary mt-3 btn-block"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
