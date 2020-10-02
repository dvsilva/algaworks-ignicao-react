import { TableHeader } from "../shared/Table";

type IndexedHeaders = {
  [key: string]: TableHeader;
};
type OrganizedItem = {
  [key: string]: any;
};

export default function organizeData(
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
