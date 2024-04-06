import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeRouter from './routes/homeRouter';
import SubjectsRouter from './routes/subjects/subjectRouter';
import Menu from './components/menu/menu';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import LoginRouter from './routes/login/login'

function App() {
	return (
		<>
			<main>
				<Header />
				<Menu />
				<Routes>
					<Route path='/' element={<HomeRouter />} />
					<Route path='/subjects/:id' element={<SubjectsRouter />} />
					<Route path= '/login' element={<LoginRouter/>}/>
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App;