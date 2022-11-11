import Logotype from 'components/Util/Logotype';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
// import { Button, Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';

export default function AppbarGlobal() {
	return (
		<Navbar expand='lg' fixed='top' bg='light' variant='light' collapseOnSelect>
			<Container>
				<Navbar.Brand className='d-flex gap-2 align-items-center'>
					<Logotype size='xs' />
					<Navbar.Collapse>dApp - Superior Electoral Court</Navbar.Collapse>
				</Navbar.Brand>

				<Nav className='justify-content-end'>
					<Button variant='warning'>Connect Wallet</Button>

					{/* <DropdownButton title='#B3A7CCF' variant='warning'>
						<Dropdown.Item as='button'>Logout</Dropdown.Item>
					</DropdownButton> */}
				</Nav>
			</Container>
		</Navbar>
	);
}
