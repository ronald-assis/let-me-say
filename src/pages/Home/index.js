import {  useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { signInitiate } from '../../Redux/actions';
import { Button } from '../../components/Button';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import './Home.scss';

export function Home(){
	const dispatch = useDispatch();
 
	const handleCreateRoom = () => {
		dispatch(signInitiate());
	};

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
					<button className='create-room' onClick={handleCreateRoom}>
						<img src={googleIconImg} alt="Google logo" />
            Cadastre-se com o Google
					</button>
					<div className='separator'>ou entre em uma sala</div>
					<form> 
						<input type="text" name="" placeholder='Digite o código da sala' />
						<Button type='submit'>Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
}