import React from 'react';
import { useLocation } from 'react-router-dom';

const Recruitment = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get('type') || 'vendor'; // Default to vendor

    const isVendor = type === 'vendor' || type === 'cab'; // Handle old ?type=cab link for backward compatibility
    
    // APK is served from the public folder as /app-release.apk
    const apkLink = "/app-release.apk";

    return (
        <div className="recruitment-page">
            <div className="container">
                <div className="recruitment-content">
                    <h1 className="recruitment-title">
                        {isVendor ? 'VENDOR REGISTRATION ' : 'EMPLOYEE REGISTRATION '}
                        <span className="accent-text">APP</span>
                    </h1>
                    <div className="title-divider"></div>

                    <p className="recruitment-desc">
                        Join the Urban Ride network. Download our {isVendor ? 'operator' : 'employee'} app and check out our transparent fare model to get started.
                    </p>

                    <a href={apkLink} download="app-release.apk" className="download-apk-btn">
                        Download the Apk <i className="fas fa-arrow-down"></i>
                    </a>

                    <div className="recruitment-image-wrapper">
                        <img
                            src="/aaplication-process.png"
                            alt="Recruitment"
                            className="recruitment-bg-img"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recruitment;
