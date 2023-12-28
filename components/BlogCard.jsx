import fakePhoto from "../src/assets/fake-photo.png";
import { useState, useEffect } from "react";
import nextButton from "../src/assets/Arrow.svg";
import { Link } from "react-router-dom";
import axios from "axios";

export const BlogCard = () => {
  const [token] = useState(
    "afe8866805908dc79d5a55f82d8e36dc4bc7ac1a9337fc5c80074f784321cb1d"
  );
  const [blogsList, setBlogsList] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://api.blog.redberryinternship.ge/api/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBlogsList(response.data.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [token]);

  console.log(blogsList);
  return (
    <>
      {blogsList.map((element) => (
        <div className="blog-card m-24" key={element.id}>
          <img src={element.image} alt="" />
          <div className="mt-24 mb-16">
            <h4 className="author-name">{element.author}</h4>
            <p className="posted-date">{element.publish_date}</p>
          </div>
          <h2 className="blog-heading mb-16">{element.title}</h2>
          <div className="mb-16">
            <p className="added-blog-categories"></p>
          </div>
          <div className="mb-16 description-container">
            <p className="added-blog-description">{element.description}</p>
          </div>
          <div className="blog-card-container">
            <Link to="/blog-full-info" className="blog-card-btn">
              <button className="blog-card-btn">
                სრულად ნახვა <img src={nextButton} alt="" />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
