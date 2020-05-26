// core
import React from 'react';

// redux
import { connect } from 'react-redux';
import { getStep, getLoading, getErrors, getCurrentCountries } from '~/app/ducks/discount/add/selectors';
import { lifecycle } from 'recompose';
import { compose } from 'lodash/fp';

import DiscountCompletion from './discount-completion'
import DiscountDetails from './discount-details';
import DiscountProducts from './discount-products';
import DiscountStepLayout from './discount-step-layout';
import StepHeader from '../../../components/step-header';
import Stepper from '~/app/components/stepper/stepper';
import Step from '~/app/components/stepper/step';
import { resetState, removeDiscountError, getProductRules, getCountries } from '~/app/ducks/discount/add/actions';
import Loader from '~/app/components/loader';
import SxToastContainer from '~/app/components/toast/sx-toast-container';
import { ToastError } from '~/app/components/toast/sx-toast';
import { RemoveErrorHandler, ResetStateHandler, GetProductRulesHandler, GetCountriesHandler } from '~/app/ducks/discount/add';
import { RootStateType } from '~/app/ducks/root/reducer';
import console = require('console');
import Countries from '~/app/api/clients/models/countries';

type CreateDiscountProps = {
  step: number,
  loading: boolean,
  errors: ToastError[],
  countries: Countries[],
  removeDiscountError: RemoveErrorHandler,
}

const CreateDiscount: React.FunctionComponent<CreateDiscountProps> = ({ step, loading, errors, removeDiscountError, countries}) => {
  
  return (
    <>
      <SxToastContainer errors={errors} onCloseToast={removeDiscountError} />
      <Loader isLoading={loading}>
        <Stepper step={step}>
          <Step>
            <StepHeader title="Step One: Discount Details" to="/discount" />
            <DiscountStepLayout currentStep={step}>
              <DiscountDetails countries={countries} />
            </DiscountStepLayout>
          </Step>

          <Step>
            <StepHeader title="Step Two: Included Products" to="/discount" />
            <DiscountStepLayout currentStep={step}>
              <DiscountProducts />
            </DiscountStepLayout>
          </Step>

          <Step>
            <StepHeader title="Step Three: Discount Completed!" to="/discount" />
            <DiscountStepLayout currentStep={step}>
              <DiscountCompletion />
            </DiscountStepLayout>
          </Step>
        </Stepper>
      </Loader>
    </>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return {
    step: getStep(state),
    loading: getLoading(state),
    errors: getErrors(state),
    countries: getCurrentCountries(state)
  };
};

const mapDispatchToProps = {
  resetState,
  getProductRules,
  removeDiscountError,
  getCountries
};

type LifeCycleProps = {
  resetState: ResetStateHandler,
  getProductRules: GetProductRulesHandler,
  getCountries: GetCountriesHandler
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle<LifeCycleProps, null>({
    componentDidMount() {
      const { resetState, getProductRules, getCountries } = this.props;
      resetState();
      getProductRules();
      getCountries();
    }
  })
)(CreateDiscount);
