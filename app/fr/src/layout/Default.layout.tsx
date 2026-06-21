import { Outlet } from "react-router-dom";
import "../App.css";
// import HeaderComponent from '../components/Header.component';
// import FooterComponent from '../components/Footer.component';

const DefaultLayout = () => {
  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden body-main">
            <main>
              <div className="mx-auto mb-15 w-screen p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
