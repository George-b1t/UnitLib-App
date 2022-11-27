import styled from "styled-components";

export const Container = styled.div`
	position: fixed;

	z-index: 99999;

	width: 100vw;
	height: 100vh;

	display: flex;
	align-items: center;
	justify-content: center;

	div {
		position: fixed;

		width: 100vw;
		height: 100vh;

		background-color: rgba(0, 0, 0, 0.4);
	}

	i {
		position: absolute;
	}

	embed {
		z-index: 999999;
	}
`
