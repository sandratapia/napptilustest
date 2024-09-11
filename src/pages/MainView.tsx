import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchOompaLoompas,
  filterOompaLoompas,
  incrementPage,
  OompaLoompa,
} from "../features/oompaLoompasSlice";
import { useAppDispatch, useAppSelector } from "../hooks/dispatchHook";
import "../styles/MainView.css";
import { Loading } from "../common/Loading";
import { SearchInput } from "../common/InputSearch";

const MainView = () => {
  const dispatch = useAppDispatch();
  const { data, status, currentPage, lastPage, lastFetched } = useAppSelector(
    (state) => state.oompaLoompas
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [profession, setProfession] = useState("");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (currentPage <= lastPage) {
      dispatch(fetchOompaLoompas(currentPage));
    } else {
      setHasMore(false);
    }
  }, [currentPage, dispatch, lastPage]);

  useEffect(() => {
    const oneDayAgo = Date.now() - 86400000;
    if (lastFetched !== null) {
      if (lastFetched < oneDayAgo) {
        dispatch(fetchOompaLoompas(1));
      }
    }
  }, [dispatch, lastFetched]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(filterOompaLoompas({ name: e.target.value, profession }));
  };

  const handleProfessionFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfession(e.target.value);
    dispatch(
      filterOompaLoompas({ name: searchTerm, profession: e.target.value })
    );
  };

  const fetchMoreData = () => {
    dispatch(incrementPage());
  };

  if (status === "loading" && currentPage === 1) return <Loading />;
  if (status === "failed") return <div>Failed to load Oompa Loompas.</div>;

  return (
    <>
      <div className="filters">
        <SearchInput
          placeholder="Search by name"
          value={searchTerm}
          handleChange={handleSearch}
        />
        <SearchInput
          placeholder="Filter by profession"
          value={profession}
          handleChange={handleProfessionFilter}
        />
      </div>
      <h2 className="subtitle">
        Find your Oompa Loompa
        <br />
        <p>There are more than 100k</p>
      </h2>

      <InfiniteScroll
        dataLength={data.length} 
        next={fetchMoreData} 
        hasMore={hasMore}
        loader={status === "loading" ? <Loading /> : <></>}
        endMessage={<p>No more Oompa Loompas to show.</p>}
      >
        <ul className="oompaLoompas">
          {data.map((oompa: OompaLoompa, index: Number) => (
            <li key={`${oompa.id}-${index}`}>
              <Link to={`/${oompa.id}`}>
                <div>
                  <img
                    src={oompa.image}
                    alt={`${oompa.first_name} ${oompa.last_name}`}
                  />
                </div>
                <h3>
                  {oompa.first_name} {oompa.last_name}
                </h3>
                <p>{oompa.profession}</p>
                <p>{oompa.gender === "F" ? "Woman" : "Man"}</p>
              </Link>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </>
  );
};

export default MainView;
