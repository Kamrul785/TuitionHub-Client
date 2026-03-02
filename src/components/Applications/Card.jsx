const Card = ({ title, count }) => {
  return (
    <div className="card-modern p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{count}</h3>
    </div>
  );
};

export default Card;
