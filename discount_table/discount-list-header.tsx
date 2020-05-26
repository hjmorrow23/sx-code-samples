import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { Link } from 'react-router-dom';
import { Icon } from 'react-svg-icon-host';
import { StockXIcons } from '@stockx/icons';

import { onSelectVertical, onSelectAmountType, setSearchText, resetDateFilter } from '~/app/ducks/discount/list/actions';
import { getSelectedVertical, getSelectedAmountType, getDateFilter, getStartDate, getEndDate } from '~/app/ducks/discount/list/selectors';
import { reactSelectStyle } from '~/app/components/react-select-style';
import Search from '~/app/components/search/search';
import AuthRoleWrapper from '~/app/components/auth-role-wrapper'
import { ROLES } from '~/app/constants';
import { VERTICALS } from '~/app/constants';
import { RootStateType } from '~/app/ducks/root/reducer';

const verticals = Object.values(VERTICALS).map(vertical => ({ value: vertical.category, label: vertical.name }));

type DiscountListHeaderProps = {
  onSelectVertical: typeof onSelectVertical, 
  onSelectAmountType: typeof onSelectAmountType, 
  selectedVertical: string, 
  setSearchText: typeof setSearchText, 
  dateFilter: string, 
  startDate: DateType, 
  endDate: DateType, 
  resetDateFilter: typeof resetDateFilter,
}

const DiscountListHeader: React.FunctionComponent<DiscountListHeaderProps> = ({ onSelectVertical, onSelectAmountType, selectedVertical, setSearchText, dateFilter, startDate, endDate, resetDateFilter }) => {

  const onChangeFilter = (option, actionMeta, setFilterState) => {
    if (actionMeta.action === 'clear') {
      setFilterState('');
    }
    else if (!!option && !Array.isArray(option)) {
      const selectedFilter = option.value;
      setFilterState(selectedFilter);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="h1 font-weight-bold mb-4">Discounts</div>
        <AuthRoleWrapper roles={[ROLES.ADMIN]}>
          <div>
            <Link to="/discount/add" className="btn btn-primary btn-lg">
              <span className="text-size-sm"><Icon icon={StockXIcons.Plus} alt="plus" className="mr-md-2" /></span>
              <span className="d-none d-md-inline">New Discount</span>
            </Link>
          </div>
        </AuthRoleWrapper>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-3 col-12 form-group">
          <Select className="text-size-md font-weight-bold"
            getOptionLabel={vertical => vertical.label}
            getOptionValue={vertical => vertical.value}
            value={verticals.find(v => v.value === selectedVertical)}
            onChange={(option, actionMeta) => onChangeFilter(option, actionMeta, onSelectVertical)}
            options={verticals}
            placeholder="Select A Vertical"
            styles={reactSelectStyle}
            isClearable />
        </div>
        <div className="col-md-6 col-lg-3 col-12 form-group">
          <Select className="text-size-md font-weight-bold"
            onChange={(option, actionMeta) => onChangeFilter(option, actionMeta, onSelectAmountType)}
            options={[{ value: 'percentage', label: 'Percentage' }, { value: 'flat', label: 'Flat' }]}
            placeholder="Select $ or %"
            styles={reactSelectStyle}
            isClearable />
        </div>
        <div className="col-md-6 col-lg-6 col-12 form-group">
          <Search onSearchTextChange={setSearchText} />
        </div>
      </div>
      <hr className="box-shadow-md" />
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return {
    selectedVertical: getSelectedVertical(state),
    selectedAmountType: getSelectedAmountType(state),
    startDate: getStartDate(state),
    endDate: getEndDate(state),
    dateFilter: getDateFilter(state),
  };
};

const mapDispatchToProps = {
  onSelectVertical: onSelectVertical,
  onSelectAmountType: onSelectAmountType,
  setSearchText: setSearchText,
  resetDateFilter: resetDateFilter,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(DiscountListHeader);
