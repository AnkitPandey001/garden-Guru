
import React from 'react';
import suggestData from '../topData/suggest';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Suggest = () => {
  // const data = JSON.parse(localStorage.getItem('Garden')).savedUser;
  const filteredData = suggestData.slice(0, 5)
  const navigate = useNavigate();
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Display two slides vertically
    slidesToScroll: 1, // Scroll one slide at a time
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="suggest_main p-4">
      <h1 className="text-3xl font-bold text-center pb-2 ">Top Picks</h1>
      <div className="suggest">
        <Slider {...sliderSettings} className='custom-slide'>
          {filteredData.map((ele, id) => (
            <div key={id} className=" rounded-lg overflow-hidden shadow-md p-4">
              <div className="flex items-center mb-4">
                <img src={ele.images} alt={ele.commonName} className="w-20 h-20 object-cover rounded-full mr-4" />
                <p className="text-lg font-medium">{ele.commonName}</p>
              </div>
              <div>
                <button
                  className="btn-04 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    navigate(`/pagenavigation/${id}`, {
                      state: { plant: ele },
                    })
                  }
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Suggest;
