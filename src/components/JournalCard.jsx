export function JournalCard({imgSrc, title, prev, date}){
    return (
        <div className=" flex md:gap-6 gap-3 md:h-[160px] max-w-[400px] bg-neutral-100 h-[150px] w-full justify-between shadow-md p-6 rounded-2xl overflow-hidden">
        <img className="rounded-lg md:w-[40%] w-[40%] object-cover" src={imgSrc ? `${imgSrc}`: "/images/pexels-photo-1018133.jpeg"} alt="" />
           <div className="flex justify-center flex-col gap-3">
             <h2>{title}</h2>
            <p className="opacity-60 font-light text-xs md:four-line-text line-clamp-3">{prev}</p>
            <span className="opacity-30 md:text-xs text-xs" >{date}</span>
           </div>
        </div>
    )
}

export function HorizontalJournalCard({imgSrc, title, prev, date}){
    return (
        <div className=" flex gap-4 md:gap-6 px-4 py-3 shadow-md items-center rounded-xl shadow-bg">
        <img className="rounded-lg h-[50px] w-[50px] object-cover" src={imgSrc ? `${imgSrc}`: "/images/pexels-photo-1018133.jpeg"} alt="" />
           <div className="flex justify-center flex-col gap-1 text-sm md:text-base">
             <h2>{title}</h2>
           <div className="grid md:gap-1 gap-1 items-center">
             <p className="opacity-40 text-ellipsis text-xs font-light line-clamp-2">{prev}</p>
            <span className="opacity-30 line-clamp-1 text-[0.6rem] font-light" >{date}</span>
           </div>
           </div>
        </div>
    )
}