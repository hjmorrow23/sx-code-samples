import React from 'react';
import DiscountBreadcrumb from './discount-breadcrumb';

type DiscountStepLayoutProps = {
    currentStep: number,
}

const DiscountStepLayout: React.FunctionComponent<DiscountStepLayoutProps> = ({ currentStep, children }) => {
    return (
        <div className="row">
            <div className="order-2 order-lg-1 col-lg-8 form-group">
                {children}
            </div>
            <div className="order-1 order-lg-2 col-lg-4 form-group">
                <DiscountBreadcrumb currentStep={currentStep}  />
            </div>
        </div>
    );
}

export default DiscountStepLayout;
