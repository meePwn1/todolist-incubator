export const NotFound = () => {
	const pageBackHandler = () => {
		console.log(window.history.back())
		window.history.back
	}
	return (
		<div>
			<h1>404: Page not found</h1>
			<button onClick={pageBackHandler}>Back</button>
		</div>
	)
}
