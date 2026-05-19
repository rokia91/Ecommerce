import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/images/grocery-banner.png'
import img2 from '../../assets/images/slider-image-1.jpeg' 
import img3 from '../../assets/images/slider-2.jpeg'
import img4 from '../../assets/images/banner-4.jpeg'
import img5 from '../../assets/images/slider-image-2.jpeg'
import img6 from '../../assets/images/slider-image-3.jpeg'

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <div className="px-5 mb-10 flex ">
        <div className="w-3/4">
        <Slider {...settings} autoplay>
      <div>
        <img src={img2} alt="food" className="w-full h-72" />
      </div>
      <div>
      <img src={img3} alt="food" className="w-full h-72" />
      </div>
      <div>
        <img src={img4} alt="food" className="w-full h-72" />
      </div>
      <div>
      <img src={img6} alt="food" className="w-full h-72" />
      </div>
      <div>
      <img src={img5} alt="food" className="w-full h-72" />
      </div>
    </Slider>
        </div>

    <div className="w-1/4">
        <img src={img1} className="w-full h-36 block" />
        <img src={img4} className="w-full h-36 block" />
    </div>
    </div>
  )
}
