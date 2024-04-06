const DashboardCard = ({name = 'user'}:{name:string}) => {
  const cardStyle = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div
      className="flex flex-col justify-center rounded-[15px] border border-stroke bg-dashboardprimarylight py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
      style={cardStyle}
    >
      <h1 className='text-black text-title-xl dark:text-white'>Welcome,</h1>
      <h2 className='font-bold text-black text-title-xl dark:text-yellow'>{name}</h2>
    </div>
  );
};

export default DashboardCard;
