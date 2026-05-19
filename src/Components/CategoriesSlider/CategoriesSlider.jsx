import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };

  async function fetchCategories() {
    const res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    return res.data.data;
  }

  const { data: allCategories, isLoading, isError } = useQuery({
    queryKey: ['getSliderCategories'],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <h2 className="text-center text-lg font-semibold">Loading categories...</h2>;
  }

  if (isError) {
    return <h2 className="text-center text-lg font-semibold text-red-500">Error loading categories</h2>;
  }

  return (
    <div className="p-10 mb-10">
      <Slider {...settings} autoplay>
        {allCategories?.map((category) => (
          <div key={category._id}>
            <img src={category.image} alt={category.name} className="w-full h-72" />
            <h6>{category.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}
