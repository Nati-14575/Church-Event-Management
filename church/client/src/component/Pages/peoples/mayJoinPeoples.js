import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../Pagination";
import "./style.css";

function MayJoinPeoples(props) {
  const [peoples, setPeoples] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/events/mayJoinPeoples/" +
          props.match.params.id
      )
      .then((res) => {
        setPeoples(res.data);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPeoples = peoples.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div class="bodyContainer">
        <h3>Peoples Who May Join</h3>
        <h2>Total : {peoples.length} </h2>
        <div class="peoplesList">
          {currentPeoples.map((people) => {
            return (
              <div class="peoplesCard">
                <div class="profileDetail">
                  <label>{people.username}</label>
                </div>
                <div class="profileImage">
                  <img
                    src={`http://localhost:5000/static/assets/images/${people.photo}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {peoples.length > 0 && (
        <div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={peoples.length}
            paginate={paginate}
          />
        </div>
      )}
    </>
  );
}

export default MayJoinPeoples;
