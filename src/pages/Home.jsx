import React from 'react'
import Main from '../components/Main'
import requests from '../components/Requests'
import Row from '../components/Row'
import SearchBar from '../components/SearchBar';

const Home = ({search, searchFilter, setSearch }) => {

  return (
   <>
    {search ? (
            <SearchBar setSearch={setSearch} searchFilter={searchFilter} />
      ):(
        <>
          <Main />
          <Row uId="1" title="Upcoming" facthUrl={requests.requestUpcoming} />
          <Row uId="2" title="Trending" facthUrl={requests.requestTrending} />
          <Row uId="3" title="TopRated" facthUrl={requests.requestTopRated} />
          <Row uId="4" title="Horror" facthUrl={requests.requestHorror} />
          <Row uId="5" title="Popular" facthUrl={requests.requestPopular} />
        </>
      )}
   </>
  )
}

export default Home