// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faTable } from '@fortawesome/free-solid-svg-icons';

const services = [
  {
    icon: faBook,
    title: 'Academic Excellence',
    description:
      'Achieve your full potential with a commitment to academic excellence. Our programs are designed to foster critical thinking, innovation, and lifelong learning.',
    bgColor: 'bg-[#45a0de]',
  },
  {
    icon: faUsers,
    title: 'Expert Teachers',
    description:
      'Learn from passionate, highly qualified educators dedicated to guiding you toward success. Our teachers provide personalized support and inspire confidence.',
    bgColor: 'bg-[#d59f0f]',
  },
  {
    icon: faTable,
    title: 'Best Classrooms',
    description:
      'Experience a state-of-the-art learning environment. Our classrooms are equipped with advanced technology and resources to ensure effective and enjoyable education.',
    bgColor: 'bg-[#45a0de]',
  },
];

const Service = () => {
  return (
    <div className="flex w-full max-w-[95%] mx-auto -mt-[100px] sm:-mt-[80px] xs:-mt-[50px]">
      {services.map((service, index) => (
        <article
          key={index}
          className={`flex-1 ${service.bgColor} p-4 sm:p-5 z-[1] text-white text-center ${
            index !== services.length - 1
              ? 'border-r-2 border-white'
              : ''
          } sm:p-[15px_10px] xs:p-[10px_6px] min-w-0`}
        >
          <FontAwesomeIcon 
            icon={service.icon} 
            className="text-[32px] sm:text-[40px] xs:text-[24px] mb-[10px] sm:mb-[15px] xs:mb-[8px]" 
          />
          <h3 className="text-[18px] sm:text-[23px] font-bold mb-[8px] sm:mb-[10px] xs:text-[14px] xs:mb-[5px] leading-tight px-1">
            {service.title}
          </h3>
          <p className="hidden sm:block xs:hidden text-[16px] sm:text-[18px] leading-[1.5]">
            {service.description}
          </p>
          <p className="hidden xs:block text-[11px] leading-[1.3] px-1">
            {service.description}
          </p>
        </article>
      ))}
    </div>
  );
};

export default Service;