import {  useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signInitiate } from '../../Redux/actions';
import { Button } from '../../components/Button';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import './Home.scss';

export function Home(){
	const {push} = useHistory();
	const dispatch = useDispatch();
	const {currentUser} = useSelector((state) => state.user); 
 
	const handleCreateRoom = () => {
		if (!currentUser) {
			dispatch(signInitiate());
		}

		console.log(currentUser);
		push('/create-room');
	};

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