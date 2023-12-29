import { useState, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import redberryLogo from "../src/assets/redberry-logo.png";
import fakePhotoTwo from "../src/assets/fake-photo-2.png";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export const FullInfoComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [token] = useState(
    "afe8866805908dc79d5a55f82d8e36dc4bc7ac1a9337fc5c80074f784321cb1d"
  );

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
                  display: "flex",
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
        <p>Loading or no blog data available</p>
      )}

      <div>
        <h2 className="full-info-container-heading ml-40">მსგავსი სტატიები</h2>
      </div>
    </div>
  );
};
