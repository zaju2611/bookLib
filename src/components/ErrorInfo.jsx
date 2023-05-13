export default function ErrorInfo({ children, onClose }) {
	return (
		<div className="errorInfo errorInfoActive">
			<p className="errorText">{children}</p>
			<button className="errorButton" onClick={onClose}>
				Ok
			</button>
		</div>
	);
}
