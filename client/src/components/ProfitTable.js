import React from 'react';


const ProfitTable = (props) => {
    const data = props.profit
    const renderTable = data.map(item => {
        return (
          <tr key={item.token}>
              <td>{item.token}</td>
            <td>{ item.sum}</td>
          </tr>
        );
      })
return (
    <div>
    <table>
  <thead>
    <tr>
      <th>Token</th>
      <th>total Profit and Loss</th>
    </tr>
    </thead>
    <tbody>
        {renderTable}
    </tbody>
    </table>
    </div>
    );
};

export default ProfitTable;