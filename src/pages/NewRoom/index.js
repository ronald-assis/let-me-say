import { Link } from 'react-router-dom';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';

import '../Home/Home.scss';

export function NewRoom(){
	return (
		<div id='home'>
			<aside>
				<img src={illustrationImg} alt="Illustration" />
				<strong>Conte um pouco mais do seu dia</strong>
				<p>Conheça novas pessoas</p>
			</aside>
			<main>
				<div className='main-content'>
					<img src={logoImg} alt="Letmeask" />
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