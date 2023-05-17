import { Fragment } from "react";

function Table({ data, config, keyFn }) {
	const renderedHeaders = config.map((column) => {
		if (column.header) {
			return <Fragment key={column.label}>{column.header()}</Fragment>;
		}
		return <th key={column.label}>{column.label}</th>;
	});

	const renderedRows = data.map((rowData) => {
		const renderedCells = config.map((column) => {
			return (
				<td className="cellData" key={column.label}>
					{column.render(rowData)}
				</td>
			);
		});
		return (
			<tr className="rowData" key={keyFn(rowData)}>
				{renderedCells}
			</tr>
		);
	});

	return (
		<table className="table">
			<thead>
				<tr className="rowTitle">{renderedHeaders}</tr>
			</thead>
			<tbody className="dataBody">{renderedRows}</tbody>
		</table>
	);
}

export default Table;
