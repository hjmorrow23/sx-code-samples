// core
import React from 'react';
import Select from 'react-select';


// redux
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withState, lifecycle, withHandlers } from 'recompose';
import { getLoading, getErrors, getSearchedDiscounts, getPage } from '~/app/ducks/discount/list/selectors';
import { getRoles } from '~/app/ducks/auth/selectors';
import { ROLES } from '../../../constants';

import { Pager, pageItems } from '@stockx/react-pager';

// components
import SingleCodes from './discount-list-item';
import ListHeader from './discount-list-header';
import { getDiscounts, removeDiscountError, setPage } from '~/app/ducks/discount/list/actions';
import Loader from '~/app/components/loader';
import SxToastContainer from '~/app/components/toast/sx-toast-container';
import SortableHeader, { Sort } from '~/app/components/table/sortable-header';
import { get, isEmpty, sortBy } from 'lodash';
import moment from 'moment';
import { RootStateType } from '~/app/ducks/root/reducer';
import { ToastError } from '~/app/components/toast/sx-toast';
import { ValueType, ActionMeta } from 'react-select/lib/types';

//Props that should be displayed on discount table
type DiscountListProps = {
    filteredDiscounts: Models.Discount[],
    loading: boolean,
    page: number,
    setPage: typeof setPage,
    errors: ToastError[],
    sort: Sort,
    removeDiscountError: typeof removeDiscountError,
    userRoles: string[],
    setSort: (sort: Sort) => void,
}

//Functional Component with deconstructed props object params
const DiscountList: React.FunctionComponent<DiscountListProps> = ({ filteredDiscounts, loading, page, setPage, errors, sort, removeDiscountError, setSort, userRoles }) => {
    const itemsPerPage = 20;
    const visiblePages = 7;

    //Sorting criteria for each column
    const sortLogic = {
        name: items => sortBy(items, item => item.name.toLowerCase()),
        transaction: items => sortBy(items, item => item.user_context),
        vertical: items => sortBy(items, item => isEmpty(item.vertical_details) ? 'All' : Object.keys(item.vertical_details).sort().join(', ')),
        date: items => sortBy(items, item => moment(item.created_at).format('x')),
        min: items => sortBy(items, item => item.min_price),
        max: items => sortBy(items, item => item.upper_limit),
        amount: items => sortBy(items, item => item.flat ? item.value : item.value * 100),
    }

    //Setting the sorted discount if sorting column is defined by event
    let sortedDiscounts: Models.Discount[] = sort.column === undefined ? filteredDiscounts : sortLogic[sort.column](filteredDiscounts);

    //reverses sort based on direction
    if (sort.direction == 2) {
        sortedDiscounts.reverse();
    }

    type SortOptions = Sort & {
        label: string,
    }

    //Paging criteria
    const pagedDiscounts = pageItems(sortedDiscounts, page, itemsPerPage);

    //Column options for the sorting
    const sortOptions: SortOptions[] = [
        { column: "name", direction: 1, label: "Name Ascending" },
        { column: "name", direction: 2, label: "Name Descending" },
        { column: "transaction", direction: 1, label: "Transaction Ascending" },
        { column: "transaction", direction: 2, label: "Transaction Descending" },
        { column: "vertical", direction: 1, label: "Vertical Ascending" },
        { column: "vertical", direction: 2, label: "Vertical Descending" },
        { column: "date", direction: 1, label: "Date Ascending" },
        { column: "date", direction: 2, label: "Date Descending" },
        { column: "min", direction: 1, label: "Minimum Ascending" },
        { column: "min", direction: 2, label: "Minimum Descending" },
        { column: "max", direction: 1, label: "Maximum Ascending" },
        { column: "max", direction: 2, label: "Maximum Descending" },
    ]

    const isAdmin = userRoles.includes(ROLES.ADMIN);

    //Click to trigger check for column that is clicked and set the sort accordingly
    const onClickColumnHeader: React.MouseEventHandler<HTMLDivElement> = event => {
        const column = get(event.currentTarget, 'attributes.name.value', undefined);
        const _sort = ({ column, direction: column === sort.column ? ((sort.direction + 1) === 3 ? 0 : sort.direction + 1) : 1 }) as Sort;
        setSort(_sort);
    }

    //Update sorting on when new sort event is made
    const onChangeSort = (value: ValueType<SortOptions>) => {
        setSort(sort)
    }

    return (
        <div>
            <ListHeader />
            <SxToastContainer errors={errors} onCloseToast={removeDiscountError} />
            <Loader isLoading={loading}>
                <div className="table-responsive">
                    <table className="table table-responsive-sm">
                        <colgroup>
                            <col width="40%" />
                            <col span={1} />
                            <col span={4} width="1px" />
                        </colgroup>
                        <thead>
                            <tr className="d-none d-lg-table-row">
                                <td className="text-size-sm text-medium text-uppercase">
                                    <SortableHeader onClick={onClickColumnHeader} name="name" sort={sort}>Name/Reason</SortableHeader>
                                </td>
                                <td className="text-size-sm text-medium text-uppercase">
                                    <SortableHeader onClick={onClickColumnHeader} name="date" sort={sort}>Date Created</SortableHeader>
                                </td>
                                <td className="text-size-sm text-medium text-uppercase">
                                    <SortableHeader onClick={onClickColumnHeader} name="transaction" sort={sort}>Transaction</SortableHeader>
                                </td>
                                <td className="text-size-sm text-medium text-uppercase">
                                    <SortableHeader onClick={onClickColumnHeader} name="vertical" sort={sort}>Vertical</SortableHeader>
                                </td>
                                <td className="text-size-sm text-medium text-uppercase">
                                    <SortableHeader onClick={onClickColumnHeader} name="amount" sort={sort}>Amount</SortableHeader>
                                </td>
                                <td className="text-size-sm text-medium text-uppercase">
                                    <SortableHeader onClick={onClickColumnHeader} name="min" sort={sort}>Min. Price</SortableHeader>
                                </td>
                                <td className="text-size-sm text-medium text-uppercase">
                                    <SortableHeader onClick={onClickColumnHeader} name="max" sort={sort}>Max Discount</SortableHeader>
                                </td>
                                <td className="text-size-sm text-medium text-uppercase">
                                    Included Products?
                                </td>
                                <td className="text-size-sm text-medium text-uppercase">
                                    Generate
                                </td>
                            </tr>
                            <tr className="d-lg-none">
                                <td>
                                    <Select
                                        getOptionLabel={option => option.label}
                                        options={sortOptions}
                                        value={sortOptions.find(col => col.column === sort.column && col.direction === sort.direction)}
                                        onChange={onChangeSort}
                                    />
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {pagedDiscounts && pagedDiscounts.map(discount => <SingleCodes isAdmin={isAdmin} discount={discount} key={discount.id} />)}
                        </tbody>
                    </table>
                </div>
                <Pager
                    currentPage={page}
                    total={filteredDiscounts.length}
                    itemsPerPage={20}
                    visiblePages={visiblePages}
                    onPageChanged={setPage}
                    className="justify-content-center"
                    mobileViewHideClass="d-flex justify-content-center d-sm-none"
                />
            </Loader>
        </div>
    );
};

//Maps state to props from selector calls
const mapStateToProps = (state: RootStateType) => {
    return {
        filteredDiscounts: getSearchedDiscounts(state),
        loading: getLoading(state),
        errors: getErrors(state),
        page: getPage(state),
        userRoles: getRoles(state),
    };
};

//Maps dispatch methods to props from selector calls
const mapDispatchToProps = {
    getDiscounts: getDiscounts,
    removeDiscountError: removeDiscountError,
    setPage: setPage,
};

type DiscountListLifeCycleProps = {
    getDiscounts: typeof getDiscounts,
}

export default compose(
    withState('sort', 'setSort', { column: undefined, direction: 0 }),
    //connect maps the state and dispatch to props
    connect(mapStateToProps, mapDispatchToProps),
    //lifecycle allows lifecycle method use for functional components
    lifecycle<DiscountListLifeCycleProps, {}>({
        componentDidMount() {
            const { getDiscounts } = this.props;
            getDiscounts();
        }
    })
)(DiscountList);
