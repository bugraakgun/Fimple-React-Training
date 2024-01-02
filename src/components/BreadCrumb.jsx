import { Link, useLocation } from "react-router-dom";
import { FaBackward, FaHouse } from "react-icons/fa6";
export default function BreadCrumb({ className }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const prevLink = pathnames.slice(0, -1).join("/");
  const isMain = pathnames.includes("basvuru-listesi");
  return (
    <div className={[className, "flex items-center m-2 text-sm"].join(" ")}>
      {!isMain && (
        <Link
        className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          to={"/" + prevLink}
        >
          <FaBackward className="inline-block mr-1" />
          Geri
        </Link>
      )}
      <div className="mx-auto flex flex-wrap">
        <Link to="/" className="flex justify-center items-center">
          <FaHouse className="mx-1" /> Anasayfa
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <span key={name}>
              <span>{" > "}</span>
              {isLast ? <span>{name}</span> : <Link to={routeTo}>{name}</Link>}
            </span>
          );
        })}
      </div>
    </div>
  );
}
