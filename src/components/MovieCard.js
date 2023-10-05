import React from "react";

const MovieCard = () => {
  return (
    <div className="card">
      <div className="cardImgContainer">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg"
          alt="Endgame"
          className="cardImg"
        />
      </div>

      <div className="cardInfo">
        <p className="cardTitle">Avengers End Game</p>
        <p className="cardDescription">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
          architecto necessitatibus odit, dolorum beatae tenetur. Impedit
          dignissimos numquam, totam accusamus adipisicing elit. Magnam
          architecto necessitatibus odit, dolorum beatae tenetur. Impedit
          dignissimos numquam, totam accusamus
        </p>
        <p className="cardRating">7.8</p>
      </div>
      <div className="btns">
        <button className="btnCard btnWatch">Watch List</button>
        <button className="btnCard btnSeen">Seen</button>
      </div>
    </div>
  );
};

export default MovieCard;
