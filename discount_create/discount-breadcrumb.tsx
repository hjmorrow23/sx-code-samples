import React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from '~/app/components/breadcrumb/breadcrumb';
import BreadcrumbItem from '~/app/components/breadcrumb/breadcrumb-item';
import { getStep } from '~/app/ducks/discount/add/selectors';
import { RootStateType } from '~/app/ducks/root/reducer';

type DiscountBreadcrumbProps = {
  currentStep: number,
}

const DiscountBreadcrumb: React.FunctionComponent<DiscountBreadcrumbProps> = ({ currentStep }) => {
  return (
    <Breadcrumb step={currentStep || 0} completeLastStep>
      <BreadcrumbItem title='Step One' subtitle='Discount Details' />
      <BreadcrumbItem title='Step Two' subtitle='Included Products' />
      <BreadcrumbItem title='Step Three' subtitle='Discount Completed' />
    </Breadcrumb >
  );
};

const mapStateToProps = (state: RootStateType) => {
  return {
    step: getStep(state),
  };
};

export default connect(mapStateToProps)(DiscountBreadcrumb);
