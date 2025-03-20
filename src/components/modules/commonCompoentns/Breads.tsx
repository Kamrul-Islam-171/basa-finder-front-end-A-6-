"use client"

import { usePathname } from "next/navigation";

const Breads = () => {
    const pathName = usePathname();;
    // console.log(pathName)
    const x = pathName.split("/").filter(Boolean);
    const result = x.map((str) =>
        str
          .split('-') 
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ') 
      );

// console.log(result);

    return (
        <div>
            {result.map((item, idx)=><span key={idx} className="ml-3">{item} </span>)}
        </div>
    );
};

export default Breads;