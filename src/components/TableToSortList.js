import { Link } from "react-router-dom";
import styled from "styled-components";

const TableToSortListBlock = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    height: 30px;
    background-color: #f9fafc;
    color: #666;
    padding: 0;
    font-size: 11px;
    a {
      color: #666;
      text-decoration: none;
      img {
        vertical-align: middle;
        margin-left: 3px;
      }
    }
  }
`;

const TableToSortList = () => {
  return (
    <TableToSortListBlock>
      <colgroup>
        <col width="26" />
        <col width="26" />
        <col width="94" />
        <col width="88" />
        <col width="78" />
        <col width="*" />
      </colgroup>
      <thead>
        <tr>
          <th colSpan="3">
            <Link to="#">
              한글명
              <img
                src="https://cdn.upbit.com/upbit-web/images/ico_change.c6ad0e9.png"
                alt="화살표"
              />
            </Link>
          </th>
          <th>
            <Link to="#">
              현재가
              <img
                src="https://cdn.upbit.com/upbit-web/images/ico_up_down.1add58d.png"
                alt="화살표"
              />
            </Link>
          </th>
          <th>
            <Link to="#">
              전일대비
              <img
                src="https://cdn.upbit.com/upbit-web/images/ico_up_down.1add58d.png"
                alt="화살표"
              />
            </Link>
          </th>
          <th>
            <Link to="#">
              거래대금
              <img
                src="https://cdn.upbit.com/upbit-web/images/ico_up_down_2.80e5420.png"
                alt="화살표"
              />
            </Link>
          </th>
        </tr>
      </thead>
    </TableToSortListBlock>
  );
};

export default TableToSortList;
