import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import "./popupModal.scss";
import axios from "axios";
import SuccessAlert from "../Alert/Success";
import InputModal from "../InputModal/InputModal";
import { updateDailyTask, updateUserInfo } from "../../services/dataService";
import { ApiResponse } from "../../services/types";

interface ModalProps {
  isBloodTest?: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<ModalProps> = ({ isBloodTest = false, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isAlertVisible, setAlertVisible] = useState<boolean>(false);
  const [showInputModal, setShowInputModal] = useState<boolean>(false);

  const { uploadType, userID, isAvailableAccess, setisAvailableAccess, setUserDailyTask } = useAppContext();
  console.log("userID: ", userID)

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      console.log("selected file: ", selectedFile);
    }
  };

  const handleSubmit = async () => {
    console.log(uploadType);
    if (!file) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Uploaded image url: ", response.data.secure_url);
      const uploadingData = response.data.secure_url;
      let result: ApiResponse;

      if (uploadType === 'blood')
        result = await updateUserInfo(userID, { labData: uploadingData });
      else {
        result = await updateDailyTask(userID, uploadType, uploadingData, setUserDailyTask)
      }

      if (result.success) {
        setisAvailableAccess(true);
        triggerAlert();
        setAlertVisible(true);
        setUploading(false);
        onClose();
      } else {
        alert(result.message);
        setUploading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  const showAccessCode = () => {
    setShowInputModal(true);
  }

  const closeAccessCode = () => {
    setShowInputModal(false);
  }

  const triggerAlert = () => {
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  const closeModal = () => {
    if (!isBloodTest || isAvailableAccess) {
      onClose();
    }
  }

  return (
    <div className={`popup-modal`}>
      <div className={`modal-content ${isOpen ? "open" : ""}`}>
        <span className="close" onClick={closeModal}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill="white"
            />
          </svg>
        </span>
        <div className="modal-image">
          <svg
            width="74"
            height="64"
            viewBox="0 0 74 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_25_316)">
              <path
                d="M60.2283 18.3946V15.2963C60.2283 15.0347 60.0108 14.824 59.7449 14.824H42.6356C42.3697 14.824 42.1522 15.0347 42.1522 15.2963V18.3946C42.1522 18.6562 41.9346 18.8669 41.6687 18.8669H0.599721C0.333824 18.8669 0.116272 19.0777 0.116272 19.3393V63.4437C0.116272 63.7054 0.333824 63.9161 0.599721 63.9161H68.5098C68.7757 63.9161 68.9933 63.7054 68.9933 63.4437V19.3417C68.9933 19.0801 68.7757 18.8694 68.5098 18.8694H60.7118C60.4459 18.8694 60.2283 18.6586 60.2283 18.397V18.3946Z"
                fill="#005353"
              />
              <path
                d="M20.1262 10.8221V1.5904C20.1262 0.890325 20.6919 0.323486 21.3904 0.323486H68.812C69.5106 0.323486 70.0762 0.890325 70.0762 1.5904V35.0969C70.0762 35.7315 69.5613 36.2475 68.928 36.2475H21.2768C21.2768 36.2475 20.1286 35.7315 20.1286 35.0969V10.8221"
                fill="white"
              />
              <path
                d="M20.2447 3.21098H69.9989C69.9989 3.21098 70.434 1.91015 69.8997 1.06716C69.3655 0.221748 67.8572 0.415539 67.8572 0.415539L22.3187 0.323488C22.3187 0.323488 20.849 0.219325 20.3293 1.08654C19.8096 1.95376 20.2423 3.21098 20.2423 3.21098H20.2447Z"
                fill="#FF9B57"
              />
              <path
                d="M20.1262 10.8221V1.47412C20.1262 0.839455 20.6411 0.323486 21.2744 0.323486H68.9256C69.5589 0.323486 70.0738 0.839455 70.0738 1.47412V35.0945C70.0738 35.7291 69.5589 36.2451 68.9256 36.2451H21.2768C20.6435 36.2451 20.1286 35.7291 20.1286 35.0945V10.8221"
                stroke="#FF9B57"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.1011 1.76484C22.1011 1.48627 22.3259 1.26099 22.6039 1.26099C22.8818 1.26099 23.1066 1.48627 23.1066 1.76484C23.1066 2.04342 22.8818 2.2687 22.6039 2.2687C22.3259 2.2687 22.1011 2.04342 22.1011 1.76484Z"
                fill="white"
              />
              <path
                d="M23.8101 1.76484C23.8101 1.48627 24.0349 1.26099 24.3128 1.26099C24.5908 1.26099 24.8156 1.48627 24.8156 1.76484C24.8156 2.04342 24.5908 2.2687 24.3128 2.2687C24.0349 2.2687 23.8101 2.04342 23.8101 1.76484Z"
                fill="white"
              />
              <path
                d="M25.5167 1.76484C25.5167 1.48627 25.7415 1.26099 26.0195 1.26099C26.2975 1.26099 26.5223 1.48627 26.5223 1.76484C26.5223 2.04342 26.2975 2.2687 26.0195 2.2687C25.7415 2.2687 25.5167 2.04342 25.5167 1.76484Z"
                fill="white"
              />
              <path
                d="M8.64677 18.8983V8.6153C8.64677 7.91523 9.2124 7.34839 9.91099 7.34839H62.329C63.0275 7.34839 63.5932 7.91523 63.5932 8.6153V45.6003C63.5932 46.3004 63.0275 46.8672 62.329 46.8672H9.90857C9.90857 46.8672 8.64435 46.3004 8.64435 45.6003V18.8983"
                fill="white"
              />
              <path
                d="M8.77487 10.5241H63.5061C63.5061 10.5241 63.9872 9.0949 63.3974 8.1647C62.8076 7.23693 61.1518 7.44768 61.1518 7.44768L11.0592 7.34836C11.0592 7.34836 9.44203 7.23451 8.87156 8.1865C8.30109 9.14093 8.77487 10.5217 8.77487 10.5217V10.5241Z"
                fill="#FF9B57"
              />
              <path
                d="M8.64677 18.8983V8.6153C8.64677 7.91523 9.2124 7.34839 9.91099 7.34839H62.329C63.0275 7.34839 63.5932 7.91523 63.5932 8.6153V45.6003C63.5932 46.3004 63.0275 46.8672 62.329 46.8672H9.90857C9.20998 46.8672 8.64435 46.3004 8.64435 45.6003V18.8983"
                stroke="#FF9B57"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.8174 8.93498C10.8174 8.62976 11.0664 8.38025 11.371 8.38025C11.6756 8.38025 11.9245 8.62733 11.9245 8.93498C11.9245 9.24262 11.678 9.4897 11.371 9.4897C11.064 9.4897 10.8174 9.24262 10.8174 8.93498Z"
                fill="white"
              />
              <path
                d="M12.6981 8.93498C12.6981 8.62976 12.9446 8.38025 13.2516 8.38025C13.5586 8.38025 13.8052 8.62733 13.8052 8.93498C13.8052 9.24262 13.5562 9.4897 13.2516 9.4897C12.947 9.4897 12.6981 9.24262 12.6981 8.93498Z"
                fill="white"
              />
              <path
                d="M14.5762 8.93498C14.5762 8.62976 14.8228 8.38025 15.1298 8.38025C15.4368 8.38025 15.6833 8.62733 15.6833 8.93498C15.6833 9.24262 15.4368 9.4897 15.1298 9.4897C14.8228 9.4897 14.5762 9.24262 14.5762 8.93498Z"
                fill="white"
              />
              <path
                d="M13.8027 13.5448H42.887"
                stroke="#00B0B0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.8027 14.8239H38.6109"
                stroke="#00B0B0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M65.0628 17.2923V14.119C65.0628 13.8525 64.8453 13.6345 64.5794 13.6345H47.4701C47.2042 13.6345 46.9867 13.8525 46.9867 14.119V17.2923C46.9867 17.5588 46.7691 17.7768 46.5032 17.7768H5.38586C5.1393 17.7768 4.93142 17.9633 4.90483 18.2104L0.171859 63.3831C0.142852 63.669 0.365238 63.9185 0.652891 63.9185H68.5558C68.8023 63.9185 69.0102 63.7319 69.0368 63.4849L73.7698 18.3146C73.7988 18.0287 73.5764 17.7792 73.2887 17.7792H65.5463C65.2804 17.7792 65.0628 17.5612 65.0628 17.2948V17.2923Z"
                fill="#00B0B0"
              />
              <ellipse
                cx="36.0198"
                cy="42.1175"
                rx="8.52527"
                ry="8.54341"
                fill="white"
              />
              <path
                d="M36.213 27.137C36.051 27.137 35.8988 27.2024 35.7948 27.3114L33.1939 30.0196C32.9715 30.2497 32.9787 30.6155 33.2084 30.8384C33.438 31.0612 33.803 31.054 34.0254 30.8238L35.6377 29.1572V40.9325C35.6377 41.2522 35.8963 41.5114 36.2154 41.5114C36.5345 41.5114 36.7931 41.2522 36.7931 40.9325V29.1572L38.3837 30.8238C38.6036 31.054 38.9687 31.0661 39.2007 30.8456C39.4303 30.6252 39.4424 30.2594 39.2225 30.0269L36.636 27.3186C36.5297 27.2072 36.3822 27.137 36.2178 27.137H36.213Z"
                fill="#263238"
              />
            </g>
            <defs>
              <clipPath id="clip0_25_316">
                <rect
                  width="73.6583"
                  height="63.8372"
                  fill="white"
                  transform="translate(0.116272 0.0812988)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="modal-title">Upload Your Results</h2>
        <p className="modal-description">
          Your first step is share the results of the recent blood exam. Take a
          photo with your mobile camera, and then upload it below.
        </p>

        <div className="file-upload-block">
          <input
            type="file"
            id="file-upload"
            accept=".jpg,.jpeg,.pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="file-upload-label">
            <div className="file-upload-content">
              <svg
                width="30"
                height="35"
                viewBox="0 0 30 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.9866 9.27465H17.6493C16.2119 9.27465 15.0494 8.1122 15.0494 6.67476V0.337524C15.4494 0.512517 15.8119 0.762507 16.1369 1.08749L23.2366 8.1872C23.5616 8.51219 23.8116 8.87467 23.9866 9.27465Z"
                  fill="#00B0B0"
                />
                <path
                  d="M17.6493 11.1495C15.1819 11.1495 13.1745 9.14212 13.1745 6.67472V0H3.71235C1.66243 0 0 1.66243 0 3.71235V29.0988C0 31.1487 1.66243 32.8111 3.71235 32.8111H14.5506C13.4594 31.2612 12.8132 29.3775 12.8132 27.3426C12.8132 22.0866 17.088 17.8118 22.3441 17.8118C23.0228 17.8118 23.684 17.8855 24.324 18.0218V11.1495H17.6493ZM4.68855 7.46844H10.6783C11.2995 7.46844 11.8033 7.97217 11.8033 8.59339C11.8033 9.21462 11.2995 9.71835 10.6783 9.71835H4.68855C4.06733 9.71835 3.5636 9.21462 3.5636 8.59339C3.5636 7.97217 4.06733 7.46844 4.68855 7.46844ZM10.3233 27.8863H4.68605C4.06483 27.8863 3.5611 27.3826 3.5611 26.7614C3.5611 26.1402 4.06483 25.6364 4.68605 25.6364H10.3233C10.9445 25.6364 11.4483 26.1402 11.4483 26.7614C11.4483 27.3826 10.9445 27.8863 10.3233 27.8863ZM12.3232 21.8241H4.68605C4.06483 21.8241 3.5611 21.3204 3.5611 20.6991C3.5611 20.0779 4.06483 19.5742 4.68605 19.5742H12.3232C12.9445 19.5742 13.4482 20.0779 13.4482 20.6991C13.4482 21.3204 12.9445 21.8241 12.3232 21.8241ZM19.6304 15.7731H4.68855C4.06733 15.7731 3.5636 15.2694 3.5636 14.6481C3.5636 14.0269 4.06733 13.5232 4.68855 13.5232H19.6292C20.2504 13.5232 20.7541 14.0269 20.7541 14.6481C20.7541 15.2694 20.2517 15.7731 19.6304 15.7731Z"
                  fill="#00B0B0"
                />
                <path
                  d="M22.344 19.6866C18.1155 19.6866 14.6881 23.114 14.6881 27.3426C14.6881 31.5712 18.1167 34.9985 22.344 34.9985C26.5726 34.9985 30 31.5712 30 27.3426C30 23.114 26.5726 19.6866 22.344 19.6866ZM24.9889 27.3663C24.7739 27.5601 24.5052 27.6551 24.2365 27.6551C23.9565 27.6551 23.6852 27.5376 23.469 27.3326V30.2562C23.469 30.8774 22.9653 31.3812 22.344 31.3812C21.7228 31.3812 21.2191 30.8774 21.2191 30.2562V27.3338C20.7979 27.7338 20.1391 27.7613 19.6992 27.3663C19.2367 26.9501 19.2004 26.2389 19.6154 25.7776L21.5078 23.6765C21.7216 23.439 22.0253 23.304 22.344 23.304C22.6628 23.304 22.9665 23.439 23.1803 23.6765L25.0714 25.7776C25.4877 26.2401 25.4502 26.9513 24.9889 27.3663Z"
                  fill="#FF9B57"
                />
              </svg>
              <h6>Upload your file</h6>
              {file ? <p style={{ color: "#00B0B0" }}>{file.name} selected</p> : <p>Supported format: JPG, PDF (5MB)</p>}
            </div>
          </label>
        </div>

        <button className="fitfox-btn" onClick={handleSubmit} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Results"}
        </button>

        {isBloodTest && <p className="text-bottom">No results to upload? Enter your access code <span onClick={showAccessCode}>here</span></p>}
      </div>


      <SuccessAlert isVisible={isAlertVisible} onClose={closeAlert} />
      {showInputModal && <InputModal isAccessCode={true} onClose={closeAccessCode} onPassed={onClose} />}
    </div>
  );
};

export default UploadModal;
