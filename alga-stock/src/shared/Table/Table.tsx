import React from "react";
import Products from "./Table.mockdata";
import "./Table.scss";

declare interface TableHeader {
  key: string;
  value: string;
  right?: boolean;
}

type IndexedHeaders = {
  [key: string]: TableHeader;
};
type OrganizedItem = {
  [key: string]: any;
};

function organizeData(
  data: any[],
  headers: TableHeader[]
): [OrganizedItem[], IndexedHeaders] {
  const indexedHeaders: IndexedHeaders = {};

  headers.forEach((header) => {
    indexedHeaders[header.key] = {
      ...header,
    };
  });

  const headerKeysInOrder = Object.keys(indexedHeaders);

  const organizedData = data.map((item) => {
    const organizedItem: OrganizedItem = {};

    headerKeysInOrder.forEach((key) => {
      organizedItem[key] = item[key];
    });

    // metadado? propriedade peculiar para nao conflitar
    organizedItem.$original = item;

    return organizedItem;
  });

  // exibe em forma de tabela
  // console.table(organizedData);
  return [organizedData, indexedHeaders];
}

const headers: TableHeader[] = [
  { key: "id", value: "#" },
  { key: "name", value: "Product" },
  { key: "price", value: "Price", right: true },
  { key: "stock", value: "Available Stock", right: true },
];

const Table = () => {
  const [organizedData, indexedHeaders] = organizeData(Products, headers);

  return (
    <table className="AppTable">
      <thead>
        <tr>
          {headers.map((header) => (
            <th className={header.right ? "right" : ""} key={header.key}>
              {header.value}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {organizedData.map((row, index) => {
          return (
            <tr key={index}>
              {Object.keys(row).map((item, index) =>
                item !== "$original" ? (
                  <td
                    key={row.$original.id + index}
                    className={indexedHeaders[item].right ? "right" : ""}
                  >
                    {row[item]}
                  </td>
                ) : null
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
