import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function Info({ title, back = false }) {
  const navigate = useNavigate();
  return (
    <div className="    absolute -top-[78px] -start-[20px] z-50 p-7 ps-12 flex gap-x-3 items-center  text-cyan-600 text-lg ">
      {back && (
        <ArrowRight onClick={() => navigate(-1)} size={20} className=" mt-1 cursor-pointer" />
      )}
      {title}
    </div>
  );
}

export default Info;

Info.propTypes = {
  title: PropTypes.node.isRequired,
  back: PropTypes.bool,
};
