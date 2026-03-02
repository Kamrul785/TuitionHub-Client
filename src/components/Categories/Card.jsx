import React from 'react';

const Card = ({ title, image, subtitle }) => {
    return (
        <div className="card-modern-interactive overflow-hidden">
            <div className="overflow-hidden bg-slate-50">
                <img
                    src={image}
                    alt={title}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4 text-center">
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                {subtitle ? <p className="text-sm text-slate-500 mt-1">{subtitle}</p> : null}
            </div>
        </div>
    );
};

export default Card;