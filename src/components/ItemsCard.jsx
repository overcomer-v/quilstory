import { useEffect, useRef, useState } from "react";
import { getDateType, monthArray } from "../utils/date-formatter";

export function ItemCard({ item, onAction, onClick, ref }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [onDelete,setOnDelete] = useState(false);

  const popUpRef = useRef();

  useEffect(() => {
    function handleOffClick(event) {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setShowPopUp(false);
      }
    }

    if (showPopUp) {
      setTimeout(() => {
        document.addEventListener("click", handleOffClick);
      }, 100);
    }

    return () => {
      document.removeEventListener("click", handleOffClick);
    };
  }, [showPopUp]);

  return (
    <div
      onClick={onClick}
      className=" flex shadow-sm relative gap-3 md:max-w-[220px] h-fit bg-[rgb(240,240,240)] w-full cursor-pointer items-center p-4 rounded-2xl"
    >
      <DateWidget itemDate={item.created_at}></DateWidget>
      {showPopUp && (
        <CardPopUp ref={popUpRef}>
          <PopUpListItems
            label={"Delete journal"}
            iconData={onDelete ? "fa-spinner fa-spin" : "fa-trash-can"}
            onClick={async () => {
              setOnDelete(true);
             try {
               if (item.note) {
                await onAction("Delete", item.id);
              } else {
                await onAction("Delete", item.id, item.image_url);
              }
             } catch (error) {
              alert(error);
             }finally{
              setOnDelete(false);
             }
            }}
          ></PopUpListItems>
          <PopUpListItems
            label={"Edit journal"}
            iconData={"fa-pencil"}
            onClick={() => {
              onAction("Edit", item.id);
            }}
          ></PopUpListItems>
        </CardPopUp>
      )}
      <div className=" flex flex-col md:gap-3 gap-3 h-full w-full">
        <img
          className="rounded-lg md:w-full w-full h-40 object-cover mb-1"
          src={
            item.imageSrc
              ? `${item.imageSrc}`
              : "/images/pexels-photo-1018133.jpeg"
          }
          alt=""
        />
        <div className="flex justify-start flex-1 items-start flex-col gap-2 ">
          <h2>{item.title}</h2>
          <p className="opacity-60 font-light text-xs line-clamp-3 h-12 w-full">
            {item.event ?? item.note}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          {" "}
          <span className="opacity-30 md:text-xs text-xs">
            {new Date(item.created_at).getFullYear()}
          </span>
         {  onAction && <i
            className="fa fa-ellipsis-v flex items-end h-fit opacity-50 rounded-full p-2 hover:bg-neutral-500 hover:text-white z-20"
            onClick={(e) => {
              e.stopPropagation();
              ref.current.click();
              setShowPopUp(!showPopUp);
            }}
          ></i>}
        </div>
      </div>
    </div>
  );
}

export function HorizontalItemCard({ imgSrc, title, prev, date, onClick }) {
  return (
    <div onClick={onClick} className=" flex cursor-pointer gap-4 md:gap-6 px-4 py-3 shadow-sm items-center rounded-xl shadow-bg">
      <img
        className="rounded-lg h-[50px] w-[50px] object-cover"
        src={imgSrc ? `${imgSrc}` : "/images/pexels-photo-1018133.jpeg"}
        alt=""
      />
      <div className="flex justify-center flex-col gap-1 text-sm md:text-base">
        <h2>{title}</h2>
        <div className="grid md:gap-1 gap-1 items-center">
          <p className="opacity-40 text-ellipsis text-xs font-light line-clamp-2">
            {prev}
          </p>
          <span className="opacity-30 line-clamp-1 text-[0.6rem] font-light">
            {new Date(date).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function DateWidget({ itemDate }) {
  const date = new Date(itemDate);

  return (
    <div className="flex flex-col z-10 gap-0 p-3 h-fit pr-3 absolute left-0 top-0 bg-[rgb(240,240,240)] rounded-2xl items-center font-light [&_p]:text-xs [&_p]:opacity-80  leading-none">
      <h1 className="md:text-lg text-base">
        {date.getDate()}
        <span className="text-sm opacity-40">
          {getDateType(date.getDate())}
        </span>
      </h1>
      <div className="flex flex-col leading-none">
        <p>{monthArray[date.getMonth()]}</p>
        {/* <p>{date.getFullYear()}</p> */}
      </div>
    </div>
  );
}

function CardPopUp({ children, ref }) {
  return (
    <ul
      onClick={(e) => {
        e.stopPropagation();
      }}
      ref={ref}
      className=" flex flex-col gap-4 absolute md:-right-14 right-1 top-1/2 shadow-bg px-6 py-2 rounded-lg z-50 border-[1px]"
    >
      <li>{children}</li>
    </ul>
  );
}

function PopUpListItems({ label, onClick, iconData }) {
  return (
    <ul
      className="flex items-center gap-4 my-4 opacity-60 hover:cursor-pointer"
      onClick={onClick}
    >
      <i className={`fa ${iconData}`}></i>
      <div className="text-sm">{label}</div>
    </ul>
  );
}
