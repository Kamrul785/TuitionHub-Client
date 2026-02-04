import React from 'react';

const Card = ({ title, image, subtitle }) => {
    return (
        <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="overflow-hidden rounded-xl bg-gray-50">
                <img
                    src={image}
                    alt={title}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="my-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
            </div>
        </div>
    );
};

export default Card;