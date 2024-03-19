import Confetti from "react-confetti";
import {useWindowSize} from 'react-use';
const Thankyou = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      <div className="text-bold text-center text-4xl mt-32 text-red-500 flex flex-col items-center">
        Thankyou for creating the employee
      </div>
      <Confetti width={width} height={height} />
    </div>
  );
};

export default Thankyou;
