import { useState, FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.scss";

type Tab = "tasks" | "ask" | "rank" | "profile";

const BottomNavbar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("tasks");

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    if (path === "tasks" || path === "ask" || path === "friends" || path === "profile") {
      setActiveTab(path as Tab);
    }
  }, [location.pathname]);

  const handleTabClick = (tab: Tab): void => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <div className="bottom-navbar">
      <div
        className={`tab ${activeTab === "tasks" ? "active" : ""}`}
        onClick={() => handleTabClick("tasks")}
      >
        <div className="icon">
          <svg
            width="25.5"
            height="28.33"
            viewBox="0 0 26 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.75 2.25004V27.7614C25.7496 28.1342 25.6012 28.4917 25.3375 28.7552C25.0737 29.0187 24.7161 29.1667 24.3432 29.1667H1.65675C1.2847 29.1641 0.928608 29.0153 0.665392 28.7523C0.402175 28.4894 0.252967 28.1334 0.25 27.7614V2.23871C0.25 1.46237 0.880417 0.833374 1.65675 0.833374H24.3333C24.7091 0.833374 25.0694 0.982629 25.3351 1.24831C25.6007 1.51398 25.75 1.87432 25.75 2.25004ZM11.9984 16.5881L8.49217 13.0819L6.489 15.0865L11.9984 20.5959L20.0125 12.5818L18.0093 10.5786L11.9984 16.5881Z"
              fill="CurrentColor"
            />
          </svg>
        </div>
        <span>Tasks</span>
      </div>
      <div
        className={`tab ${activeTab === "ask" ? "active" : ""}`}
        onClick={() => handleTabClick("ask")}
      >
        <div className="icon">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.98274 25.0173C3.66535 23.7032 2.6206 22.1418 1.90851 20.4227C1.19642 18.7036 0.831029 16.8608 0.833324 15C0.833324 7.17579 7.17574 0.833374 15 0.833374C22.8242 0.833374 29.1667 7.17579 29.1667 15C29.1667 22.8243 22.8242 29.1667 15 29.1667H0.833324L4.98274 25.0173ZM13.5833 6.50004V23.5H16.4167V6.50004H13.5833ZM7.91666 10.75V19.25H10.75V10.75H7.91666ZM19.25 10.75V19.25H22.0833V10.75H19.25Z"
              fill="CurrentColor"
            />
          </svg>
        </div>
        <span>Ask</span>
      </div>
      <div
        className={`tab ${activeTab === "rank" ? "active" : ""}`}
        onClick={() => handleTabClick("rank")}
      >
        <div className="icon">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_341_926)">
              <path
                d="M6.7647 24.2645H1.47058C1.10294 24.2645 0.735291 23.8969 0.735291 23.5292V18.1616C0.735291 17.7204 1.10294 17.4263 1.47058 17.4263H6.61764V23.5292C6.61764 23.7498 6.69117 24.0439 6.7647 24.2645Z"
                fill="CurrentColor"
              />
              <path
                d="M16.9118 14.706V23.5295C16.9118 23.8972 16.5441 24.2648 16.1765 24.2648H8.82355C8.4559 24.2648 8.08826 23.8972 8.08826 23.5295V14.706C8.08826 14.2648 8.4559 13.9707 8.82355 13.9707H16.1765C16.5441 13.9707 16.9118 14.2648 16.9118 14.706Z"
                fill="CurrentColor"
              />
              <path
                d="M24.2647 19.1176V23.5294C24.2647 23.897 23.8971 24.2647 23.5294 24.2647H18.2353C18.3088 24.0441 18.3823 23.75 18.3823 23.5294V18.3823H23.5294C23.8971 18.3823 24.2647 18.6764 24.2647 19.1176Z"
                fill="CurrentColor"
              />
              <path
                d="M18.4559 5.88224L16.0294 8.23518L16.6177 11.6175C16.6912 11.9116 16.5441 12.2058 16.3235 12.3528C16.103 12.4999 15.7353 12.4999 15.5147 12.4264L12.5 10.8087L9.48531 12.3528C9.26472 12.4999 8.9706 12.4999 8.75001 12.2793C8.52942 12.1322 8.38237 11.8381 8.45589 11.544L9.04413 8.16165L6.54413 5.88224C6.39707 5.73518 6.32354 5.44106 6.39707 5.14694C6.4706 4.85283 6.69119 4.70577 6.98531 4.63224L10.3677 4.11753L11.8382 1.10283C12.0588 0.58812 12.9412 0.58812 13.1618 1.10283L14.6324 4.11753L18.0147 4.63224C18.3088 4.70577 18.5294 4.85283 18.603 5.14694C18.6765 5.44106 18.603 5.73518 18.4559 5.88224Z"
                fill="CurrentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_341_926">
                <rect width="25" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <span>Rank</span>
      </div>
      <div
        className={`tab ${activeTab === "profile" ? "active" : ""}`}
        onClick={() => handleTabClick("profile")}
      >
        <div className="icon">
          <svg
            width="20"
            height="30"
            viewBox="0 0 20 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99998 0.833374C11.4009 0.833374 12.7704 1.2488 13.9353 2.02713C15.1001 2.80546 16.008 3.91172 16.5441 5.20603C17.0802 6.50034 17.2205 7.92457 16.9472 9.2986C16.6739 10.6726 15.9993 11.9348 15.0087 12.9254C14.018 13.916 12.7559 14.5906 11.3819 14.8639C10.0078 15.1372 8.58362 14.997 7.28931 14.4609C5.995 13.9247 4.88873 13.0168 4.1104 11.852C3.33208 10.6871 2.91665 9.31766 2.91665 7.91671L2.92373 7.60929C3.00295 5.78569 3.78309 4.06306 5.10146 2.80064C6.41984 1.53822 8.17466 0.833479 9.99998 0.833374ZM12.8333 17.8334C14.7119 17.8334 16.5136 18.5797 17.842 19.908C19.1704 21.2364 19.9166 23.0381 19.9166 24.9167V26.3334C19.9166 27.0848 19.6181 27.8055 19.0868 28.3368C18.5554 28.8682 17.8348 29.1667 17.0833 29.1667H2.91665C2.1652 29.1667 1.44453 28.8682 0.913177 28.3368C0.381824 27.8055 0.083313 27.0848 0.083313 26.3334V24.9167C0.083313 23.0381 0.829591 21.2364 2.15797 19.908C3.48636 18.5797 5.28803 17.8334 7.16665 17.8334H12.8333Z"
              fill="CurrentColor"
            />
          </svg>
        </div>
        <span>Profile</span>
      </div>
    </div>
  );
};

export default BottomNavbar;
