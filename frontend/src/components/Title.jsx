import React from "react";
import PropTypes from "prop-types";

const Title = ({
    text1 = "Default Text 1",
    text2 = "Default Text 2",
    className = "",
    separatorClass = "",
}) => {
    return (
        <div className={`inline-flex gap-2 items-center mb-3 ${className}`}>
            <p className="text-gray-500">
                {text1}{" "}
                <span className="text-gray-700 font-medium"> {text2}</span>
            </p>
            <p
                className={`w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 ${separatorClass}`}
            ></p>
        </div>
    );
};

Title.propTypes = {
    text1: PropTypes.string,
    text2: PropTypes.string,
    className: PropTypes.string,
    separatorClass: PropTypes.string,
};

export default Title;
