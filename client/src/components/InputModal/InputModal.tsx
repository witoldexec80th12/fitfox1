import React, { useState } from 'react';
import './inputModal.scss';
import { updateUserInfo } from '../../services/dataService';
import { useAppContext } from '../../context/useAppContext';

interface InputModalProps {
    isAccessCode: boolean;
    onClose: () => void;
    onPassed: () => void;
}

const InputModal: React.FC<InputModalProps> = ({ isAccessCode, onClose, onPassed }) => {
    const {userID, setisAvailableAccess} = useAppContext();

    const [value, setValue] = useState<string>("");
    const [errors, setErrors] = useState<string>("");

    const validateValue = (value: string): boolean => {
        return value.trim() !== '';
    };

    const handleSignup = async () => {
        // Validate email
        if (!validateValue(value)) {
            setErrors("This field is required.")
        } else {
            if (isAccessCode) {
                const result = await updateUserInfo(userID, {accessCode: value});
                if (result.success) {
                    setisAvailableAccess(true);
                    onPassed();
                } else {
                    setErrors(result.message);
                }
            }
            // Proceed Access Code or Mailing List
            console.log('Action proceed.', errors);
        }
    };

    return (
        <div className="input-modal">
            <div className="input-modal__content">
                <span className="close" onClick={onClose}>
                    <svg
                        width="10"
                        height="10"
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

                <h2 className="input-modal__title">{isAccessCode ? "Enter Access Code" : "Sign-up for Mailing List"}</h2>
                <p className="input-modal__desc">{!isAccessCode && "Enter your email address below to get the latest airdrop news."}</p>

                <div className="input-modal__input-group">
                    {/* <label htmlFor="email" className="input-modal__label">Email</label> */}
                    <input
                        type="text"
                        id="value"
                        className={`input-modal__input ${errors ? 'input-modal__input--error' : ''}`}
                        value={value}
                        placeholder={isAccessCode ? "Input Your Access Code" : "Input Your Email Address"}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />
                    {errors && <div className="input-modal__error">{errors}</div>}
                </div>

                <button className="fitfox-btn" style={{ width: "80%" }} onClick={handleSignup}>
                    Continue
                </button>

            </div>
        </div>
    );
};

export default InputModal;
