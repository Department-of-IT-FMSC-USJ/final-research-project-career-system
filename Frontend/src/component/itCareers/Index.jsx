import React, { useState } from "react";
import ScrollLeft from "../../assets/images/scrollLeft.png";
import ScrollRight from "../../assets/images/scrollRight.png";
import "./style.css";

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const allCards = [
    {
      title: "Software Engineer",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "UI/UX Designer",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "Business Analyst",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "Data Scientist",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "DevOps Engineer",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: "Product Manager",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
  ];

  const handleScrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const handleScrollRight = () => {
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const handleExploreAll = () => {
    setShowAll(true);
  };

  const getVisibleCards = () => {
    if (showAll) {
      return allCards;
    }
    return allCards.slice(currentIndex, currentIndex + 3);
  };

  return (
    <div>
      <div className="itCareerContainer">
        <div className="itCareerTitle">
          <span>IT careers</span>
        </div>
        <div className="itCareerSubTitle">
          <span>in demand right now</span>
        </div>
        <div className="itCareerSubText">
          <span>
            Check our the best roles in IT field and leanr more about career
            choices you can make
          </span>
        </div>
        <div className="itCareerCardContainer">
          {!showAll && (
            <>
              <div className="scrollButtons">
                <div
                  className={`scrollLeftBtn ${
                    currentIndex === 0 ? "disabled" : ""
                  }`}
                  onClick={handleScrollLeft}
                >
                  <img src={ScrollLeft} alt="Scroll Left" />
                </div>
                <div
                  className={`scrollRightBtn ${
                    currentIndex >= 3 ? "disabled" : ""
                  }`}
                  onClick={handleScrollRight}
                >
                  <img src={ScrollRight} alt="Scroll Right" />
                </div>
              </div>
            </>
          )}
          <div className={`itCareerCardSection ${showAll ? "showAll" : ""}`}>
            {getVisibleCards().map((card, index) => (
              <div key={index} className="cardOne">
                <div className="cardTitle">
                  <span>{card.title}</span>
                </div>
                <div className="cardDescription">
                  <span>{card.description}</span>
                </div>
              </div>
            ))}
          </div>
          {!showAll ? (
            <div className="exloreAllBtn" onClick={handleExploreAll}>
              <span>Explore all &gt;</span>
            </div>
          ) : (
            <div className="exloreAllBtn" onClick={() => setShowAll(false)}>
              <span>Show less &lt;</span>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
}
