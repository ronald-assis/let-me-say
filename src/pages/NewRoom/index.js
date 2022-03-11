import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import '../Home/Home.scss';

export function NewRoom(){
	const {currentUser} = useSelector((state) => state.user); 
	


	return (
		<div id='home'>
			{console.log(currentUser)}
			<aside>
				<img src={illustrationImg} alt="Illustration" />
				<strong>Conte um pouco mais do seu dia</strong>
				<p>Conheça novas pessoas</p>
			</aside>
			<main>
				<div className='main-content'>
					<img src={logoImg} alt="Letmeask" />
					<h1>{currentUser?.name}</h1>
					<h2>Criar um nova sala</h2>
					<form> 
						<input type="text" name="" placeholder='nome da sala' />
						<Button type='submit'>Criar sala</Button>
					</form>
					<p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
				</div>
			</main>
		</div>
	);
}