import React from 'react';

import { Navbar } from 'react-bootstrap';


function Footer () {
	return (
		<footer>
			<Navbar bg='white' fixed='bottom' className='Footer justify-content-around'>
				   
					<small className='text-muted mx-5 px-5'>
						{' '}
						Copyright &copy; 2023 by . 
					</small>{' '}
				
			</Navbar>
		</footer>
	);
}

export default Footer;