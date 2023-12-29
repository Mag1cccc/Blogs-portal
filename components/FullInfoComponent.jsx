import { useState, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import redberryLogo from "../src/assets/redberry-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import backArrow from "../src/assets/back-arrow.png";
import nextArrow from "../src/assets/blue-arrow.svg";

import axios from "axios";

export const FullInfoComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [token] = useState(
    "afe8866805908dc79d5a55f82d8e36dc4bc7ac1a9337fc5c80074f784321cb1d"
  );

  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const blogsPerPage = 3;

  const nextSlide = () => {
    const totalBlogs = filteredBlogs.length;
    const newIndex = startIndex + blogsPerPage;
    if (newIndex < totalBlogs) {
      setStartIndex(newIndex);
    }
  };

  const prevSlide = () => {
    const newIndex = startIndex - blogsPerPage;
    if (newIndex >= 0) {
      setStartIndex(newIndex);
    }
  };

  useEffect(() => {
    const fetchBlogData = () => {
      if (!id) return;

      axios
        .get(`https://api.blog.redberryinternship.ge/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBlogData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching blog data:", error);
        });
    };

    fetchBlogData();
  }, [id, token]);

  useEffect(() => {
    if (blogData) {
      const categories = blogData.categories.map((category) => category.id);

      axios
        .get("https://api.blog.redberryinternship.ge/api/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            categories: categories.join(),
          },
        })
        .then((response) => {
          const filteredBlogs = response.data.data.filter((blog) =>
            blog.categories.some((category) => categories.includes(category.id))
          );
          setRelatedBlogs(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching related blogs:", error);
        });
    }
  }, [blogData, token]);

  useEffect(() => {
    if (relatedBlogs.length > 0) {
      const selectedCategoryList = blogData
        ? blogData.categories.map((category) => category.id)
        : [];
      const filtered = relatedBlogs.filter((blog) =>
        selectedCategoryList.every((categoryId) =>
          blog.categories.some((category) => category.id === categoryId)
        )
      );
      setFilteredBlogs(filtered);
    }
  }, [relatedBlogs, blogData]);

  return (
    <div>
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
      <header>
        <img src={redberryLogo} alt="redberry logo" />
        <button type="submit" onClick={() => setIsModalOpen(true)}>
          შესვლა
        </button>
      </header>
      {blogData != null ? (
        <div key={blogData.id} className="full-info-container">
          <div>
            <img
              src={blogData.image}
              alt=""
              style={{ width: "720px", height: "328px,", borderRadius: "12px" }}
            />
            <div className="container-two">
              <h3>{blogData.author}</h3>
              <p>
                {blogData.publish_date}, {blogData.email}
              </p>
            </div>
            <h2 className="full-info-container-heading">{blogData.title}</h2>
            <div className="full-info-container-categories">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                  rowGap: "10px",
                }}
              >
                {blogData.categories.map((element) => {
                  return (
                    <div
                      style={{
                        color: element.text_color,
                        backgroundColor: element.background_color,
                        fontFamily: "firaGo",
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "16px",
                        marginLeft: "8px",
                        padding: "6px 10px",
                        borderRadius: "30px",
                        width: "180px",
                      }}
                      key={element.id}
                    >
                      {element.title}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="full-info-container-description">
              <p>{blogData.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center", color: "red" }}>Loading ...</h1>
      )}

      <div className="slider">
        <div>
          <h2 className="full-info-container-heading ml-40">
            მსგავსი სტატიები
          </h2>
        </div>
        <div className="slider-arrows">
          <img
            src={backArrow}
            alt=""
            onClick={prevSlide}
            style={{ cursor: "pointer" }}
          />
          <img
            src={nextArrow}
            alt=""
            onClick={nextSlide}
            style={{ marginLeft: "24px", cursor: "pointer" }}
          />
        </div>
      </div>
      {filteredBlogs ? (
        <div className="related-blogs">
          {filteredBlogs
            .slice(startIndex, startIndex + blogsPerPage)
            .map((blog) => (
              <div key={blog.id}>
                <img src={blog.image} alt="" />
                <h2>{blog.author}</h2>
                <p>{blog.publish_date}</p>
                <h3>{blog.title}</h3>
                <div className="categories-styled">
                  {blog.categories.map((element) => {
                    return (
                      <div
                        style={{
                          color: element.text_color,
                          backgroundColor: element.background_color,
                          fontFamily: "firaGo",
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "16px",
                          marginLeft: "8px",
                          padding: "6px 10px",
                          borderRadius: "30px",
                          maxWidth: "170px",
                          textAlign: "center",
                        }}
                        key={element.id}
                      >
                        {element.title}
                      </div>
                    );
                  })}
                </div>
                <p className="related-blogs-description">
                  {" "}
                  {blog.description}{" "}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <h2 style={{ textAlign: "center", color: "red" }}>Loading ...</h2>
      )}
    </div>
  );
};
