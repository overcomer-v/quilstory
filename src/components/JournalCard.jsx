export function JournalCard({imgSrc, title, prev, date}){
    return (
        <div className=" flex md:gap-6 gap-3 md:h-[200px] h-[150px] w-full justify-between shadow-lg p-6 rounded-2xl overflow-hidden">
        <img className="rounded-lg md:w-[60%] w-[40%] object-cover" src={imgSrc ? `${imgSrc}`: "/images/pexels-photo-1018133.jpeg"} alt="" />
           <div className="flex justify-center flex-col gap-3">
             <h2>{title}</h2>
            <p className="opacity-60 text-sm md:four-line-text line-clamp-3">{prev}</p>
            <span className="opacity-30 text-sm" >{date}</span>
           </div>
        </div>
    )
}

export function HorizontalJournalCard({imgSrc, title, prev, date}){
    return (
        <div className=" flex gap-3 md:gap-6 shadow-md items-center md:p-6 p-4 rounded-lg">
        <img className="rounded-lg h-[50px] w-[50px] object-cover" src={imgSrc ? `${imgSrc}`: "/images/pexels-photo-1018133.jpeg"} alt="" />
           <div className="flex justify-center flex-col gap-1 text-sm md:text-base">
             <h2>{title}</h2>
           <div className="grid grid-cols-[65%_30%] md:gap-6 gap-3 items-center">
             <p className="opacity-60 text-ellipsis text-xs font-light line-clamp-2">{prev}</p>
            <span className="opacity-30 line-clamp-1 text-xs font-light" >{date}</span>
           </div>
           </div>
        </div>
    )
}