import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import organizeData from "../../utils/organizeDataForTable";
import Button from "../Button";
import "./Table.scss";
import paginate from "../../utils/paginate";
import { parse } from "query-string";

export interface TableHeader {
  key: string;
  value: string;
  right?: boolean;
}

declare interface TableProps {
  headers: TableHeader[];
  data: any[];
  enableActions?: boolean;
  itensPerPage?: number;
  onDelete?: (item: any) => void;
  onDetail?: (item: any) => void;
  onEdit?: (item: any) => void;
}

const Table: React.FC<TableProps> = (props) => {
  const location = useLocation();

  const [organizedData, indexedHeaders] = organizeData(
    props.data,
    props.headers
  );

  const itensPerPage = props.itensPerPage || 5;
  const page = parseInt(parse(location.search).page as string) || 1;
  const paginatedData = paginate(organizedData, itensPerPage, page);
  const totalPages = Math.ceil(organizedData.length / itensPerPage);

  return (
    <>
      <table className="AppTable">
        <thead>
          <tr>
            {props.headers.map((header) => (
              <th className={header.right ? "right" : ""} key={header.key}>
                {header.value}
              </th>
            ))}
            {props.enableActions && <th className="right">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, index) => {
            return (
              <tr key={index}>
                {Object.keys(row).map((item, index) =>
                  item !== "$original" ? (
                    <td
                      key={row.$original._id + index}
                      className={indexedHeaders[item].right ? "right" : ""}
                    >
                      {row[item]}
                    </td>
                  ) : null
                )}
                {props.enableActions && (
                  <td className="actions right">
                    {props.onEdit && (
                      <Button
                        onClick={() =>
                          props.onEdit && props.onEdit(row.$original)
                        }
                      >
                        Edit
                      </Button>
                    )}
                    {props.onDetail && (
                      <Button
                        onClick={() =>
                          props.onDetail && props.onDetail(row.$original)
                        }
                      >
                        Detail
                      </Button>
                    )}
                    {props.onDelete && (
                      <Button
                        onClick={() =>
                          props.onDelete && props.onDelete(row.$original)
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="Table__Pagination">
        {Array(totalPages)
          .fill("")
          .map((_, i) => {
            return (
              <NavLink
                key={i}
                activeClassName="selected"
                isActive={() => page === i + 1}
                to={{
                  pathname: location.pathname,
                  search: `?page=${i + 1}`,
                }}
              >
                {i + 1}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default Table;
