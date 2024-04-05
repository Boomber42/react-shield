import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeRouter from './routes/homeRouter';
import SubjectsRouter from './routes/subjects/subjectRoutes';
import Menu from './components/menu/menu';
import Footer from './components/footer/footer';
import Header from './components/header/header';

function App() {
	return (
		<>
			<main>
				<Header />
				<Menu />
				<Routes>
					<Route path='/' element={<HomeRouter />} />
					<Route path='/subjects/:id' element={<SubjectsRouter />} />
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App;