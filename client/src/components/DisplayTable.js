import React from 'react';


const DisplayTable = (props) => {
    const data = props.tradeData
    const renderTable = data.map(item => {
        return (
          <tr key={item.txn_id}>
              <td>{item.txn_id}</td>
            <td>{ item.token }</td>
            <td>{ item.buy_date }</td>
            <td>{ item.sell_date }</td>
            <td>{ item.amount }</td>
            <td>{ item.buy_volume }</td>
            <td>{ item.sell_volume }</td>
          </tr>
        );
      })
return (
    <div>
    <table>
  <thead>
    <tr>
      <th>txn id</th>
      <th>token</th>
      <th>buy date</th>
      <th>sell date</th>
      <th>amount</th>
      <th>buy amount</th>
      <th>sell amount</th>
    </tr>
    </thead>
    <tbody>
        {renderTable}
    </tbody>
    </table>
    </div>
    );
};

export default DisplayTable;