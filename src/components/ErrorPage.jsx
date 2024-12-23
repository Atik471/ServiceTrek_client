import { Helmet } from "react-helmet-async";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[100vh] gap-8">
      <Helmet>
        <title>Oops!</title>
      </Helmet>
      <p className="text-4xl text-red-600 font-bold">Oops something went wrong!</p>
      <MdOutlineReportGmailerrorred className="text-8xl text-red-600"></MdOutlineReportGmailerrorred>
    </div>
  );
};

export default ErrorPage;
