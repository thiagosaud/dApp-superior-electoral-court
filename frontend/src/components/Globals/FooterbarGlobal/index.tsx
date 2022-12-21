import { Button, Container, Navbar } from 'react-bootstrap';

/**
 * @thiagosaud
 * @description This component is unique for displaying copyright text in the page footer!
 */
export default function FooterbarGlobal() {
	return (
		<Container>
			<Navbar.Text className='d-flex align-items-center'>
				© All rights reserved by
				<Button
					variant='link'
					href='https://github.com/thiagosaud/dApp-superior-electoral-court'
					style={{ paddingLeft: '0.3rem', color: 'white' }}
				>
					Thiago Saud
				</Button>
			</Navbar.Text>
		</Container>
	);
}
