import React, { useState } from 'react';
import './modal.scss';
import { updateUser } from '../../services/userService';
import { useAppContext } from '../../context/useAppContext';

interface SignupModalProps {
    isChangePwd?: boolean;
    setAlertContent?: (content: string) => void;
    setAlertVisible: (visible: boolean) => void;
    onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isChangePwd=false, onClose, setAlertVisible, setAlertContent }) => {
    const {userID, setEmail} = useAppContext();

    const [formEmail, setformEmail] = useState<string>('');
    const [currentPwd, setCurrentPwd] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string, password?: string, confirmPassword?: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasUpperCase = /[A-Z]/;
        return password.length >= minLength && hasNumber.test(password) && hasUpperCase.test(password);
    };

    const handleSignup = async () => {
        setIsLoading(true);

        const newErrors: { email?: string, password?: string, confirmPassword?: string } = {};

        // Validate email
        if (!validateEmail(formEmail) && !isChangePwd) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate password
        if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 8 characters long, include an uppercase letter and a number';
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Proceed with signup logic
            if (isChangePwd) {
                setTimeout(() => {
                    setIsLoading(false);
                    setAlertContent?.("Success!");
                    setAlertVisible(true);
                    onClose();
                }, 1000)
            } else {
                const result = await updateUser(userID, {email: formEmail});
                if (result.success) {
                    setEmail(result.data.email);
                    setIsLoading(false);
                    setAlertContent?.("Success!");
                    setAlertVisible(true);
                    onClose();
                }
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="signup-modal">
            <div className="signup-modal__content">
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

                <h2 className="signup-modal__title">{isChangePwd ? "Change Password" : "Create Account"}</h2>
                <p className="signup-modal__desc">{!isChangePwd && "Create an account to access your data securely anywhere and be rewarded."}</p>

                {!isChangePwd ? <div className="signup-modal__input-group">
                    {/* <label htmlFor="email" className="signup-modal__label">Email</label> */}
                    <input
                        type="email"
                        id="email"
                        className={`signup-modal__input ${errors.email ? 'signup-modal__input--error' : ''}`}
                        value={formEmail}
                        placeholder='EMAIL ADDRESS'
                        onChange={(e) => setformEmail(e.target.value)}
                        required
                    />
                    {errors.email && <div className="signup-modal__error">{errors.email}</div>}
                </div> : <div className="signup-modal__input-group">
                    {/* <label htmlFor="email" className="signup-modal__label">Email</label> */}
                    <input
                        type="password"
                        id="current-password"
                        className={`signup-modal__input ${errors.email ? 'signup-modal__input--error' : ''}`}
                        value={currentPwd}
                        placeholder='Current Password'
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        required
                    />
                    {errors.email && <div className="signup-modal__error">{errors.email}</div>}
                </div>}

                <div className="signup-modal__input-group">
                    {/* <label htmlFor="password" className="signup-modal__label">Password</label> */}
                    <input
                        type="password"
                        id="password"
                        className={`signup-modal__input ${errors.password ? 'signup-modal__input--error' : ''}`}
                        value={password}
                        placeholder='PASSWORD'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <div className="signup-modal__error">{errors.password}</div>}
                </div>

                <div className="signup-modal__input-group">
                    {/* <label htmlFor="confirm-password" className="signup-modal__label">Confirm Password</label> */}
                    <input
                        type="password"
                        id="confirm-password"
                        className={`signup-modal__input ${errors.confirmPassword ? 'signup-modal__input--error' : ''}`}
                        style={{ marginTop: "4px" }}
                        value={confirmPassword}
                        placeholder='CONFIRM PASSWORD'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && <div className="signup-modal__error">{errors.confirmPassword}</div>}
                </div>

                <button className="fitfox-btn" style={{ width: "80%" }} onClick={handleSignup}>
                    {isLoading ? "Loading.." : isChangePwd ? "Continue" : "Sign Up"}
                </button>

                <p className='signup-modal__footer'>
                    By signing up you agree to our Terms of Service. View our Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default SignupModal;
