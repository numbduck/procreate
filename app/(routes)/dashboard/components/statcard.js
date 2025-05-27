const StatCard = ({ title, stat }) => {
  return (
    <div className="min-w-[200px] min-h-[107px] rounded-md p-3 flex flex-col items-center space-y-1  2xl:w-[200px] border-2">
      <h1 className="font-bold text-xl">{stat}</h1>
      <h5 className="font-light">{title}</h5>
    </div>
  );
};

export default StatCard;