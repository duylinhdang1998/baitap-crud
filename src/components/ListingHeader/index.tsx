import React from 'react';

interface Props {
  TableHeader: string[];
}

const ListingHeader = ({TableHeader}: Props): JSX.Element => {
  return (
    <thead>
      <tr className="table-header">
        {TableHeader.map(head => <th scope="col">{head}</th>)}
      </tr>
    </thead>
  );
};

export default React.memo(ListingHeader);
