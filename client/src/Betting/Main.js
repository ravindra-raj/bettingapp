import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Slider from 'react-slick';
import './Main.css';
import { useNavigate } from 'react-router-dom';

function Main() {

    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate('/bet'); // Navigate to the bet page
    };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,  // Time in milliseconds (1 seconds)
    responsive: [
      {
        breakpoint: 768, // Adjust this value for different screen sizes
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="main">
      <Slider {...settings}>
        <div><img src="/images/image1.jpg" alt="Image 1" /></div>
        <div><img src="/images/image2.jpg" alt="Image 2" /></div>
        <div><img src="/images/image3.jpg" alt="Image 3" /></div>
        <div><img src="/images/image4.jpg" alt="Image 4" /></div>
        <div><img src="/images/image5.jpg" alt="Image 5" /></div>
      </Slider><br/>

      <div className="bet-card" onClick={handleCardClick}>
        <img src="/images/cricket.png" alt="Cricket" className="card-image" />
        <div className="card-content">
          <h2>Bet on Cricket Matches</h2>
        </div>
      </div>
    </div>
  );
}

export default Main;
