import { Container } from "./styles"

interface ShowBookPdfProps {
	file: string;
	onClose: () => void;
}

function ShowBookPdf({ file, onClose }: ShowBookPdfProps) {
  return (
		<Container>
			<div onClick={() => onClose()} />
			<i className="pi pi-spin pi-spinner" style={{fontSize: '3em', color: "#fff"}}></i>
			<embed src={`http://localhost:3333/storage/content/${file}#toolbar=0`} width={1000} height={800} />
		</Container>
	)
}

export { ShowBookPdf }
