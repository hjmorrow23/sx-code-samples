import React from 'react';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import HitInfoRow from "../../../components/seller-tier/hit-info-row";

type DiscountListItemProps = {
    discount: Models.Discount,
    isAdmin: boolean,
}

const DiscountListItem: React.FunctionComponent<DiscountListItemProps> = ({ discount, isAdmin }) => {
  //convert date conditionally select the vertical and discount rate based on discount data
  const dateTime = moment(discount.created_at);
  const verticals = isEmpty(discount.vertical_details) ? 'All' : Object.keys(discount.vertical_details).join(', ');
  const dollarOrPercent = discount.flat === true ? numeral(discount.value).format('$0,0.[00]') : numeral(discount.value).format('0.[00]%')

  return (
      <>
          <tr className="bg-white shadow-sm d-none d-lg-table-row">
              <td className="p-3">
                  <span className="text-size-sm text-capitalize font-weight-bold">{discount.name}</span>
              </td>
              <td className="p-3">
                  <span className="text-size-sm">{dateTime.format("MM.DD.YY")}</span>
              </td>
              <td className="p-3">
                  <span className="text-size-sm text-capitalize">{discount.user_context === "" ? "both" : discount.user_context}</span>
              </td>
              <td className="p-3">
                  <span className="text-size-sm text-capitalize">{verticals}</span>
              </td>
              <td className="p-3">
                  <span className="text-size-sm">{dollarOrPercent}</span>
              </td>
              <td className="p-3">
                  <span className="text-size-sm">{numeral(discount.min_price).format('$0,0.[00]')}</span>
              </td>
              <td className="p-3">
                  <span className="text-size-sm">{numeral(discount.upper_limit).format('$0,0.[00]')}</span>
              </td>
              <td className="p-3">
                  <span className="text-size-sm">{discount.has_included_products ? "Yes" : "No"}</span>
              </td>
              {
                  discount.has_included_products && !isAdmin ?
                      <td className="p-3 d-flex justify-content-center">
                          <div data-tip="This Discount has specific included products. Please see an Admin for assistance."><FontAwesomeIcon icon={faQuestionCircle} color="#509e2f" size="lg" /></div>
                          <ReactTooltip place="left" type="success" effect="solid" clickable multiline />
                      </td> :
                      <td className="p-3 d-flex justify-content-center">
                          <Link to={`/discount/generate/${discount.id}`}><FontAwesomeIcon icon={faTags} /></Link>
                      </td>
              }
          </tr>
          <tr className="bg-white shadow-sm d-lg-none">
              <td className="row">
                  <HitInfoRow data={discount.name} label="Name/Reason" />
                  <HitInfoRow data={dateTime.format("MM.DD.YY")} label="Date Created" />
                  <HitInfoRow data={discount.user_context === "" ? "both" : discount.user_context} label="Transaction" />
                  <HitInfoRow data={verticals} label="Verticals" />
                  <HitInfoRow data={dollarOrPercent} label="Amount" />
                  <HitInfoRow data={numeral(discount.min_price).format('$0,0.[00]')} label="Min Price" />
                  <HitInfoRow data={numeral(discount.upper_limit).format('$0,0.[00]')} label="Max Discount" />
                  <HitInfoRow data={discount.has_included_products ? "Yes" : "No"} label="Included Products" />
                  {
                      discount.has_included_products === isAdmin ?
                          <HitInfoRow label="Generate" data={
                              <>
                                  <div data-tip="This Discount has specific included products. Please see an Admin for assistance.">
                                      <FontAwesomeIcon icon={faQuestionCircle} color="#509e2f" size="lg"/>
                                  </div>
                                  < ReactTooltip place="left" type="success" effect="solid" clickable multiline />
                              </>
                          }/>
                          :
                          <HitInfoRow label="Generate" data={<Link to={`/discount/generate/${discount.id}`}><FontAwesomeIcon icon={faTags} /></Link>}/>
                  }
              </td>
          </tr>
      </>
  );
};

export default DiscountListItem;
