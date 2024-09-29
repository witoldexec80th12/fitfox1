import React, { useEffect, useRef, useState } from "react";
import "./modal.scss";

interface ModalProps {
  onClose: () => void;
}

const backgroundStyle = {
  background: "linear-gradient(180deg, #FFFFFF 0%, #CFF6FF 100%)",
};

const RecordModal: React.FC<ModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStartedRecording, setIsStartedRecording] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalId = useRef<number | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 100);

    return () => {
      clearInterval(intervalId.current); // Clear interval on unmount
    };
  }, []);

  const handleRecord = () => {
    if (isStartedRecording) {
      setIsStartedRecording(false);
      setElapsedTime(0);
      clearInterval(intervalId.current);
      intervalId.current = undefined;
    } else {
      setIsStartedRecording(true);
      intervalId.current = setInterval(() => {
        setElapsedTime((lastElapsedTime) => lastElapsedTime + 10);
      }, 10);
    }
  };

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const milliseconds = Math.floor((ms % 1000) / 100)
      .toString()
      .padStart(2, "0"); // showing tenths of seconds

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className={`modal`} onClick={onClose}>
      <div
        className={`modal-content ${isOpen ? "open" : ""}`}
        style={{ padding: "40px 30px", background: backgroundStyle.background }}
        onClick={(e) => e.stopPropagation()}
      >
        {isStartedRecording ? (
          <div>
            <p
              style={{
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "20.16px",
                textAlign: "center",
                marginBottom: "30px",
                color: "black"
              }}
            >
              Listening...
            </p>
            <svg
              width="100%"
              height="91"
              viewBox="0 0 370 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M224.32 0V90.9477H226.32V5.96046e-08L224.32 0ZM85.24 85.4589V4.88613H87.24V85.4589H85.24ZM80.7546 11.0841V79.261H82.7546V11.0841H80.7546ZM17.9447 16.1168V74.8307H19.9447V16.1168H17.9447ZM13.459 66.4414V24.5029H15.459V66.4414H13.459ZM8.97339 27.3V64.5786H10.9734V27.3H8.97339ZM4.48566 58.9872V32.8921H6.48566V58.9872H4.48566ZM0 55.2595V36.6202H2V55.2595H0ZM22.4324 70.1711V20.7769H24.4324V70.1711H22.4324ZM26.9181 27.3V64.5786H28.9181V27.3H26.9181ZM31.4038 59.9191V31.9601H33.4038V59.9191H31.4038ZM35.8915 16.1168V74.8307H37.8915V16.1168H35.8915ZM40.3771 67.3743V23.5719H42.3771V67.3743H40.3771ZM44.8628 29.1651V62.7158H46.8628V29.1651H44.8628ZM49.3505 61.7829V30.096H51.3505V61.7829H49.3505ZM53.8365 33.8231V58.0542H55.8365V33.8231H53.8365ZM58.3219 60.851V31.0281H60.3219V60.851H58.3219ZM62.8096 32.8921V58.9872H64.8096V32.8921H62.8096ZM67.2955 58.9872V32.8921H69.2955V58.9872H67.2955ZM71.7809 25.437V65.5115H73.7809V25.437H71.7809ZM76.2686 63.6467V28.232H78.2686V63.6467H76.2686ZM89.7277 12.3237V78.0215H91.7277V12.3237H89.7277ZM94.2133 84.2193V6.12573H96.2133V84.2193H94.2133ZM98.7031 29.1651V62.7158H100.703V29.1651H98.7031ZM103.189 57.1233V34.7561H105.189V57.1233H103.189ZM107.674 31.0281V60.851H109.674V31.0281H107.674ZM112.162 67.3743V23.5719H114.162V67.3743H112.162ZM116.648 14.2528V76.6945H118.648V14.2528H116.648ZM121.134 76.6945V14.2528H123.134V76.6945H121.134ZM125.621 20.7769V70.1711H127.621V20.7769H125.621ZM130.107 64.5786V27.3H132.107V64.5786H130.107ZM134.593 35.6871V56.1904H136.593V35.6871H134.593ZM139.08 55.2595V36.6202H141.08V55.2595H139.08ZM143.566 29.1651V62.7158H145.566V29.1651H143.566ZM148.052 67.3733V24.5029H150.052V67.3733H148.052ZM152.539 19.8449V71.103H154.539V19.8449H152.539ZM157.025 74.8307V16.1168H159.025V74.8307H157.025ZM161.511 20.7769V70.1711H163.511V20.7769H161.511ZM165.998 64.5786V27.3H167.998V64.5786H165.998ZM170.484 31.9601V59.9191H172.484V31.9601H170.484ZM174.97 74.8307V16.1168H176.97V74.8307H174.97ZM179.457 23.5719V67.3743H181.457V23.5719H179.457ZM183.943 62.7158V29.1651H185.943V62.7158H183.943ZM188.429 30.096V61.7829H190.429V30.096H188.429ZM192.916 58.0542V33.8231H194.916V58.0542H192.916ZM197.402 31.0281V60.851H199.402V31.0281H197.402ZM201.888 58.9872V32.8921H203.888V58.9872H201.888ZM206.376 32.8921V58.9872H208.376V32.8921H206.376ZM210.861 65.5115V25.437H212.861V65.5115H210.861ZM215.347 28.232V63.6467H217.347V28.232H215.347ZM219.835 71.103V19.8449H221.835V71.103H219.835ZM228.806 81.5482V9.40276H230.806V81.5482H228.806ZM233.294 16.1168V74.8307H235.294V16.1168H233.294ZM237.78 62.7158V29.1651H239.78V62.7158H237.78ZM242.265 34.7561V57.1233H244.265V34.7561H242.265ZM246.753 60.851V31.0281H248.753V60.851H246.753ZM251.239 23.5719V67.3743H253.239V23.5719H251.239ZM255.724 46.5298V44.416H257.724V46.5298H255.724ZM260.212 44.416V46.5298H262.212V44.416H260.212ZM264.697 46.5298V44.416H266.697V46.5298H264.697ZM269.183 44.416V46.5298H271.183V44.416H269.183ZM273.671 46.5298V44.416H275.671V46.5298H273.671ZM278.156 44.416V46.5298H280.156V44.416H278.156ZM282.642 46.5298V44.416H284.642V46.5298H282.642ZM287.13 44.416V46.5298H289.13V44.416H287.13ZM291.615 46.5298V44.416H293.615V46.5298H291.615ZM296.105 44.416V46.5298H298.105V44.416H296.105ZM300.591 46.5298V44.416H302.591V46.5298H300.591ZM305.077 44.416V46.5298H307.077V44.416H305.077ZM309.564 46.5298V44.416H311.564V46.5298H309.564ZM314.05 44.416V46.5298H316.05V44.416H314.05ZM318.536 46.5298V44.416H320.536V46.5298H318.536ZM323.023 44.416V46.5298H325.023V44.416H323.023ZM327.509 46.5298V44.416H329.509V46.5298H327.509ZM331.995 44.416V46.5298H333.995V44.416H331.995ZM336.482 46.5298V44.416H338.482V46.5298H336.482ZM340.968 44.416V46.5298H342.968V44.416H340.968ZM345.454 46.5298V44.416H347.454V46.5298H345.454ZM349.941 44.416V46.5298H351.941V44.416H349.941ZM354.427 46.5298V44.416H356.427V46.5298H354.427ZM358.913 44.416V46.5298H360.913V44.416H358.913ZM363.401 46.5298V44.416H365.401V46.5298H363.401ZM367.886 44.416V46.5298H369.886V44.416H367.886Z"
                fill="#00B0B0"
              />
            </svg>
            <h2
              style={{
                fontWeight: "800",
                fontSize: "40px",
                lineHeight: "50.4px",
                textAlign: "center",
                margin: "30px 0",
              }}
            >
              {formatTime(elapsedTime)}
            </h2>
            <button
              style={{
                backgroundColor: "transparent",
                border: "0",
                cursor: "pointer",
                color: "black",
                fontSize: "14px",
                lineHeight: "16px",
                textAlign: "center",
              }}
              onClick={handleRecord}
            >
              <div
                style={{
                  width: "51.7px",
                  height: "51.7px",
                  borderRadius: "50%",
                  backgroundColor: "#FF0000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    width: "16px",
                    height: "16px",
                  }}
                ></div>
              </div>
              stop
            </button>
          </div>
        ) : (
          <div>
            <div
              style={{
                borderRadius: "50%",
                padding: "26.39px",
                border: "1px solid #00B0B01A",
                aspectRatio: "1",
              }}
            >
              <div
                style={{
                  borderRadius: "50%",
                  padding: "26.39px",
                  border: "1px solid #00B0B066",
                  aspectRatio: "1",
                }}
              >
                <div
                  style={{
                    borderRadius: "50%",
                    padding: "26.39px",
                    border: "1px solid #00B0B0",
                    aspectRatio: "1",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: " #00B0B0",
                      width: "100px",
                      height: "100px",
                      cursor: "pointer",
                    }}
                    onClick={handleRecord}
                  >
                    <svg
                      width="31"
                      height="45"
                      viewBox="0 0 31 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5855 30.9454C17.9119 30.9454 19.9029 30.1171 21.5593 28.4614C23.2154 26.8056 24.0435 24.8137 24.0435 22.4875V8.95396C24.0435 6.62772 23.216 4.63663 21.5593 2.98005C19.9029 1.32383 17.9119 0.495117 15.5855 0.495117C13.2594 0.495117 11.2682 1.32383 9.6117 2.98005C7.95511 4.63635 7.12695 6.62772 7.12695 8.95396V22.4875C7.12695 24.8136 7.95548 26.8056 9.6117 28.4614C11.2679 30.1171 13.2594 30.9454 15.5855 30.9454Z"
                        fill="white"
                      />
                      <path
                        d="M30.3082 17.9146C29.9744 17.5797 29.577 17.4122 29.1188 17.4122C28.6611 17.4122 28.2647 17.5797 27.9294 17.9146C27.5949 18.2494 27.4275 18.6458 27.4275 19.1038V22.4874C27.4275 25.7477 26.2686 28.5362 23.9512 30.8534C21.6346 33.1708 18.8457 34.3295 15.5854 34.3295C12.3252 34.3295 9.5366 33.1708 7.21915 30.8534C4.90199 28.5368 3.74349 25.7478 3.74349 22.4874V19.1038C3.74349 18.6458 3.57601 18.2494 3.24132 17.9146C2.90645 17.5797 2.51038 17.4122 2.05191 17.4122C1.59344 17.4122 1.19691 17.5797 0.862219 17.9146C0.527254 18.2494 0.359863 18.6458 0.359863 19.1038V22.4874C0.359863 26.382 1.65973 29.7699 4.25872 32.6508C6.8578 35.5318 10.0694 37.1838 13.8936 37.6064V41.096H7.12685C6.66865 41.096 6.27221 41.2637 5.93743 41.5985C5.60256 41.9331 5.43508 42.3297 5.43508 42.7879C5.43508 43.2454 5.60256 43.6428 5.93743 43.9774C6.27221 44.3119 6.66865 44.4799 7.12685 44.4799H24.0435C24.5016 44.4799 24.8986 44.312 25.2329 43.9774C25.5682 43.6429 25.7358 43.2455 25.7358 42.7879C25.7358 42.3298 25.5682 41.9332 25.2329 41.5985C24.8987 41.2637 24.5017 41.096 24.0435 41.096H17.2776V37.6064C21.1011 37.1838 24.3125 35.5318 26.9118 32.6508C29.5112 29.7699 30.8114 26.382 30.8114 22.4874V19.1038C30.8114 18.6459 30.6436 18.2497 30.3082 17.9146Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p style={{ marginTop: "50px", color: "black", fontWeight: "600", fontSize: "16px", lineHeight: "20.16px", textAlign: "center" }}>Tap and speak now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordModal;
