export function ChooseCard({key,iconName,title,text}){
    return (
        <div key={key} className="flex flex-col items-left text-left gap-3 shadow-lg p-8 rounded-lg">
            <i className={`fa ${"fa-bullseye"} text-blue-600 text-3xl`} ></i>
            <h2 className="text-xl opacity-90 =">{title}</h2>
            <p className="font-light opacity-70">{text}</p>
        </div>
    );
}