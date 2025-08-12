
export function Spinner({isDark,className}) {
    return (
        <img className={`spinner ${className}`} src={isDark ? "/images/spinner_black_235430.png":"/images/20250531_115419.png"} alt="" />
    );
}