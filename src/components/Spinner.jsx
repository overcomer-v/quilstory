
export function Spinner({isDark,className}) {
    return (
        <i className={`spinner ${className} ${isDark ? "text-black":"text-white"} fa fa-spinner`}  alt="" ></i>
    );
}

// src={isDark ? "/images/spinner_black_235430.png":"/images/20250531_115419.png"}